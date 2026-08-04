from django.contrib import admin
from .models import Product, SubsidyRule, QuoteRequest, BlogPost, Testimonial


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display  = ['id', 'title_en', 'price_numeric', 'price_unit_text', 'is_subsidy_eligible', 'order']
    list_editable = ['price_numeric', 'is_subsidy_eligible', 'order']
    search_fields = ['title_en', 'title_ta']
    ordering      = ['order']


@admin.register(SubsidyRule)
class SubsidyRuleAdmin(admin.ModelAdmin):
    list_display = ['min_acres', 'max_acres', 'subsidy_percentage', 'tier_label_en']


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display  = ['id', 'farmer_name', 'phone_number', 'district', 'land_size_acres',
                     'subsidy_percent', 'farmer_contribution', 'status', 'created_at']
    list_filter   = ['status', 'district', 'subsidy_percent']
    search_fields = ['farmer_name', 'phone_number', 'district']
    list_editable = ['status']
    readonly_fields = ['estimated_project_cost', 'projected_subsidy_amount',
                       'farmer_contribution', 'created_at']
    date_hierarchy = 'created_at'


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display  = ['title', 'author', 'published', 'created_at']
    list_editable = ['published']
    search_fields = ['title', 'author', 'content']
    prepopulated_fields = {'slug': ('title',)}
    list_filter   = ['published', 'author']
    date_hierarchy = 'created_at'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display  = ['name', 'role', 'district', 'rating', 'is_active', 'order']
    list_editable = ['is_active', 'order', 'rating']
    search_fields = ['name', 'district']
