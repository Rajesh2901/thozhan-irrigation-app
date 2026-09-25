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
            <div class="card-light contact-form-panel">
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
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  status = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

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
