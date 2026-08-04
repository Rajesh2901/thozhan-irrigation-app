from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Admin-only router (requires staff auth)
admin_router = DefaultRouter()
admin_router.register(r'blog',   views.BlogAdminViewSet,    basename='admin-blog')
admin_router.register(r'quotes', views.QuoteRequestViewSet, basename='admin-quotes')

urlpatterns = [
    # ── Public Endpoints ────────────────────────────
    path('products/',         views.ProductListView.as_view(),      name='product-list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(),   name='product-detail'),
    path('calculate/',        views.CalculateSubsidyAPIView.as_view(), name='calculate'),
    path('blog/',             views.BlogListView.as_view(),         name='blog-list'),
    path('blog/<slug:slug>/', views.BlogDetailView.as_view(),       name='blog-detail'),
    path('testimonials/',     views.TestimonialListView.as_view(),  name='testimonials'),
    path('contact/',          views.ContactFormView.as_view(),      name='contact'),
    path('stats/',            views.DashboardStatsView.as_view(),   name='stats'),

    # ── Admin-Protected Endpoints ────────────────────
    path('admin/', include(admin_router.urls)),
]
