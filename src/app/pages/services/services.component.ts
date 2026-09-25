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
          <!-- Filter Tabs -->
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

          <!-- Product Cards Grid -->
          <div class="grid-3 animate-fade">
            @for (product of filteredProducts(); track product.id) {
              <div class="card-light product-card hover-lift">
                <!-- Product Image -->
                <div class="product-img-box">
                  <img [src]="getProductImage(product)" [alt]="product.title_en" class="product-img" />
                  <span class="category-badge">{{ getProductCategory(product) }}</span>
                </div>

                <div class="product-content">
                  <!-- Header: Title & Tamil Name -->
                  <div class="product-title-wrap">
                    <h3 class="product-title">{{ product.title_en }}</h3>
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
    }
  ];

  products = signal<Product[]>(this.defaultProducts);
  expanded = signal<number | null>(null);
  activeFilter = signal<string>('All');
  filters = ['All', 'Drip', 'Sprinkler', 'Rain Gun', 'Solar'];

  filteredProducts = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.products();
    return this.products().filter(p => this.getProductCategory(p) === filter);
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

  getProductCategory(p: Product): string {
    const title = p.title_en.toLowerCase();
    if (title.includes('drip')) return 'Drip';
    if (title.includes('sprinkler')) return 'Sprinkler';
    if (title.includes('rain gun') || title.includes('raingun')) return 'Rain Gun';
    if (title.includes('solar')) return 'Solar';
    return 'Equipment';
  }

  getProductImage(p: Product): string {
    if (p.image_url && !p.image_url.startsWith('/photos/')) return p.image_url;
    const cat = this.getProductCategory(p);
    if (cat === 'Drip') return 'photos/drip.png';
    if (cat === 'Sprinkler') return 'photos/sprinkler.png';
    if (cat === 'Rain Gun') return 'photos/raingun.png';
    if (cat === 'Solar') return 'photos/solar.png';
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
