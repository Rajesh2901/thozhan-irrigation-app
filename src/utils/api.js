/**
 * Django REST API Integration Client for Thozhan Irrigation
 * Connects React frontend components to Python & Django backend endpoints.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

/**
 * Fetch all irrigation products from Django REST API
 */
export async function fetchProductsFromAPI() {
  try {
    const response = await fetch(`${API_BASE_URL}/products/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return Array.isArray(data) ? data : (data.results || []);
  } catch (error) {
    console.warn("Backend API unavailable, using local product state:", error);
    return null;
  }
}

/**
 * Submit subsidy calculation to Django backend
 */
export async function calculateSubsidyAPI(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn("API Calculation fallback to local logic:", error);
    return null;
  }
}

/**
 * Fetch farmer lead quotes from Django backend
 */
export async function fetchQuotesFromAPI() {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes/`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return Array.isArray(data) ? data : (data.results || []);
  } catch (error) {
    console.warn("Backend API unavailable for quotes:", error);
    return [];
  }
}
