from django.contrib import admin
from .models import Product, SubsidyRule, QuoteRequest

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title_en', 'title_ta', 'price_numeric', 'price_unit_text', 'is_subsidy_eligible', 'created_at')
    list_filter = ('is_subsidy_eligible',)
    search_fields = ('title_en', 'title_ta', 'desc')

@admin.register(SubsidyRule)
class SubsidyRuleAdmin(admin.ModelAdmin):
    list_display = ('id', 'min_acres', 'max_acres', 'subsidy_percentage', 'tier_label_en', 'tier_label_ta')

@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'farmer_name', 'phone_number', 'district', 'product', 'land_size_acres', 'estimated_project_cost', 'subsidy_percent', 'status', 'created_at')
    list_filter = ('status', 'district', 'subsidy_percent')
    search_fields = ('farmer_name', 'phone_number', 'district')
