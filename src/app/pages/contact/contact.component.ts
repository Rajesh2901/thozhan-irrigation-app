import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { ContactFormData } from '../../core/models/interfaces';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page-content">
      <div class="hero-section text-center" style="margin-bottom: 3rem;">
        <h1 class="hero-title">Get in Touch</h1>
        <p class="hero-subtitle">Have a question about irrigation? Need help with subsidies? We're here for you.</p>
      </div>

      <div class="grid-2 contact-layout">
        <!-- Contact Info Panel -->
        <div class="glass-card contact-info-panel">
          <div class="profile-header">
            <div class="avatar-circle">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <div>
              <h2 style="margin: 0; color: white;">Jayachandran</h2>
              <p style="color: var(--brand-400); margin: 0; font-weight: 500;">Irrigation Consultant & Founder</p>
            </div>
          </div>

          <div class="contact-details">
            <div class="contact-item">
              <div class="icon-wrap"><i class="fa-solid fa-phone"></i></div>
              <div class="detail-text">
                <span class="label">Phone</span>
                <span class="value">+91 98765 43210</span>
              </div>
            </div>
            <div class="contact-item">
              <div class="icon-wrap whatsapp-icon"><i class="fa-brands fa-whatsapp"></i></div>
              <div class="detail-text">
                <span class="label">WhatsApp</span>
                <span class="value">+91 98765 43210</span>
              </div>
            </div>
            <div class="contact-item">
              <div class="icon-wrap"><i class="fa-solid fa-envelope"></i></div>
              <div class="detail-text">
                <span class="label">Email</span>
                <span class="value">info&#64;thozhanirrigation.com</span>
              </div>
            </div>
            <div class="contact-item">
              <div class="icon-wrap"><i class="fa-solid fa-location-dot"></i></div>
              <div class="detail-text">
                <span class="label">Address</span>
                <span class="value">123, Farming Street,<br>Coimbatore, Tamil Nadu 641001</span>
              </div>
            </div>
            <div class="contact-item">
              <div class="icon-wrap"><i class="fa-solid fa-file-invoice-dollar"></i></div>
              <div class="detail-text">
                <span class="label">GSTIN</span>
                <span class="value">33ABCDE1234F1Z5</span>
              </div>
            </div>
            <div class="contact-item">
              <div class="icon-wrap"><i class="fa-solid fa-clock"></i></div>
              <div class="detail-text">
                <span class="label">Business Hours</span>
                <span class="value">Mon-Sat: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          <button class="btn btn-whatsapp btn-full" style="margin-top: 2rem;">
            <i class="fa-brands fa-whatsapp"></i> Message on WhatsApp directly
          </button>
        </div>

        <!-- Contact Form Panel -->
        <div class="glass-card contact-form-panel">
          @if (status() === 'success') {
            <div class="success-panel text-center animate-fade">
              <div class="success-icon-wrap">
                <i class="fa-solid fa-check-circle"></i>
              </div>
              <h2 style="color: var(--brand-400);">Message Sent!</h2>
              <p>Thank you for reaching out. We have received your message and will get back to you within 24 hours.</p>
              <button class="btn btn-secondary" (click)="resetForm()" style="margin-top: 1.5rem;">
                Send Another Message
              </button>
            </div>
          } @else {
            <h2 style="margin-bottom: 1.5rem;">Send a Message</h2>
            
            @if (status() === 'error') {
              <div class="error-banner">
                <i class="fa-solid fa-triangle-exclamation"></i> There was an error sending your message. Please try again.
              </div>
            }

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <div class="form-grid">
                <div class="form-group">
                  <label>Full Name *</label>
                  <input type="text" class="form-control" formControlName="name" placeholder="John Doe">
                  @if (contactForm.get('name')?.touched && contactForm.get('name')?.invalid) {
                    <div class="form-error">Name is required (min 2 characters).</div>
                  }
                </div>
                
                <div class="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" class="form-control" formControlName="phone" placeholder="9876543210">
                  @if (contactForm.get('phone')?.touched && contactForm.get('phone')?.invalid) {
                    <div class="form-error">Valid 10-digit phone number is required.</div>
                  }
                </div>
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label>Email Address *</label>
                  <input type="email" class="form-control" formControlName="email" placeholder="john@example.com">
                  @if (contactForm.get('email')?.touched && contactForm.get('email')?.invalid) {
                    <div class="form-error">Valid email is required.</div>
                  }
                </div>

                <div class="form-group">
                  <label>District *</label>
                  <select class="form-control" formControlName="district">
                    <option value="" disabled selected>Select District</option>
                    @for (district of districts; track district) {
                      <option [value]="district">{{ district }}</option>
                    }
                  </select>
                  @if (contactForm.get('district')?.touched && contactForm.get('district')?.invalid) {
                    <div class="form-error">District selection is required.</div>
                  }
                </div>
              </div>

              <div class="form-group">
                <label>Subject *</label>
                <input type="text" class="form-control" formControlName="subject" placeholder="E.g., Subsidy details, Quote request">
                @if (contactForm.get('subject')?.touched && contactForm.get('subject')?.invalid) {
                  <div class="form-error">Subject is required.</div>
                }
              </div>

              <div class="form-group">
                <label>Message *</label>
                <textarea class="form-control" formControlName="message" rows="5" placeholder="How can we help you?"></textarea>
                @if (contactForm.get('message')?.touched && contactForm.get('message')?.invalid) {
                  <div class="form-error">Message is required (min 10 characters).</div>
                }
              </div>

              <button 
                type="submit" 
                class="btn btn-primary btn-full" 
                [disabled]="status() === 'loading'"
              >
                @if (status() === 'loading') {
                  <i class="fa-solid fa-spinner fa-spin" style="margin-right: 0.5rem;"></i> Sending...
                } @else {
                  <i class="fa-solid fa-paper-plane" style="margin-right: 0.5rem;"></i> Send Message
                }
              </button>
            </form>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-layout {
      gap: 2rem;
      align-items: start;
    }
    
    @media (min-width: 992px) {
      .contact-layout {
        grid-template-columns: 1fr 1.5fr;
      }
    }

    .contact-info-panel {
      background: linear-gradient(145deg, rgba(4, 31, 20, 0.9) 0%, rgba(3, 23, 14, 0.95) 100%);
      border: 1px solid rgba(34, 197, 94, 0.15);
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 1.5rem;
    }

    .avatar-circle {
      width: 64px;
      height: 64px;
      background: rgba(34, 197, 94, 0.2);
      border: 2px solid var(--brand-500);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      color: var(--brand-400);
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .contact-item {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
    }

    .icon-wrap {
      width: 36px;
      height: 36px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
      flex-shrink: 0;
    }

    .icon-wrap.whatsapp-icon {
      color: #25D366;
      background: rgba(37, 211, 102, 0.1);
    }

    .detail-text {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .detail-text .label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
    }

    .detail-text .value {
      font-weight: 500;
      color: #f8fafc;
      line-height: 1.4;
    }

    .success-panel {
      padding: 3rem 2rem;
    }

    .success-icon-wrap {
      font-size: 4rem;
      color: var(--brand-500);
      margin-bottom: 1.5rem;
    }

    .error-banner {
      background: rgba(220, 38, 38, 0.15);
      border: 1px solid rgba(220, 38, 38, 0.3);
      color: #fca5a5;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);

  status = signal<'idle'|'loading'|'success'|'error'>('idle');
  
  districts = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 
    'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 
    'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 
    'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 
    'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 
    'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 
    'Viluppuram', 'Virudhunagar'
  ];

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
    district: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.status.set('loading');
    
    const formData: ContactFormData = this.contactForm.value;
    
    this.apiService.submitContact(formData).subscribe({
      next: () => {
        this.status.set('success');
      },
      error: (err) => {
        console.error('Submission error', err);
        this.status.set('error');
      }
    });
  }

  resetForm() {
    this.status.set('idle');
    this.contactForm.reset();
    this.contactForm.get('district')?.setValue('');
  }
}
