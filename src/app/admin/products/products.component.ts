import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/interfaces';

const MOCK_PRODUCTS: Product[] = [
  { id: 1, title_en: 'Drip Irrigation Kit', title_ta: 'சொட்டு நீர் பாசனம்', desc: 'Premium complete agricultural setup engineered for uniform watering. Includes main pipe, sub-main, laterals, emitters, filter unit, and pressure regulators.', price_numeric: 24500, price_unit_text: '/ Acre', icon_class: 'fa-faucet-drip', image_url: '/photos/drip.png', is_subsidy_eligible: true },
  { id: 2, title_en: 'Sprinkler Micro Head System', title_ta: 'தெளிப்பு நீர் பாசனம்', desc: 'High-pressure overhead misting systems optimized for open ground crop layouts. Includes risers, impact sprinklers, valve box, and control panel.', price_numeric: 18200, price_unit_text: '/ Acre', icon_class: 'fa-sprinkler', image_url: '/photos/sprinkler.png', is_subsidy_eligible: true },
  { id: 3, title_en: 'Rain Gun Irrigation System', title_ta: 'மழை துப்பாக்கி பாசனம்', desc: 'High-throw water cannon systems ideal for sugarcane, cotton, and forage grass crops. Heavy-duty aluminium pipes with quick coupling joints.', price_numeric: 32000, price_unit_text: '/ Acre', icon_class: 'fa-cloud-showers-water', image_url: '/photos/raingun.png', is_subsidy_eligible: true },
  { id: 4, title_en: 'Solar Agri Pump Integration', title_ta: 'சோலார் பம்ப் செட்', desc: 'Grid-independent solar power pumping systems with automatic start controls. Compatible with all drip and sprinkler systems. VFD controller included.', price_numeric: 85000, price_unit_text: '/ Unit', icon_class: 'fa-solar-panel', image_url: '/photos/solar.png', is_subsidy_eligible: true }
];

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: `
  <div class="products-canvas animate-fade">

    <!-- ── Header & Action Bar ── -->
    <div class="products-header-card">
      <div>
        <span class="sub-badge">Inventory & Catalog Engineering</span>
        <h1 class="header-title">Equipment Catalog</h1>
        <p class="header-sub">
          Manage micro-irrigation systems, unit pricing for Tamil Nadu schemes, and government subsidy tags.
        </p>
      </div>

      <div class="header-right">
        <div class="catalog-stat-pill">
          <span class="stat-count">{{ products().length }}</span>
          <span class="stat-lbl">Systems Active</span>
        </div>
        <button class="add-prod-btn" (click)="openAddModal()">
          <i class="fa-solid fa-plus"></i>
          <span>Add Equipment</span>
        </button>
      </div>
    </div>

    <!-- ── Product Grid ── -->
    @if (loading()) {
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Loading equipment catalog...</p>
      </div>
    } @else {
      <div class="product-cards-grid">
        @for (prod of products(); track prod.id) {
          <div class="admin-card product-card">

            <!-- Card Header: Icon, Tags & Subsidy Status -->
            <div class="prod-card-top">
              <div class="prod-icon-box">
                <i class="fa-solid {{ prod.icon_class || 'fa-seedling' }}"></i>
              </div>

              <div class="prod-badges">
                <span class="admin-badge" [class]="prod.is_subsidy_eligible ? 'admin-badge-emerald' : 'admin-badge-danger'">
                  <span class="admin-badge-dot"></span>
                  {{ prod.is_subsidy_eligible ? 'PMKSY 100% Eligible' : 'Commercial Rate' }}
                </span>
              </div>
            </div>

            <!-- Titles & Specifications -->
            <div class="prod-info-block">
              <h3 class="prod-title-en">{{ prod.title_en }}</h3>
              <h4 class="prod-title-ta">{{ prod.title_ta }}</h4>
              <p class="prod-description">{{ prod.desc }}</p>
            </div>

            <!-- Distinct Price Formatting Section -->
            <div class="prod-price-box">
              <div class="price-left">
                <span class="price-label">Unit Rate (Govt Approved)</span>
                <div class="price-val-wrap">
                  <span class="currency-symbol">₹</span>
                  <span class="price-amount">{{ prod.price_numeric.toLocaleString('en-IN') }}</span>
                  <span class="price-unit-pill">{{ prod.price_unit_text }}</span>
                </div>
              </div>
              <div class="spec-id-tag">#{{ prod.id }}</div>
            </div>

            <!-- Card Action Footer -->
            <div class="prod-card-footer">
              <button class="action-btn edit-btn" (click)="openEditModal(prod)">
                <i class="fa-solid fa-pen-to-square"></i>
                <span>Edit Specs</span>
              </button>
              <button class="action-btn delete-btn" (click)="deleteProduct(prod.id)" title="Delete equipment">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>

          </div>
        }
      </div>
    }

    <!-- ── Add/Edit Product Modal ── -->
    @if (showModal()) {
      <div class="modal-backdrop animate-fade" (click)="closeModal()">
        <div class="modal-window" (click)="$event.stopPropagation()">

          <div class="modal-header">
            <div>
              <h2 class="modal-title">{{ isEdit() ? 'Edit Equipment Specs' : 'Add New Irrigation Equipment' }}</h2>
              <p class="modal-sub">Set English/Tamil titles, acreage rates, and subsidy flags</p>
            </div>
            <button class="close-x-btn" (click)="closeModal()" aria-label="Close modal">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form [formGroup]="prodForm" (ngSubmit)="saveProduct()" class="modal-form">

            <div class="form-row-grid">
              <div class="form-field">
                <label class="field-label">Equipment Title (English)</label>
                <input class="field-input" formControlName="title_en" placeholder="e.g. Drip Irrigation Kit" />
              </div>
              <div class="form-field">
                <label class="field-label">Equipment Title (Tamil)</label>
                <input class="field-input" formControlName="title_ta" placeholder="e.g. சொட்டு நீர் பாசனம்" />
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">System Description & Spec Highlights</label>
              <textarea class="field-textarea" formControlName="desc" placeholder="Engineering components, pipe diameter, filters included..."></textarea>
            </div>

            <div class="form-row-grid">
              <div class="form-field">
                <label class="field-label">Unit Rate in INR (₹)</label>
                <input type="number" class="field-input" formControlName="price_numeric" placeholder="24500" />
              </div>
              <div class="form-field">
                <label class="field-label">Pricing Unit Text</label>
                <input class="field-input" formControlName="price_unit_text" placeholder="e.g. / Acre or / Unit" />
              </div>
            </div>

            <div class="form-row-grid">
              <div class="form-field">
                <label class="field-label">FontAwesome Icon Class</label>
                <input class="field-input" formControlName="icon_class" placeholder="e.g. fa-faucet-drip" />
              </div>
              <div class="form-field">
                <label class="field-label">Photo Asset URL</label>
                <input class="field-input" formControlName="image_url" placeholder="e.g. /photos/drip.png" />
              </div>
            </div>

            <div class="subsidy-check-wrap">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="is_subsidy_eligible" class="styled-checkbox" />
                <div class="checkbox-meta">
                  <span class="chk-title">Eligible for Tamil Nadu Govt. Subsidy (PMKSY)</span>
                  <span class="chk-sub">Enables 100%, 75%, and 50% automatic calculation in the calculator</span>
                </div>
              </label>
            </div>

            <div class="modal-actions-bar">
              <button type="button" class="btn-cancel" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-save" [disabled]="prodForm.invalid">
                <i class="fa-solid fa-floppy-disk"></i>
                <span>{{ isEdit() ? 'Update Equipment' : 'Save Equipment' }}</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    }

  </div>
  `,
  styles: [`
  .products-canvas {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ── Header Card ── */
  .products-header-card {
    background: #202328;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 1.5rem 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
  }

  .sub-badge {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    color: #10B981;
    display: block;
    margin-bottom: 0.25rem;
  }

  .header-title {
    font-size: 1.45rem;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.02em;
  }

  .header-sub {
    font-size: 0.8125rem;
    color: #94A3B8;
    margin-top: 0.25rem;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .catalog-stat-pill {
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 9px;
    padding: 0.45rem 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .stat-count { font-size: 1.1rem; font-weight: 800; color: #FFFFFF; }
  .stat-lbl { font-size: 0.68rem; color: #64748B; text-transform: uppercase; font-weight: 600; }

  .add-prod-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #10B981;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 0.8125rem;
    font-family: inherit;
    padding: 0.65rem 1.15rem;
    border-radius: 9px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);
    transition: all 0.18s ease;
  }
  .add-prod-btn:hover {
    background: #059669;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
  }

  /* ── Products Grid ── */
  .product-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 1.5rem;
  }

  .product-card {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.25rem;
  }
  .product-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.55);
  }

  .prod-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .prod-icon-box {
    width: 46px;
    height: 46px;
    background: rgba(16, 185, 129, 0.12);
    border: 1px solid rgba(16, 185, 129, 0.25);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #34D399;
  }

  .prod-info-block {
    display: flex;
    flex-direction: column;
  }

  .prod-title-en {
    font-size: 1.1rem;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.01em;
  }

  .prod-title-ta {
    font-size: 0.8rem;
    font-weight: 600;
    color: #34D399;
    margin-top: 0.15rem;
  }

  .prod-description {
    font-size: 0.78rem;
    color: #94A3B8;
    line-height: 1.5;
    margin-top: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Distinct Price Formatting */
  .prod-price-box {
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 0.875rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .price-left {
    display: flex;
    flex-direction: column;
  }

  .price-label {
    font-size: 0.65rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #64748B;
  }

  .price-val-wrap {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
    margin-top: 0.2rem;
  }

  .currency-symbol {
    font-size: 1.05rem;
    font-weight: 800;
    color: #34D399;
  }

  .price-amount {
    font-size: 1.45rem;
    font-weight: 900;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1;
  }

  .price-unit-pill {
    font-size: 0.72rem;
    font-weight: 600;
    color: #94A3B8;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.15rem 0.45rem;
    border-radius: 4px;
  }

  .spec-id-tag {
    font-family: monospace;
    font-size: 0.75rem;
    color: #475569;
  }

  /* Card Action Footer */
  .prod-card-footer {
    display: flex;
    gap: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 0.875rem;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    font-weight: 700;
    font-family: inherit;
    border-radius: 8px;
    padding: 0.55rem 0.85rem;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .edit-btn {
    flex: 1;
    background: #282C32;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #E2E8F0;
  }
  .edit-btn:hover {
    background: #32373E;
    color: #FFFFFF;
    border-color: rgba(255, 255, 255, 0.2);
  }

  .delete-btn {
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.25);
    color: #F87171;
    padding: 0.55rem 0.75rem;
  }
  .delete-btn:hover {
    background: rgba(239, 68, 68, 0.18);
    color: #FCA5A5;
  }

  /* ── Modal Window ── */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    z-index: 200;
  }

  .modal-window {
    background: #22252A;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    width: 100%;
    max-width: 620px;
    box-shadow: 0 16px 48px -4px rgba(0, 0, 0, 0.7);
    overflow: hidden;
  }

  .modal-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .modal-title { font-size: 1.15rem; font-weight: 800; color: #FFFFFF; }
  .modal-sub   { font-size: 0.72rem; color: #94A3B8; margin-top: 2px; }

  .close-x-btn {
    background: transparent;
    border: none;
    color: #94A3B8;
    font-size: 1rem;
    cursor: pointer;
    padding: 4px;
  }
  .close-x-btn:hover { color: #FFFFFF; }

  .modal-form {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
  }

  .form-row-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .field-label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #CBD5E1;
  }

  .field-input, .field-textarea {
    width: 100%;
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 0.6rem 0.85rem;
    color: #FFFFFF;
    font-size: 0.85rem;
    font-family: inherit;
    transition: all 0.15s ease;
  }
  .field-input:focus, .field-textarea:focus {
    border-color: #10B981;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    outline: none;
  }
  .field-textarea {
    min-height: 75px;
    resize: vertical;
  }

  .subsidy-check-wrap {
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 0.75rem 1rem;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
  }

  .styled-checkbox {
    margin-top: 3px;
    width: 16px;
    height: 16px;
    accent-color: #10B981;
    cursor: pointer;
  }

  .checkbox-meta {
    display: flex;
    flex-direction: column;
  }
  .chk-title { font-size: 0.8rem; font-weight: 700; color: #FFFFFF; }
  .chk-sub   { font-size: 0.7rem; color: #94A3B8; }

  .modal-actions-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1rem;
    margin-top: 0.5rem;
  }

  .btn-cancel {
    background: #282C32;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #E2E8F0;
    font-size: 0.8125rem;
    font-weight: 700;
    font-family: inherit;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    cursor: pointer;
  }
  .btn-cancel:hover { background: #32373E; }

  .btn-save {
    background: #10B981;
    border: none;
    color: #FFFFFF;
    font-size: 0.8125rem;
    font-weight: 700;
    font-family: inherit;
    padding: 0.6rem 1.25rem;
    border-radius: 8px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.25);
  }
  .btn-save:hover:not(:disabled) {
    background: #059669;
  }
  .btn-save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .loading-state {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    color: #94A3B8;
  }

  @media (max-width: 640px) {
    .product-cards-grid { grid-template-columns: 1fr; }
    .form-row-grid { grid-template-columns: 1fr; }
  }
  `]
})
export class ProductsComponent implements OnInit {
  api = inject(ApiService);
  fb = inject(FormBuilder);

  products = signal<Product[]>([]);
  loading = signal(true);
  showModal = signal(false);
  isEdit = signal(false);
  selectedId: number | null = null;

  prodForm = this.fb.group({
    title_en: ['', Validators.required],
    title_ta: ['', Validators.required],
    desc: ['', Validators.required],
    price_numeric: [24500, [Validators.required, Validators.min(100)]],
    price_unit_text: ['/ Acre', Validators.required],
    icon_class: ['fa-faucet-drip', Validators.required],
    image_url: ['/photos/drip.png'],
    is_subsidy_eligible: [true],
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.api.getProducts().subscribe(data => {
      this.products.set(data && data.length > 0 ? data : MOCK_PRODUCTS);
      this.loading.set(false);
    });
  }

  openAddModal() {
    this.isEdit.set(false);
    this.selectedId = null;
    this.prodForm.reset({
      title_en: '',
      title_ta: '',
      desc: '',
      price_numeric: 24500,
      price_unit_text: '/ Acre',
      icon_class: 'fa-faucet-drip',
      image_url: '/photos/drip.png',
      is_subsidy_eligible: true
    });
    this.showModal.set(true);
  }

  openEditModal(p: Product) {
    this.isEdit.set(true);
    this.selectedId = p.id;
    this.prodForm.patchValue({
      title_en: p.title_en,
      title_ta: p.title_ta,
      desc: p.desc,
      price_numeric: p.price_numeric,
      price_unit_text: p.price_unit_text,
      icon_class: p.icon_class || 'fa-faucet-drip',
      image_url: p.image_url || '/photos/drip.png',
      is_subsidy_eligible: p.is_subsidy_eligible
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  saveProduct() {
    if (this.prodForm.invalid) return;

    const val = this.prodForm.value as Partial<Product>;
    if (this.isEdit() && this.selectedId) {
      this.api.updateProduct(this.selectedId, val).subscribe({
        next: updated => {
          this.products.update(list => list.map(p => p.id === updated.id ? updated : p));
          this.closeModal();
        },
        error: () => {
          // Local fallback
          this.products.update(list => list.map(p => p.id === this.selectedId ? { ...p, ...val } as Product : p));
          this.closeModal();
        }
      });
    } else {
      this.api.createProduct(val).subscribe({
        next: created => {
          this.products.update(list => [...list, created]);
          this.closeModal();
        },
        error: () => {
          // Local fallback
          const newP = { id: Date.now(), ...val } as Product;
          this.products.update(list => [...list, newP]);
          this.closeModal();
        }
      });
    }
  }

  deleteProduct(id: number) {
    if (!confirm('Are you sure you want to remove this equipment from the catalog?')) return;

    this.api.deleteProduct(id).subscribe({
      next: () => {
        this.products.update(list => list.filter(p => p.id !== id));
      },
      error: () => {
        this.products.update(list => list.filter(p => p.id !== id));
      }
    });
  }
}
