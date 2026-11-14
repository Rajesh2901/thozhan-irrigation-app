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

      <!-- Official 7-Step PMKSY & TN Horti Subsidy Application Journey -->
      <section class="section section-light subsidy-process-section">
        <div class="container-wide">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-route"></i> Official 7-Step Workflow
            </span>
            <h2 class="section-title">Government Subsidy Sanction & Installation Journey</h2>
            <p class="section-subtitle">
              Fully compliant with Tamil Nadu Horticulture Department & Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) administrative standards.
            </p>
          </div>

          <div class="process-flow-container">
            <div class="process-step-item">
              <div class="step-circle"><span class="step-num">01</span></div>
              <div class="step-card-content card-light">
                <div class="step-icon-wrap"><i class="fa-solid fa-user-check"></i></div>
                <h4 class="step-heading">1. Eligibility Assessment</h4>
                <p class="step-desc">Verification of farmer category based on total land registered in Revenue records (Small/Marginal $\le$ 5 Acres for 100% Free Grant, Other Farmers for 75%).</p>
              </div>
            </div>

            <div class="process-step-item">
              <div class="step-circle"><span class="step-num">02</span></div>
              <div class="step-card-content card-light">
                <div class="step-icon-wrap"><i class="fa-solid fa-file-contract"></i></div>
                <h4 class="step-heading">2. Document Verification</h4>
                <p class="step-desc">Compilation of legal Patta, Chitta, VAO-attested Adangal, FMB field sketch, Aadhaar card, and bank passbook with IFSC code.</p>
              </div>
            </div>

            <div class="process-step-item">
              <div class="step-circle"><span class="step-num">03</span></div>
              <div class="step-card-content card-light">
                <div class="step-icon-wrap"><i class="fa-solid fa-faucet-drip"></i></div>
                <h4 class="step-heading">3. Hydraulic CAD Layout</h4>
                <p class="step-desc">On-site technical survey measuring ground elevation, soil infiltration rate, and borewell discharge (LPH) to engineer the pipe manifold.</p>
              </div>
            </div>

            <div class="process-step-item">
              <div class="step-circle"><span class="step-num">04</span></div>
              <div class="step-card-content card-light">
                <div class="step-icon-wrap"><i class="fa-solid fa-paper-plane"></i></div>
                <h4 class="step-heading">4. Official Application Filing</h4>
                <p class="step-desc">Direct electronic filing through Tamil Nadu Horticulture e-Services portal and physical docket submission to the local Assistant Director of Horticulture (ADH) office.</p>
              </div>
            </div>

            <div class="process-step-item">
              <div class="step-circle"><span class="step-num">05</span></div>
              <div class="step-card-content card-light">
                <div class="step-icon-wrap"><i class="fa-solid fa-building-shield"></i></div>
                <h4 class="step-heading">5. Department Field Inspection</h4>
                <p class="step-desc">District Horticulture Officer on-site verification inspecting water source viability, crop suitability, and land boundaries against revenue maps.</p>
              </div>
            </div>

            <div class="process-step-item">
              <div class="step-circle"><span class="step-num">06</span></div>
              <div class="step-card-content card-light">
                <div class="step-icon-wrap"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                <h4 class="step-heading">6. Sanction & Installation</h4>
                <p class="step-desc">Release of administrative work order sanction. Certified mechanics trench lines, fuse BIS virgin HDPE pipes, install disc filters, and execute pressure test.</p>
              </div>
            </div>

            <div class="process-step-item">
              <div class="step-circle highlight-step"><span class="step-num">07</span></div>
              <div class="step-card-content card-light highlight-card">
                <div class="step-icon-wrap"><i class="fa-solid fa-circle-dollar-to-slot"></i></div>
                <h4 class="step-heading">7. DBT Subsidy Disbursement</h4>
                <p class="step-desc">Joint post-installation GPS geo-tagging, final field sign-off, and direct subsidy grant clearance from government accounts with zero out-of-pocket leakage.</p>
              </div>
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

      <!-- Enhanced Required Documents Section -->
      <section class="section section-light">
        <div class="container-narrow">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-folder-open"></i> Complete Document Checklist
            </span>
            <h2 class="section-title">Required Documents for Subsidy Clearance</h2>
            <p class="section-subtitle">
              Prepare these 6 essential documents. Our dedicated documentation cell handles verification and submission to the Horticulture department on your behalf.
            </p>
          </div>

          <div class="grid-2 docs-grid">
            <div class="card-cream doc-item">
              <i class="fa-solid fa-file-contract doc-icon"></i>
              <div>
                <strong>1. Patta & Chitta Extract</strong>
                <p>Latest revenue record copy downloaded from Any-time Anywhere e-Services proving land title ownership in Tamil Nadu.</p>
              </div>
            </div>
            <div class="card-cream doc-item">
              <i class="fa-solid fa-map-location-dot doc-icon"></i>
              <div>
                <strong>2. FMB Sketch & Adangal</strong>
                <p>Field Measurement Book (FMB) map and VAO-certified crop adangal copy showing survey subdivision numbers.</p>
              </div>
            </div>
            <div class="card-cream doc-item">
              <i class="fa-solid fa-id-card doc-icon"></i>
              <div>
                <strong>3. Aadhaar Card (Beneficiary)</strong>
                <p>Clear photocopy of applicant farmer's Aadhaar card for central PMKSY DBT database linkage.</p>
              </div>
            </div>
            <div class="card-cream doc-item">
              <i class="fa-solid fa-building-columns doc-icon"></i>
              <div>
                <strong>4. Bank Passbook with IFSC</strong>
                <p>Active bank savings account passbook front page copy with IFSC code for Direct Benefit Transfer records.</p>
              </div>
            </div>
            <div class="card-cream doc-item">
              <i class="fa-solid fa-certificate doc-icon"></i>
              <div>
                <strong>5. Small/Marginal Farmer Certificate</strong>
                <p>VAO certificate verifying total landholding is under 5 Acres (2 Hectares) for 100% full grant eligibility.</p>
              </div>
            </div>
            <div class="card-cream doc-item">
              <i class="fa-solid fa-vial-circle-check doc-icon"></i>
              <div>
                <strong>6. Water & Soil Test Report</strong>
                <p>Borewell/well water pH and EC test extract. (Our technical team can conduct complimentary on-site sampling).</p>
              </div>
            </div>
          </div>

          <!-- Documentation Hotline Assistance Banner -->
          <div class="docs-help-banner card-light mt-8">
            <div class="docs-help-left">
              <i class="fa-brands fa-whatsapp text-2xl text-success"></i>
              <div>
                <h4 class="font-bold text-forest">Need Help Gathering Documents?</h4>
                <p class="text-xs text-secondary">Send photos of your documents to our documentation cell on WhatsApp for free pre-verification.</p>
              </div>
            </div>
            <a href="https://wa.me/919489528432?text=Hello%20Thozhan,%20I%20need%20help%20verifying%20my%20subsidy%20documents."
               target="_blank"
               rel="noopener noreferrer"
               class="btn btn-whatsapp btn-sm">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp Documentation Help
            </a>
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

    /* 7-Step Process Flow Container */
    .subsidy-process-section {
      background-color: var(--white);
    }
    .process-flow-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .process-step-item {
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .step-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--forest-deep);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8125rem;
      font-weight: 800;
      margin-bottom: 0.75rem;
      box-shadow: 0 4px 10px rgba(30, 70, 32, 0.2);
    }
    .step-circle.highlight-step {
      background: var(--golden-yellow);
      color: var(--forest-deep);
    }
    .step-card-content {
      flex: 1;
      padding: 1.5rem;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      transition: var(--transition-fast);
    }
    .step-card-content:hover {
      border-color: var(--brand-main);
      transform: translateY(-3px);
      box-shadow: 0 10px 25px -5px rgba(30, 70, 32, 0.08);
    }
    .step-card-content.highlight-card {
      border-left: 4px solid var(--golden-yellow);
      background: #FFFCF2;
    }
    .step-icon-wrap {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background-color: var(--soft-green);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.15rem;
      margin-bottom: 1rem;
    }
    .step-heading {
      font-size: 0.9375rem;
      font-weight: 800;
      color: var(--forest-deep);
      margin-bottom: 0.45rem;
    }
    .step-desc {
      font-size: 0.8125rem;
      color: var(--text-secondary);
      line-height: 1.55;
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

    .docs-help-banner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      padding: 1.5rem 1.75rem;
      flex-wrap: wrap;
      border: 1px solid rgba(39, 196, 106, 0.3);
      border-radius: var(--radius-lg);
    }
    .docs-help-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `]
})
export class PricingComponent {}
