import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section text-center animate-fade">
        <div class="badge badge-brand mb-4 d-inline-block">
          <i class="fa-solid fa-certificate me-2"></i> TN Govt Authorized · GSTIN: 33BSXPJ5723P1ZX
        </div>
        
        <h1 class="hero-title mb-4">
          Advanced Irrigation For <span class="highlight text-gradient-green">Higher Yields</span> & <span class="highlight text-gradient-blue">Water Savings</span>
        </h1>
        
        <p class="hero-subtitle mb-8 text-muted max-w-2xl mx-auto">
          Providing high-quality micro-irrigation systems, full government subsidy assistance, and reliable after-sales service to Tamil Nadu farmers since 2012.
        </p>
        
        <div class="hero-actions d-flex flex-wrap gap-4 justify-content-center">
          <a routerLink="/pricing" class="btn btn-primary btn-lg hover-lift">
            Check My Subsidy <i class="fa-solid fa-arrow-right ms-2"></i>
          </a>
          <a routerLink="/services" class="btn btn-secondary btn-lg hover-lift">
            View Equipment <i class="fa-solid fa-arrow-right ms-2"></i>
          </a>
          <a href="tel:+919876543210" class="btn btn-gold btn-lg hover-lift">
            <i class="fa-solid fa-phone ms-2"></i> 98765 43210
          </a>
        </div>
      </section>

      <!-- Stats Strip -->
      <section class="stats-strip py-12 px-6">
        <div class="grid-4 max-w-7xl mx-auto">
          <div class="stat-card glass-card text-center hover-lift animate-fade" style="animation-delay: 0.1s;">
            <i class="fa-solid fa-droplet fa-3x mb-4 text-brand-400"></i>
            <h3 class="stat-number text-gradient-blue">1200+</h3>
            <p class="stat-label text-muted">Installations</p>
          </div>
          <div class="stat-card glass-card text-center hover-lift animate-fade" style="animation-delay: 0.2s;">
            <i class="fa-solid fa-users fa-3x mb-4 text-brand-500"></i>
            <h3 class="stat-number text-gradient-green">850+</h3>
            <p class="stat-label text-muted">Farmers Served</p>
          </div>
          <div class="stat-card glass-card text-center hover-lift animate-fade" style="animation-delay: 0.3s;">
            <i class="fa-solid fa-map-location-dot fa-3x mb-4 text-brand-600"></i>
            <h3 class="stat-number text-gradient-amber">18</h3>
            <p class="stat-label text-muted">Districts Covered</p>
          </div>
          <div class="stat-card glass-card text-center hover-lift animate-fade" style="animation-delay: 0.4s;">
            <i class="fa-solid fa-calendar-check fa-3x mb-4 text-brand-700"></i>
            <h3 class="stat-number text-gradient-gold">12</h3>
            <p class="stat-label text-muted">Years Experience</p>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="features-section py-16 px-6 bg-secondary">
        <div class="max-w-7xl mx-auto">
          <div class="section-header text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Our Irrigation Solutions</h2>
            <p class="text-muted">Customized systems tailored for your specific crop and soil requirements.</p>
          </div>
          
          <div class="grid-4 features-grid">
            <div class="glass-card-sm hover-lift text-center p-6">
              <div class="icon-wrap bg-brand-900 rounded-circle p-4 d-inline-block mb-4">
                <i class="fa-solid fa-faucet-drip fa-2x text-brand-400"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Drip Irrigation</h3>
              <p class="text-muted text-sm">Targeted root-zone watering for maximum efficiency and yield increase.</p>
            </div>
            
            <div class="glass-card-sm hover-lift text-center p-6">
              <div class="icon-wrap bg-brand-900 rounded-circle p-4 d-inline-block mb-4">
                <i class="fa-solid fa-sprinkler fa-2x text-brand-400"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Sprinkler System</h3>
              <p class="text-muted text-sm">Uniform coverage ideal for closely spaced crops and large fields.</p>
            </div>
            
            <div class="glass-card-sm hover-lift text-center p-6">
              <div class="icon-wrap bg-brand-900 rounded-circle p-4 d-inline-block mb-4">
                <i class="fa-solid fa-cloud-showers-water fa-2x text-brand-400"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Rain Gun</h3>
              <p class="text-muted text-sm">High-pressure, large-radius watering for extensive agricultural lands.</p>
            </div>
            
            <div class="glass-card-sm hover-lift text-center p-6">
              <div class="icon-wrap bg-brand-900 rounded-circle p-4 d-inline-block mb-4">
                <i class="fa-solid fa-solar-panel fa-2x text-brand-400"></i>
              </div>
              <h3 class="text-xl font-semibold mb-2">Solar Pump</h3>
              <p class="text-muted text-sm">Sustainable and cost-effective pumping solutions using solar energy.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline Section -->
      <section class="timeline-section py-16 px-6">
        <div class="max-w-4xl mx-auto">
          <div class="section-header text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Our Journey</h2>
            <p class="text-muted">Growing together with Tamil Nadu farmers</p>
          </div>
          
          <div class="glass-card p-8">
            <div class="timeline relative">
              <div class="timeline-item d-flex mb-6">
                <div class="timeline-year text-brand-400 font-bold w-24 flex-shrink-0">2012</div>
                <div class="timeline-dot relative mx-4"></div>
                <div class="timeline-content pb-4 border-b border-gray-800 flex-grow">Founded in Dindigul</div>
              </div>
              <div class="timeline-item d-flex mb-6">
                <div class="timeline-year text-brand-400 font-bold w-24 flex-shrink-0">2015</div>
                <div class="timeline-dot relative mx-4"></div>
                <div class="timeline-content pb-4 border-b border-gray-800 flex-grow">First 200 farmers successfully adopted our micro-irrigation</div>
              </div>
              <div class="timeline-item d-flex mb-6">
                <div class="timeline-year text-brand-400 font-bold w-24 flex-shrink-0">2018</div>
                <div class="timeline-dot relative mx-4"></div>
                <div class="timeline-content pb-4 border-b border-gray-800 flex-grow">TN Horticulture Dept authorized dealer status granted</div>
              </div>
              <div class="timeline-item d-flex mb-6">
                <div class="timeline-year text-brand-400 font-bold w-24 flex-shrink-0">2021</div>
                <div class="timeline-dot relative mx-4"></div>
                <div class="timeline-content pb-4 border-b border-gray-800 flex-grow">Crossed Rs 5 Crore in total installations</div>
              </div>
              <div class="timeline-item d-flex mb-6">
                <div class="timeline-year text-brand-400 font-bold w-24 flex-shrink-0">2024</div>
                <div class="timeline-dot relative mx-4"></div>
                <div class="timeline-content pb-4 border-b border-gray-800 flex-grow">Launched comprehensive Solar Pump assistance program</div>
              </div>
              <div class="timeline-item d-flex">
                <div class="timeline-year text-brand-400 font-bold w-24 flex-shrink-0">2026</div>
                <div class="timeline-dot relative mx-4"></div>
                <div class="timeline-content flex-grow">Serving 1200+ farmers across 18 districts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Banner -->
      <section class="cta-banner text-center py-16 px-6 relative overflow-hidden">
        <div class="cta-bg absolute inset-0 z-0"></div>
        <div class="max-w-4xl mx-auto relative z-10">
          <h2 class="text-4xl font-bold mb-6 text-white">Ready to Increase Your Yield?</h2>
          <p class="text-xl mb-8 text-gray-300">Contact us today for a free field assessment and government subsidy eligibility check.</p>
          
          <div class="d-flex flex-wrap gap-4 justify-content-center">
            <a routerLink="/contact" class="btn btn-primary btn-lg hover-lift">
              Get Free Assessment <i class="fa-solid fa-arrow-right ms-2"></i>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" class="btn btn-whatsapp btn-lg hover-lift">
              <i class="fa-brands fa-whatsapp me-2"></i> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .hero-section {
      padding: 6rem 1.5rem;
      background: radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-primary) 100%);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .hero-title {
      font-size: 3.5rem;
      line-height: 1.2;
      font-weight: 800;
    }

    .text-gradient-green {
      background: linear-gradient(to right, #4ade80, #22c55e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .text-gradient-blue {
      background: linear-gradient(to right, #60a5fa, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .text-gradient-amber {
      background: linear-gradient(to right, #fbbf24, #d97706);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .text-gradient-gold {
      background: linear-gradient(to right, var(--gold), #d97706);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .timeline {
      position: relative;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 110px; /* Adjust based on year width + dot margin */
      top: 10px;
      bottom: 10px;
      width: 2px;
      background-color: rgba(255, 255, 255, 0.1);
    }

    .timeline-dot::before {
      content: '';
      position: absolute;
      left: 50%;
      top: 6px;
      transform: translateX(-50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--brand-500);
      border: 2px solid var(--bg-card);
      z-index: 1;
    }

    .border-gray-800 {
      border-color: rgba(255, 255, 255, 0.1);
    }

    .cta-banner {
      background-color: var(--bg-secondary);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }

    .cta-bg {
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
      pointer-events: none;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .timeline::before {
        left: 80px;
      }
      
      .timeline-year {
        width: 60px;
        font-size: 0.9rem;
      }
      
      .timeline-content {
        font-size: 0.95rem;
      }
    }
    
    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }
      .hero-actions {
        flex-direction: column;
        width: 100%;
      }
      .hero-actions .btn {
        width: 100%;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    // Component initialized
  }
}
