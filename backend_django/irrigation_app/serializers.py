from rest_framework import serializers
from .models import Product, SubsidyRule, QuoteRequest, BlogPost, Testimonial


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Product
        fields = ['id', 'title_en', 'title_ta', 'desc', 'price_numeric',
                  'price_unit_text', 'icon_class', 'image_url', 'is_subsidy_eligible']


class SubsidyRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SubsidyRule
        fields = '__all__'


class CalculateSubsidyInputSerializer(serializers.Serializer):
    farmer_name    = serializers.CharField(max_length=200)
    phone_number   = serializers.CharField(max_length=15, default="9489528432")
    district       = serializers.CharField(max_length=100, default="Dindigul")
    product_id     = serializers.IntegerField()
    land_size_acres = serializers.FloatField(min_value=0.1, max_value=500.0)


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


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Testimonial
        fields = ['id', 'name', 'role', 'content', 'rating', 'avatar_url', 'district']


class ContactFormSerializer(serializers.Serializer):
    """Validates inbound contact form submissions."""
    name    = serializers.CharField(max_length=200)
    email   = serializers.EmailField()
    phone   = serializers.CharField(max_length=20, required=False, allow_blank=True)
    subject = serializers.CharField(max_length=300)
    message = serializers.CharField(min_length=10)
