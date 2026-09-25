# Thozhan Irrigation — Angular 19 & Django JWT Architecture Guide
### Stack: Angular (Frontend) · Python Django REST Framework & SimpleJWT (Backend) · Cloudflare Pages (Hosting)
### Repo: [Rajesh2901/thozhan-irrigation-app](https://github.com/Rajesh2901/thozhan-irrigation-app)

---

## 1. Full-Stack JWT Architecture Workflow

```
[ Angular 19 App ]  ────( POST /auth/token/ )────→  [ Django simplejwt ]
        │                                                    │
(Stores Access/Refresh)                                (Validates Creds)
        │                                                    │
        ├───( Attaches Bearer Token )───→ [ API Views ]       │
        │                                (Requires JWT)      │
        │                                      │             │
        └───( Handles 401 & Auto-Refreshes )───┴─────────────┘
```

1. **Authentication**: The administrator accesses `/admin/login` and submits credentials.
2. **Token Issuance**: The Django backend verifies credentials and issues two tokens:
   - **Access Token** (expires in 8 hours): Attached as a `Bearer` authorization header on all subsequent API requests.
   - **Refresh Token** (expires in 7 days): Saved in localStorage to request new access tokens automatically.
3. **HTTP Interceptor**: `auth.interceptor.ts` intercepts all outgoing requests to `/api/v1/admin/*`, appending the `Authorization: Bearer <token>` header.
4. **401 Token Refresh**: If an access token expires, the interceptor catches the `401 Unauthorized` response, issues a POST request to `/api/v1/auth/token/refresh/` using the refresh token, and replays the original API request.

---

## 2. Administrator Credentials & Configuration

### A. Local Setup (SQLite)
Create an admin user by running:
```bash
cd backend_django
python manage.py createsuperuser
```
Follow the prompts to set:
- **Username**: `admin`
- **Email**: `admin@thozhan.com`
- **Password**: (any strong password, e.g., `admin123`)

### B. Production Setup (PostgreSQL)
To configure credentials on your live Django host (e.g. Render.com):
1. Navigate to your database configuration terminal or run SSH console.
2. Run `python manage.py createsuperuser` or set environmental variables for automatic superuser creation in your deployment script.

---

## 3. Administrative Workflows

### 📥 1. Lead Management
When a farmer inputs details into the **Subsidy Cost Estimator** on the public `/pricing` page:
1. React/Angular sends a `POST` request to `/api/v1/calculate/`.
2. Django stores this in the database as a `QuoteRequest` (status: `PENDING`).
3. Under `/admin/leads`, the admin can view the tabular list of leads.
4. The admin can click the phone link to call the farmer directly, or click the WhatsApp action to trigger the auto-formatted message.
5. In the Django admin panel at `/admin/`, the administrator can change statuses (`PENDING`, `APPROVED`, `REJECTED`, `COMPLETED`) as the government subsidy progress advances.

### 📦 2. Product Catalog Management
Under `/admin/products`:
- **Add Product**: Click "Add Product", input title (English + Tamil), numeric price, unit (e.g., `/ Acre`), icon class (FontAwesome), image path, and check whether it qualifies for government subsidy.
- **Edit Product**: Click "Edit", modify fields, and save.
- **Delete Product**: Click the trash icon.
*Note: All actions connect live to `/api/v1/admin/products/`. If the backend API goes offline, the UI falls back to localStorage.*

### 📰 3. Blog & Agricultural Guides
Under `/admin/blog`:
- Write article titles, summaries, and Markdown content.
- Use **Auto-slug Generation** (updates slug dynamically from the title).
- Toggle the "Publish immediately" checkbox to make the post public on the main blog feed instantly.

---

## 4. Local Development Setup (Beginner Step-by-Step)

### Backend (Django)
```bash
cd backend_django
python -m venv venv
.\venv\Scripts\activate       # Windows
source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata irrigation_app/fixtures/sample_data.json
python manage.py createsuperuser
python manage.py runserver
```

### Frontend (Angular 19)
```bash
bun install                  # or: npm install
bun run start                # or: npm run start
# Website live at: http://localhost:4200/
```

---

## 5. Production Build Settings for Cloudflare Pages

Wrangler configuration file [wrangler.jsonc](file:///C:/Users/rajes/.gemini/antigravity/scratch/cloned_repos/thozhan-irrigation-app/wrangler.jsonc) has been adjusted for Angular:
- **Build command**: `ng build` (compiles production bundle)
- **Output directory**: `./dist/browser` (target path for Cloudflare assets)
- **Fallback routing**: `not_found_handling = "single-page-application"` (ensures Angular router works perfectly on deep page reloads)

---

## 6. Subsidy Calculation API (`/api/v1/calculate/`)

The backend provides a public calculation and lead-generation endpoint aligned with the **Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)** and **Tamil Nadu Horticulture Department** subsidy frameworks.

### Endpoint Details
- **URL**: `POST /api/v1/calculate/`
- **Authentication**: None (`AllowAny` public access)
- **Rate Limit**: Standard API limits

### Subsidy Eligibility Brackets
| Landholding Size | Govt. Subsidy % | Category Classification | Scheme Guidelines |
| :--- | :---: | :--- | :--- |
| **0.1 – 5.0 Acres** | **100%** | Small & Marginal Farmer (சிறு/குறு விவசாயி) | 100% equipment & installation covered under PMKSY small farmer grant. |
| **5.1 – 12.0 Acres** | **75%** | Other Farmer | 75% cost covered under TN Horticulture Dept scheme; farmer pays 25%. |
| **> 12.0 Acres** | **50%** | Large Farm / Commercial | 50% subsidy on permissible limit with custom phased deployment. |

### Request Format
```json
{
  "farmer_name": "K. Murugesan",
  "phone_number": "9489528432",
  "district": "Dindigul",
  "product_id": 1,
  "land_size_acres": 3.0
}
```

### Response Format
```json
{
  "status": "success",
  "quote_id": 142,
  "farmer_name": "K. Murugesan",
  "product_title": "Drip Irrigation Kit",
  "land_acres": 3.0,
  "project_cost": 73500.0,
  "subsidy_amount": 73500.0,
  "farmer_contribution": 0.0,
  "subsidy_percent": 100,
  "tier_label": "100% Grant — Small Farmer (சிறு/குறு விவசாயி)",
  "explanation": "Under 5 Acres: Tamil Nadu Govt covers the full installation cost under the PMKSY small farmer scheme."
}
```

### Example cURL
```bash
curl -X POST https://your-backend-domain.com/api/v1/calculate/ \
  -H "Content-Type: application/json" \
  -d '{
    "farmer_name": "K. Murugesan",
    "phone_number": "9489528432",
    "district": "Dindigul",
    "product_id": 1,
    "land_size_acres": 3.0
  }'
```
