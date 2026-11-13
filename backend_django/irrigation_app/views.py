import logging
from rest_framework import viewsets, status, generics, filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from .models import Product, SubsidyRule, QuoteRequest, ContactInquiry, BlogPost, Testimonial
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
    ContactInquiryAdminSerializer,
)

logger = logging.getLogger(__name__)


# ─────────────────────────────────────────────
# RATE LIMITING THROTTLES
# ─────────────────────────────────────────────

class SubsidyCalculateThrottle(AnonRateThrottle):
    rate = '30/minute'
    scope = 'calculate'


class ContactFormThrottle(AnonRateThrottle):
    rate = '15/minute'
    scope = 'contact'


# ─────────────────────────────────────────────
# PRODUCTS
# ─────────────────────────────────────────────

class ProductListView(generics.ListAPIView):
    """
    GET /api/v1/products/
    Returns the full irrigation equipment catalog.
    """
    queryset         = Product.objects.all().order_by('order', 'id')
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


class ProductAdminViewSet(viewsets.ModelViewSet):
    """
    Admin CRUD for products.
    GET    /api/v1/admin/products/
    POST   /api/v1/admin/products/
    GET    /api/v1/admin/products/<id>/
    PUT    /api/v1/admin/products/<id>/
    PATCH  /api/v1/admin/products/<id>/
    DELETE /api/v1/admin/products/<id>/
    """
    queryset           = Product.objects.all().order_by('order', 'id')
    serializer_class   = ProductSerializer
    permission_classes = [IsAdminUser]
    filter_backends    = [filters.SearchFilter, filters.OrderingFilter]
    search_fields      = ['title_en', 'title_ta', 'desc']
    ordering_fields    = ['order', 'price_numeric', 'id']
    ordering           = ['order', 'id']


# ─────────────────────────────────────────────
# SUBSIDY CALCULATOR
# ─────────────────────────────────────────────

class CalculateSubsidyAPIView(APIView):
    """
    POST /api/v1/calculate/
    Computes Tamil Nadu Government subsidy brackets and saves a lead quote.
    """
    permission_classes = [AllowAny]
    throttle_classes    = [SubsidyCalculateThrottle]

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
# CONTACT FORM & INQUIRIES
# ─────────────────────────────────────────────

class ContactFormView(APIView):
    """
    POST /api/v1/contact/
    Validates and records a contact form submission into ContactInquiry.
    Returns success confirmation or field-level validation errors.
    """
    permission_classes = [AllowAny]
    throttle_classes   = [ContactFormThrottle]

    def post(self, request):
        serializer = ContactFormSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"status": "error", "errors": serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        inquiry = serializer.save()
        logger.info("Saved contact inquiry #%s from %s <%s> — %s (%s)",
                    inquiry.id, inquiry.name, inquiry.email, inquiry.subject, inquiry.district)

        return Response({
            "status":  "success",
            "message": "நன்றி! We'll contact you within 24 hours.",
            "inquiry_id": inquiry.id,
        }, status=status.HTTP_201_CREATED)


class ContactInquiryViewSet(viewsets.ModelViewSet):
    """
    Admin CRUD for inbound farmer/customer inquiries.
    GET    /api/v1/admin/contacts/
    GET    /api/v1/admin/contacts/<id>/
    PATCH  /api/v1/admin/contacts/<id>/
    DELETE /api/v1/admin/contacts/<id>/
    """
    queryset           = ContactInquiry.objects.all().order_by('-created_at')
    serializer_class   = ContactInquiryAdminSerializer
    permission_classes = [IsAdminUser]
    filter_backends    = [filters.SearchFilter, filters.OrderingFilter]
    search_fields      = ['name', 'phone', 'district', 'subject', 'status']
    ordering_fields    = ['created_at', 'status', 'district']
    ordering           = ['-created_at']


# ─────────────────────────────────────────────
# ADMIN — QUOTES DASHBOARD
# ─────────────────────────────────────────────

class QuoteRequestViewSet(viewsets.ModelViewSet):
    """
    Admin CRUD for farmer subsidy quotes and lead lifecycle.
    GET    /api/v1/admin/quotes/         — list all farmer leads
    GET    /api/v1/admin/quotes/<id>/    — single lead detail
    PATCH  /api/v1/admin/quotes/<id>/    — update status (PENDING->APPROVED->COMPLETED)
    DELETE /api/v1/admin/quotes/<id>/    — remove lead
    """
    queryset           = QuoteRequest.objects.all().order_by('-created_at')
    serializer_class   = QuoteRequestSerializer
    permission_classes = [IsAdminUser]
    filter_backends    = [filters.SearchFilter, filters.OrderingFilter]
    search_fields      = ['farmer_name', 'phone_number', 'district', 'status']
    ordering_fields    = ['created_at', 'status', 'land_size_acres', 'estimated_project_cost']
    ordering           = ['-created_at']


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
