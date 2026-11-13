import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'thozhan_project.settings')
django.setup()

from django.contrib.auth.models import User
from irrigation_app.models import Product, SubsidyRule, Testimonial, BlogPost, QuoteRequest

def seed():
    print("Seeding database...")

    # Create admin user if not exists
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@thozhan.com', 'admin123')
        print("Created superuser: admin / admin123")
    else:
        print("Superuser admin already exists.")

    # Seed products
    products_data = [
        {
            "id": 1,
            "title_en": "Drip Irrigation Kit",
            "title_ta": "சொட்டு நீர் பாசனம்",
            "desc": "Premium complete agricultural setup engineered for uniform watering. Includes main pipe, sub-main, laterals, emitters, filter unit, fertilizer injector, and pressure regulators. Covers up to 5 acres per kit.",
            "price_numeric": 24500,
            "price_unit_text": "/ Acre",
            "icon_class": "fa-solid fa-faucet-drip",
            "image_url": "/photos/drip.png",
            "is_subsidy_eligible": True,
            "order": 1
        },
        {
            "id": 2,
            "title_en": "Sprinkler Micro Head System",
            "title_ta": "தெளிப்பு நீர் பாசனம்",
            "desc": "High-pressure overhead misting systems optimized for open ground crop layouts. Includes risers, impact sprinklers, main + sub-main lines, valve box, and control panel.",
            "price_numeric": 18200,
            "price_unit_text": "/ Acre",
            "icon_class": "fa-solid fa-sprinkler",
            "image_url": "/photos/sprinkler.png",
            "is_subsidy_eligible": True,
            "order": 2
        },
        {
            "id": 3,
            "title_en": "Rain Gun Irrigation System",
            "title_ta": "மழை துப்பாக்கி பாசனம்",
            "desc": "High-throw water cannon systems ideal for sugarcane, cotton, and forage grass crops. Single gun can cover 0.5–1 acre per position. Heavy-duty aluminium pipes.",
            "price_numeric": 32000,
            "price_unit_text": "/ Acre",
            "icon_class": "fa-solid fa-cloud-showers-water",
            "image_url": "/photos/raingun.png",
            "is_subsidy_eligible": True,
            "order": 3
        },
        {
            "id": 4,
            "title_en": "Solar Agri Pump Integration",
            "title_ta": "சோலார் பம்ப் செட்",
            "desc": "Grid-independent solar power pumping systems with automatic start controls. Compatible with all drip and sprinkler systems. Includes solar panels, VFD controller, and monoblock pump.",
            "price_numeric": 85000,
            "price_unit_text": "/ Unit",
            "icon_class": "fa-solid fa-solar-panel",
            "image_url": "/photos/solar.png",
            "is_subsidy_eligible": True,
            "order": 4
        }
    ]

    for p in products_data:
        obj, created = Product.objects.update_or_create(id=p["id"], defaults=p)
        print(f"Product #{obj.id} ({obj.title_en}): {'created' if created else 'updated'}")

    # Seed Subsidy Rules
    rules_data = [
        {
            "min_acres": 0.0,
            "max_acres": 5.0,
            "subsidy_percentage": 100,
            "tier_label_en": "Small & Marginal Farmer Grant",
            "tier_label_ta": "சிறு / குறு விவசாயி",
            "description": "100% full cost covered by Tamil Nadu Government under PMKSY & State Horticulture Dept."
        },
        {
            "min_acres": 5.1,
            "max_acres": 12.0,
            "subsidy_percentage": 75,
            "tier_label_en": "Other Farmer Grant",
            "tier_label_ta": "இதர விவசாயி",
            "description": "75% government subsidy. Farmer contributes only 25% of installation cost."
        },
        {
            "min_acres": 12.1,
            "max_acres": 500.0,
            "subsidy_percentage": 50,
            "tier_label_en": "Large Landholding Custom Scheme",
            "tier_label_ta": "பெரு விவசாயிகள் திட்டம்",
            "description": "50% assistance on micro-irrigation equipment with phased installation schedule."
        }
    ]

    for r in rules_data:
        obj, created = SubsidyRule.objects.update_or_create(
            tier_label_en=r["tier_label_en"], defaults=r
        )
        print(f"Subsidy Rule ({obj.tier_label_en}): {'created' if created else 'updated'}")

    # Seed Testimonials
    testimonials = [
        {
            "name": "K. Murugesan",
            "role": "Vegetable & Tomato Farmer",
            "content": "Thozhan Irrigation handled our PMKSY 100% subsidy paperwork with zero hassle. Yield improved by 35% in our Dindigul farm.",
            "rating": 5,
            "district": "Dindigul",
            "order": 1
        },
        {
            "name": "S. Selvaraj",
            "role": "Sugarcane Grower",
            "content": "The Rain Gun system cut our water requirement in half. Excellent after-sales service and genuine fittings.",
            "rating": 5,
            "district": "Karur",
            "order": 2
        },
        {
            "name": "A. Meenakshi",
            "role": "Moringa & Coconut Planter",
            "content": "Solar pump integration with drip system has completely freed us from EB power cut worries.",
            "rating": 5,
            "district": "Madurai",
            "order": 3
        }
    ]

    for t in testimonials:
        obj, created = Testimonial.objects.update_or_create(name=t["name"], defaults=t)
        print(f"Testimonial ({obj.name}): {'created' if created else 'updated'}")

    print("Database seeding completed successfully!")

if __name__ == '__main__':
    seed()
