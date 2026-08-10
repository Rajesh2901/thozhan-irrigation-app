import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  Product, SubsidyCalculationInput, SubsidyCalculationResult,
  BlogPost, Testimonial, ContactFormData, QuoteLead,
  DashboardStats, ApiPage
} from '../models/interfaces';

const API_BASE = '/api/v1';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  // ── Products ──────────────────────────────────────────────
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_BASE}/products/`).pipe(
      catchError(() => of([]))
    );
  }

  getProduct(id: number): Observable<Product | null> {
    return this.http.get<Product>(`${API_BASE}/products/${id}/`).pipe(
      catchError(() => of(null))
    );
  }

  createProduct(data: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${API_BASE}/admin/products/`, data);
  }

  updateProduct(id: number, data: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${API_BASE}/admin/products/${id}/`, data);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/admin/products/${id}/`);
  }

  // ── Subsidy Calculator ────────────────────────────────────
  calculateSubsidy(data: SubsidyCalculationInput): Observable<SubsidyCalculationResult> {
    return this.http.post<SubsidyCalculationResult>(`${API_BASE}/calculate/`, data);
  }

  // ── Blog ──────────────────────────────────────────────────
  getBlogPosts(search = ''): Observable<BlogPost[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<BlogPost[]>(`${API_BASE}/blog/`, { params }).pipe(
      catchError(() => of([]))
    );
  }

  getBlogPost(slug: string): Observable<BlogPost | null> {
    return this.http.get<BlogPost>(`${API_BASE}/blog/${slug}/`).pipe(
      catchError(() => of(null))
    );
  }

  createBlogPost(data: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${API_BASE}/admin/blog/`, data);
  }

  updateBlogPost(id: number, data: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${API_BASE}/admin/blog/${id}/`, data);
  }

  deleteBlogPost(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/admin/blog/${id}/`);
  }

  // ── Testimonials ──────────────────────────────────────────
  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${API_BASE}/testimonials/`).pipe(
      catchError(() => of([]))
    );
  }

  // ── Contact Form ──────────────────────────────────────────
  submitContact(data: ContactFormData): Observable<{ status: string; message: string }> {
    return this.http.post<{ status: string; message: string }>(`${API_BASE}/contact/`, data);
  }

  // ── Admin: Leads ──────────────────────────────────────────
  getQuoteLeads(search = '', status = ''): Observable<QuoteLead[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (status && status !== 'ALL') params = params.set('status', status);
    return this.http.get<QuoteLead[]>(`${API_BASE}/admin/quotes/`, { params }).pipe(
      catchError(() => of([]))
    );
  }

  // ── Dashboard Stats ───────────────────────────────────────
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${API_BASE}/stats/`).pipe(
      catchError(() => of({ total_installations: 1200, total_farmers: 850, districts_covered: 18, years_experience: 12 }))
    );
  }
}
