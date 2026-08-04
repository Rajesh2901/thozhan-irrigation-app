from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Product(models.Model):
    """
    Model representing irrigation equipment configurations (Drip Kit, Sprinkler, Rain Gun, Solar Pump).
    """
    title_en = models.CharField(max_length=255, help_text="Equipment Title in English")
    title_ta = models.CharField(max_length=255, help_text="Equipment Title in Tamil (சொட்டு நீர் பாசனம்)")
    desc = models.TextField(help_text="Detailed specification description")
    price_numeric = models.IntegerField(help_text="Unit Rate in INR (e.g. 24500)")
    price_unit_text = models.CharField(max_length=50, default="/ Acre", help_text="Unit label (e.g. / Acre)")
    icon_class = models.CharField(max_length=100, default="fa-solid fa-faucet-drip")
    image_url = models.CharField(max_length=500, blank=True, default="/photos/drip.png")
    is_subsidy_eligible = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title_en} - ₹{self.price_numeric:,}"

class SubsidyRule(models.Model):
    """
    Model configuring Tamil Nadu Government subsidy bracket tiers based on land size.
    """
    min_acres = models.FloatField(default=0.0)
    max_acres = models.FloatField(default=5.0)
    subsidy_percentage = models.IntegerField(default=100, help_text="Percentage (e.g. 100, 75, 50)")
    tier_label_en = models.CharField(max_length=100, default="Small Farmer Grant")
    tier_label_ta = models.CharField(max_length=100, default="சிறு/குறு விவசாயி")
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.min_acres} to {self.max_acres} Acres -> {self.subsidy_percentage}% Grant"

class QuoteRequest(models.Model):
    """
    Model storing farmer subsidy calculation requests and WhatsApp ingestion leads.
    """
    STATUS_CHOICES = [
        ('PENDING', 'Pending Review'),
        ('APPROVED', 'Subsidy Approved'),
        ('REJECTED', 'Ineligible'),
        ('COMPLETED', 'Installation Complete'),
    ]

    farmer_name = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=15, default="9489528432")
    district = models.CharField(max_length=100, default="Dindigul")
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name="quote_requests")
    land_size_acres = models.FloatField(validators=[MinValueValidator(0.1), MaxValueValidator(500.0)])
    estimated_project_cost = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    projected_subsidy_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    farmer_contribution = models.DecimalField(max_digits=12, decimal_places=2, default=0.0)
    subsidy_percent = models.IntegerField(default=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Quote #{self.id} - {self.farmer_name} ({self.land_size_acres} Acres)"
