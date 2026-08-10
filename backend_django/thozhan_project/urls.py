from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    # Django Admin Panel
    path('admin/', admin.site.urls),

    # JWT Authentication Endpoints
    # POST /api/v1/auth/token/         → Login (returns access + refresh tokens)
    # POST /api/v1/auth/token/refresh/ → Get new access token using refresh token
    # POST /api/v1/auth/token/verify/  → Verify a token is still valid
    path('api/v1/auth/token/',         TokenObtainPairView.as_view(),  name='token_obtain_pair'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(),     name='token_refresh'),
    path('api/v1/auth/token/verify/',  TokenVerifyView.as_view(),      name='token_verify'),

    # App API Endpoints (defined in irrigation_app/urls.py)
    path('api/v1/', include('irrigation_app.urls')),
]
