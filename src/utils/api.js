/**
 * api.js — Thozhan Irrigation Django REST API Client
 *
 * All functions connect to the Django backend at /api/v1/.
 * If the API is offline, functions fail silently and the
 * calling component falls back to its own local data.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

/**
 * Internal helper: wraps fetch with JSON parsing and error handling.
 * @param {string} endpoint - e.g. '/products/'
 * @param {RequestInit} [options] - fetch options
 * @returns {Promise<any>} parsed JSON or throws error object
 */
async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: res.statusText }));
    throw errorData;
  }

  return res.json();
}

// ─────────────────────────────────────────────────────────
// PRODUCTS — GET /api/v1/products/
// ─────────────────────────────────────────────────────────

/** Fetch the full irrigation equipment catalog from Django. */
export async function fetchProductsFromAPI() {
  try {
    return await apiFetch('/products/');
  } catch {
    return null; // component will use its local DEFAULT_PRODUCTS
  }
}

/** Fetch a single product by ID. */
export async function getProductById(id) {
  try {
    return await apiFetch(`/products/${id}/`);
  } catch {
    return null;
  }
}

// Alias used by ServicesPage
export const getServices = fetchProductsFromAPI;

// ─────────────────────────────────────────────────────────
// SUBSIDY CALCULATOR — POST /api/v1/calculate/
// ─────────────────────────────────────────────────────────

/**
 * Submit subsidy calculation to Django backend.
 * Saves a QuoteRequest lead and returns the computed breakdown.
 *
 * @param {{ farmer_name, phone_number, district, product_id, land_size_acres }} data
 * @returns {{ quote_id, project_cost, subsidy_amount, farmer_contribution, tier_label, explanation }}
 */
export async function calculateSubsidyAPI(data) {
  return apiFetch('/calculate/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────
// BLOG — GET /api/v1/blog/
// ─────────────────────────────────────────────────────────

/** Fetch list of published blog posts. Optionally pass a search query. */
export async function getBlogPosts(searchQuery = '') {
  try {
    const qs = searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : '';
    return await apiFetch(`/blog/${qs}`);
  } catch {
    return null;
  }
}

/** Fetch a single blog post by slug. */
export async function getBlogPost(slug) {
  try {
    return await apiFetch(`/blog/${slug}/`);
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────
// TESTIMONIALS — GET /api/v1/testimonials/
// ─────────────────────────────────────────────────────────

/** Fetch active customer testimonials. */
export async function getTestimonialsFromAPI() {
  try {
    return await apiFetch('/testimonials/');
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────
// CONTACT FORM — POST /api/v1/contact/
// ─────────────────────────────────────────────────────────

/**
 * Submit the contact form to Django.
 * @param {{ name, email, phone, subject, message }} data
 * @returns {{ status: 'success', message: string }}
 */
export async function submitContact(data) {
  return apiFetch('/contact/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────
// ADMIN — GET /api/v1/admin/quotes/   (requires Django session)
// ─────────────────────────────────────────────────────────

/** Fetch all farmer quote leads (Admin only — requires auth). */
export async function getQuotes() {
  try {
    return await apiFetch('/admin/quotes/');
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────
// DASHBOARD STATS — GET /api/v1/stats/
// ─────────────────────────────────────────────────────────

/** Fetch high-level business stats for home page. */
export async function getDashboardStats() {
  try {
    return await apiFetch('/stats/');
  } catch {
    return null;
  }
}
