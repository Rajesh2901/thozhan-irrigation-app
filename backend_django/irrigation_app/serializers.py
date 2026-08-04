from rest_framework import serializers
from .models import Product, SubsidyRule, QuoteRequest

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class SubsidyRuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubsidyRule
        fields = '__all__'

class CalculateSubsidyInputSerializer(serializers.Serializer):
    farmer_name = serializers.CharField(max_length=200, required=True)
    phone_number = serializers.CharField(max_length=15, required=False, default="9489528432")
    district = serializers.CharField(max_length=100, required=False, default="Dindigul")
    product_id = serializers.IntegerField(required=True)
    land_size_acres = serializers.FloatField(min_value=0.1, max_value=500.0, required=True)

    def validate_farmer_name(self, value):
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise serializers.ValidationError("Farmer name must be at least 2 characters.")
        return cleaned

class QuoteRequestSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = QuoteRequest
        fields = '__all__'
