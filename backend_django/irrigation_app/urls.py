from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CalculateSubsidyAPIView, QuoteRequestViewSet, DashboardView

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'quotes', QuoteRequestViewSet, basename='quote')

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('api/v1/', include(router.urls)),
    path('api/v1/calculate/', CalculateSubsidyAPIView.as_view(), name='calculate-subsidy'),
]
