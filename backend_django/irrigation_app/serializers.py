import re
from django.utils.html import escape, strip_tags
from rest_framework import serializers
from .models import Product, SubsidyRule, QuoteRequest, ContactInquiry, BlogPost, Testimonial


def sanitize_text(val):
    if not isinstance(val, str):
        return val
    return escape(strip_tags(val.strip()))


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Product
        fields = ['id', 'title_en', 'title_ta', 'desc', 'price_numeric',
                  'price_unit_text', 'icon_class', 'image_url', 'is_subsidy_eligible', 'order']

    def validate_title_en(self, value):
        return sanitize_text(value)

    def validate_title_ta(self, value):
        return sanitize_text(value)

    def validate_desc(self, value):
        return sanitize_text(value)


class SubsidyRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SubsidyRule
        fields = '__all__'


class CalculateSubsidyInputSerializer(serializers.Serializer):
    farmer_name     = serializers.CharField(max_length=200)
    phone_number    = serializers.CharField(max_length=20, default="9489528432")
    district        = serializers.CharField(max_length=100, default="Dindigul")
    product_id      = serializers.IntegerField()
    land_size_acres = serializers.FloatField(min_value=0.1, max_value=500.0)

    def validate_farmer_name(self, value):
        clean = sanitize_text(value)
        if len(clean) < 2:
            raise serializers.ValidationError("Farmer name must be at least 2 characters.")
        return clean

    def validate_phone_number(self, value):
        clean = re.sub(r'[\s\-+]', '', value.strip())
        if not re.match(r'^\d{7,15}$', clean):
            raise serializers.ValidationError("Please provide a valid contact number.")
        return clean

    def validate_district(self, value):
        return sanitize_text(value)


class QuoteRequestSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source='product.title_en', read_only=True)

    class Meta:
        model  = QuoteRequest
        fields = [
            'id', 'farmer_name', 'phone_number', 'district',
            'product', 'product_title', 'land_size_acres',
            'estimated_project_cost', 'projected_subsidy_amount',
            'farmer_contribution', 'subsidy_percent', 'status', 'created_at'
        ]


class BlogPostListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for blog grid (no full content)."""
    class Meta:
        model  = BlogPost
        fields = ['id', 'title', 'slug', 'summary', 'author', 'cover_image', 'tags', 'created_at']


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Full post serializer including content (for single post view)."""
    class Meta:
        model  = BlogPost
        fields = '__all__'


class BlogPostWriteSerializer(serializers.ModelSerializer):
    """Write serializer for admin create/update operations."""
    class Meta:
        model  = BlogPost
        fields = ['title', 'slug', 'summary', 'content', 'author',
                  'cover_image', 'tags', 'published']

    def validate_title(self, value):
        return sanitize_text(value)

    def validate_summary(self, value):
        return sanitize_text(value)


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Testimonial
        fields = ['id', 'name', 'role', 'content', 'rating', 'avatar_url', 'district']


class ContactFormSerializer(serializers.ModelSerializer):
    """Validates and persists inbound contact form submissions."""
    name     = serializers.CharField(max_length=200)
    email    = serializers.EmailField(required=False, allow_blank=True, default='')
    phone    = serializers.CharField(max_length=20)
    district = serializers.CharField(max_length=100, required=False, default='Dindigul')
    subject  = serializers.CharField(max_length=300)
    message  = serializers.CharField(min_length=5, max_length=5000)

    class Meta:
        model  = ContactInquiry
        fields = ['id', 'name', 'email', 'phone', 'district', 'subject', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

    def validate_name(self, value):
        return sanitize_text(value)

    def validate_subject(self, value):
        return sanitize_text(value)

    def validate_message(self, value):
        return sanitize_text(value)

    def validate_district(self, value):
        return sanitize_text(value)

    def validate_phone(self, value):
        clean = re.sub(r'[\s\-+]', '', value.strip())
        if not re.match(r'^\d{7,15}$', clean):
            raise serializers.ValidationError("Please provide a valid 10-digit mobile number.")
        return clean


class ContactInquiryAdminSerializer(serializers.ModelSerializer):
    """Admin serializer for viewing and updating customer inquiries."""
    class Meta:
        model  = ContactInquiry
        fields = '__all__'


