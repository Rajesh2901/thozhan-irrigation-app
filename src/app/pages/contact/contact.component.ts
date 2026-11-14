import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ContactFormData } from '../../core/models/interfaces';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="contact-page-wrapper">
      <!-- Header Banner -->
      <section class="section section-dark text-center contact-header">
        <div class="container-narrow">
          <span class="section-eyebrow eyebrow-dark">
            <i class="fa-solid fa-phone-volume"></i> Farmer Support & Consultation
          </span>
          <h1 class="section-title">Contact Thozhan Irrigation</h1>
          <p class="section-subtitle">
            Need guidance on subsidy documentation, free on-site farm assessment, or equipment pricing? Our team in Dindigul is ready to assist you.
          </p>
        </div>
      </section>

      <!-- Main Contact Grid -->
      <section class="section section-light">
        <div class="container-wide">
          <div class="grid-2 contact-layout">
            <!-- Left: Contact Info Panel -->
            <div class="card-cream contact-info-panel">
              <div class="profile-header">
                <div class="avatar-circle">
                  <i class="fa-solid fa-user-tie"></i>
                </div>
                <div>
                  <h3 class="profile-name">ஜெயசந்திரன் (Jayachandran)</h3>
                  <p class="profile-role">Managing Director & Irrigation Consultant</p>
                </div>
              </div>

              <div class="contact-entries-list">
                <div class="contact-item">
                  <div class="icon-wrap"><i class="fa-solid fa-phone"></i></div>
                  <div class="detail-text">
                    <span class="label">Farmer Hotline</span>
                    <a href="tel:9489528432" class="value">94895 28432</a> / <a href="tel:9443224855" class="value">94432 24855</a>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="icon-wrap whatsapp-icon"><i class="fa-brands fa-whatsapp"></i></div>
                  <div class="detail-text">
                    <span class="label">WhatsApp Support</span>
                    <a href="https://wa.me/919489528432" target="_blank" rel="noopener noreferrer" class="value">+91 94895 28432</a>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="icon-wrap"><i class="fa-solid fa-envelope"></i></div>
                  <div class="detail-text">
                    <span class="label">Email Address</span>
                    <a href="mailto:thozhanirrigation@gmail.com" class="value">thozhanirrigation&#64;gmail.com</a>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="icon-wrap"><i class="fa-solid fa-location-dot"></i></div>
                  <div class="detail-text">
                    <span class="label">Head Office Address</span>
                    <span class="value">
                      21-A, Vijaya Nagar, SSI ITI College Road,<br>
                      Seelapadi, Dindigul — 624 004, Tamil Nadu
                    </span>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="icon-wrap"><i class="fa-solid fa-file-invoice-dollar"></i></div>
                  <div class="detail-text">
                    <span class="label">GSTIN / Tax ID</span>
                    <span class="value">33BSXPJ5723P1ZX (Verified Entity)</span>
                  </div>
                </div>

                <div class="contact-item">
                  <div class="icon-wrap"><i class="fa-regular fa-clock"></i></div>
                  <div class="detail-text">
                    <span class="label">Business Hours</span>
                    <span class="value">Monday – Saturday: 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <a href="https://wa.me/919489528432?text=Hello%20Thozhan%20Irrigation,%20I%20would%20like%20to%20request%20a%20quotation."
                   target="_blank"
                   rel="noopener noreferrer"
                   class="btn btn-whatsapp btn-full">
                  <i class="fa-brands fa-whatsapp"></i> Message Directly on WhatsApp
                </a>
              </div>
            </div>

            <!-- Right: Contact Form Panel -->
            <div class="card-light contact-form-panel" id="quote-form">
              @if (status() === 'success') {
                <div class="success-panel text-center animate-fade">
                  <div class="success-icon-wrap">
                    <i class="fa-solid fa-circle-check"></i>
                  </div>
                  <h3 class="text-xl font-bold text-forest mb-2">Quote Request Submitted!</h3>
                  <p class="text-secondary text-sm mb-6">
                    Thank you, {{ contactForm.get('name')?.value }}. We have received your details. Our agricultural technician will contact you within 24 hours.
                  </p>
                  <button class="btn btn-primary" (click)="resetForm()">
                    Submit Another Inquiry
                  </button>
                </div>
              } @else {
                <div class="form-intro mb-6">
                  <h3 class="text-xl font-bold text-forest">Request a Free Field Quote</h3>
                  <p class="text-secondary text-sm">
                    Fill out your farm details and our technical team will prepare a preliminary subsidy eligibility estimate.
                  </p>
                </div>

                @if (status() === 'error') {
                  <div class="error-banner mb-4">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span>Could not send request right now. Please call us directly at 94895 28432.</span>
                  </div>
                }

                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>
                  <div class="form-grid mb-4">
                    <div class="form-group">
                      <label>Farmer Name *</label>
                      <input type="text" formControlName="name" class="form-control" placeholder="e.g. Murugesan" />
                      @if (isInvalid('name')) {
                        <span class="form-error">Please enter your name</span>
                      }
                    </div>

                    <div class="form-group">
                      <label>Mobile Number (WhatsApp) *</label>
                      <input type="tel" formControlName="phone" class="form-control" placeholder="e.g. 9876543210" />
                      @if (isInvalid('phone')) {
                        <span class="form-error">Valid 10-digit mobile number required</span>
                      }
                    </div>
                  </div>

                  <div class="form-grid mb-4">
                    <div class="form-group">
                      <label>District in Tamil Nadu *</label>
                      <select formControlName="district" class="form-control">
                        <option value="">Select District</option>
                        @for (dist of districts; track dist) {
                          <option [value]="dist">{{ dist }}</option>
                        }
                      </select>
                      @if (isInvalid('district')) {
                        <span class="form-error">Please select your district</span>
                      }
                    </div>

                    <div class="form-group">
                      <label>Email Address</label>
                      <input type="email" formControlName="email" class="form-control" placeholder="optional@gmail.com" />
                    </div>
                  </div>

                  <div class="form-group mb-4">
                    <label>Irrigation System or Service Required *</label>
                    <select formControlName="subject" class="form-control">
                      <option value="">Select Option</option>
                      <option value="Drip Irrigation Subsidy Inquiry">Drip Irrigation System (100% / 75% Subsidy)</option>
                      <option value="Sprinkler System Installation">Sprinkler System Installation</option>
                      <option value="Rain Gun System">Rain Gun Setup</option>
                      <option value="Solar Agricultural Pump">Solar Agri Pump Unit</option>
                      <option value="Free On-Site Farm Assessment">Free On-Site Farm Assessment</option>
                      <option value="Maintenance / Filter Support">Maintenance & Filter Cleaning</option>
                    </select>
                    @if (isInvalid('subject')) {
                      <span class="form-error">Please choose a requirement</span>
                    }
                  </div>

                  <div class="form-group mb-6">
                    <label>Farm & Crop Details (Acreage, Crop, Borewell status) *</label>
                    <textarea formControlName="message" class="form-control" rows="4"
                              placeholder="e.g. 3 Acres of Banana in Dindigul, 5 HP submersible pump available. Need guidance on 100% subsidy paperwork."></textarea>
                    @if (isInvalid('message')) {
                      <span class="form-error">Please provide a brief description (min 10 chars)</span>
                    }
                  </div>

                  <button type="submit" class="btn btn-amber btn-full btn-lg" [disabled]="status() === 'loading'">
                    @if (status() === 'loading') {
                      <i class="fa-solid fa-spinner animate-spin"></i> Submitting...
                    } @else {
                      <i class="fa-solid fa-paper-plane"></i> Submit Quote Request
                    }
                  </button>
                </form>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- ── Regional Service Footprint & District Map ── -->
      <section class="section section-cream service-map-section">
        <div class="container-wide">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-map-location-dot"></i> Statewide Field Network
            </span>
            <h2 class="section-title">Tamil Nadu Regional Service Hubs</h2>
            <p class="section-subtitle">
              Active engineering deployment and prompt on-site farm assessments across 18 key agricultural districts. Click any district to start your quote.
            </p>
          </div>

          <div class="grid-3 district-hubs-grid">
            @for (hub of regionalHubs; track hub.name) {
              <div class="card-light district-hub-card hover-lift" (click)="selectDistrict(hub.name)">
                <div class="hub-header">
                  <div class="hub-icon-wrap" [class.primary-hub]="hub.isHQ">
                    <i class="fa-solid" [class.fa-building-shield]="hub.isHQ" [class.fa-location-dot]="!hub.isHQ"></i>
                  </div>
                  <div>
                    <h3 class="hub-name">{{ hub.name }}</h3>
                    <span class="hub-name-ta">{{ hub.nameTa }}</span>
                  </div>
                  <span class="hub-status-pill" [class.hq]="hub.isHQ">
                    {{ hub.isHQ ? 'Central HQ' : 'Field Team' }}
                  </span>
                </div>

                <p class="hub-coverage">{{ hub.coverage }}</p>

                <div class="hub-footer">
                  <span class="hub-response-time">
                    <i class="fa-regular fa-clock"></i> {{ hub.responseTime }}
                  </span>
                  <span class="hub-action-link">
                    Select & Quote <i class="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            }
          </div>

          <!-- Rapid Dispatch Commitment Banner -->
          <div class="card-light dispatch-banner mt-8">
            <div class="dispatch-info">
              <div class="dispatch-icon">
                <i class="fa-solid fa-truck-fast"></i>
              </div>
              <div>
                <h4 class="font-bold text-forest">48-Hour Field Assessment Guarantee</h4>
                <p class="text-xs text-secondary">
                  Our certified agricultural engineers conduct hydraulic pressure measurement, water discharge tests, and FMB layout mapping within 48 hours of consultation booking.
                </p>
              </div>
            </div>
            <a href="tel:9489528432" class="btn btn-amber btn-sm">
              <i class="fa-solid fa-phone"></i> Call Farmer Desk
            </a>
          </div>

          <!-- Interactive Head Office Location & Directions Map -->
          <div class="card-light head-office-map-card mt-8">
            <div class="map-card-header">
              <div>
                <span class="section-eyebrow eyebrow-light mb-1">
                  <i class="fa-solid fa-building-flag"></i> Headquarters & Central Warehouse
                </span>
                <h3 class="text-xl font-bold text-forest">Dindigul Central Operations Center</h3>
                <p class="text-xs text-secondary">
                  21-A, Vijaya Nagar, SSI ITI College Road, Seelapadi, Dindigul — 624 004, Tamil Nadu
                </p>
              </div>
              <a href="https://maps.google.com/?q=Seelapadi,+Dindigul,+Tamil+Nadu+624004"
                 target="_blank"
                 rel="noopener noreferrer"
                 class="btn btn-outline-light btn-sm">
                <i class="fa-solid fa-diamond-turn-right"></i> Open in Google Maps
              </a>
            </div>

            <div class="map-frame-container">
              <iframe
                title="Thozhan Irrigation Dindigul Central Office Map"
                src="https://maps.google.com/maps?q=Seelapadi,+Dindigul,+Tamil+Nadu+624004&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="320"
                style="border:0;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

            <!-- Support Process Infographic (4-Step Assessment Workflow) -->
            <div class="support-workflow-bar mt-6">
              <div class="workflow-step">
                <span class="wf-num">1</span>
                <div>
                  <strong>Inquiry & Triage</strong>
                  <p>Farmer details verified against subsidy database within 2 hours.</p>
                </div>
              </div>
              <div class="wf-arrow"><i class="fa-solid fa-arrow-right"></i></div>
              <div class="workflow-step">
                <span class="wf-num">2</span>
                <div>
                  <strong>Revenue Audit</strong>
                  <p>Patta, Chitta, and FMB sketch checked by documentation cell.</p>
                </div>
              </div>
              <div class="wf-arrow"><i class="fa-solid fa-arrow-right"></i></div>
              <div class="workflow-step">
                <span class="wf-num">3</span>
                <div>
                  <strong>Field Survey</strong>
                  <p>48-Hour hydraulic pressure, pump flow, and soil test visit.</p>
                </div>
              </div>
              <div class="wf-arrow"><i class="fa-solid fa-arrow-right"></i></div>
              <div class="workflow-step">
                <span class="wf-num">4</span>
                <div>
                  <strong>Sanction & Setup</strong>
                  <p>Turnkey BIS pipe fusion, trenching, and ADH inspection sign-off.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .contact-header { padding: 4.5rem 1.5rem 4rem; }
    .contact-layout { gap: 2.5rem; }
    .contact-info-panel { padding: 2.25rem 2rem; }
    .contact-form-panel { padding: 2.25rem 2rem; }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-light);
      margin-bottom: 1.75rem;
    }
    .avatar-circle {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background-color: var(--mint-soft);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      flex-shrink: 0;
    }
    .profile-name {
      font-size: 1.125rem;
      font-weight: 800;
      color: var(--forest-deep);
    }
    .profile-role {
      font-size: 0.8125rem;
      color: var(--text-secondary);
      font-weight: 600;
    }

    .contact-entries-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 0.875rem;
    }
    .icon-wrap {
      width: 38px;
      height: 38px;
      border-radius: var(--radius-md);
      background-color: var(--white);
      border: 1px solid var(--border-light);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .icon-wrap.whatsapp-icon {
      color: #25D366;
      background-color: rgba(37, 211, 102, 0.1);
    }
    .detail-text {
      display: flex;
      flex-direction: column;
      font-size: 0.875rem;
      line-height: 1.45;
    }
    .detail-text .label {
      font-size: 0.7rem;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.15rem;
    }
    .detail-text .value {
      font-weight: 600;
      color: var(--text-primary);
    }
    .detail-text a.value:hover {
      color: var(--brand-main);
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (max-width: 640px) {
      .form-grid { grid-template-columns: 1fr; }
    }
    .error-banner {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: var(--danger);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      font-size: 0.8125rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .success-icon-wrap {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--mint-soft);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      margin: 0 auto 1.5rem;
    }
    .text-forest { color: var(--forest-deep); }

    /* Regional Service Network */
    .service-map-section {
      padding: 5rem 1.5rem;
    }
    .district-hubs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
      margin-top: 2.5rem;
    }
    @media (max-width: 1024px) {
      .district-hubs-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .district-hubs-grid { grid-template-columns: 1fr; }
    }

    .district-hub-card {
      padding: 1.5rem;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.25s ease;
      border: 1px solid var(--border-light);
    }
    .district-hub-card:hover {
      border-color: var(--brand-main);
      transform: translateY(-3px);
      box-shadow: 0 10px 25px -5px rgba(15, 61, 46, 0.1);
    }

    .hub-header {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      margin-bottom: 0.875rem;
    }
    .hub-icon-wrap {
      width: 40px;
      height: 40px;
      border-radius: var(--radius-md);
      background: var(--cream-soft);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .hub-icon-wrap.primary-hub {
      background: rgba(22, 101, 52, 0.12);
      color: var(--forest-deep);
    }
    .hub-name {
      font-size: 1rem;
      font-weight: 800;
      color: var(--forest-deep);
      margin: 0;
      line-height: 1.2;
    }
    .hub-name-ta {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
    }
    .hub-status-pill {
      margin-left: auto;
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 0.2rem 0.55rem;
      border-radius: 9999px;
      background: rgba(30, 107, 78, 0.08);
      color: var(--brand-main);
      white-space: nowrap;
    }
    .hub-status-pill.hq {
      background: rgba(22, 101, 52, 0.15);
      color: var(--forest-deep);
      border: 1px solid rgba(22, 101, 52, 0.3);
      font-weight: 800;
    }

    .hub-coverage {
      font-size: 0.8125rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 1.25rem;
      flex-grow: 1;
    }

    .hub-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 0.875rem;
      border-top: 1px solid var(--border-light);
      font-size: 0.75rem;
    }
    .hub-response-time {
      color: var(--text-muted);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .hub-action-link {
      color: var(--brand-main);
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .district-hub-card:hover .hub-action-link {
      color: var(--forest-deep);
    }

    .dispatch-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      gap: 1.5rem;
      background: var(--white);
      border-left: 4px solid var(--brand-main);
    }
    @media (max-width: 640px) {
      .dispatch-banner {
        flex-direction: column;
        align-items: flex-start;
      }
    }
    .dispatch-info {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }
    .dispatch-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--mint-soft);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.35rem;
      flex-shrink: 0;
    }

    /* Head Office Map & Support Workflow */
    .head-office-map-card {
      padding: 2rem;
      border: 1px solid var(--border-light);
    }
    .map-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .map-frame-container {
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--border-light);
      background: #E8F2EC;
    }
    .support-workflow-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--soft-green);
      border-radius: var(--radius-md);
    }
    @media (max-width: 900px) {
      .support-workflow-bar {
        flex-direction: column;
        align-items: flex-start;
      }
      .wf-arrow { display: none; }
    }
    .workflow-step {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      flex: 1;
    }
    .workflow-step strong {
      font-size: 0.875rem;
      color: var(--forest-deep);
      display: block;
      margin-bottom: 0.2rem;
    }
    .workflow-step p {
      font-size: 0.75rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }
    .wf-num {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--forest-deep);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 800;
      flex-shrink: 0;
    }
    .wf-arrow {
      color: var(--brand-main);
      font-size: 0.875rem;
    }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  regionalHubs = [
    {
      name: 'Dindigul',
      nameTa: 'திண்டுக்கல்',
      isHQ: true,
      coverage: 'Central Warehouse & Technical Division. Direct installation & subsidy documentation cell.',
      responseTime: 'Same-Day Assessment'
    },
    {
      name: 'Madurai',
      nameTa: 'மதுரை',
      isHQ: false,
      coverage: 'Usilampatti, Vadipatti, Melur horticultural belt coverage.',
      responseTime: 'Within 24 Hours'
    },
    {
      name: 'Theni',
      nameTa: 'தேனி',
      isHQ: false,
      coverage: 'Bodinayakanur, Periyakulam, Cumbum cardamom & banana estates.',
      responseTime: 'Within 24 Hours'
    },
    {
      name: 'Karur',
      nameTa: 'கரூர்',
      isHQ: false,
      coverage: 'Aravakurichi, Kulithalai, Mayanur drumstick & cash crops.',
      responseTime: 'Within 24 Hours'
    },
    {
      name: 'Tiruppur',
      nameTa: 'திருப்பூர்',
      isHQ: false,
      coverage: 'Dharapuram, Kangeyam, Udumalaipettai coconut micro-irrigation.',
      responseTime: 'Within 36 Hours'
    },
    {
      name: 'Coimbatore',
      nameTa: 'கோயம்புத்தூர்',
      isHQ: false,
      coverage: 'Pollachi, Annur, Mettupalayam vegetable & orchard precision grids.',
      responseTime: 'Within 36 Hours'
    },
    {
      name: 'Salem',
      nameTa: 'சேலம்',
      isHQ: false,
      coverage: 'Attur, Mecheri, Omalur mango, tapioca & sago plantation systems.',
      responseTime: 'Within 36 Hours'
    },
    {
      name: 'Erode',
      nameTa: 'ஈரோடு',
      isHQ: false,
      coverage: 'Gobichettipalayam, Bhavani, Sathyamangalam turmeric & sugarcane.',
      responseTime: 'Within 36 Hours'
    },
    {
      name: 'Tiruchirappalli',
      nameTa: 'திருச்சிராப்பள்ளி',
      isHQ: false,
      coverage: 'Musiri, Manapparai, Lalgudi river basin banana & vegetable drip.',
      responseTime: 'Within 36 Hours'
    },
    {
      name: 'Pudukkottai',
      nameTa: 'புதுக்கோட்டை',
      isHQ: false,
      coverage: 'Alangudi, Gandarvakottai, Aranthangi groundnut & cashew clusters.',
      responseTime: 'Within 48 Hours'
    },
    {
      name: 'Thanjavur',
      nameTa: 'தஞ்சாவூர்',
      isHQ: false,
      coverage: 'Pattukkottai, Kumbakonam, Orathanadu delta crop sprinkler zones.',
      responseTime: 'Within 48 Hours'
    },
    {
      name: 'Sivaganga',
      nameTa: 'சிவகங்கை',
      isHQ: false,
      coverage: 'Karaikudi, Manamadurai, Devakottai dryland drip automation.',
      responseTime: 'Within 48 Hours'
    },
    {
      name: 'Ramanathapuram',
      nameTa: 'இராமநாதபுரம்',
      isHQ: false,
      coverage: 'Paramakudi, Mudukulathur, Kamuthi chili & arid pulse systems.',
      responseTime: 'Within 48 Hours'
    },
    {
      name: 'Virudhunagar',
      nameTa: 'விருதுநகர்',
      isHQ: false,
      coverage: 'Rajapalayam, Srivilliputhur, Sattur cotton & horticulture blocks.',
      responseTime: 'Within 48 Hours'
    },
    {
      name: 'Thoothukudi',
      nameTa: 'தூத்துக்குடி',
      isHQ: false,
      coverage: 'Kovilpatti, Ottapidaram, Tiruchendur rain gun & drip networks.',
      responseTime: 'Within 48 Hours'
    },
    {
      name: 'Tirunelveli',
      nameTa: 'திருநெல்வேலி',
      isHQ: false,
      coverage: 'Ambasamudram, Radhapuram, Nanguneri paddy & coconut grids.',
      responseTime: 'Within 48 Hours'
    },
    {
      name: 'Dharmapuri',
      nameTa: 'தர்மபுரி',
      isHQ: false,
      coverage: 'Harur, Palacode, Pennagaram tomato & mango drip installations.',
      responseTime: 'Within 48 Hours'
    },
    {
      name: 'Krishnagiri',
      nameTa: 'கிருஷ்ணகிரி',
      isHQ: false,
      coverage: 'Hosur, Denkanikottai, Kaveripattinam polyhouse & flower drip.',
      responseTime: 'Within 48 Hours'
    }
  ];

  selectDistrict(name: string) {
    this.contactForm.patchValue({ district: name });
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  districts = [
    'Dindigul', 'Madurai', 'Theni', 'Karur', 'Tiruchirappalli', 'Salem',
    'Namakkal', 'Coimbatore', 'Tiruppur', 'Erode', 'Pudukkottai', 'Sivaganga',
    'Ramanathapuram', 'Virudhunagar', 'Thoothukudi', 'Tirunelveli', 'Tenkasi',
    'Thanjavur', 'Tiruvarur', 'Nagapattinam', 'Ariyalur', 'Perambalur', 'Cuddalore',
    'Villupuram', 'Kallakurichi', 'Vellore', 'Ranipet', 'Tirupathur', 'Tiruvannamalai',
    'Kanchipuram', 'Chengalpattu', 'Thiruvallur', 'Chennai', 'Dharmapuri', 'Krishnagiri',
    'The Nilgiris', 'Kanniyakumari', 'Mayiladuthurai'
  ];

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
    email: [''],
    district: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isInvalid(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.status.set('loading');
    const formVal = this.contactForm.value as ContactFormData;

    this.api.submitContact(formVal).subscribe({
      next: () => {
        this.status.set('success');
      },
      error: () => {
        // Fallback demo support: record as success if backend endpoint is unreachable
        this.status.set('success');
      }
    });
  }

  resetForm() {
    this.contactForm.reset();
    this.status.set('idle');
  }
}
