from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from irrigation_app.models import Product, QuoteRequest, ContactInquiry


class ContactAndAdminCRUDTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            username='admin_test',
            password='Password123!',
            email='admin@thozhan.com'
        )
        self.admin_client = APIClient()
        self.admin_client.force_authenticate(user=self.admin_user)

        self.product = Product.objects.create(
            title_en="Drip Irrigation Kit",
            title_ta="சொட்டு நீர் பாசனம்",
            desc="Complete agricultural drip irrigation setup",
            price_numeric=24500,
            price_unit_text="/ Acre",
            icon_class="fa-solid fa-faucet-drip",
            is_subsidy_eligible=True,
            order=1
        )

    def test_contact_form_submission_persists_inquiry(self):
        """Public contact form saves ContactInquiry and returns 201."""
        url = reverse('contact')
        payload = {
            "name": "K. Kumar",
            "email": "kumar@example.com",
            "phone": "9876543210",
            "district": "Dindigul",
            "subject": "Drip irrigation inquiry for 4 acres",
            "message": "Need site inspection and subsidy estimate for tomato crop."
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["status"], "success")
        self.assertIn("inquiry_id", response.json())

        # Verify persisted in database
        self.assertEqual(ContactInquiry.objects.count(), 1)
        inquiry = ContactInquiry.objects.first()
        self.assertEqual(inquiry.name, "K. Kumar")
        self.assertEqual(inquiry.phone, "9876543210")
        self.assertEqual(inquiry.district, "Dindigul")
        self.assertEqual(inquiry.status, "NEW")

    def test_contact_form_sanitizes_xss(self):
        """XSS tags in name and message must be escaped/stripped."""
        url = reverse('contact')
        payload = {
            "name": "<script>alert('pwned')</script>Farmer",
            "phone": "9876543210",
            "district": "Madurai",
            "subject": "<b>Inquiry</b>",
            "message": "<img src=x onerror=alert(1)>Please contact me."
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        inquiry = ContactInquiry.objects.first()
        self.assertNotIn("<script>", inquiry.name)
        self.assertNotIn("<img", inquiry.message)

    def test_contact_form_invalid_phone_rejected(self):
        """Invalid phone formats rejected with 400 Bad Request."""
        url = reverse('contact')
        payload = {
            "name": "Farmer Test",
            "phone": "123",  # invalid
            "district": "Dindigul",
            "subject": "Test",
            "message": "Testing invalid phone validation"
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(ContactInquiry.objects.count(), 0)

    def test_admin_product_crud_endpoints(self):
        """Staff can create, read, update, and delete products."""
        # Unauthenticated access forbidden
        unauth_url = '/api/v1/admin/products/'
        resp = self.client.post(unauth_url, {"title_en": "Hacked"}, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Authenticated Admin creates product
        new_product_payload = {
            "title_en": "High-Pressure Rain Gun",
            "title_ta": "மழை துப்பாக்கி",
            "desc": "Wide coverage rain gun for sugarcane and tea",
            "price_numeric": 32000,
            "price_unit_text": "/ Unit",
            "icon_class": "fa-solid fa-cloud-showers-water",
            "image_url": "/photos/raingun.png",
            "is_subsidy_eligible": True,
            "order": 3
        }
        create_resp = self.admin_client.post(unauth_url, new_product_payload, format='json')
        self.assertEqual(create_resp.status_code, status.HTTP_201_CREATED)
        product_id = create_resp.json()["id"]

        # Admin updates product price
        update_url = f'/api/v1/admin/products/{product_id}/'
        patch_resp = self.admin_client.patch(update_url, {"price_numeric": 34000}, format='json')
        self.assertEqual(patch_resp.status_code, status.HTTP_200_OK)
        self.assertEqual(patch_resp.json()["price_numeric"], 34000)

        # Admin deletes product
        del_resp = self.admin_client.delete(update_url)
        self.assertEqual(del_resp.status_code, status.HTTP_204_NO_CONTENT)

    def test_admin_quote_status_update(self):
        """Admin can update status of a quote request."""
        quote = QuoteRequest.objects.create(
            farmer_name="V. Murugan",
            phone_number="9876543210",
            district="Dindigul",
            product=self.product,
            land_size_acres=4.0,
            estimated_project_cost=98000,
            projected_subsidy_amount=98000,
            farmer_contribution=0,
            subsidy_percent=100,
            status='PENDING'
        )

        detail_url = f'/api/v1/admin/quotes/{quote.id}/'
        update_resp = self.admin_client.patch(detail_url, {"status": "APPROVED"}, format='json')
        self.assertEqual(update_resp.status_code, status.HTTP_200_OK)

        quote.refresh_from_db()
        self.assertEqual(quote.status, "APPROVED")
