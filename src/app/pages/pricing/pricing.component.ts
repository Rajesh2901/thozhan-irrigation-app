import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubsidyCalculatorComponent } from '../subsidy-calculator/subsidy-calculator.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, SubsidyCalculatorComponent],
  template: `
    <div class="pricing-wrapper">
      <!-- Header Banner -->
      <section class="section section-dark text-center pricing-header">
        <div class="container-narrow">
          <span class="section-eyebrow eyebrow-dark">
            <i class="fa-solid fa-calculator"></i> Transparent Government Aid
          </span>
          <h1 class="section-title">Government Subsidy & Live Cost Estimator</h1>
          <p class="section-subtitle">
            Tamil Nadu farmers receive up to 100% subsidy for micro-irrigation systems under PMKSY and State Horticulture Department schemes. Calculate your exact tier below.
          </p>
        </div>
      </section>

      <!-- 3 Subsidy Tier Cards -->
      <section class="section section-light">
        <div class="container-wide">
          <div class="section-header">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-layer-group"></i> Official Subsidy Tiers
            </span>
            <h2 class="section-title">Farmer Subsidy Categorization</h2>
            <p class="section-subtitle">
              Subsidies are calculated based on registered landholding as verified in your revenue Patta records.
            </p>
          </div>

          <div class="grid-3 plans-container">
            <!-- Small Farmer (100% Free) -->
            <div class="card-light plan-card hover-lift featured-plan">
              <div class="plan-popular-pill">Most Popular (PMKSY)</div>
              <div class="plan-header">
                <div>
                  <h3 class="plan-name">Small & Marginal Farmer</h3>
                  <span class="plan-acreage">Up to 5 Acres (2 Hectares)</span>
                </div>
                <div class="subsidy-badge-large tag-mint">
                  100% SUBSIDY
                </div>
              </div>

              <div class="plan-cost-preview">
                <span class="cost-label">Farmer Contribution</span>
                <span class="cost-amount text-brand">₹0 (Equipment 100% Free)</span>
              </div>

              <ul class="plan-features">
                <li><i class="fa-solid fa-circle-check text-brand"></i> 100% Subsidy on ISI drip or sprinkler pipes</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> Full installation and field trenching included</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> Screen/disc filter & Venturi injector unit</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> Patta, Chitta & ADH office documentation help</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> 1-Year equipment warranty & maintenance visit</li>
              </ul>

              <a routerLink="/contact" class="btn btn-primary btn-full mt-auto">
                Apply for 100% Subsidy
              </a>
            </div>

            <!-- Other Farmer (75% Subsidy) -->
            <div class="card-light plan-card hover-lift">
              <div class="plan-header">
                <div>
                  <h3 class="plan-name">Other Farmer</h3>
                  <span class="plan-acreage">5.1 to 12.5 Acres (5 Hectares)</span>
                </div>
                <div class="subsidy-badge-large tag-amber">
                  75% SUBSIDY
                </div>
              </div>

              <div class="plan-cost-preview">
                <span class="cost-label">Farmer Contribution</span>
                <span class="cost-amount">Only 25% of Project Cost</span>
              </div>

              <ul class="plan-features">
                <li><i class="fa-solid fa-circle-check text-brand"></i> 75% Government subsidy on approved cost</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> Complete on-site survey and hydraulic layout</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> Professional pipe fusion and emitter calibrating</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> End-to-end paperwork preparation & filing</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> Standard manufacturer warranty on all fittings</li>
              </ul>

              <a routerLink="/contact" class="btn btn-outline-light btn-full mt-auto">
                Apply for 75% Subsidy
              </a>
            </div>

            <!-- Commercial / Large Farm (50% Subsidy) -->
            <div class="card-light plan-card hover-lift">
              <div class="plan-header">
                <div>
                  <h3 class="plan-name">Large Farm / Plantation</h3>
                  <span class="plan-acreage">Above 12.5 Acres</span>
                </div>
                <div class="subsidy-badge-large tag-blue">
                  50% SUBSIDY
                </div>
              </div>

              <div class="plan-cost-preview">
                <span class="cost-label">Farmer Contribution</span>
                <span class="cost-amount">50% of Project Cost</span>
              </div>

              <ul class="plan-features">
                <li><i class="fa-solid fa-circle-check text-brand"></i> 50% Subsidy on permissible government limits</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> High-volume automated solenoid valve manifolds</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> Rain gun and multi-zone lateral networks</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> Dedicated senior agricultural engineer support</li>
                <li><i class="fa-solid fa-circle-check text-brand"></i> Direct manufacturer spare parts pricing</li>
              </ul>

              <a routerLink="/contact" class="btn btn-outline-light btn-full mt-auto">
                Request Custom Plan
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Live Interactive Cost Estimator -->
      <section class="section section-cream" id="calculator">
        <div class="container-wide">
          <app-subsidy-calculator></app-subsidy-calculator>
        </div>
      </section>

      <!-- Required Documents Section -->
      <section class="section section-light">
        <div class="container-narrow">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-folder-open"></i> Document Checklist
            </span>
            <h2 class="section-title">Required Documents for Subsidy Verification</h2>
            <p class="section-subtitle">
              Have these documents handy. Our documentation cell will review and submit them directly to your district's Horticulture department.
            </p>
          </div>

          <div class="grid-2 docs-grid">
            <div class="card-cream doc-item">
              <i class="fa-solid fa-file-contract doc-icon"></i>
              <div>
                <strong>Patta & Chitta Copies</strong>
                <p>Latest revenue record copy proving ownership of the registered agricultural land.</p>
              </div>
            </div>
            <div class="card-cream doc-item">
              <i class="fa-solid fa-map-location-dot doc-icon"></i>
              <div>
                <strong>Adangal / FMB Sketch</strong>
                <p>Village Administrative Officer (VAO) certified crop cultivation extract or field map.</p>
              </div>
            </div>
            <div class="card-cream doc-item">
              <i class="fa-solid fa-id-card doc-icon"></i>
              <div>
                <strong>Aadhaar Card Copy</strong>
                <p>Farmer's Aadhaar identification for central PMKSY beneficiary registration.</p>
              </div>
            </div>
            <div class="card-cream doc-item">
              <i class="fa-solid fa-building-columns doc-icon"></i>
              <div>
                <strong>Bank Passbook Copy</strong>
                <p>Front page copy showing active account number and IFSC code for grant processing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .pricing-header {
      padding: 4.5rem 1.5rem 4rem;
    }
    .plans-container {
      margin-top: 1rem;
    }
    .plan-card {
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 2.25rem 1.75rem;
    }
    .featured-plan {
      border: 2px solid var(--brand-bright);
      box-shadow: 0 8px 28px rgba(39, 196, 106, 0.15);
    }
    .plan-popular-pill {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--brand-main);
      color: var(--white);
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.25rem 0.875rem;
      border-radius: var(--radius-full);
      box-shadow: 0 4px 10px rgba(13, 107, 61, 0.3);
    }
    .plan-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }
    .plan-name {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1.3;
    }
    .plan-acreage {
      font-size: 0.8125rem;
      color: var(--text-muted);
      display: block;
      margin-top: 0.2rem;
    }
    .subsidy-badge-large {
      font-size: 0.75rem;
      font-weight: 800;
      padding: 0.35rem 0.65rem;
      border-radius: var(--radius-md);
      white-space: nowrap;
    }
    .plan-cost-preview {
      background: var(--cream-warm);
      border: 1px solid var(--border-light);
      padding: 0.875rem 1rem;
      border-radius: var(--radius-md);
      margin-bottom: 1.5rem;
    }
    .cost-label {
      display: block;
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .cost-amount {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text-primary);
    }
    .plan-features {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 2rem;
    }
    .plan-features li {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.45;
    }
    .plan-features i {
      font-size: 0.95rem;
      margin-top: 0.2rem;
      flex-shrink: 0;
    }

    /* Docs */
    .docs-grid {
      margin-top: 1rem;
    }
    .doc-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1.5rem;
    }
    .doc-icon {
      font-size: 1.75rem;
      color: var(--brand-main);
      margin-top: 0.2rem;
      flex-shrink: 0;
    }
    .doc-item strong {
      display: block;
      font-size: 1rem;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }
    .doc-item p {
      font-size: 0.8125rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }
  `]
})
export class PricingComponent {}
