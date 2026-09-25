import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Product, SubsidyCalculationInput, SubsidyCalculationResult } from '../../core/models/interfaces';

@Component({
  selector: 'app-subsidy-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, RouterLink],
  template: `
    <div class="calculator-container card-light">
      <div class="calc-header">
        <div class="calc-badge">
          <i class="fa-solid fa-calculator"></i>
          <span>Official PMKSY & TN Horti Calculator</span>
        </div>
        <h3 class="calc-title">Instant Government Subsidy Calculator</h3>
        <p class="calc-subtitle">
          Enter your farm details to get an immediate, official subsidy calculation and quote for your land.
        </p>
      </div>

      @if (errorMessage()) {
        <div class="alert alert-error">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>{{ errorMessage() }}</span>
        </div>
      }

      <div class="calc-grid">
        <!-- Form Section -->
        <form (ngSubmit)="calculate()" #calcForm="ngForm" class="calc-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="farmerName">
                Farmer Name / விவசாயி பெயர் <span class="required">*</span>
              </label>
              <div class="input-icon-wrap">
                <i class="fa-solid fa-user input-icon"></i>
                <input
                  type="text"
                  id="farmerName"
                  name="farmerName"
                  class="form-control"
                  placeholder="e.g. K. Murugesan"
                  [(ngModel)]="formData.farmer_name"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="phoneNumber">
                Mobile Number / அலைபேசி <span class="required">*</span>
              </label>
              <div class="input-icon-wrap">
                <i class="fa-solid fa-phone input-icon"></i>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  class="form-control"
                  placeholder="e.g. 9876543210"
                  [(ngModel)]="formData.phone_number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="district">
                District / மாவட்டம் <span class="required">*</span>
              </label>
              <div class="input-icon-wrap">
                <i class="fa-solid fa-location-dot input-icon"></i>
                <select
                  id="district"
                  name="district"
                  class="form-control"
                  [(ngModel)]="formData.district"
                  required
                >
                  @for (dist of districts; track dist) {
                    <option [value]="dist">{{ dist }}</option>
                  }
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="productId">
                Irrigation System / பாசன வகை <span class="required">*</span>
              </label>
              <div class="input-icon-wrap">
                <i class="fa-solid fa-faucet-drip input-icon"></i>
                <select
                  id="productId"
                  name="productId"
                  class="form-control"
                  [(ngModel)]="formData.product_id"
                  required
                >
                  @for (prod of products(); track prod.id) {
                    <option [value]="prod.id">
                      {{ prod.title_en }} (₹{{ prod.price_numeric | number }}/Ac)
                    </option>
                  }
                </select>
              </div>
            </div>
          </div>

          <!-- Land Size Slider & Number input -->
          <div class="form-group land-input-group">
            <div class="land-header">
              <label class="form-label" for="landSize">
                Land Size / நிலப்பரப்பு:
                <strong class="land-badge">{{ formData.land_size_acres }} Acres</strong>
              </label>
              <div class="land-presets">
                <button type="button" class="preset-btn" (click)="setLand(2)">2 Ac</button>
                <button type="button" class="preset-btn" (click)="setLand(5)">5 Ac (100% Tier)</button>
                <button type="button" class="preset-btn" (click)="setLand(8)">8 Ac (75% Tier)</button>
                <button type="button" class="preset-btn" (click)="setLand(15)">15 Ac</button>
              </div>
            </div>

            <input
              type="range"
              id="landSize"
              name="landSize"
              class="custom-range"
              min="0.5"
              max="25"
              step="0.5"
              [(ngModel)]="formData.land_size_acres"
            />
            <div class="range-labels">
              <span>0.5 Acre</span>
              <span class="range-milestone">5.0 Ac (100% Free Limit)</span>
              <span class="range-milestone">12.5 Ac (75% Limit)</span>
              <span>25+ Acres</span>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-amber btn-lg btn-calculate"
            [disabled]="loading() || !calcForm.form.valid"
          >
            @if (loading()) {
              <i class="fa-solid fa-circle-notch fa-spin"></i>
              <span>Calculating Official Subsidy...</span>
            } @else {
              <i class="fa-solid fa-calculator"></i>
              <span>Calculate Govt. Subsidy Now</span>
            }
          </button>
        </form>

        <!-- Result / Preview Section -->
        <div class="calc-result-panel">
          @if (result(); as res) {
            <div class="quote-card animate-fade-in">
              <div class="quote-header">
                <div>
                  <span class="quote-id-pill">Quote #{{ res.quote_id }}</span>
                  <h4 class="quote-farmer">{{ res.farmer_name }}</h4>
                  <span class="quote-product">{{ res.product_title }} • {{ res.land_acres }} Acres</span>
                </div>
                <div class="subsidy-badge" [ngClass]="getBadgeClass(res.subsidy_percent)">
                  {{ res.subsidy_percent }}% SUBSIDY
                </div>
              </div>

              <div class="quote-tier">
                <i class="fa-solid fa-award text-brand"></i>
                <strong>{{ res.tier_label }}</strong>
              </div>

              <div class="quote-breakdown">
                <div class="breakdown-item">
                  <span class="label">Gross Estimated Cost:</span>
                  <span class="value">₹{{ res.project_cost | number }}</span>
                </div>
                <div class="breakdown-item subsidy-row">
                  <span class="label">Govt. Grant / Subsidy:</span>
                  <span class="value-highlight">- ₹{{ res.subsidy_amount | number }}</span>
                </div>
                <div class="breakdown-divider"></div>
                <div class="breakdown-item final-row">
                  <span class="label">Farmer Net Contribution:</span>
                  <span class="final-price">₹{{ res.farmer_contribution | number }}</span>
                </div>
              </div>

              <div class="explanation-box">
                <i class="fa-solid fa-circle-info"></i>
                <p>{{ res.explanation }}</p>
              </div>

              <div class="quote-actions">
                <a
                  [href]="'https://wa.me/919489528432?text=' + getWhatsAppText(res)"
                  target="_blank"
                  rel="noopener"
                  class="btn btn-whatsapp btn-full"
                >
                  <i class="fa-brands fa-whatsapp"></i>
                  <span>Claim this Quote via WhatsApp</span>
                </a>
                <a routerLink="/contact" class="btn btn-outline-light btn-full">
                  <i class="fa-solid fa-phone"></i>
                  <span>Request Free On-Site Inspection</span>
                </a>
              </div>
            </div>
          } @else {
            <div class="quote-placeholder">
              <div class="placeholder-icon">
                <i class="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <h4>Your Official Quote Will Appear Here</h4>
              <p>
                Fill in your details and click calculate to generate an instant quote registered in our system.
              </p>
              <div class="placeholder-features">
                <div class="feature-item">
                  <i class="fa-solid fa-check text-brand"></i>
                  <span>Real-time PMKSY subsidy calculation</span>
                </div>
                <div class="feature-item">
                  <i class="fa-solid fa-check text-brand"></i>
                  <span>Zero hidden costs or paperwork charges</span>
                </div>
                <div class="feature-item">
                  <i class="fa-solid fa-check text-brand"></i>
                  <span>Direct submission to Horticulture Dept</span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calculator-container {
      background: var(--white);
      border: 1.5px solid var(--border-light);
      border-radius: var(--radius-xl);
      padding: 2.5rem;
      box-shadow: 0 12px 36px rgba(16, 35, 27, 0.06);
    }
    .calc-header {
      text-align: center;
      margin-bottom: 2.25rem;
    }
    .calc-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--brand-main);
      background: var(--mint-soft);
      padding: 0.35rem 0.875rem;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-light);
      margin-bottom: 0.75rem;
    }
    .calc-title {
      font-size: clamp(1.6rem, 2.5vw, 2.2rem);
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    .calc-subtitle {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 620px;
      margin: 0 auto;
    }
    .calc-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 2.5rem;
      align-items: flex-start;
    }
    .alert-error {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #FEE2E2;
      color: #991B1B;
      padding: 0.875rem 1.25rem;
      border-radius: var(--radius-md);
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .form-group {
      margin-bottom: 1.25rem;
    }
    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    .required {
      color: var(--danger);
    }
    .input-icon-wrap {
      position: relative;
      display: flex;
      align-items: center;
    }
    .input-icon {
      position: absolute;
      left: 1rem;
      color: var(--text-muted);
      font-size: 0.95rem;
      pointer-events: none;
    }
    .form-control {
      width: 100%;
      padding: 0.8rem 1rem 0.8rem 2.6rem;
      font-size: 0.9375rem;
      font-family: inherit;
      color: var(--text-primary);
      background-color: #FAFBF9;
      border: 1.5px solid var(--border-light);
      border-radius: var(--radius-md);
      transition: var(--transition-fast);
      outline: none;
    }
    .form-control:focus {
      background-color: var(--white);
      border-color: var(--brand-main);
      box-shadow: 0 0 0 3px rgba(13, 107, 61, 0.12);
    }
    .land-input-group {
      background: #F8FAF8;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      padding: 1.25rem;
      margin-bottom: 1.5rem;
    }
    .land-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .land-badge {
      background: var(--mint-soft);
      color: var(--brand-main);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-full);
      font-size: 0.875rem;
      margin-left: 0.35rem;
    }
    .land-presets {
      display: flex;
      gap: 0.4rem;
    }
    .preset-btn {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      background: var(--white);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      transition: var(--transition-fast);
    }
    .preset-btn:hover {
      background: var(--mint-subtle);
      border-color: var(--brand-main);
      color: var(--brand-main);
    }
    .custom-range {
      width: 100%;
      height: 8px;
      border-radius: 4px;
      background: var(--border-light);
      outline: none;
      margin: 0.75rem 0 0.4rem;
      cursor: pointer;
      accent-color: var(--brand-main);
    }
    .range-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-muted);
    }
    .range-milestone {
      color: var(--brand-main);
      font-weight: 600;
    }
    .btn-calculate {
      width: 100%;
      padding: 0.95rem;
      font-size: 1.05rem;
    }

    /* Result Panel */
    .calc-result-panel {
      height: 100%;
    }
    .quote-card {
      background: linear-gradient(180deg, #F8FAF8 0%, #FFFFFF 100%);
      border: 2px solid var(--brand-bright);
      border-radius: var(--radius-lg);
      padding: 1.75rem;
      box-shadow: 0 10px 30px rgba(13, 107, 61, 0.08);
    }
    .quote-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    .quote-id-pill {
      display: inline-block;
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--brand-main);
      background: var(--mint-soft);
      padding: 0.15rem 0.5rem;
      border-radius: var(--radius-sm);
      margin-bottom: 0.35rem;
    }
    .quote-farmer {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 0.15rem;
    }
    .quote-product {
      font-size: 0.8125rem;
      color: var(--text-secondary);
    }
    .subsidy-badge {
      font-size: 0.8125rem;
      font-weight: 800;
      padding: 0.4rem 0.75rem;
      border-radius: var(--radius-md);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .badge-100 {
      background: var(--mint-soft);
      color: var(--forest-deep);
      border: 1px solid #27C46A;
    }
    .badge-75 {
      background: #FEF3C7;
      color: #92400E;
      border: 1px solid #F59E0B;
    }
    .badge-50 {
      background: #EBF4FC;
      color: #1E40AF;
      border: 1px solid #60A5FA;
    }
    .quote-tier {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--white);
      border: 1px solid var(--border-light);
      padding: 0.65rem 0.875rem;
      border-radius: var(--radius-md);
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
      color: var(--forest-deep);
    }
    .quote-breakdown {
      background: var(--white);
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 1.25rem;
      margin-bottom: 1.25rem;
    }
    .breakdown-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9375rem;
      margin-bottom: 0.65rem;
      color: var(--text-secondary);
    }
    .breakdown-item .value {
      font-weight: 700;
      color: var(--text-primary);
    }
    .subsidy-row .value-highlight {
      font-weight: 800;
      color: var(--brand-main);
    }
    .breakdown-divider {
      height: 1px;
      background: var(--border-light);
      margin: 0.85rem 0;
    }
    .final-row {
      margin-bottom: 0;
      font-size: 1.05rem;
      font-weight: 800;
      color: var(--text-primary);
    }
    .final-price {
      font-size: 1.45rem;
      color: var(--forest-deep);
    }
    .explanation-box {
      display: flex;
      gap: 0.6rem;
      background: var(--mint-subtle);
      border: 1px solid rgba(39, 196, 106, 0.3);
      border-radius: var(--radius-md);
      padding: 0.875rem;
      margin-bottom: 1.25rem;
      font-size: 0.8125rem;
      color: #064E3B;
      line-height: 1.45;
    }
    .explanation-box i {
      color: var(--brand-main);
      font-size: 1rem;
      flex-shrink: 0;
      margin-top: 0.1rem;
    }
    .quote-actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    /* Placeholder */
    .quote-placeholder {
      background: #FAFBF9;
      border: 1.5px dashed var(--border-light);
      border-radius: var(--radius-lg);
      padding: 3rem 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 420px;
    }
    .placeholder-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--mint-soft);
      color: var(--brand-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.75rem;
      margin-bottom: 1.25rem;
    }
    .quote-placeholder h4 {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    .quote-placeholder p {
      font-size: 0.875rem;
      color: var(--text-secondary);
      max-width: 320px;
      margin-bottom: 1.75rem;
      line-height: 1.5;
    }
    .placeholder-features {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      text-align: left;
      font-size: 0.8125rem;
      color: var(--text-secondary);
    }
    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 900px) {
      .calc-grid {
        grid-template-columns: 1fr;
      }
      .form-row {
        grid-template-columns: 1fr;
        gap: 0;
      }
      .calculator-container {
        padding: 1.5rem;
      }
    }
  `]
})
export class SubsidyCalculatorComponent implements OnInit {
  private apiService = inject(ApiService);

  products = signal<Product[]>([
    {
      id: 1,
      title_en: 'Drip Irrigation Kit',
      title_ta: 'சொட்டு நீர் பாசனம்',
      desc: 'Complete drip irrigation setup',
      price_numeric: 24500,
      price_unit_text: '/ Acre',
      icon_class: 'fa-solid fa-faucet-drip',
      image_url: '/photos/drip.png',
      is_subsidy_eligible: true
    },
    {
      id: 2,
      title_en: 'Sprinkler Micro Head System',
      title_ta: 'தெளிப்பு நீர் பாசனம்',
      desc: 'High-pressure overhead misting systems',
      price_numeric: 18200,
      price_unit_text: '/ Acre',
      icon_class: 'fa-solid fa-sprinkler',
      image_url: '/photos/sprinkler.png',
      is_subsidy_eligible: true
    },
    {
      id: 3,
      title_en: 'Rain Gun Irrigation System',
      title_ta: 'மழை துப்பாக்கி பாசனம்',
      desc: 'High-throw water cannon systems',
      price_numeric: 32000,
      price_unit_text: '/ Acre',
      icon_class: 'fa-solid fa-cloud-showers-water',
      image_url: '/photos/raingun.png',
      is_subsidy_eligible: true
    },
    {
      id: 4,
      title_en: 'Solar Agri Pump Integration',
      title_ta: 'சோலார் பம்ப் செட்',
      desc: 'Grid-independent solar power pumping',
      price_numeric: 85000,
      price_unit_text: '/ Unit',
      icon_class: 'fa-solid fa-solar-panel',
      image_url: '/photos/solar.png',
      is_subsidy_eligible: true
    }
  ]);

  districts: string[] = [
    'Dindigul', 'Madurai', 'Theni', 'Tiruppur', 'Coimbatore',
    'Salem', 'Erode', 'Tiruchirappalli', 'Karur', 'Thanjavur',
    'Pudukkottai', 'Virudhunagar', 'Sivaganga', 'Ramanathapuram',
    'Namakkal', 'Dharmapuri', 'Krishnagiri', 'Tirunelveli', 'Tenkasi'
  ];

  formData: SubsidyCalculationInput = {
    farmer_name: '',
    phone_number: '',
    district: 'Dindigul',
    product_id: 1,
    land_size_acres: 3.0
  };

  loading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  result = signal<SubsidyCalculationResult | null>(null);

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: (prods) => {
        if (prods && prods.length > 0) {
          this.products.set(prods);
        }
      }
    });
  }

  setLand(acres: number): void {
    this.formData.land_size_acres = acres;
  }

  getBadgeClass(pct: number): string {
    if (pct >= 100) return 'badge-100';
    if (pct >= 75) return 'badge-75';
    return 'badge-50';
  }

  getWhatsAppText(res: SubsidyCalculationResult): string {
    const text = `வணக்கம் Thozhan Irrigation, நான் அரசு மானிய கணக்கீட்டு மேற்கோள் விவரம் அறிய விரும்புகிறேன்:\n\n` +
      `Quote ID: #${res.quote_id}\n` +
      `விவசாயி: ${res.farmer_name}\n` +
      `மாவட்டம்: ${this.formData.district}\n` +
      `பாசனம்: ${res.product_title}\n` +
      `நிலம்: ${res.land_acres} ஏக்கர்\n` +
      `திட்ட மதிப்பு: ₹${res.project_cost}\n` +
      `மானிய தொகை (${res.subsidy_percent}%): ₹${res.subsidy_amount}\n` +
      `விவசாயி பங்கு: ₹${res.farmer_contribution}\n\n` +
      `அடுத்த கட்ட ஆவண சரிபார்ப்பு மற்றும் தளம் பார்வையிடலுக்கு உதவவும்.`;
    return encodeURIComponent(text);
  }

  calculate(): void {
    if (!this.formData.farmer_name.trim()) {
      this.errorMessage.set('Please enter the farmer name.');
      return;
    }
    if (!this.formData.phone_number.trim()) {
      this.errorMessage.set('Please enter a valid mobile number.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const payload: SubsidyCalculationInput = {
      farmer_name: this.formData.farmer_name.trim(),
      phone_number: this.formData.phone_number.trim(),
      district: this.formData.district,
      product_id: Number(this.formData.product_id),
      land_size_acres: Number(this.formData.land_size_acres)
    };

    this.apiService.calculateSubsidy(payload).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.result.set(res);
      },
      error: (err) => {
        this.loading.set(false);
        console.error('Subsidy calculation error:', err);
        // Fallback local computation if offline / backend unreachable
        this.computeLocalFallback(payload);
      }
    });
  }

  private computeLocalFallback(payload: SubsidyCalculationInput): void {
    const prod = this.products().find(p => p.id === payload.product_id) || this.products()[0];
    const acres = payload.land_size_acres;
    const projectCost = Math.round(prod.price_numeric * acres);

    let subsidyPct = 50;
    let tierLabel = '50% Custom Plan (>12 Acres)';
    let explanation = 'Above 12 Acres: 50% subsidy available. Contact us for a custom phased installation plan.';

    if (acres <= 5.0) {
      subsidyPct = 100;
      tierLabel = '100% Grant — Small Farmer (சிறு/குறு விவசாயி)';
      explanation = 'Under 5 Acres: Tamil Nadu Govt covers the full installation cost under the PMKSY small farmer scheme.';
    } else if (acres <= 12.0) {
      subsidyPct = 75;
      tierLabel = '75% Grant — Other Farmer';
      explanation = '5.1–12 Acres: 75% cost covered under TN Horticulture Dept scheme. You pay only 25%.';
    }

    const subsidyAmount = Math.round(projectCost * (subsidyPct / 100));
    const farmerContribution = Math.max(0, projectCost - subsidyAmount);

    this.result.set({
      status: 'success',
      quote_id: Math.floor(1000 + Math.random() * 9000),
      farmer_name: payload.farmer_name,
      product_title: prod.title_en,
      land_acres: acres,
      project_cost: projectCost,
      subsidy_amount: subsidyAmount,
      farmer_contribution: farmerContribution,
      subsidy_percent: subsidyPct,
      tier_label: tierLabel,
      explanation: explanation
    });
  }
}
