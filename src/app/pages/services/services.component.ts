import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/interfaces';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-content">
      <div class="section-header">
        <span class="label">Services & Equipment / சேவைகள்</span>
        <h2 class="hero-title">Our Solutions</h2>
        <p class="hero-subtitle">Advanced Irrigation Systems for Every Farm</p>
      </div>

      <div class="filter-bar">
        @for (filter of filters; track filter) {
          <button 
            class="btn btn-sm" 
            [class.btn-primary]="activeFilter() === filter"
            [class.btn-secondary]="activeFilter() !== filter"
            (click)="setFilter(filter)">
            {{ filter }}
          </button>
        }
      </div>

      <div class="grid-3 animate-fade">
        @for (product of filteredProducts(); track product.id) {
          <div class="glass-card hover-lift p-6 flex flex-col justify-between">
            <div>
              <div class="card-header flex items-center gap-3 mb-4">
                <div class="icon-circle flex-center">
                  <i class="fa-solid {{ product.icon_class || 'fa-seedling' }} icon-large"></i>
                </div>
                <div class="card-title-group">
                  <h3 class="text-white font-bold text-base">{{ product.title_en }}</h3>
                  <span class="ta-title text-brand font-semibold text-xs">{{ product.title_ta }}</span>
                </div>
              </div>
              
              <div class="price-tag text-white font-black text-lg mb-3">
                <span class="currency">₹</span>
                <span class="amount">{{ product.price_numeric.toLocaleString('en-IN') }}</span>
                <span class="unit text-xs text-muted font-normal"> {{ product.price_unit_text }}</span>
              </div>

              <p class="description text-muted text-xs leading-relaxed mb-4">{{ product.desc }}</p>
              
              <div class="mb-4">
                @if (product.is_subsidy_eligible) {
                  <span class="badge badge-green"><i class="fa-solid fa-check-circle"></i> Subsidy Eligible</span>
                } @else {
                  <span class="badge badge-amber"><i class="fa-solid fa-circle-info"></i> Standard Purchase</span>
                }
              </div>

              <button class="btn btn-secondary btn-sm toggle-specs w-full mb-4" (click)="toggleSpecs(product.id)">
                <span>{{ expanded() === product.id ? 'Hide Specs' : 'View Specs' }}</span>
                <i class="fa-solid" [class.fa-chevron-up]="expanded() === product.id" [class.fa-chevron-down]="expanded() !== product.id"></i>
              </button>

              @if (expanded() === product.id) {
                <ul class="specs-list bg-black/20 border border-brand-900/60 p-3 rounded-xl mb-4 space-y-1.5">
                  @for (spec of getProductSpecs(product); track spec) {
                    <li class="flex items-center gap-2 text-xs text-slate-300">
                      <i class="fa-solid fa-circle-check text-brand-400 text-[10px]"></i>
                      <span>{{ spec }}</span>
                    </li>
                  }
                </ul>
              }
            </div>

            <div class="card-actions grid-2 border-t border-brand-900/60 pt-4 mt-auto">
              <a routerLink="/pricing" class="btn btn-primary btn-sm justify-center"><i class="fa-solid fa-calculator"></i> Estimate</a>
              <a href="https://wa.me/919489528432" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm justify-center"><i class="fa-brands fa-whatsapp"></i> Chat</a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .filter-bar {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .icon-circle {
      width: 44px; height: 44px;
      background: rgba(34, 197, 94, 0.1);
      border-radius: 12px;
    }
    .icon-large {
      font-size: 1.25rem;
      color: var(--brand-400);
    }
    .ta-title {
      display: block;
    }
  `]
})
export class ServicesComponent implements OnInit {
  private apiService = inject(ApiService);
  
  defaultProducts: Product[] = [
    {
      id: 1,
      title_en: 'Drip Kit',
      title_ta: 'சொட்டு நீர் அமைப்பு',
      desc: 'Highly efficient drip irrigation kit suitable for row crops.',
      price_numeric: 24500,
      price_unit_text: '/ Acre',
      icon_class: 'fa-faucet-drip',
      image_url: '/photos/drip.png',
      is_subsidy_eligible: true
    },
    {
      id: 2,
      title_en: 'Sprinkler System',
      title_ta: 'தெளிப்பு நீர் அமைப்பு',
      desc: 'Robust sprinkler system for field crops and pastures.',
      price_numeric: 18200,
      price_unit_text: '/ Acre',
      icon_class: 'fa-sprinkler',
      image_url: '/photos/sprinkler.png',
      is_subsidy_eligible: true
    },
    {
      id: 3,
      title_en: 'Rain Gun',
      title_ta: 'மழை துப்பாக்கி',
      desc: 'High pressure rain gun for large coverage areas.',
      price_numeric: 32000,
      price_unit_text: '/ Unit',
      icon_class: 'fa-cloud-showers-water',
      image_url: '/photos/raingun.png',
      is_subsidy_eligible: false
    },
    {
      id: 4,
      title_en: 'Solar Pump',
      title_ta: 'சூரிய ஒளி பம்ப்',
      desc: 'Eco-friendly solar water pumping solution.',
      price_numeric: 85000,
      price_unit_text: '/ Unit',
      icon_class: 'fa-solar-panel',
      image_url: '/photos/solar.png',
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
    return 'Other';
  }

  getProductSpecs(p: Product): string[] {
    const title = p.title_en.toLowerCase();
    if (title.includes('drip')) {
      return ['16mm lateral pipe', '4 LPH drippers', 'Screen filter included', 'Fertilizer Venturi injector'];
    }
    if (title.includes('sprinkler')) {
      return ['Impact micro-sprinklers', 'HDPE high-pressure pipes', 'Quick-release couplings', '50-meter radius coverage'];
    }
    if (title.includes('rain gun') || title.includes('raingun')) {
      return ['1.5" nozzle inlet size', 'Adjustable trajectory angle', 'Heavy-duty tripod stand', 'Large acreage coverage'];
    }
    if (title.includes('solar')) {
      return ['5HP Submersible pump set', 'High-efficiency PV solar panels', 'MPPT hybrid controller', 'Auto water level controls'];
    }
    return ['State-of-the-art layout', 'Premium materials', 'Govt. approved quality standard'];
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  toggleSpecs(id: number) {
    this.expanded.update(current => current === id ? null : id);
  }
}
