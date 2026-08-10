import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-content px-6 py-12 max-w-7xl mx-auto animate-fade">
      
      <!-- Section Header -->
      <div class="section-header text-center mb-16">
        <div class="badge badge-brand mb-4 d-inline-block">About Us / எங்களைப் பற்றி</div>
        <h1 class="text-4xl font-bold mb-6">Empowering Tamil Nadu Farmers Since 2012</h1>
        <p class="text-xl text-muted max-w-3xl mx-auto">
          Thozhan Irrigation has been at the forefront of agricultural transformation, bringing advanced water-saving technologies directly to the fields of hardworking farmers across Tamil Nadu.
        </p>
      </div>

      <!-- Mission/Vision Grid -->
      <div class="grid-2 mb-16">
        <div class="glass-card mission-card hover-lift p-8 relative">
          <div class="d-flex align-items-start gap-4">
            <div class="icon-wrap bg-brand-900 rounded-circle p-4 flex-shrink-0">
              <i class="fa-solid fa-bullseye fa-2x text-brand-400"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold mb-3 text-brand-300">Our Mission</h2>
              <p class="text-muted leading-relaxed">
                To provide affordable, high-quality micro-irrigation systems to every farmer in Tamil Nadu, maximizing their yield while minimizing water usage, and ensuring seamless access to government subsidies.
              </p>
            </div>
          </div>
        </div>
        
        <div class="glass-card vision-card hover-lift p-8 relative">
          <div class="d-flex align-items-start gap-4">
            <div class="icon-wrap bg-brand-900 rounded-circle p-4 flex-shrink-0">
              <i class="fa-solid fa-eye fa-2x text-brand-400"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold mb-3 text-brand-300">Our Vision</h2>
              <p class="text-muted leading-relaxed">
                To create a drought-resilient agricultural ecosystem in South India where technology and tradition work hand in hand for sustainable and prosperous farming communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Core Values -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
        <div class="grid-4">
          <div class="glass-card-sm hover-lift text-center p-6">
            <i class="fa-solid fa-handshake fa-2x text-brand-400 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">Integrity</h3>
            <p class="text-sm text-muted">Transparent pricing and honest guidance in all our dealings.</p>
          </div>
          <div class="glass-card-sm hover-lift text-center p-6">
            <i class="fa-solid fa-seedling fa-2x text-brand-400 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">Sustainability</h3>
            <p class="text-sm text-muted">Promoting water conservation and eco-friendly farming practices.</p>
          </div>
          <div class="glass-card-sm hover-lift text-center p-6">
            <i class="fa-solid fa-award fa-2x text-brand-400 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">Quality</h3>
            <p class="text-sm text-muted">Supplying only ISI certified, durable irrigation components.</p>
          </div>
          <div class="glass-card-sm hover-lift text-center p-6">
            <i class="fa-solid fa-phone-volume fa-2x text-brand-400 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">After-Sales</h3>
            <p class="text-sm text-muted">Prompt service and maintenance support when you need it most.</p>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
        <div class="grid-3">
          <div class="glass-card team-card-brand text-center p-8 hover-lift">
            <div class="team-icon-wrap mb-4 mx-auto bg-brand-900 rounded-circle d-flex align-items-center justify-content-center">
              <i class="fa-solid fa-user-tie fa-3x text-brand-400"></i>
            </div>
            <h3 class="text-xl font-bold mb-1">Jayachandran</h3>
            <p class="text-brand-400 mb-3 text-sm">Founder & Managing Director</p>
            <p class="text-muted text-sm">With over 15 years in agriculture tech, leading the vision to modernize TN farming.</p>
          </div>
          
          <div class="glass-card team-card-amber text-center p-8 hover-lift">
            <div class="team-icon-wrap mb-4 mx-auto bg-amber-900 rounded-circle d-flex align-items-center justify-content-center">
              <i class="fa-solid fa-hard-hat fa-3x text-amber-400"></i>
            </div>
            <h3 class="text-xl font-bold mb-1">Field Installation Team</h3>
            <p class="text-amber-400 mb-3 text-sm">Expert Technicians</p>
            <p class="text-muted text-sm">Skilled engineers and technicians ensuring perfect system setup in your fields.</p>
          </div>
          
          <div class="glass-card team-card-sky text-center p-8 hover-lift">
            <div class="team-icon-wrap mb-4 mx-auto bg-sky-900 rounded-circle d-flex align-items-center justify-content-center">
              <i class="fa-solid fa-file-signature fa-3x text-sky-400"></i>
            </div>
            <h3 class="text-xl font-bold mb-1">Subsidy Documentation Cell</h3>
            <p class="text-sky-400 mb-3 text-sm">Administrative Support</p>
            <p class="text-muted text-sm">Dedicated staff navigating government paperwork to secure your subsidies quickly.</p>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div class="glass-card p-8 mb-16">
        <h2 class="text-2xl font-bold mb-6 text-center border-b border-gray-800 pb-4">Our Credentials & Certifications</h2>
        <div class="d-flex flex-wrap gap-4 justify-content-center">
          <div class="certification-item bg-secondary px-4 py-3 rounded d-flex align-items-center gap-3">
            <i class="fa-solid fa-circle-check text-brand-500 fa-lg"></i>
            <span class="font-medium">TN Horticulture Dept Authorized</span>
          </div>
          <div class="certification-item bg-secondary px-4 py-3 rounded d-flex align-items-center gap-3">
            <i class="fa-solid fa-circle-check text-brand-500 fa-lg"></i>
            <span class="font-medium">PMKSY Registered</span>
          </div>
          <div class="certification-item bg-secondary px-4 py-3 rounded d-flex align-items-center gap-3">
            <i class="fa-solid fa-circle-check text-brand-500 fa-lg"></i>
            <span class="font-medium">NABARD Empaneled</span>
          </div>
          <div class="certification-item bg-secondary px-4 py-3 rounded d-flex align-items-center gap-3">
            <i class="fa-solid fa-circle-check text-brand-500 fa-lg"></i>
            <span class="font-medium">GSTIN: 33BSXPJ5723P1ZX</span>
          </div>
          <div class="certification-item bg-secondary px-4 py-3 rounded d-flex align-items-center gap-3">
            <i class="fa-solid fa-circle-check text-brand-500 fa-lg"></i>
            <span class="font-medium">ISO 9001 Compliant</span>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="glass-card text-center p-12 bg-gradient-brand">
        <h2 class="text-3xl font-bold mb-4">Want to learn more about our services?</h2>
        <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Get in touch with our team today to discuss how we can help improve your farm's irrigation infrastructure.</p>
        <a routerLink="/contact" class="btn btn-primary btn-lg hover-lift">
          Contact Us Now <i class="fa-solid fa-arrow-right ms-2"></i>
        </a>
      </div>

    </div>
  `,
  styles: [`
    .mission-card, .vision-card {
      border-left: 4px solid var(--brand-500);
      overflow: hidden;
    }
    
    .mission-card::before, .vision-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, rgba(34, 197, 94, 0.05) 0%, transparent 100%);
      pointer-events: none;
      z-index: 0;
    }

    .vision-card {
      border-left-color: var(--gold, #fbbf24);
    }
    
    .vision-card::before {
      background: linear-gradient(90deg, rgba(251, 191, 36, 0.05) 0%, transparent 100%);
    }

    .mission-card > *, .vision-card > * {
      position: relative;
      z-index: 1;
    }

    .team-icon-wrap {
      width: 80px;
      height: 80px;
    }
    
    .bg-amber-900 { background-color: rgba(245, 158, 11, 0.1); }
    .text-amber-400 { color: #fbbf24; }
    
    .bg-sky-900 { background-color: rgba(14, 165, 233, 0.1); }
    .text-sky-400 { color: #38bdf8; }

    .team-card-brand { border-top: 3px solid var(--brand-500); }
    .team-card-amber { border-top: 3px solid #fbbf24; }
    .team-card-sky { border-top: 3px solid #38bdf8; }

    .border-gray-800 { border-color: rgba(255, 255, 255, 0.1); }

    .certification-item {
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.2s ease;
    }
    
    .certification-item:hover {
      border-color: var(--brand-500);
      background-color: rgba(34, 197, 94, 0.05);
    }

    .bg-gradient-brand {
      background: linear-gradient(135deg, rgba(3, 23, 14, 0.9) 0%, rgba(4, 31, 20, 0.9) 100%);
      border: 1px solid rgba(34, 197, 94, 0.2);
    }

    /* Additional Utility Classes if needed locally */
    .font-medium { font-weight: 500; }
    .leading-relaxed { line-height: 1.625; }

    /* Responsive */
    @media (max-width: 768px) {
      .page-content { padding-top: 2rem; padding-bottom: 2rem; }
      .certification-item { width: 100%; justify-content: center; }
    }
  `]
})
export class AboutComponent implements OnInit {
  ngOnInit(): void {
    // Component initialized
  }
}
