from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Product(models.Model):
    """Irrigation equipment (Drip Kit, Sprinkler, Rain Gun, Solar Pump)."""
    title_en          = models.CharField(max_length=255, help_text="Equipment Title in English")
    title_ta          = models.CharField(max_length=255, help_text="Equipment Title in Tamil")
    desc              = models.TextField(help_text="Detailed specification description")
    price_numeric     = models.IntegerField(help_text="Unit Rate in INR")
    price_unit_text   = models.CharField(max_length=50, default="/ Acre")
    icon_class        = models.CharField(max_length=100, default="fa-solid fa-faucet-drip")
    image_url         = models.CharField(max_length=500, blank=True, default="/photos/drip.png")
    is_subsidy_eligible = models.BooleanField(default=True)
    order             = models.IntegerField(default=0)
    created_at        = models.DateTimeField(auto_now_add=True)
    updated_at        = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"{self.title_en} — ₹{self.price_numeric:,}"


class SubsidyRule(models.Model):
    """Tamil Nadu Government subsidy tier configuration by land size."""
    min_acres          = models.FloatField(default=0.0)
    max_acres          = models.FloatField(default=5.0)
    subsidy_percentage = models.IntegerField(default=100)
    tier_label_en      = models.CharField(max_length=100, default="Small Farmer Grant")
    tier_label_ta      = models.CharField(max_length=100, default="சிறு/குறு விவசாயி")
    description        = models.TextField(blank=True)

    def __str__(self):
        return f"{self.min_acres}–{self.max_acres} Acres → {self.subsidy_percentage}% Grant"


class QuoteRequest(models.Model):
    """Farmer subsidy calculation requests and lead ingestion records."""
    STATUS_CHOICES = [
        ('PENDING',   'Pending Review'),
        ('APPROVED',  'Subsidy Approved'),
        ('REJECTED',  'Ineligible'),
        ('COMPLETED', 'Installation Complete'),
    ]
    farmer_name              = models.CharField(max_length=200)
    phone_number             = models.CharField(max_length=15, default="9489528432")
    district                 = models.CharField(max_length=100, default="Dindigul")
    product                  = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name="quote_requests")
    land_size_acres          = models.FloatField(validators=[MinValueValidator(0.1), MaxValueValidator(500.0)])
    estimated_project_cost   = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    projected_subsidy_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    farmer_contribution      = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    subsidy_percent          = models.IntegerField(default=100)
    status                   = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at               = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Quote #{self.id} — {self.farmer_name} ({self.land_size_acres} Acres)"


class BlogPost(models.Model):
    """Agricultural articles, news, and subsidy application guides."""
    title       = models.CharField(max_length=300)
    slug        = models.SlugField(unique=True)
    summary     = models.TextField(max_length=400, help_text="Short preview text shown on blog grid")
    content     = models.TextField(help_text="Full article content (supports markdown)")
    author      = models.CharField(max_length=100, default="Jayachandran")
    cover_image = models.URLField(blank=True, null=True)
    tags        = models.JSONField(default=list, help_text='e.g. ["drip", "subsidy", "tn-govt"]')
    published   = models.BooleanField(default=False)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    """Farmer success stories and customer reviews."""
    name       = models.CharField(max_length=200, help_text="Farmer full name")
    role       = models.CharField(max_length=200, help_text="e.g. Paddy Farmer, Dindigul")
    content    = models.TextField(help_text="Review / success story text")
    rating     = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    avatar_url = models.URLField(blank=True, null=True)
    district   = models.CharField(max_length=100, default="Tamil Nadu")
    is_active  = models.BooleanField(default=True)
    order      = models.IntegerField(default=0)

    class Meta:
        ordering = ['order', '-rating']

    def __str__(self):
        return f"{self.name} — {self.rating}★"
