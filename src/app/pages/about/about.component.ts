import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="about-wrapper">
      <!-- Header Banner -->
      <section class="section section-dark text-center about-header">
        <div class="container-narrow">
          <span class="section-eyebrow eyebrow-dark">
            <i class="fa-solid fa-seedling"></i> About Thozhan Irrigation / எங்களைப் பற்றி
          </span>
          <h1 class="section-title">Empowering Tamil Nadu Farmers Since 2012</h1>
          <p class="section-subtitle">
            Founded in Dindigul, Thozhan Irrigation has spent over a decade delivering dependable micro-irrigation systems, government subsidy guidance, and dedicated on-field support to farming families.
          </p>
        </div>
      </section>

      <!-- Mission & Vision (Light Section) -->
      <section class="section section-light">
        <div class="container-wide">
          <div class="grid-2 mission-vision-grid">
            <div class="card-cream p-8">
              <div class="flex items-center gap-4 mb-4">
                <div class="icon-box-mint">
                  <i class="fa-solid fa-bullseye"></i>
                </div>
                <h2 class="text-xl font-bold text-forest">Our Mission</h2>
              </div>
              <p class="text-secondary leading-relaxed">
                To make efficient, water-saving micro-irrigation accessible to every small, marginal, and commercial farmer across Tamil Nadu. We bridge the gap between technical engineering and government subsidy assistance to secure higher yields with lower water consumption.
              </p>
            </div>

            <div class="card-cream p-8">
              <div class="flex items-center gap-4 mb-4">
                <div class="icon-box-mint">
                  <i class="fa-solid fa-eye"></i>
                </div>
                <h2 class="text-xl font-bold text-forest">Our Vision</h2>
              </div>
              <p class="text-secondary leading-relaxed">
                To build a drought-resilient agricultural ecosystem in South India where every drop of irrigation water is utilized to its highest potential through precision technology, honest guidance, and generational farmer trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Core Values (Warm Cream Section) -->
      <section class="section section-cream">
        <div class="container-wide">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-handshake"></i> Our Guiding Principles
            </span>
            <h2 class="section-title">Core Values That Drive Us</h2>
            <p class="section-subtitle">
              We operate on transparency, reliable engineering standards, and long-term farmer relationships.
            </p>
          </div>

          <div class="grid-4 values-grid">
            <div class="card-light text-center p-6 hover-lift">
              <div class="value-icon"><i class="fa-solid fa-handshake-simple"></i></div>
              <h3 class="text-base font-bold mb-2">Integrity & Transparency</h3>
              <p class="text-xs text-secondary">Honest subsidy calculations with no hidden fees or false promises.</p>
            </div>

            <div class="card-light text-center p-6 hover-lift">
              <div class="value-icon"><i class="fa-solid fa-leaf"></i></div>
              <h3 class="text-base font-bold mb-2">Water Stewardship</h3>
              <p class="text-xs text-secondary">Conserving groundwater reserves while optimizing crop moisture.</p>
            </div>

            <div class="card-light text-center p-6 hover-lift">
              <div class="value-icon"><i class="fa-solid fa-award"></i></div>
              <h3 class="text-base font-bold mb-2">BIS-Grade Quality</h3>
              <p class="text-xs text-secondary">Supplying only tested, UV-resistant, and clog-protected components.</p>
            </div>

            <div class="card-light text-center p-6 hover-lift">
              <div class="value-icon"><i class="fa-solid fa-phone-volume"></i></div>
              <h3 class="text-base font-bold mb-2">Responsive Support</h3>
              <p class="text-xs text-secondary">Quick field visits and routine maintenance guidance after setup.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Leadership & Team (Light Section) -->
      <section class="section section-light">
        <div class="container-wide">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-users"></i> Experienced Agricultural Team
            </span>
            <h2 class="section-title">Leadership & Field Technicians</h2>
            <p class="section-subtitle">
              Combining practical farming wisdom with precision agricultural engineering.
            </p>
          </div>

          <div class="grid-3 team-grid">
            <div class="card-light team-card text-center p-8 hover-lift">
              <div class="team-avatar-box mx-auto mb-4">
                <i class="fa-solid fa-user-tie"></i>
              </div>
              <h3 class="text-lg font-bold">ஜெயசந்திரன் (Jayachandran)</h3>
              <span class="team-role text-brand">Founder & Managing Director</span>
              <p class="text-xs text-secondary mt-3">
                Over 15 years of grassroots agricultural technology and micro-irrigation layout expertise across Dindigul, Madurai, and central Tamil Nadu.
              </p>
            </div>

            <div class="card-light team-card text-center p-8 hover-lift">
              <div class="team-avatar-box mx-auto mb-4">
                <i class="fa-solid fa-wrench"></i>
              </div>
              <h3 class="text-lg font-bold">Field Engineering Team</h3>
              <span class="team-role text-brand">Certified Installation Mechanics</span>
              <p class="text-xs text-secondary mt-3">
                Skilled field technicians ensuring proper trenching, lateral alignment, pressure testing, and filter calibrations on your land.
              </p>
            </div>

            <div class="card-light team-card text-center p-8 hover-lift">
              <div class="team-avatar-box mx-auto mb-4">
                <i class="fa-solid fa-file-signature"></i>
              </div>
              <h3 class="text-lg font-bold">Subsidy Documentation Cell</h3>
              <span class="team-role text-brand">Horticulture Liaison Specialists</span>
              <p class="text-xs text-secondary mt-3">
                Dedicated documentation team coordinating revenue records, Patta verifications, and direct liaison with district ADH offices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Certifications & Credentials -->
      <section class="section section-cream">
        <div class="container-narrow text-center">
          <span class="section-eyebrow eyebrow-light">
            <i class="fa-solid fa-stamp"></i> Official Empanelment
          </span>
          <h2 class="section-title">Government Recognitions & Empanelment</h2>
          <div class="grid-2 cert-grid mt-6">
            <div class="card-light cert-item">
              <i class="fa-solid fa-circle-check text-brand"></i>
              <div>
                <strong>TN Horticulture Dept Authorized</strong>
                <p class="text-xs text-secondary">Authorized supplier and installer for state micro-irrigation schemes.</p>
              </div>
            </div>
            <div class="card-light cert-item">
              <i class="fa-solid fa-circle-check text-brand"></i>
              <div>
                <strong>PMKSY Registered Vendor</strong>
                <p class="text-xs text-secondary">Direct beneficiary linkage for 100% and 75% central subsidy grants.</p>
              </div>
            </div>
            <div class="card-light cert-item">
              <i class="fa-solid fa-circle-check text-brand"></i>
              <div>
                <strong>Registered GST Entity</strong>
                <p class="text-xs text-secondary">GSTIN: 33BSXPJ5723P1ZX · Compliant billing and verifiable records.</p>
              </div>
            </div>
            <div class="card-light cert-item">
              <i class="fa-solid fa-circle-check text-brand"></i>
              <div>
                <strong>BIS Certified Materials</strong>
                <p class="text-xs text-secondary">Pipes, fittings, drippers, and sprinklers matching national standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom CTA Banner -->
      <section class="section section-darker text-center">
        <div class="container-narrow">
          <h2 class="section-title">Work with Tamil Nadu's Trusted Irrigation Partner</h2>
          <p class="section-subtitle mb-6">
            Get in touch today to schedule an on-field survey or consult on your subsidy documents.
          </p>
          <div class="flex-center gap-4 flex-wrap">
            <a routerLink="/contact" class="btn btn-amber btn-lg">
              <i class="fa-solid fa-calculator"></i> Request Farm Assessment
            </a>
            <a href="https://wa.me/919489528432" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
              <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .about-header { padding: 4.5rem 1.5rem 4rem; }
    .icon-box-mint {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      background-color: var(--mint-soft);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    .text-forest { color: var(--forest-deep); }
    .text-secondary { color: var(--text-secondary); }
    .text-brand { color: var(--brand-main); }
    .value-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--mint-soft);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      margin: 0 auto 1rem;
    }
    .team-avatar-box {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background-color: var(--cream-warm);
      border: 2px solid var(--mint-soft);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
    }
    .team-role {
      display: block;
      font-size: 0.8125rem;
      font-weight: 700;
      margin-top: 0.2rem;
    }
    .cert-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      text-align: left;
      padding: 1.25rem;
    }
    .cert-item i {
      font-size: 1.25rem;
      margin-top: 0.2rem;
      flex-shrink: 0;
    }
  `]
})
export class AboutComponent {}
