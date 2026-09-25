import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
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
        <div class="container-narrow">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-sliders"></i> Interactive Estimation
            </span>
            <h2 class="section-title">Live Subsidy Cost Estimator</h2>
            <p class="section-subtitle">
              Adjust your land acreage and select your system type to see your estimated subsidy amount and net contribution in real-time.
            </p>
          </div>

          <div class="card-light estimator-card">
            <div class="estimator-grid">
              <!-- Left Inputs -->
              <div class="estimator-inputs">
                <!-- Land Range Slider -->
                <div class="form-group mb-6">
                  <div class="flex-between items-center mb-2">
                    <label class="font-bold text-sm">Farm Land Size:</label>
                    <span class="land-val-badge">{{ land() }} Acres</span>
                  </div>
                  <input type="range"
                         class="custom-range"
                         min="0.5"
                         max="25"
                         step="0.5"
                         [value]="land()"
                         (input)="onLandSliderChange($event)" />
                  <div class="range-marks flex-between">
                    <span>0.5 Acre</span>
                    <span>5 Acres (100% Limit)</span>
                    <span>12.5 Acres</span>
                    <span>25 Acres</span>
                  </div>
                </div>

                <!-- System Selection -->
                <div class="form-group">
                  <label class="font-bold text-sm mb-2">Select Irrigation Type:</label>
                  <div class="system-pills-grid">
                    <button class="sys-pill" [class.active]="pricePerAcre() === 24500" (click)="pricePerAcre.set(24500)">
                      <i class="fa-solid fa-faucet-drip"></i>
                      <span>Drip Kit</span>
                      <small>₹24,500/Ac</small>
                    </button>
                    <button class="sys-pill" [class.active]="pricePerAcre() === 18200" (click)="pricePerAcre.set(18200)">
                      <i class="fa-solid fa-sprinkler"></i>
                      <span>Sprinkler</span>
                      <small>₹18,200/Ac</small>
                    </button>
                    <button class="sys-pill" [class.active]="pricePerAcre() === 32000" (click)="pricePerAcre.set(32000)">
                      <i class="fa-solid fa-cloud-showers-water"></i>
                      <span>Rain Gun</span>
                      <small>₹32,000/Unit</small>
                    </button>
                    <button class="sys-pill" [class.active]="pricePerAcre() === 85000" (click)="pricePerAcre.set(85000)">
                      <i class="fa-solid fa-solar-panel"></i>
                      <span>Solar Pump</span>
                      <small>₹85,000/Unit</small>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Right Calculation Summary -->
              <div class="estimator-summary card-cream">
                <h4 class="summary-title">
                  <i class="fa-solid fa-receipt text-brand"></i> Estimated Breakdown
                </h4>

                <div class="breakdown-row">
                  <span>Gross Project Cost:</span>
                  <strong>₹ {{ projectCost() | number }}</strong>
                </div>

                <div class="breakdown-row subsidy-highlight">
                  <span>
                    Govt. Subsidy ({{ subsidyPct() }}%):
                    <small class="block text-xs" style="color: #0D6B3D;">
                      {{ subsidyPct() === 100 ? 'Small Farmer Tier' : subsidyPct() === 75 ? 'Other Farmer Tier' : 'Large Farm Tier' }}
                    </small>
                  </span>
                  <strong class="text-brand">- ₹ {{ subsidy() | number }}</strong>
                </div>

                <div class="breakdown-divider"></div>

                <div class="breakdown-row final-row">
                  <span>Your Net Contribution:</span>
                  <strong class="final-amt">₹ {{ contribution() | number }}</strong>
                </div>

                @if (subsidyPct() === 100) {
                  <div class="small-farmer-note">
                    <i class="fa-solid fa-star text-gold"></i>
                    <span>Eligible for 100% Free Setup under Tamil Nadu PMKSY guidelines!</span>
                  </div>
                }

                <a routerLink="/contact" class="btn btn-amber btn-full mt-4">
                  <i class="fa-solid fa-paper-plane"></i> Proceed with this Quote
                </a>
              </div>
            </div>
          </div>
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

    /* Estimator */
    .estimator-card {
      padding: 2.25rem 2rem;
    }
    .estimator-grid {
      display: grid;
      grid-template-columns: 1.1fr 0.9fr;
      gap: 2.5rem;
      align-items: center;
    }
    .land-val-badge {
      background-color: var(--mint-soft);
      color: var(--brand-main);
      padding: 0.3rem 0.75rem;
      border-radius: var(--radius-full);
      font-size: 0.9375rem;
      font-weight: 800;
    }
    .custom-range {
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background: var(--border-light);
      outline: none;
      margin: 1rem 0 0.5rem;
      cursor: pointer;
      accent-color: var(--brand-main);
    }
    .range-marks {
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .system-pills-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
      margin-top: 0.5rem;
    }
    .sys-pill {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0.875rem 0.5rem;
      border-radius: var(--radius-md);
      background-color: var(--white);
      border: 1.5px solid var(--border-light);
      color: var(--text-primary);
      transition: var(--transition-fast);
      cursor: pointer;
    }
    .sys-pill:hover {
      border-color: var(--brand-bright);
      background-color: var(--mint-subtle);
    }
    .sys-pill.active {
      border-color: var(--brand-main);
      background-color: var(--mint-soft);
      color: var(--forest-deep);
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(13, 107, 61, 0.15);
    }
    .sys-pill i { font-size: 1.25rem; margin-bottom: 0.35rem; color: var(--brand-main); }
    .sys-pill span { font-size: 0.875rem; font-weight: 700; }
    .sys-pill small { font-size: 0.7rem; color: var(--text-muted); margin-top: 0.15rem; }

    /* Summary Panel */
    .estimator-summary {
      padding: 1.75rem;
      border-radius: var(--radius-lg);
    }
    .summary-title {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .breakdown-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.875rem;
      font-size: 0.9375rem;
      color: var(--text-secondary);
    }
    .breakdown-row strong {
      color: var(--text-primary);
    }
    .breakdown-divider {
      height: 1px;
      background-color: var(--border-light);
      margin: 1rem 0;
    }
    .final-row {
      font-size: 1.0625rem;
      font-weight: 800;
      color: var(--text-primary);
    }
    .final-amt {
      font-size: 1.35rem;
      color: var(--forest-deep);
    }
    .small-farmer-note {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.75rem;
      font-weight: 700;
      color: #0D6B3D;
      background: var(--mint-soft);
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius-md);
      margin-top: 1rem;
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

    @media (max-width: 1024px) {
      .estimator-grid { grid-template-columns: 1fr; }
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
    if (l <= 12.5) return 75;
    return 50;
  });

  subsidy = computed(() => Math.round(this.projectCost() * this.subsidyPct() / 100));
  contribution = computed(() => this.projectCost() - this.subsidy());

  onLandSliderChange(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.land.set(val);
  }
}
