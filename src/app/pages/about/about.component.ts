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

      <!-- Milestone Stats Strip (Visual Data Cards) -->
      <section class="milestone-stats-section">
        <div class="container-wide">
          <div class="grid-4 milestone-grid">
            <div class="card-light milestone-card">
              <div class="milestone-icon"><i class="fa-solid fa-seedling"></i></div>
              <div class="milestone-num">1,200+</div>
              <div class="milestone-lbl">Farms Irrigated Across TN</div>
            </div>
            <div class="card-light milestone-card">
              <div class="milestone-icon"><i class="fa-solid fa-users"></i></div>
              <div class="milestone-num">850+</div>
              <div class="milestone-lbl">Satisfied Farming Families</div>
            </div>
            <div class="card-light milestone-card">
              <div class="milestone-icon"><i class="fa-solid fa-map-location-dot"></i></div>
              <div class="milestone-num">18</div>
              <div class="milestone-lbl">Districts Supported Daily</div>
            </div>
            <div class="card-light milestone-card">
              <div class="milestone-icon"><i class="fa-solid fa-award"></i></div>
              <div class="milestone-num">14+</div>
              <div class="milestone-lbl">Years Field Engineering</div>
            </div>
          </div>
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

      <!-- Organizational Capabilities Infographic -->
      <section class="section section-soft">
        <div class="container-wide">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-gears"></i> Operational Infrastructure
            </span>
            <h2 class="section-title">Technical Capabilities & Facilities</h2>
            <p class="section-subtitle">
              End-to-end execution infrastructure spanning CAD hydraulic planning to heavy on-field trenching and government liaison.
            </p>
          </div>

          <div class="grid-4 capabilities-grid">
            <div class="card-light capability-card hover-lift">
              <div class="cap-num">01</div>
              <div class="cap-icon-box"><i class="fa-solid fa-compass-drafting"></i></div>
              <h3 class="cap-title">CAD Hydraulic Planning</h3>
              <p class="cap-desc">Computer-aided friction loss mapping and emitter pressure calculations tailored to individual land contours.</p>
            </div>

            <div class="card-light capability-card hover-lift">
              <div class="cap-num">02</div>
              <div class="cap-icon-box"><i class="fa-solid fa-microscope"></i></div>
              <h3 class="cap-title">Water & Soil Quality Testing</h3>
              <p class="cap-desc">On-site portable EC, pH, and sediment analysis to determine exact disc mesh requirements and avoid dripper clogging.</p>
            </div>

            <div class="card-light capability-card hover-lift">
              <div class="cap-num">03</div>
              <div class="cap-icon-box"><i class="fa-solid fa-truck-pickup"></i></div>
              <h3 class="cap-title">Field Logistics & Tooling</h3>
              <p class="cap-desc">Dedicated field service vehicles equipped with electrofusion pipe welders, laser levels, and trenching equipment.</p>
            </div>

            <div class="card-light capability-card hover-lift">
              <div class="cap-num">04</div>
              <div class="cap-icon-box"><i class="fa-solid fa-file-circle-check"></i></div>
              <h3 class="cap-title">ADH Liaison Documentation</h3>
              <p class="cap-desc">Full coordination with Assistant Director of Horticulture offices for Patta checks, inspection scheduling, and DBT grant clearance.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Company History Timeline -->
      <section class="section section-light">
        <div class="container-wide">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-timeline"></i> Our Evolution
            </span>
            <h2 class="section-title">Company Milestone Journey</h2>
            <p class="section-subtitle">
              Over a decade of committed grassroots service to Tamil Nadu agriculture.
            </p>
          </div>

          <div class="history-timeline">
            <div class="timeline-item">
              <div class="timeline-year">2012</div>
              <div class="timeline-dot"></div>
              <div class="timeline-content card-light">
                <h4 class="font-bold text-forest">Founded in Dindigul</h4>
                <p class="text-xs text-secondary mt-1">Established by Jayachandran as an on-field precision micro-irrigation consultancy serving vegetable and fruit growers in Seelapadi.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2015</div>
              <div class="timeline-dot"></div>
              <div class="timeline-content card-light">
                <h4 class="font-bold text-forest">First 200 Farmers Milestone</h4>
                <p class="text-xs text-secondary mt-1">Expanded field operations into Theni and Karur districts, specializing in banana and drumstick high-yield drip lateral grids.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2018</div>
              <div class="timeline-dot"></div>
              <div class="timeline-content card-light">
                <h4 class="font-bold text-forest">Govt Horticulture Dept Empanelment</h4>
                <p class="text-xs text-secondary mt-1">Accredited as an authorized installer for Central PMKSY and Tamil Nadu Micro-Irrigation Schemes with direct beneficiary linkage.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2021</div>
              <div class="timeline-dot"></div>
              <div class="timeline-content card-light">
                <h4 class="font-bold text-forest">₹5 Crore Installation Milestone</h4>
                <p class="text-xs text-secondary mt-1">Crossed ₹5 Crore in subsidized precision infrastructure, expanding coverage across 12 southern agro-climatic zones.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2024</div>
              <div class="timeline-dot"></div>
              <div class="timeline-content card-light">
                <h4 class="font-bold text-forest">Solar Pump Integration Division</h4>
                <p class="text-xs text-secondary mt-1">Launched solar agricultural pumping solutions under PM-KUSUM, providing off-grid daylight drip irrigation to dryland farmers.</p>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-year">2026</div>
              <div class="timeline-dot current"></div>
              <div class="timeline-content card-light featured-step">
                <h4 class="font-bold text-forest">1,200+ Farmers & 18 Districts</h4>
                <p class="text-xs text-secondary mt-1">Now operating across 18 districts with a 48-hour field assessment guarantee and 100% subsidy documentation clearance rate.</p>
              </div>
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

    /* Milestone Stats Strip */
    .milestone-stats-section {
      background: var(--forest-deep);
      padding: 2.5rem 1.5rem;
      margin-top: -2rem;
      position: relative;
      z-index: 10;
    }
    .milestone-grid {
      gap: 1.5rem;
    }
    .milestone-card {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(8px);
      padding: 1.5rem;
      text-align: center;
      color: #FFFFFF;
      border-radius: var(--radius-md);
    }
    .milestone-icon {
      font-size: 1.5rem;
      color: var(--golden-yellow);
      margin-bottom: 0.5rem;
    }
    .milestone-num {
      font-size: 2rem;
      font-weight: 800;
      color: #FFFFFF;
      line-height: 1.2;
    }
    .milestone-lbl {
      font-size: 0.8125rem;
      color: rgba(255, 255, 255, 0.75);
      margin-top: 0.25rem;
    }

    /* Capabilities Infographic Grid */
    .capabilities-grid {
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .capability-card {
      padding: 1.75rem 1.5rem;
      position: relative;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-light);
    }
    .cap-num {
      position: absolute;
      top: 1rem;
      right: 1.25rem;
      font-size: 1.75rem;
      font-weight: 900;
      color: rgba(30, 70, 32, 0.1);
    }
    .cap-icon-box {
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      background: var(--soft-green);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .cap-title {
      font-size: 1rem;
      font-weight: 800;
      color: var(--forest-deep);
      margin-bottom: 0.5rem;
    }
    .cap-desc {
      font-size: 0.8125rem;
      color: var(--text-secondary);
      line-height: 1.55;
    }

    /* History Timeline */
    .history-timeline {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-width: 800px;
      margin: 1.5rem auto 0;
      position: relative;
    }
    .history-timeline::before {
      content: '';
      position: absolute;
      left: 70px;
      top: 10px;
      bottom: 10px;
      width: 2px;
      background: var(--border-light);
    }
    .timeline-item {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      position: relative;
    }
    .timeline-year {
      width: 55px;
      font-size: 0.9375rem;
      font-weight: 800;
      color: var(--brand-main);
      text-align: right;
      flex-shrink: 0;
      padding-top: 0.75rem;
    }
    .timeline-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--white);
      border: 3px solid var(--brand-main);
      flex-shrink: 0;
      margin-top: 0.95rem;
      z-index: 2;
    }
    .timeline-dot.current {
      background: var(--golden-yellow);
      border-color: var(--brand-main);
      box-shadow: 0 0 0 4px rgba(255, 204, 0, 0.3);
    }
    .timeline-content {
      flex: 1;
      padding: 1.25rem 1.5rem;
      border: 1px solid var(--border-light);
    }
    .timeline-content.featured-step {
      border-left: 4px solid var(--brand-main);
      background: #FAFCFA;
    }
    @media (max-width: 640px) {
      .history-timeline::before { left: 55px; }
      .timeline-year { width: 45px; font-size: 0.8125rem; }
    }
  `]
})
export class AboutComponent {}
