import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/interfaces';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="services-wrapper">
      <!-- Header Banner -->
      <section class="section section-dark text-center services-header">
        <div class="container-narrow">
          <span class="section-eyebrow eyebrow-dark">
            <i class="fa-solid fa-certificate"></i> Government Authorized Equipment
          </span>
          <h1 class="section-title">Complete Irrigation Solutions for Every Farm</h1>
          <p class="section-subtitle">
            Explore durable micro-irrigation systems engineered for high water uniformity, low pressure loss, and maximum crop yield across Tamil Nadu.
          </p>
        </div>
      </section>

      <!-- Main Solutions Catalog -->
      <section class="section section-light">
        <div class="container-wide">
          <!-- Search & Controls Bar -->
          <div class="catalog-controls-bar">
            <div class="search-input-wrap">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <input 
                type="text" 
                class="search-input" 
                placeholder="Search irrigation systems, crop suitability, or components..."
                [value]="searchQuery()"
                (input)="onSearchInput($event)" />
              @if (searchQuery()) {
                <button class="clear-search-btn" (click)="searchQuery.set('')">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              }
            </div>

            <div class="sort-select-wrap">
              <label class="sort-label"><i class="fa-solid fa-arrow-down-wide-short"></i> Sort by:</label>
              <select class="sort-select" (change)="onSortChange($event)">
                <option value="default">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          <!-- Filter Tabs & Catalog Download -->
          <div class="filter-bar-row">
            <div class="filter-bar">
              @for (filter of filters; track filter) {
                <button 
                  class="filter-btn" 
                  [class.active]="activeFilter() === filter"
                  (click)="setFilter(filter)">
                  {{ filter }}
                </button>
              }
            </div>
            <a href="docs/Thozhan_Irrigation_Catalog_2026.pdf" download="Thozhan_Irrigation_Catalog_2026.pdf" class="btn btn-outline-light btn-sm catalog-btn">
              <i class="fa-solid fa-file-arrow-down"></i>
              <span>Download 2026 Catalog (PDF)</span>
            </a>
          </div>

          <!-- Product Cards Grid -->
          <div class="grid-3 animate-fade">
            @for (product of filteredProducts(); track product.id) {
              <div class="card-light product-card hover-lift">
                <!-- Product Image -->
                <div class="product-img-box" (click)="openProductModal(product)">
                  <img [src]="getProductImage(product)" [alt]="product.title_en" class="product-img" />
                  <span class="category-badge">{{ getProductCategory(product) }}</span>
                  <div class="img-hover-overlay">
                    <span class="overlay-pill"><i class="fa-solid fa-magnifying-glass-plus"></i> View Full Specs</span>
                  </div>
                </div>

                <div class="product-content">
                  <!-- Header: Title & Tamil Name -->
                  <div class="product-title-wrap">
                    <h3 class="product-title" (click)="openProductModal(product)">{{ product.title_en }}</h3>
                    <span class="product-ta">{{ product.title_ta }}</span>
                  </div>

                  <!-- Price & Subsidy Tag -->
                  <div class="price-strip">
                    <div class="price-val">
                      <span class="currency">₹</span>
                      <span class="amount">{{ product.price_numeric.toLocaleString('en-IN') }}</span>
                      <span class="unit">{{ product.price_unit_text }}</span>
                    </div>

                    @if (product.is_subsidy_eligible) {
                      <span class="tag tag-mint">
                        <i class="fa-solid fa-circle-check"></i> Subsidy Eligible
                      </span>
                    } @else {
                      <span class="tag tag-amber">
                        <i class="fa-solid fa-circle-info"></i> Direct Purchase
                      </span>
                    }
                  </div>

                  <p class="product-desc">{{ product.desc }}</p>

                  <!-- Toggle Specs Accordion -->
                  <button class="specs-toggle-btn" (click)="toggleSpecs(product.id)">
                    <span>{{ expanded() === product.id ? 'Hide Specifications' : 'View Specifications' }}</span>
                    <i class="fa-solid" [class.fa-chevron-up]="expanded() === product.id" [class.fa-chevron-down]="expanded() !== product.id"></i>
                  </button>

                  @if (expanded() === product.id) {
                    <ul class="specs-box animate-fade">
                      @for (spec of getProductSpecs(product); track spec) {
                        <li>
                          <i class="fa-solid fa-circle-check text-brand"></i>
                          <span>{{ spec }}</span>
                        </li>
                      }
                    </ul>
                  }

                  <!-- Card Action CTAs -->
                  <div class="product-actions">
                    <button type="button" class="btn btn-outline-light btn-sm btn-icon" (click)="downloadBrochure(product)" title="Download Engineering Spec Sheet">
                      <i class="fa-solid fa-file-pdf"></i>
                    </button>
                    <a routerLink="/pricing" class="btn btn-amber btn-sm flex-1">
                      <i class="fa-solid fa-calculator"></i> Get Estimate
                    </a>
                    <a href="https://wa.me/919489528432?text=Hello,%20I%20am%20interested%20in%20learning%20more%20about%20the%20{{ product.title_en }}."
                       target="_blank"
                       rel="noopener noreferrer"
                       class="btn btn-whatsapp btn-sm flex-1">
                      <i class="fa-brands fa-whatsapp"></i> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>

          @if (filteredProducts().length === 0) {
            <div class="no-results-box text-center p-12">
              <i class="fa-solid fa-seedling text-4xl text-secondary mb-3"></i>
              <h3 class="text-lg font-bold">No matching equipment found</h3>
              <p class="text-secondary text-sm mb-4">Try clearing your search query or switching category filters.</p>
              <button class="btn btn-outline-light btn-sm" (click)="resetFilters()">
                Reset All Filters
              </button>
            </div>
          }
        </div>
      </section>

      <!-- Detailed Product Specification Modal -->
      @if (activeModalProduct(); as modalP) {
        <div class="modal-backdrop animate-fade" (click)="activeModalProduct.set(null)">
          <div class="modal-dialog card-light" (click)="$event.stopPropagation()">
            <div class="modal-header">
              <div>
                <span class="category-badge modal-cat">{{ getProductCategory(modalP) }}</span>
                <h3 class="modal-title">{{ modalP.title_en }}</h3>
                <span class="modal-ta">{{ modalP.title_ta }}</span>
              </div>
              <button class="modal-close-btn" (click)="activeModalProduct.set(null)">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="modal-body">
              <div class="modal-img-wrap">
                <img [src]="getProductImage(modalP)" [alt]="modalP.title_en" class="modal-img" />
              </div>

              <div class="modal-info">
                <div class="price-val mb-4">
                  <span class="currency">₹</span>
                  <span class="amount">{{ modalP.price_numeric.toLocaleString('en-IN') }}</span>
                  <span class="unit">{{ modalP.price_unit_text }}</span>
                  @if (modalP.is_subsidy_eligible) {
                    <span class="tag tag-mint ml-2">Up to 100% Subsidy Eligible</span>
                  }
                </div>

                <p class="text-secondary text-sm mb-6">{{ modalP.desc }}</p>

                <h4 class="text-sm font-bold uppercase tracking-wider text-muted mb-3">Engineering Specifications</h4>
                <ul class="specs-box mb-6">
                  @for (spec of getProductSpecs(modalP); track spec) {
                    <li>
                      <i class="fa-solid fa-circle-check text-brand"></i>
                      <span>{{ spec }}</span>
                    </li>
                  }
                </ul>

                <div class="modal-actions">
                  <button type="button" (click)="downloadBrochure(modalP)" class="btn btn-outline-light btn-md">
                    <i class="fa-solid fa-file-pdf"></i> Spec Sheet
                  </button>
                  <a routerLink="/pricing" (click)="activeModalProduct.set(null)" class="btn btn-amber btn-md flex-1">
                    <i class="fa-solid fa-calculator"></i> Calculate Subsidy Tier
                  </a>
                  <a [href]="'https://wa.me/919489528432?text=Hello,%20I%20would%20like%20a%20detailed%20quotation%20for%20' + modalP.title_en"
                     target="_blank"
                     rel="noopener noreferrer"
                     class="btn btn-whatsapp btn-md flex-1">
                    <i class="fa-brands fa-whatsapp"></i> Request Official Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- Engineering Cross-Section & Component Diagram Section -->
      <section class="section section-soft technical-diagram-section">
        <div class="container-wide">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-microchip"></i> Internal Engineering Architecture
            </span>
            <h2 class="section-title">Anatomy of a High-Uniformity Irrigation System</h2>
            <p class="section-subtitle">
              Built with precision-molded polymers, UV inhibitors, and hydrodynamic labyrinth channels that maintain uniform discharge even on undulating terrain.
            </p>
          </div>

          <div class="grid-2 diagram-layout-grid items-center">
            <!-- Left: PC Emitter Cross-Section Visualizer -->
            <div class="card-light diagram-card p-8">
              <div class="diagram-tag-row">
                <span class="tag tag-mint"><i class="fa-solid fa-circle-check"></i> BIS IS 13487 Certified</span>
                <span class="diagram-label">Inline Drip Emitter Cutaway</span>
              </div>
              <h3 class="text-xl font-bold text-forest mb-4">Pressure-Compensating (PC) Labyrinth Core</h3>
              <p class="text-secondary text-sm mb-6 leading-relaxed">
                Unlike simple drilled holes that over-water at lower slopes and starve elevated plants, our emitters utilize dynamic silicone diaphragms that flex under changing inlet pressures to deliver an exact 4.0 LPH droplet volume.
              </p>

              <!-- SVG Technical Cutaway Diagram -->
              <div class="svg-schematic-box">
                <svg viewBox="0 0 460 160" class="cutaway-svg">
                  <!-- Pipe Wall -->
                  <rect x="20" y="20" width="420" height="30" rx="6" fill="#132E15" />
                  <rect x="20" y="110" width="420" height="30" rx="6" fill="#132E15" />
                  <!-- Water Channel -->
                  <rect x="20" y="50" width="420" height="60" fill="#EBF3FA" />
                  <line x1="20" y1="80" x2="440" y2="80" stroke="#0066CC" stroke-width="2" stroke-dasharray="6,4" />

                  <!-- Emitter Body Embedded in Pipe -->
                  <rect x="130" y="60" width="200" height="40" rx="8" fill="#1E4620" stroke="#FFCC00" stroke-width="2" />
                  <!-- Labyrinth Teeth -->
                  <path d="M140 70 L150 90 L160 70 L170 90 L180 70 L190 90 L200 70" fill="none" stroke="#FFCC00" stroke-width="2.5" />
                  <!-- Flexible Diaphragm -->
                  <line x1="215" y1="72" x2="265" y2="72" stroke="#238636" stroke-width="4" stroke-linecap="round" />
                  <!-- Regulated Droplet Exit -->
                  <circle cx="295" cy="80" r="5" fill="#00E5FF" />
                  <path d="M295 105 L295 135" stroke="#0066CC" stroke-width="2.5" stroke-dasharray="3,3" />
                  <circle cx="295" cy="145" r="4" fill="#0066CC" />

                  <!-- Labels -->
                  <text x="50" y="40" fill="#FFFFFF" font-size="10" font-weight="700">16mm HDPE Pipe</text>
                  <text x="145" y="55" fill="#FFCC00" font-size="9" font-weight="800">Turbulent Labyrinth</text>
                  <text x="215" y="62" fill="#238636" font-size="9" font-weight="800">Silicone Diaphragm</text>
                  <text x="310" y="148" fill="#0066CC" font-size="10" font-weight="800">4 LPH Constant</text>
                </svg>
              </div>

              <div class="schematic-specs-strip mt-6">
                <div class="spec-col">
                  <span class="label">Operating Pressure</span>
                  <strong>0.8 – 3.5 Bar</strong>
                </div>
                <div class="spec-col">
                  <span class="label">Discharge Tolerance</span>
                  <strong>± 3% Uniformity</strong>
                </div>
                <div class="spec-col">
                  <span class="label">UV Stabilization</span>
                  <strong>Carbon Black 2.5%</strong>
                </div>
              </div>
            </div>

            <!-- Right: Disc Filtration Cutaway -->
            <div class="card-light diagram-card p-8">
              <div class="diagram-tag-row">
                <span class="tag tag-mint"><i class="fa-solid fa-filter"></i> 130 Micron Mesh</span>
                <span class="diagram-label">Filtration Assembly</span>
              </div>
              <h3 class="text-xl font-bold text-forest mb-4">Grooved Disc Depth Filtration</h3>
              <p class="text-secondary text-sm mb-6 leading-relaxed">
                Stacked circular polypropylene rings with micro-grooves compress together under hydraulic pressure to trap inorganic silt, sand particles, and organic algae before they reach farm emitters.
              </p>

              <div class="filter-flow-steps">
                <div class="flow-step-box">
                  <div class="step-num-pill">1</div>
                  <div>
                    <strong class="text-forest text-sm">Borewell Raw Inlet</strong>
                    <p class="text-xs text-secondary">High-velocity water enters tangential spin chamber.</p>
                  </div>
                </div>
                <div class="flow-step-box">
                  <div class="step-num-pill">2</div>
                  <div>
                    <strong class="text-forest text-sm">Disc Stack Trapping</strong>
                    <p class="text-xs text-secondary">Silt is captured across three-dimensional disc groove intersections.</p>
                  </div>
                </div>
                <div class="flow-step-box">
                  <div class="step-num-pill">3</div>
                  <div>
                    <strong class="text-forest text-sm">Rapid Manual / Auto Flush</strong>
                    <p class="text-xs text-secondary">Quarter-turn ball valve ejects collected particulates in seconds.</p>
                  </div>
                </div>
              </div>

              <div class="mt-8 flex gap-3">
                <a routerLink="/pricing" class="btn btn-amber btn-sm flex-1">
                  <i class="fa-solid fa-calculator"></i> Calculate Subsidy for this Setup
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- System Comparison Matrix Section -->
      <section class="section section-light">
        <div class="container-wide">
          <div class="section-header text-center">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-code-compare"></i> Equipment Comparison
            </span>
            <h2 class="section-title">Irrigation Technologies Comparison Matrix</h2>
            <p class="section-subtitle">
              Compare water conservation efficiencies, operating pressure metrics, and government grant qualifications to pick the right engineering package for your crops.
            </p>
          </div>

          <div class="comparison-table-wrap card-light">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Irrigation Technology</th>
                  <th>Water Savings</th>
                  <th>Operating Pressure</th>
                  <th>Recommended Crops</th>
                  <th>Govt. Subsidy Tier</th>
                  <th>Direct Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="tech-cell">
                      <i class="fa-solid fa-faucet-drip text-brand"></i>
                      <div>
                        <strong>Inline Drip Irrigation</strong>
                        <span class="text-xs text-muted">Micro-irrigation</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="stat-highlight text-brand">60% – 70%</span></td>
                  <td>1.0 – 2.0 Bar</td>
                  <td>Banana, Coconut, Vegetables, Mango, Cotton</td>
                  <td><span class="tag tag-mint">100% / 75% PMKSY</span></td>
                  <td><a routerLink="/pricing" class="btn btn-amber btn-xs">Estimate</a></td>
                </tr>
                <tr>
                  <td>
                    <div class="tech-cell">
                      <i class="fa-solid fa-sprinkler text-blue"></i>
                      <div>
                        <strong>Micro Sprinklers</strong>
                        <span class="text-xs text-muted">Overhead misting</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="stat-highlight text-blue">40% – 50%</span></td>
                  <td>2.0 – 3.0 Bar</td>
                  <td>Groundnut, Pulses, Tea, Nursery beds</td>
                  <td><span class="tag tag-mint">100% / 75% PMKSY</span></td>
                  <td><a routerLink="/pricing" class="btn btn-outline-light btn-xs">Estimate</a></td>
                </tr>
                <tr>
                  <td>
                    <div class="tech-cell">
                      <i class="fa-solid fa-cloud-showers-water text-amber"></i>
                      <div>
                        <strong>Rain Gun Cannons</strong>
                        <span class="text-xs text-muted">High-throw radius</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="stat-highlight">30% – 40%</span></td>
                  <td>3.0 – 5.0 Bar</td>
                  <td>Sugarcane, Fodder Grass, Maize</td>
                  <td><span class="tag tag-amber">Direct Purchase</span></td>
                  <td><a routerLink="/contact" class="btn btn-outline-light btn-xs">Inquire</a></td>
                </tr>
                <tr>
                  <td>
                    <div class="tech-cell">
                      <i class="fa-solid fa-solar-panel text-amber"></i>
                      <div>
                        <strong>Solar Agri Pumping</strong>
                        <span class="text-xs text-muted">Off-grid renewable</span>
                      </div>
                    </div>
                  </td>
                  <td><span class="stat-highlight text-brand">Zero Grid Power</span></td>
                  <td>1.5 – 4.0 Bar</td>
                  <td>Borewells & Open Wells in remote acreage</td>
                  <td><span class="tag tag-mint">PM-KUSUM Subsidy</span></td>
                  <td><a routerLink="/pricing" class="btn btn-amber btn-xs">Estimate</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Bottom Consultation Strip -->
      <section class="section section-cream text-center">
        <div class="container-narrow">
          <h3 class="section-title" style="font-size: 1.75rem;">Need a Custom Farm Layout?</h3>
          <p class="section-subtitle mb-6">
            Our certified agricultural field technicians provide on-site land surveying, water quality testing, and hydraulic pressure layout planning across Tamil Nadu.
          </p>
          <div class="flex-center gap-4 flex-wrap">
            <a routerLink="/contact" class="btn btn-primary btn-md">
              <i class="fa-solid fa-calendar-check"></i> Book On-Site Survey
            </a>
            <a href="tel:9489528432" class="btn btn-outline-light btn-md">
              <i class="fa-solid fa-phone"></i> Call Office: 94895 28432
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .services-header {
      padding: 4.5rem 1.5rem 4rem;
    }
    
  .filter-bar-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  .catalog-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    border-color: var(--brand-forest);
    color: var(--brand-forest);
  }
  .catalog-btn:hover {
    background-color: var(--forest-light);
    border-color: var(--brand-forest);
    color: var(--brand-forest);
  }
  .btn-icon {
    padding: 0.45rem 0.65rem;
    font-size: 0.9rem;
  }

  .filter-bar {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .filter-btn {
      padding: 0.55rem 1.25rem;
      border-radius: var(--radius-full);
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--text-secondary);
      background-color: var(--cream-warm);
      border: 1px solid var(--border-light);
      transition: var(--transition-fast);
      cursor: pointer;
    }
    .filter-btn:hover {
      background-color: var(--mint-soft);
      color: var(--brand-main);
    }
    .filter-btn.active {
      background-color: var(--forest-deep);
      color: var(--white);
      border-color: var(--forest-deep);
      box-shadow: 0 4px 12px rgba(6, 59, 41, 0.2);
    }

    .product-card {
      display: flex;
      flex-direction: column;
      padding: 1.25rem;
    }
    .product-img-box {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      aspect-ratio: 16/10;
      background-color: #E8F2EC;
      margin-bottom: 1.25rem;
    }
    .product-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .category-badge {
      position: absolute;
      top: 0.75rem;
      left: 0.75rem;
      background: rgba(8, 39, 29, 0.85);
      color: var(--white);
      font-size: 0.7rem;
      font-weight: 700;
      padding: 0.25rem 0.65rem;
      border-radius: var(--radius-full);
    }

    .product-content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .product-title-wrap {
      margin-bottom: 0.875rem;
    }
    .product-title {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1.25;
    }
    .product-ta {
      display: block;
      font-size: 0.8125rem;
      color: var(--brand-main);
      font-weight: 600;
      margin-top: 0.2rem;
    }

    .price-strip {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 1rem;
      padding-bottom: 0.875rem;
      border-bottom: 1px solid var(--border-subtle);
    }
    .price-val {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--forest-deep);
    }
    .price-val .currency { font-size: 0.95rem; }
    .price-val .unit { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }

    .product-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.55;
      margin-bottom: 1.25rem;
      flex: 1;
    }

    .specs-toggle-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      background: var(--cream-warm);
      border: 1px solid var(--border-light);
      padding: 0.5rem 0.875rem;
      border-radius: var(--radius-md);
      font-size: 0.8125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
      cursor: pointer;
    }
    .specs-toggle-btn:hover {
      background: var(--mint-soft);
      color: var(--brand-main);
    }
    .specs-box {
      list-style: none;
      padding: 0.875rem 1rem;
      background: #FAFCFA;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .specs-box li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: var(--text-primary);
    }
    .text-brand { color: var(--brand-main); }

    .product-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: auto;
      border-top: 1px solid var(--border-subtle);
      padding-top: 1rem;
    }

    /* Controls Bar & Search */
    .catalog-controls-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.25rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }
    .search-input-wrap {
      position: relative;
      flex: 1;
      min-width: 280px;
    }
    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 0.875rem;
    }
    .search-input {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 2.5rem;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-light);
      background: var(--white);
      font-size: 0.875rem;
      color: var(--text-primary);
      outline: none;
      transition: var(--transition-fast);
    }
    .search-input:focus {
      border-color: var(--brand-main);
      box-shadow: 0 0 0 3px rgba(30, 70, 32, 0.12);
    }
    .clear-search-btn {
      position: absolute;
      right: 0.875rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      cursor: pointer;
    }
    .sort-select-wrap {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
    }
    .sort-label {
      color: var(--text-secondary);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .sort-select {
      padding: 0.6rem 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-light);
      background: var(--white);
      color: var(--text-primary);
      font-size: 0.875rem;
      font-weight: 600;
      outline: none;
      cursor: pointer;
    }

    .img-hover-overlay {
      position: absolute;
      inset: 0;
      background: rgba(14, 36, 16, 0.65);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: var(--transition-fast);
      cursor: pointer;
    }
    .product-img-box:hover .img-hover-overlay {
      opacity: 1;
    }
    .overlay-pill {
      background: var(--white);
      color: var(--forest-deep);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.4rem 0.85rem;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    /* Modal Dialog */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .modal-dialog {
      background: var(--white);
      border-radius: var(--radius-lg);
      max-width: 640px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 2rem;
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
      position: relative;
    }
    .modal-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    .modal-title {
      font-size: 1.35rem;
      font-weight: 800;
      color: var(--forest-deep);
      margin-top: 0.25rem;
    }
    .modal-ta {
      font-size: 0.875rem;
      color: var(--brand-main);
      font-weight: 600;
    }
    .modal-close-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--cream-warm);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      cursor: pointer;
      flex-shrink: 0;
    }
    .modal-close-btn:hover {
      background: var(--mint-soft);
      color: var(--brand-main);
    }
    .modal-img-wrap {
      border-radius: var(--radius-md);
      overflow: hidden;
      aspect-ratio: 16/9;
      background: var(--cream-warm);
      margin-bottom: 1.5rem;
    }
    .modal-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .modal-actions {
      display: flex;
      gap: 0.75rem;
    }
    @media (max-width: 640px) {
      .modal-actions { flex-direction: column; }
    }

    /* Technical Schematics & Diagrams */
    .technical-diagram-section {
      padding: 5rem 1.5rem;
    }
    .diagram-layout-grid {
      gap: 2rem;
      margin-top: 1.5rem;
    }
    .diagram-card {
      border: 1px solid var(--border-light);
    }
    .diagram-tag-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .diagram-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .svg-schematic-box {
      background: #F1F6F0;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 1rem;
      overflow: hidden;
    }
    .cutaway-svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .schematic-specs-strip {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      border-top: 1px solid var(--border-light);
      padding-top: 1rem;
    }
    .spec-col {
      display: flex;
      flex-direction: column;
    }
    .spec-col .label {
      font-size: 0.6875rem;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 0.2rem;
    }
    .spec-col strong {
      font-size: 0.8125rem;
      color: var(--forest-deep);
    }

    .filter-flow-steps {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .flow-step-box {
      display: flex;
      align-items: flex-start;
      gap: 0.875rem;
      background: #FAFCFA;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-md);
      padding: 1rem;
    }
    .step-num-pill {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--forest-deep);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 800;
      flex-shrink: 0;
    }

    /* Comparison Table */
    .comparison-table-wrap {
      overflow-x: auto;
      border: 1px solid var(--border-light);
      border-radius: var(--radius-lg);
      margin-top: 1.5rem;
    }
    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.875rem;
    }
    .comparison-table th {
      background: var(--soft-green);
      padding: 1rem 1.25rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--forest-deep);
      border-bottom: 1px solid var(--border-light);
    }
    .comparison-table td {
      padding: 1.25rem;
      border-bottom: 1px solid var(--border-subtle);
      color: var(--text-primary);
    }
    .comparison-table tr:last-child td {
      border-bottom: none;
    }
    .tech-cell {
      display: flex;
      align-items: center;
      gap: 0.875rem;
    }
    .tech-cell i {
      font-size: 1.25rem;
      width: 28px;
      text-align: center;
    }
    .stat-highlight {
      font-weight: 800;
      font-size: 0.9375rem;
    }
  `]
})
export class ServicesComponent implements OnInit {
  private apiService = inject(ApiService);
  
  defaultProducts: Product[] = [
    {
      id: 1,
      title_en: 'Drip Irrigation Kit',
      title_ta: 'சொட்டு நீர் பாசன அமைப்பு',
      desc: 'High-uniformity inline micro-drip system with pressure compensating emitters for row crops, fruits, and plantations.',
      price_numeric: 24500,
      price_unit_text: '/ Acre',
      icon_class: 'fa-faucet-drip',
      image_url: 'photos/drip.png',
      is_subsidy_eligible: true
    },
    {
      id: 2,
      title_en: 'Micro Sprinkler System',
      title_ta: 'தெளிப்பு நீர் பாசன அமைப்பு',
      desc: 'Overhead micro-irrigation system designed for uniform soil moisture distribution in open fields, nurseries, and pastures.',
      price_numeric: 18200,
      price_unit_text: '/ Acre',
      icon_class: 'fa-sprinkler',
      image_url: 'photos/sprinkler.png',
      is_subsidy_eligible: true
    },
    {
      id: 3,
      title_en: 'Rain Gun Irrigation',
      title_ta: 'மழை துப்பாக்கி பாசனம்',
      desc: 'High-discharge, long-radius watering system capable of covering up to an acre per station with adjustable trajectories.',
      price_numeric: 32000,
      price_unit_text: '/ Unit',
      icon_class: 'fa-cloud-showers-water',
      image_url: 'photos/raingun.png',
      is_subsidy_eligible: false
    },
    {
      id: 4,
      title_en: 'Solar Agri Pump Integration',
      title_ta: 'சூரிய ஒளி பம்ப் செட்',
      desc: 'Sustainable, grid-independent solar pumping system with MPPT smart controller and automatic water level protection.',
      price_numeric: 85000,
      price_unit_text: '/ Unit',
      icon_class: 'fa-solar-panel',
      image_url: 'photos/solar.png',
      is_subsidy_eligible: true
    },
    {
      id: 5,
      title_en: 'Disc Filtration & Fertigation Unit',
      title_ta: 'வடிகட்டி மற்றும் உர பாசன அலகு',
      desc: 'Heavy-duty 2" dual disc filter with integrated Venturi chemical injector and differential pressure gauges for clog-free flow.',
      price_numeric: 14500,
      price_unit_text: '/ Unit',
      icon_class: 'fa-filter',
      image_url: 'photos/drip.png',
      is_subsidy_eligible: true
    },
    {
      id: 6,
      title_en: 'BIS HDPE Mainline Pipes & Couplers',
      title_ta: 'HDPE பிரதான குழாய்கள்',
      desc: 'ISI certified 63mm & 75mm UV-stabilized virgin polyethylene delivery conduits with leak-proof quick compression couplers.',
      price_numeric: 8200,
      price_unit_text: '/ Bundle',
      icon_class: 'fa-lines-leaning',
      image_url: 'photos/sprinkler.png',
      is_subsidy_eligible: true
    }
  ];

  products = signal<Product[]>(this.defaultProducts);
  expanded = signal<number | null>(null);
  activeFilter = signal<string>('All');
  searchQuery = signal<string>('');
  sortBy = signal<string>('default');
  activeModalProduct = signal<Product | null>(null);

  filters = ['All', 'Drip', 'Sprinkler', 'Rain Gun', 'Solar', 'Filtration'];

  filteredProducts = computed(() => {
    let list = this.products();
    const filter = this.activeFilter();
    const query = this.searchQuery().trim().toLowerCase();

    // 1. Category Filter
    if (filter !== 'All') {
      list = list.filter(p => this.getProductCategory(p) === filter);
    }

    // 2. Search query filter
    if (query) {
      list = list.filter(p =>
        p.title_en.toLowerCase().includes(query) ||
        (p.title_ta && p.title_ta.toLowerCase().includes(query)) ||
        p.desc.toLowerCase().includes(query)
      );
    }

    // 3. Sorting
    const sort = this.sortBy();
    if (sort === 'price-asc') {
      return [...list].sort((a, b) => a.price_numeric - b.price_numeric);
    } else if (sort === 'price-desc') {
      return [...list].sort((a, b) => b.price_numeric - a.price_numeric);
    } else if (sort === 'name') {
      return [...list].sort((a, b) => a.title_en.localeCompare(b.title_en));
    }

    return list;
  });

  ngOnInit() {
    this.apiService.getProducts().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.products.set(res);
        }
      },
      error: () => console.log('Using default products')
    });
  }

  onSearchInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.searchQuery.set(val);
  }

  onSortChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.sortBy.set(val);
  }

  openProductModal(product: Product) {
    this.activeModalProduct.set(product);
  }

  resetFilters() {
    this.searchQuery.set('');
    this.activeFilter.set('All');
    this.sortBy.set('default');
  }

  downloadBrochure(product?: Product) {
    if (!product) {
      window.open('docs/Thozhan_Irrigation_Catalog_2026.pdf', '_blank');
      return;
    }

    const specs = this.getProductSpecs(product);
    const category = this.getProductCategory(product);
    const printWindow = window.open('', '_blank', 'width=800,height=900');
    if (!printWindow) {
      window.open('docs/Thozhan_Irrigation_Catalog_2026.pdf', '_blank');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Technical Specification - ${product.title_en} | Thozhan Irrigation</title>
        <style>
          body { font-family: 'Segoe UI', system-ui, sans-serif; margin: 0; padding: 40px; color: #202820; background: #fff; line-height: 1.5; }
          .header { border-bottom: 2px solid #1E4620; padding-bottom: 20px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-start; }
          .logo-title { font-size: 24px; font-weight: 800; color: #1E4620; margin: 0; }
          .logo-sub { font-size: 13px; color: #667085; margin: 4px 0 0 0; }
          .gst-badge { background: #EFF4EF; color: #1E4620; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; text-align: right; }
          .product-hero { margin-bottom: 25px; }
          .badge { display: inline-block; background: #EBF3FA; color: #0066CC; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
          .title { font-size: 26px; font-weight: 800; color: #10231B; margin: 0 0 4px 0; }
          .tamil-title { font-size: 17px; color: #1E4620; font-weight: 600; margin-bottom: 12px; }
          .price-box { background: #F7F9F7; border: 1px solid #E3E9E3; border-radius: 8px; padding: 15px 20px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
          .price-val { font-size: 22px; font-weight: 800; color: #10231B; }
          .subsidy-tag { background: #238636; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 700; }
          .section-title { font-size: 15px; font-weight: 700; color: #10231B; border-bottom: 1px solid #E3E9E3; padding-bottom: 8px; margin-top: 25px; margin-bottom: 15px; }
          .specs-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          .specs-table td { padding: 10px 14px; border-bottom: 1px solid #E3E9E3; font-size: 13.5px; }
          .specs-table tr:nth-child(even) { background-color: #F7F9F7; }
          .specs-table td:first-child { font-weight: 600; color: #1E4620; width: 35%; }
          .footer { margin-top: 40px; border-top: 1px solid #E3E9E3; padding-top: 20px; font-size: 12px; color: #667085; display: flex; justify-content: space-between; }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="logo-title">தோழன் இரிகேஷன் · THOZHAN IRRIGATION</h1>
            <p class="logo-sub">Smart Agricultural Irrigation Systems & PMKSY Subsidy Support</p>
          </div>
          <div class="gst-badge">
            Govt Authorized Dealer<br>GSTIN: 33BSXPJ5723P1ZX
          </div>
        </div>

        <div class="product-hero">
          <span class="badge">${category}</span>
          <h2 class="title">${product.title_en}</h2>
          <div class="tamil-title">${product.title_ta || ''}</div>
          <p style="color: #667085; font-size: 14px; margin-bottom: 15px;">${product.desc}</p>
        </div>

        <div class="price-box">
          <div>
            <span style="font-size: 12px; color: #667085; text-transform: uppercase; font-weight: 600;">Government Quoted Rate:</span><br>
            <span class="price-val">₹${product.price_numeric.toLocaleString('en-IN')} <span style="font-size: 14px; font-weight: 500; color: #667085;">${product.price_unit_text}</span></span>
          </div>
          ${product.is_subsidy_eligible ? '<span class="subsidy-tag">Up to 100% PMKSY Subsidy Available</span>' : ''}
        </div>

        <div class="section-title">ENGINEERING SPECIFICATIONS & COMPLIANCE</div>
        <table class="specs-table">
          ${specs.map((s, idx) => `<tr><td>Specification #${idx + 1}</td><td>${s}</td></tr>`).join('')}
          <tr><td>Quality Standards</td><td>Bureau of Indian Standards (BIS Certified) · ISI Marked</td></tr>
          <tr><td>Subsidy Schemes</td><td>PMKSY (Per Drop More Crop), TN Horticultural Dept Empaneled</td></tr>
          <tr><td>Warranty & Life</td><td>5-Year On-Site Equipment & Piping Warranty · 10+ Year Field Durability</td></tr>
        </table>

        <div class="footer">
          <div>
            <strong>Thozhan Irrigation Central Hub</strong><br>
            21-A, Vijaya Nagar, SSI ITI College Road, Seelapadi, Dindigul - 624 004<br>
            Farmer Helpline: +91 94895 28432 | Email: thozhanirrigation@gmail.com
          </div>
          <div style="text-align: right;">
            Official Spec Sheet · Generated on ${new Date().toLocaleDateString('en-IN')}<br>
            Serving 18 Tamil Nadu Districts
          </div>
        </div>

        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="background: #1E4620; color: #fff; border: none; padding: 10px 24px; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer;">
            Print / Save as PDF
          </button>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  getProductCategory(p: Product): string {
    const title = p.title_en.toLowerCase();
    if (title.includes('drip')) return 'Drip';
    if (title.includes('sprinkler')) return 'Sprinkler';
    if (title.includes('rain gun') || title.includes('raingun')) return 'Rain Gun';
    if (title.includes('solar')) return 'Solar';
    if (title.includes('filter') || title.includes('pipe') || title.includes('fertigation')) return 'Filtration';
    return 'Equipment';
  }

  getProductImage(p: Product): string {
    if (p.image_url && !p.image_url.startsWith('/photos/')) return p.image_url;
    const cat = this.getProductCategory(p);
    if (cat === 'Drip') return 'photos/drip.png';
    if (cat === 'Sprinkler') return 'photos/sprinkler.png';
    if (cat === 'Rain Gun') return 'photos/raingun.png';
    if (cat === 'Solar') return 'photos/solar.png';
    if (cat === 'Filtration') return 'photos/drip.png';
    return 'photos/drip.png';
  }

  getProductSpecs(p: Product): string[] {
    const cat = this.getProductCategory(p);
    if (cat === 'Drip') {
      return [
        '16mm UV-stabilized virgin HDPE lateral pipes',
        '4 LPH pressure-compensating clog-resistant drippers',
        'Heavy-duty disc / screen filter with pressure gauges',
        'Venturi fertilizer injector for automated fertigation'
      ];
    }
    if (cat === 'Sprinkler') {
      return [
        '360° rotary impact sprinklers with brass nozzles',
        'Quick-connect HDPE portable risers and coupler latches',
        'Uniform droplet size minimizing soil surface capping',
        'Operating pressure range: 2.0 to 3.5 kg/cm²'
      ];
    }
    if (cat === 'Rain Gun') {
      return [
        '1.5" and 2" nozzle size with adjustable stream breaker',
        'Heavy-duty galvanized tripod stand with secure anchoring',
        'Coverage radius: 25 to 45 meters per gun location',
        'Ideal for sugarcane, cotton, maize, and pasture forage'
      ];
    }
    if (cat === 'Solar') {
      return [
        '3HP / 5HP high-efficiency DC submersible pump set',
        'Tier-1 polycrystalline / monocrystalline solar PV panels',
        'MPPT hybrid inverter controller with auto-run timer',
        'Dry run sensor and borehole lightning surge protection'
      ];
    }
    if (cat === 'Filtration') {
      return [
        'Dual disc cartridge element with 130-micron mesh',
        'Venturi chemical injector with suction rate adjustment',
        'Dual glycerine-filled pressure monitoring gauges',
        'Manual flush ball valve for swift debris cleansing'
      ];
    }
    return [
      'BIS approved agricultural grade construction',
      'Govt. subsidy scheme inspection compliance'
    ];
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  toggleSpecs(id: number) {
    this.expanded.update(current => (current === id ? null : id));
  }
}
