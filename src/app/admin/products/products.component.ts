import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/interfaces';

const MOCK_PRODUCTS: Product[] = [
  { id: 1, title_en: 'Drip Irrigation Kit', title_ta: 'சொட்டு நீர் பாசனம்', desc: 'Premium complete agricultural setup engineered for uniform watering.', price_numeric: 24500, price_unit_text: '/ Acre', icon_class: 'fa-faucet-drip', image_url: '/photos/drip.png', is_subsidy_eligible: true },
  { id: 2, title_en: 'Sprinkler Micro Head System', title_ta: 'தெளிப்பு நீர் பாசனம்', desc: 'High-pressure overhead misting systems optimized for open ground crops.', price_numeric: 18200, price_unit_text: '/ Acre', icon_class: 'fa-sprinkler', image_url: '/photos/sprinkler.png', is_subsidy_eligible: true },
  { id: 3, title_en: 'Rain Gun Irrigation System', title_ta: 'மழைக் பீரங்கி பாசனம்', desc: 'High-throw water cannon systems ideal for sugarcane and cotton.', price_numeric: 32000, price_unit_text: '/ Acre', icon_class: 'fa-cloud-showers-water', image_url: '/photos/raingun.png', is_subsidy_eligible: true },
  { id: 4, title_en: 'Solar Agri Pump Integration', title_ta: 'சோலார் பம்ப் செட்', desc: 'Grid-independent solar power pumping systems with auto controls.', price_numeric: 85000, price_unit_text: '/ Unit', icon_class: 'fa-solar-panel', image_url: '/photos/solar.png', is_subsidy_eligible: true }
];

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: `
  <div class="products-mgr">
    <div class="flex-between mb-6">
      <div>
        <h1 class="text-2xl font-black text-white">Equipment Catalog</h1>
        <p class="text-xs text-muted">Manage products, pricing, and subsidy eligibility settings</p>
      </div>
      <button class="btn btn-primary btn-sm" (click)="openAddModal()">
        <i class="fa-solid fa-plus"></i> Add Product
      </button>
    </div>

    <!-- Product Grid -->
    @if (loading()) {
      <div class="loading-center"><div class="spinner"></div><p>Loading products...</p></div>
    } @else {
      <div class="grid-2">
        @for (prod of products(); track prod.id) {
          <div class="glass-card p-6 flex flex-col justify-between hover-lift">
            <div>
              <div class="flex-between mb-4">
                <div class="icon-circle">
                  <i class="fa-solid {{ prod.icon_class || 'fa-seedling' }}"></i>
                </div>
                <div class="flex gap-2">
                  <span class="badge" [class]="prod.is_subsidy_eligible ? 'badge-green' : 'badge-red'">
                    {{ prod.is_subsidy_eligible ? 'Subsidy Eligible' : 'No Subsidy' }}
                  </span>
                </div>
              </div>

              <h3 class="text-white font-bold text-lg">{{ prod.title_en }}</h3>
              <h4 class="text-brand text-xs font-semibold mb-2">{{ prod.title_ta }}</h4>
              <p class="text-muted text-xs mb-4">{{ prod.desc }}</p>
              <div class="text-white font-black text-base mb-4">
                ₹{{ prod.price_numeric.toLocaleString('en-IN') }} <span class="text-xs text-muted font-normal">{{ prod.price_unit_text }}</span>
              </div>
            </div>

            <div class="flex gap-2 border-t border-brand-900/60 pt-4 mt-auto">
              <button class="btn btn-secondary btn-sm flex-1" (click)="openEditModal(prod)">
                <i class="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <button class="btn btn-danger btn-sm" (click)="deleteProduct(prod.id)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        }
      </div>
    }

    <!-- Product Modal -->
    @if (showModal()) {
      <div class="modal-backdrop animate-fade">
        <div class="modal-card">
          <div class="flex-between mb-4">
            <h2 class="text-lg font-black text-white">{{ isEdit() ? 'Edit Product' : 'Add New Product' }}</h2>
            <button class="close-btn" (click)="closeModal()"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <form [formGroup]="prodForm" (ngSubmit)="saveProduct()">
            <div class="form-grid mb-4">
              <div class="form-group">
                <label>Title (English)</label>
                <input class="form-control" formControlName="title_en" placeholder="e.g. Drip Irrigation Kit" />
              </div>
              <div class="form-group">
                <label>Title (Tamil)</label>
                <input class="form-control" formControlName="title_ta" placeholder="e.g. சொட்டு நீர் பாசனம்" />
              </div>
            </div>

            <div class="form-group mb-4">
              <label>Description</label>
              <textarea class="form-control" formControlName="desc" placeholder="Product details..."></textarea>
            </div>

            <div class="form-grid mb-4">
              <div class="form-group">
                <label>Price (Numeric)</label>
                <input type="number" class="form-control" formControlName="price_numeric" placeholder="24500" />
              </div>
              <div class="form-group">
                <label>Price Unit Text</label>
                <input class="form-control" formControlName="price_unit_text" placeholder="e.g. / Acre" />
              </div>
            </div>

            <div class="form-grid mb-4">
              <div class="form-group">
                <label>FontAwesome Icon Class</label>
                <input class="form-control" formControlName="icon_class" placeholder="e.g. fa-faucet-drip" />
              </div>
              <div class="form-group">
                <label>Image URL</label>
                <input class="form-control" formControlName="image_url" placeholder="e.g. /photos/drip.png" />
              </div>
            </div>

            <div class="form-group mb-6">
              <label class="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                <input type="checkbox" formControlName="is_subsidy_eligible" class="accent-brand-500" />
                <span>Eligible for Govt. Subsidy / மானியம் பெற தகுதியுடையது</span>
              </label>
            </div>

            <div class="flex gap-3 justify-end">
              <button type="button" class="btn btn-secondary btn-sm" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm" [disabled]="prodForm.invalid">
                <i class="fa-solid fa-floppy-disk"></i> Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  </div>
  `,
  styles: [`
    .icon-circle {
      width: 44px; height: 44px;
      background: rgba(34, 197, 94, 0.1);
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      color: var(--brand-400); font-size: 1.2rem;
    }
    .modal-backdrop {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex; align-items: center; justify-content: center;
      padding: 1.5rem;
    }
    .modal-card {
      background: #03170e;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      width: 100%; max-width: 600px;
      padding: 2rem;
      box-shadow: 0 24px 48px -12px rgba(0,0,0,0.5);
    }
    .close-btn {
      background: none; border: none; color: var(--text-muted);
      font-size: 1.2rem; transition: color 0.15s;
    }
    .close-btn:hover { color: #fff; }
  `]
})
export class ProductsComponent implements OnInit {
  api = inject(ApiService);
  fb = inject(FormBuilder);

  products = signal<Product[]>([]);
  loading = signal(true);
  showModal = signal(false);
  isEdit = signal(false);
  editingId: number | null = null;

  prodForm = this.fb.group({
    title_en: ['', Validators.required],
    title_ta: ['', Validators.required],
    desc: ['', Validators.required],
    price_numeric: [0, [Validators.required, Validators.min(0)]],
    price_unit_text: ['/ Acre', Validators.required],
    icon_class: ['fa-seedling', Validators.required],
    image_url: ['/photos/drip.png', Validators.required],
    is_subsidy_eligible: [true]
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe(data => {
      this.products.set(data.length > 0 ? data : MOCK_PRODUCTS);
      this.loading.set(false);
    });
  }

  openAddModal() {
    this.isEdit.set(false);
    this.editingId = null;
    this.prodForm.reset({
      title_en: '', title_ta: '', desc: '',
      price_numeric: 0, price_unit_text: '/ Acre',
      icon_class: 'fa-seedling', image_url: '/photos/drip.png',
      is_subsidy_eligible: true
    });
    this.showModal.set(true);
  }

  openEditModal(prod: Product) {
    this.isEdit.set(true);
    this.editingId = prod.id;
    this.prodForm.patchValue({
      title_en: prod.title_en,
      title_ta: prod.title_ta,
      desc: prod.desc,
      price_numeric: prod.price_numeric,
      price_unit_text: prod.price_unit_text,
      icon_class: prod.icon_class,
      image_url: prod.image_url,
      is_subsidy_eligible: prod.is_subsidy_eligible
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveProduct() {
    if (this.prodForm.invalid) return;
    const val = this.prodForm.value as Partial<Product>;

    if (this.isEdit() && this.editingId !== null) {
      this.api.updateProduct(this.editingId, val).subscribe({
        next: (updated) => {
          this.products.update(list => list.map(p => p.id === this.editingId ? updated : p));
          this.closeModal();
        },
        error: () => {
          // Local fallback update for demo
          this.products.update(list => list.map(p => p.id === this.editingId ? { ...p, ...val } as Product : p));
          this.closeModal();
        }
      });
    } else {
      this.api.createProduct(val).subscribe({
        next: (newProd) => {
          this.products.update(list => [...list, newProd]);
          this.closeModal();
        },
        error: () => {
          // Local fallback creation for demo
          const newMock: Product = { id: Date.now(), ...val } as Product;
          this.products.update(list => [...list, newMock]);
          this.closeModal();
        }
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.api.deleteProduct(id).subscribe({
        next: () => {
          this.products.update(list => list.filter(p => p.id !== id));
        },
        error: () => {
          // Local fallback deletion for demo
          this.products.update(list => list.filter(p => p.id !== id));
        }
      });
    }
  }
}
