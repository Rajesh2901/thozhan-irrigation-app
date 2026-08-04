import logging
from rest_framework import viewsets, status, generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from .models import Product, SubsidyRule, QuoteRequest, BlogPost, Testimonial
from .serializers import (
    ProductSerializer,
    SubsidyRuleSerializer,
    CalculateSubsidyInputSerializer,
    QuoteRequestSerializer,
    BlogPostListSerializer,
    BlogPostDetailSerializer,
    BlogPostWriteSerializer,
    TestimonialSerializer,
    ContactFormSerializer,
)

logger = logging.getLogger(__name__)


# ─────────────────────────────────────────────
# PRODUCTS
# ─────────────────────────────────────────────

class ProductListView(generics.ListAPIView):
    """
    GET /api/v1/products/
    Returns the full irrigation equipment catalog.
    """
    queryset         = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


class ProductDetailView(generics.RetrieveAPIView):
    """
    GET /api/v1/products/<id>/
    Returns a single product by ID.
    """
    queryset         = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


# ─────────────────────────────────────────────
# SUBSIDY CALCULATOR
# ─────────────────────────────────────────────

class CalculateSubsidyAPIView(APIView):
    """
    POST /api/v1/calculate/
    Computes Tamil Nadu Government subsidy brackets and saves a lead quote.

    Request body:
        { farmer_name, phone_number, district, product_id, land_size_acres }

    Response:
        { quote_id, project_cost, subsidy_amount, farmer_contribution, tier_label, explanation }
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CalculateSubsidyInputSerializer(data=request.data)
        if not serializer.is_valid():
            logger.warning("Subsidy calculation validation failed: %s", serializer.errors)
            return Response({"status": "error", "errors": serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        data        = serializer.validated_data
        product     = get_object_or_404(Product, id=data['product_id'])
        land_acres  = data['land_size_acres']
        project_cost = round(product.price_numeric * land_acres, 2)

        # ── Government Subsidy Tiers ──────────────────────────────────
        if land_acres <= 5.0:
            subsidy_pct  = 100
            tier_label   = "100% Grant — Small Farmer (சிறு/குறு விவசாயி)"
            explanation  = "Under 5 Acres: Tamil Nadu Govt covers the full installation cost under the PMKSY small farmer scheme."
        elif land_acres <= 12.0:
            subsidy_pct  = 75
            tier_label   = "75% Grant — Other Farmer"
            explanation  = "5.1–12 Acres: 75% cost covered under TN Horticulture Dept scheme. You pay only 25%."
        else:
            subsidy_pct  = 50
            tier_label   = "50% Custom Plan (>12 Acres)"
            explanation  = "Above 12 Acres: 50% subsidy available. Contact us for a custom phased installation plan."

        subsidy_amount      = round(project_cost * (subsidy_pct / 100.0), 2)
        farmer_contribution = max(0.0, round(project_cost - subsidy_amount, 2))

        # Save lead for admin review
        quote = QuoteRequest.objects.create(
            farmer_name              = data['farmer_name'],
            phone_number             = data.get('phone_number', '9489528432'),
            district                 = data.get('district', 'Dindigul'),
            product                  = product,
            land_size_acres          = land_acres,
            estimated_project_cost   = project_cost,
            projected_subsidy_amount = subsidy_amount,
            farmer_contribution      = farmer_contribution,
            subsidy_percent          = subsidy_pct,
        )
        logger.info("New quote #%s created for %s (%s acres)", quote.id, data['farmer_name'], land_acres)

        return Response({
            "status":               "success",
            "quote_id":             quote.id,
            "farmer_name":          quote.farmer_name,
            "product_title":        product.title_en,
            "land_acres":           land_acres,
            "project_cost":         project_cost,
            "subsidy_amount":       subsidy_amount,
            "farmer_contribution":  farmer_contribution,
            "subsidy_percent":      subsidy_pct,
            "tier_label":           tier_label,
            "explanation":          explanation,
        }, status=status.HTTP_200_OK)


# ─────────────────────────────────────────────
# BLOG
# ─────────────────────────────────────────────

class BlogListView(generics.ListAPIView):
    """
    GET /api/v1/blog/
    Returns published blog posts (newest first). Supports ?search= query param.
    """
    queryset         = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostListSerializer
    permission_classes = [AllowAny]
    filter_backends  = [filters.SearchFilter]
    search_fields    = ['title', 'summary', 'author', 'tags']


class BlogDetailView(generics.RetrieveAPIView):
    """
    GET /api/v1/blog/<slug>/
    Returns a single published blog post with full content.
    """
    queryset         = BlogPost.objects.filter(published=True)
    serializer_class = BlogPostDetailSerializer
    permission_classes = [AllowAny]
    lookup_field     = 'slug'


class BlogAdminViewSet(viewsets.ModelViewSet):
    """
    Admin CRUD for blog posts.
    POST   /api/v1/admin/blog/
    PUT    /api/v1/admin/blog/<id>/
    DELETE /api/v1/admin/blog/<id>/
    Requires Django admin session or token auth.
    """
    queryset = BlogPost.objects.all()
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return BlogPostWriteSerializer
        return BlogPostDetailSerializer


# ─────────────────────────────────────────────
# TESTIMONIALS
# ─────────────────────────────────────────────

class TestimonialListView(generics.ListAPIView):
    """
    GET /api/v1/testimonials/
    Returns active customer testimonials sorted by order field.
    """
    queryset         = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]


# ─────────────────────────────────────────────
# CONTACT FORM
# ─────────────────────────────────────────────

class ContactFormView(APIView):
    """
    POST /api/v1/contact/
    Validates and records a contact form submission.
    Returns success confirmation or field-level validation errors.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactFormSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"status": "error", "errors": serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        d = serializer.validated_data
        # Log submission (Phase 2: add email notification via django-anymail)
        logger.info("Contact form from %s <%s> — %s", d['name'], d['email'], d['subject'])

        return Response({
            "status":  "success",
            "message": "நன்றி! We'll contact you within 24 hours.",
        }, status=status.HTTP_201_CREATED)


# ─────────────────────────────────────────────
# ADMIN — QUOTES DASHBOARD
# ─────────────────────────────────────────────

class QuoteRequestViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/v1/admin/quotes/         — list all farmer leads
    GET /api/v1/admin/quotes/<id>/    — single lead detail
    Restricted to Django admin/staff users.
    """
    queryset         = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    permission_classes = [IsAdminUser]
    filter_backends  = [filters.SearchFilter]
    search_fields    = ['farmer_name', 'phone_number', 'district', 'status']


# ─────────────────────────────────────────────
# DASHBOARD STATS (public summary)
# ─────────────────────────────────────────────

class DashboardStatsView(APIView):
    """
    GET /api/v1/stats/
    Returns high-level business stats for the home page hero section.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "total_installations": QuoteRequest.objects.filter(status='COMPLETED').count() or 1200,
            "total_farmers":       QuoteRequest.objects.values('farmer_name').distinct().count() or 850,
            "districts_covered":   18,
            "years_experience":    12,
        })


# ─────────────────────────────────────────────
# LEGACY TEMPLATE VIEW (kept for backwards compat)
# ─────────────────────────────────────────────

class DashboardView(TemplateView):
    template_name = "dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update({
            'products':      Product.objects.all(),
            'total_quotes':  QuoteRequest.objects.count(),
            'company_owner': "ஜெயசந்திரன் (Jayachandran)",
            'phone':         "94895 28432",
            'email':         "thozhanirrigation@gmail.com",
            'gstin':         "33BSXPJ5723P1ZX",
            'address':       "21-A, Vijaya Nagar, SSI ITI College, Seelapadi, Dindigul - 624 004",
        })
        return context
