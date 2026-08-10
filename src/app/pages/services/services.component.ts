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

      <div class="grid-3">
        @for (product of filteredProducts(); track product.id) {
          <div class="glass-card hover-lift">
            <div class="card-header">
              <i class="fa-solid {{ product.icon_class }} icon-large"></i>
              <div class="card-title-group">
                <h3>{{ product.title_en }}</h3>
                <span class="ta-title">{{ product.title_ta }}</span>
              </div>
            </div>
            
            <div class="price-tag">
              <span class="currency">₹</span>
              <span class="amount">{{ product.price_numeric }}</span>
              <span class="unit">{{ product.price_unit_text }}</span>
            </div>

            <p class="description">{{ product.description_en }}</p>
            
            @if (product.is_subsidy_eligible) {
              <span class="badge badge-green"><i class="fa-solid fa-check-circle"></i> Subsidy Eligible</span>
            }

            <button class="btn btn-secondary btn-sm toggle-specs" (click)="toggleSpecs(product.id)">
              {{ expanded() === product.id ? 'Hide Specs' : 'View Specs' }}
              <i class="fa-solid" [class.fa-chevron-up]="expanded() === product.id" [class.fa-chevron-down]="expanded() !== product.id"></i>
            </button>

            @if (expanded() === product.id) {
              <ul class="specs-list">
                @for (spec of product.specs; track spec) {
                  <li><i class="fa-solid fa-check"></i> {{ spec }}</li>
                }
              </ul>
            }

            <div class="card-actions">
              <a routerLink="/pricing" class="btn btn-primary btn-sm"><i class="fa-solid fa-calculator"></i> Calculate Subsidy</a>
              <a href="https://wa.me/919876543210" class="btn btn-whatsapp btn-sm"><i class="fa-brands fa-whatsapp"></i> Chat</a>
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
    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .icon-large {
      font-size: 2rem;
      color: var(--brand-400);
    }
    .card-title-group h3 {
      margin: 0;
      font-size: 1.25rem;
    }
    .ta-title {
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    .price-tag {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--gold);
      margin-bottom: 1rem;
    }
    .price-tag .currency { font-size: 1rem; }
    .price-tag .unit { font-size: 0.875rem; color: var(--text-muted); font-weight: normal; }
    .description {
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    .toggle-specs {
      margin-top: 1rem;
      width: 100%;
    }
    .specs-list {
      list-style: none;
      padding: 0;
      margin: 1rem 0;
    }
    .specs-list li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      color: var(--text-muted);
    }
    .specs-list li i {
      color: var(--brand-500);
    }
    .card-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
      margin-top: 1.5rem;
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
      description_en: 'Highly efficient drip irrigation kit suitable for row crops.',
      price_numeric: 24500,
      price_unit_text: '/ Acre',
      icon_class: 'fa-faucet-drip',
      is_subsidy_eligible: true,
      category: 'Drip',
      specs: ['16mm lateral pipe', '4 LPH drippers', 'Screen filter included']
    },
    {
      id: 2,
      title_en: 'Sprinkler System',
      title_ta: 'தெளிப்பு நீர் அமைப்பு',
      description_en: 'Robust sprinkler system for field crops and pastures.',
      price_numeric: 18200,
      price_unit_text: '/ Acre',
      icon_class: 'fa-sprinkler',
      is_subsidy_eligible: true,
      category: 'Sprinkler',
      specs: ['Impact sprinklers', 'HDPE pipes', 'Quick release couplings']
    },
    {
      id: 3,
      title_en: 'Rain Gun',
      title_ta: 'மழை துப்பாக்கி',
      description_en: 'High pressure rain gun for large coverage areas.',
      price_numeric: 32000,
      price_unit_text: '/ Unit',
      icon_class: 'fa-cloud-showers-water',
      is_subsidy_eligible: false,
      category: 'Rain Gun',
      specs: ['1.5" inlet', 'Adjustable trajectory', 'Heavy-duty stand']
    },
    {
      id: 4,
      title_en: 'Solar Pump',
      title_ta: 'சூரிய ஒளி பம்ப்',
      description_en: 'Eco-friendly solar water pumping solution.',
      price_numeric: 85000,
      price_unit_text: '/ Unit',
      icon_class: 'fa-solar-panel',
      is_subsidy_eligible: true,
      category: 'Solar',
      specs: ['5HP Submersible pump', 'High-efficiency panels', 'MPPT Controller']
    }
  ];

  products = signal<Product[]>(this.defaultProducts);
  expanded = signal<number | null>(null);
  activeFilter = signal<string>('All');
  filters = ['All', 'Drip', 'Sprinkler', 'Rain Gun', 'Solar'];

  filteredProducts = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') return this.products();
    return this.products().filter(p => p.category === filter);
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

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  toggleSpecs(id: number) {
    this.expanded.update(current => current === id ? null : id);
  }
}
