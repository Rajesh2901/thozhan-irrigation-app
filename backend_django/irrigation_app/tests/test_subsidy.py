from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from irrigation_app.models import Product, QuoteRequest


class SubsidyCalculationAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('calculate')
        self.product = Product.objects.create(
            title_en="Drip Irrigation Kit",
            title_ta="சொட்டு நீர் பாசனம்",
            desc="Complete agricultural drip irrigation setup",
            price_numeric=24500,
            price_unit_text="/ Acre",
            icon_class="fa-solid fa-faucet-drip",
            image_url="/photos/drip.png",
            is_subsidy_eligible=True,
            order=1
        )

    def test_tier_1_small_farmer_under_5_acres(self):
        """Tier 1 (<= 5 acres): 100% Government grant for small/marginal farmers."""
        payload = {
            "farmer_name": "R. Selvam",
            "phone_number": "9876543210",
            "district": "Dindigul",
            "product_id": self.product.id,
            "land_size_acres": 3.0
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()
        self.assertEqual(data["status"], "success")
        self.assertEqual(data["farmer_name"], "R. Selvam")
        self.assertEqual(data["product_title"], "Drip Irrigation Kit")
        self.assertEqual(data["land_acres"], 3.0)
        self.assertEqual(data["project_cost"], 73500.0)  # 24500 * 3
        self.assertEqual(data["subsidy_percent"], 100)
        self.assertEqual(data["subsidy_amount"], 73500.0)
        self.assertEqual(data["farmer_contribution"], 0.0)
        self.assertIn("100% Grant", data["tier_label"])

        # Check QuoteRequest was saved in database
        self.assertEqual(QuoteRequest.objects.count(), 1)
        quote = QuoteRequest.objects.first()
        self.assertEqual(quote.farmer_name, "R. Selvam")
        self.assertEqual(quote.subsidy_percent, 100)

    def test_tier_2_other_farmer_5_to_12_acres(self):
        """Tier 2 (5.1 - 12 acres): 75% Government grant."""
        payload = {
            "farmer_name": "K. Murugesan",
            "phone_number": "9489528432",
            "district": "Madurai",
            "product_id": self.product.id,
            "land_size_acres": 8.0
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()
        self.assertEqual(data["status"], "success")
        self.assertEqual(data["land_acres"], 8.0)
        expected_cost = round(24500 * 8.0, 2)  # 196000.0
        expected_subsidy = round(expected_cost * 0.75, 2)  # 147000.0
        expected_contrib = round(expected_cost - expected_subsidy, 2)  # 49000.0

        self.assertEqual(data["project_cost"], expected_cost)
        self.assertEqual(data["subsidy_percent"], 75)
        self.assertEqual(data["subsidy_amount"], expected_subsidy)
        self.assertEqual(data["farmer_contribution"], expected_contrib)
        self.assertIn("75% Grant", data["tier_label"])

    def test_tier_3_large_farm_above_12_acres(self):
        """Tier 3 (> 12 acres): 50% Custom plan."""
        payload = {
            "farmer_name": "S. Ramasamy",
            "phone_number": "9842100000",
            "district": "Theni",
            "product_id": self.product.id,
            "land_size_acres": 15.0
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.json()
        self.assertEqual(data["status"], "success")
        self.assertEqual(data["land_acres"], 15.0)
        expected_cost = round(24500 * 15.0, 2)  # 367500.0
        expected_subsidy = round(expected_cost * 0.50, 2)  # 183750.0
        expected_contrib = round(expected_cost - expected_subsidy, 2)  # 183750.0

        self.assertEqual(data["project_cost"], expected_cost)
        self.assertEqual(data["subsidy_percent"], 50)
        self.assertEqual(data["subsidy_amount"], expected_subsidy)
        self.assertEqual(data["farmer_contribution"], expected_contrib)
        self.assertIn("50% Custom Plan", data["tier_label"])

    def test_validation_missing_fields(self):
        """Validation fails if required fields are missing."""
        payload = {
            "farmer_name": "",
            "land_size_acres": 3.0
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.json()["status"], "error")

    def test_invalid_product_id(self):
        """Returns 404 if product does not exist."""
        payload = {
            "farmer_name": "Test Farmer",
            "phone_number": "9876543210",
            "district": "Dindigul",
            "product_id": 99999,
            "land_size_acres": 3.0
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
