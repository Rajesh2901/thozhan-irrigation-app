from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.generic import TemplateView
from django.shortcuts import get_object_or_404
from .models import Product, SubsidyRule, QuoteRequest
from .serializers import (
    ProductSerializer, 
    SubsidyRuleSerializer, 
    CalculateSubsidyInputSerializer, 
    QuoteRequestSerializer
)

class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing Irrigation System Products (Drip, Sprinkler, Rain Gun, Solar Pump).
    """
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

class CalculateSubsidyAPIView(APIView):
    """
    POST API endpoint computing Tamil Nadu Government subsidy brackets.
    """
    def post(self, request):
        serializer = CalculateSubsidyInputSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        product = get_object_or_404(Product, id=data['product_id'])
        land_acres = data['land_size_acres']

        project_cost = round(product.price_numeric * land_acres, 2)

        # Compute subsidy percentage based on government tiers
        if land_acres <= 5.0:
            subsidy_pct = 100
            explanation = "சிறு/குறு விவசாயி பிரிவின் கீழ் 100% அரசு மானியத்திற்கு தகுதி பெறுகிறீர்கள் (Under 5 Acres scheme)."
            tier_label = "100% Grant (Small Farmer)"
        elif land_acres <= 12.0:
            subsidy_pct = 75
            explanation = "இதர விவசாயி பிரிவின் கீழ் 75% அரசு மானியம் வழங்கப்படுகிறது (5.1 to 12 Acres scheme)."
            tier_label = "75% Grant (Other Farmer)"
        else:
            subsidy_pct = 50
            explanation = "12 ஏக்கருக்கு மேல் நில அளவு உள்ளதால் அரசு மானியங்கள் 50% வரை வாய்ப்புள்ளது. Custom plan required."
            tier_label = "50% Custom Plan"

        subsidy_amount = round(project_cost * (subsidy_pct / 100.0), 2)
        farmer_contribution = max(0.0, round(project_cost - subsidy_amount, 2))

        # Save lead quote record
        quote_record = QuoteRequest.objects.create(
            farmer_name=data['farmer_name'],
            phone_number=data.get('phone_number', '9489528432'),
            district=data.get('district', 'Dindigul'),
            product=product,
            land_size_acres=land_acres,
            estimated_project_cost=project_cost,
            projected_subsidy_amount=subsidy_amount,
            farmer_contribution=farmer_contribution,
            subsidy_percent=subsidy_pct
        )

        return Response({
            "quote_id": quote_record.id,
            "farmer_name": quote_record.farmer_name,
            "product_title": product.title_en,
            "land_acres": land_acres,
            "project_cost": project_cost,
            "subsidy_amount": subsidy_amount,
            "farmer_contribution": farmer_contribution,
            "subsidy_percent": subsidy_pct,
            "tier_label": tier_label,
            "explanation": explanation
        }, status=status.HTTP_200_OK)

class QuoteRequestViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing and updating farmer quotation requests.
    """
    queryset = QuoteRequest.objects.all().order_by('-created_at')
    serializer_class = QuoteRequestSerializer

class DashboardView(TemplateView):
    """
    Template view rendering the Smart Farm Dashboard HTML view.
    """
    template_name = "dashboard.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['products'] = Product.objects.all()
        context['total_quotes'] = QuoteRequest.objects.count()
        context['company_owner'] = "ஜெயசந்திரன் (Jayachandran)"
        context['phone'] = "94895 28432"
        context['email'] = "thozhanirrigation@gmail.com"
        context['gstin'] = "33BSXPJ5723P1ZX"
        context['address'] = "21-A, Vijaya Nagar, SSI ITI College, Seelapadi, Dindigul - 624 004"
        return context
