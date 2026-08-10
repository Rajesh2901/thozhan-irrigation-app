import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, FormsModule, DecimalPipe],
  template: `
    <div class="page-content">
      <div class="section-header">
        <h2 class="hero-title">Government Subsidy & Pricing</h2>
        <p class="hero-subtitle">Transparent pricing with real-time PMKSY subsidy calculation</p>
      </div>

      <div class="grid-3 plans-container">
        <div class="glass-card hover-lift plan-card">
          <div class="plan-header">
            <h3>Small Farmer</h3>
            <span class="badge badge-green">100% FREE</span>
          </div>
          <p class="land-limit">Up to 5 Acres</p>
          <ul class="plan-features">
            <li><i class="fa-solid fa-check text-green"></i> 100% Subsidy on equipment</li>
            <li><i class="fa-solid fa-check text-green"></i> Free installation</li>
            <li><i class="fa-solid fa-check text-green"></i> Priority support</li>
            <li><i class="fa-solid fa-check text-green"></i> Free maintenance for 1 year</li>
            <li><i class="fa-solid fa-check text-green"></i> PMKSY documentation help</li>
            <li><i class="fa-solid fa-check text-green"></i> Soil testing included</li>
          </ul>
        </div>

        <div class="glass-card hover-lift plan-card popular">
          <div class="popular-badge">Most Common</div>
          <div class="plan-header">
            <h3>Other Farmer</h3>
            <span class="badge badge-brand">75% SUBSIDY</span>
          </div>
          <p class="land-limit">5.1 - 12 Acres</p>
          <ul class="plan-features">
            <li><i class="fa-solid fa-check text-brand"></i> 75% Subsidy on equipment</li>
            <li><i class="fa-solid fa-check text-brand"></i> Standard installation fee</li>
            <li><i class="fa-solid fa-check text-brand"></i> Documentation assistance</li>
            <li><i class="fa-solid fa-check text-brand"></i> 6 months maintenance</li>
          </ul>
        </div>

        <div class="glass-card hover-lift plan-card">
          <div class="plan-header">
            <h3>Large Farm</h3>
            <span class="badge badge-blue">50% SUBSIDY</span>
          </div>
          <p class="land-limit">Above 12 Acres</p>
          <ul class="plan-features">
            <li><i class="fa-solid fa-check text-blue"></i> 50% Subsidy on equipment</li>
            <li><i class="fa-solid fa-check text-blue"></i> Custom design planning</li>
            <li><i class="fa-solid fa-check text-blue"></i> Dedicated account manager</li>
            <li><i class="fa-solid fa-check text-blue"></i> Advanced automation options</li>
          </ul>
        </div>
      </div>

      <div class="glass-card estimator-section">
        <h3 class="estimator-title"><i class="fa-solid fa-calculator"></i> Live Cost Estimator</h3>
        
        <div class="estimator-grid">
          <div class="input-group">
            <label>Land Size: <strong>{{ land() }} Acres</strong></label>
            <input type="range" class="form-range" [(ngModel)]="land" min="0.5" max="25" step="0.5">
            <div class="range-labels">
              <span>0.5 Ac</span>
              <span>25 Ac</span>
            </div>
            
            <label class="mt-4">System Type</label>
            <div class="system-types">
              <button class="btn btn-sm" [class.btn-primary]="pricePerAcre() === 24500" (click)="pricePerAcre.set(24500)">Drip</button>
              <button class="btn btn-sm" [class.btn-primary]="pricePerAcre() === 18200" (click)="pricePerAcre.set(18200)">Sprinkler</button>
              <button class="btn btn-sm" [class.btn-primary]="pricePerAcre() === 32000" (click)="pricePerAcre.set(32000)">Rain Gun</button>
              <button class="btn btn-sm" [class.btn-primary]="pricePerAcre() === 85000" (click)="pricePerAcre.set(85000)">Solar</button>
            </div>
          </div>

          <div class="result-panel">
            <div class="result-row">
              <span>Total Project Cost</span>
              <span class="value">₹ {{ projectCost() | number }}</span>
            </div>
            <div class="result-row subsidy-row">
              <span>Govt. Subsidy ({{ subsidyPct() }}%)</span>
              <span class="value text-green">- ₹ {{ subsidy() | number }}</span>
            </div>
            <div class="result-divider"></div>
            <div class="result-row final-cost">
              <span>Your Contribution</span>
              <span class="value text-brand">₹ {{ contribution() | number }}</span>
            </div>
            <a routerLink="/contact" class="btn btn-primary btn-full mt-4">Get Detailed Quote</a>
          </div>
        </div>
      </div>

      <div class="glass-card faq-section">
        <h3>Frequently Asked Questions</h3>
        <div class="faq-grid">
          <div class="faq-item">
            <h4>What documents are required for subsidy?</h4>
            <p>You'll need Chitta, Adangal, FMB sketch, Aadhaar card, Bank passbook, and Passport size photos.</p>
          </div>
          <div class="faq-item">
            <h4>How long does the subsidy process take?</h4>
            <p>Typically 30-45 days from application submission to approval, depending on the district office.</p>
          </div>
          <div class="faq-item">
            <h4>Do you provide installation services?</h4>
            <p>Yes, we provide end-to-end services from field survey, design, subsidy application to installation.</p>
          </div>
          <div class="faq-item">
            <h4>Is there a warranty on the equipment?</h4>
            <p>All our ISI marked equipment comes with a standard 1-year manufacturer warranty.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .plans-container {
      margin-bottom: 3rem;
    }
    .plan-card {
      position: relative;
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .plan-card.popular {
      border-color: var(--brand-500);
      transform: scale(1.05);
    }
    .popular-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--brand-500);
      color: var(--bg-primary);
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 700;
    }
    .plan-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    .plan-header h3 {
      margin: 0;
      font-size: 1.25rem;
    }
    .land-limit {
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
    .plan-features {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .plan-features li {
      margin-bottom: 0.75rem;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .text-green { color: #4ade80; }
    .text-brand { color: var(--brand-500); }
    .text-blue { color: #60a5fa; }

    .estimator-section {
      margin-bottom: 3rem;
    }
    .estimator-title {
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .estimator-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    @media (max-width: 768px) {
      .estimator-grid { grid-template-columns: 1fr; }
      .plan-card.popular { transform: none; }
    }
    .form-range {
      width: 100%;
      margin: 1rem 0 0.5rem;
    }
    .range-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .mt-4 { margin-top: 1.5rem; }
    .system-types {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 0.5rem;
    }
    .result-panel {
      background: rgba(0, 0, 0, 0.2);
      padding: 1.5rem;
      border-radius: 8px;
    }
    .result-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 1rem;
    }
    .result-row .value {
      font-weight: 600;
    }
    .subsidy-row {
      color: #4ade80;
    }
    .result-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 1rem 0;
    }
    .final-cost {
      font-size: 1.25rem;
      font-weight: 700;
    }
    
    .faq-section h3 {
      margin-bottom: 1.5rem;
    }
    .faq-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    @media (max-width: 768px) {
      .faq-grid { grid-template-columns: 1fr; }
    }
    .faq-item h4 {
      margin: 0 0 0.5rem 0;
      color: var(--brand-100);
    }
    .faq-item p {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.875rem;
    }
  `]
})
export class PricingComponent {
  land = signal(3);
  pricePerAcre = signal(24500);

  projectCost = computed(() => Math.round(this.land() * this.pricePerAcre()));
  
  subsidyPct = computed(() => {
    const l = this.land();
    if (l <= 5) return 100;
    if (l <= 12) return 75;
    return 50;
  });

  subsidy = computed(() => Math.round(this.projectCost() * this.subsidyPct() / 100));
  contribution = computed(() => this.projectCost() - this.subsidy());
}
