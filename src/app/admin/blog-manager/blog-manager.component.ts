import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { BlogPost } from '../../core/models/interfaces';

const SAMPLE_POSTS: BlogPost[] = [
  { id: 1, title: 'How to Apply for PMKSY Drip Irrigation Subsidy (2025 Guide)', slug: 'pmksy-guide-2025', summary: 'Step-by-step guide to applying for the PMKSY drip irrigation subsidy through the TN Horticulture Department.', author: 'Jayachandran', cover_image: null, tags: ['subsidy', 'how-to', 'pmksy'], published: true, created_at: '2025-03-15T10:00:00Z' },
  { id: 2, title: 'Drip vs Sprinkler: Which System is Right for Your Farm?', slug: 'drip-vs-sprinkler-comparison', summary: 'A practical comparison of drip and sprinkler irrigation for common Tamil Nadu crops including bananas and vegetables.', author: 'Jayachandran', cover_image: null, tags: ['drip', 'sprinkler', 'comparison'], published: true, created_at: '2025-02-10T10:00:00Z' },
  { id: 3, title: 'Solar Agri Pump Integration with Micro-Irrigation', slug: 'solar-pump-integration-guide', summary: 'How to run drip systems with PM-KUSUM subsidized solar pumps and avoid EB power tariff issues.', author: 'Jayachandran', cover_image: null, tags: ['solar', 'pm-kusum', 'pumps'], published: true, created_at: '2025-01-20T11:00:00Z' },
  { id: 4, title: '5 Critical Mistakes in Drip Lateral Maintenance', slug: 'drip-lateral-maintenance-tips', summary: 'Prevent emitter clogging from hard groundwater in Dindigul and Theni with acid flush and disc filter washing.', author: 'Jayachandran', cover_image: null, tags: ['maintenance', 'tips'], published: false, created_at: '2025-01-05T08:00:00Z' }
];

@Component({
  selector: 'app-blog-manager',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: `
  <div class="blog-canvas animate-fade">

    <!-- ── Header & Action Bar ── -->
    <div class="blog-header-card">
      <div>
        <span class="sub-badge">Content Management System</span>
        <h1 class="header-title">Agricultural Guides & Blog</h1>
        <p class="header-sub">
          Author farmer advisories, government subsidy instructions, and drip irrigation case studies.
        </p>
      </div>

      <div class="header-right">
        <!-- View mode toggle: Grid vs Table -->
        <div class="view-mode-toggle">
          <button class="toggle-btn"
                  [class.active]="viewMode() === 'grid'"
                  (click)="viewMode.set('grid')"
                  title="Grid View">
            <i class="fa-solid fa-grip"></i>
            <span>Grid</span>
          </button>
          <button class="toggle-btn"
                  [class.active]="viewMode() === 'table'"
                  (click)="viewMode.set('table')"
                  title="Table View">
            <i class="fa-solid fa-list"></i>
            <span>Table</span>
          </button>
        </div>

        <button class="new-post-btn" (click)="openAddModal()">
          <i class="fa-solid fa-pen-nib"></i>
          <span>New Article</span>
        </button>
      </div>
    </div>

    <!-- ── Filter & Search Bar ── -->
    <div class="admin-card blog-toolbar">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text"
               placeholder="Search articles by title, tag, or author..."
               [(ngModel)]="searchQuery"
               class="search-input" />
      </div>

      <div class="status-filter-pills">
        <button class="status-btn"
                [class.active]="statusFilter() === 'ALL'"
                (click)="statusFilter.set('ALL')">
          All ({{ posts().length }})
        </button>
        <button class="status-btn"
                [class.active]="statusFilter() === 'PUBLISHED'"
                (click)="statusFilter.set('PUBLISHED')">
          Live ({{ publishedCount() }})
        </button>
        <button class="status-btn"
                [class.active]="statusFilter() === 'DRAFT'"
                (click)="statusFilter.set('DRAFT')">
          Drafts ({{ draftCount() }})
        </button>
      </div>
    </div>

    <!-- ── Content Display (Grid or Table) ── -->
    @if (loading()) {
      <div class="loading-state">
        <div class="spinner"></div>
        <p>Fetching article library...</p>
      </div>
    } @else {

      <!-- Option A: Grid Card Layout with Distinct Metadata -->
      @if (viewMode() === 'grid') {
        <div class="articles-grid">
          @for (post of filteredPosts(); track post.id) {
            <div class="admin-card article-card">

              <!-- Card Top: Status & Reading Time -->
              <div class="card-meta-top">
                <span class="admin-badge" [class]="post.published ? 'admin-badge-emerald' : 'admin-badge-amber'">
                  <span class="admin-badge-dot"></span>
                  {{ post.published ? 'Live Article' : 'Draft Copy' }}
                </span>
                <span class="read-time-chip">
                  <i class="fa-regular fa-clock"></i> 4 min read
                </span>
              </div>

              <!-- Title & Slug -->
              <div class="card-title-block">
                <h3 class="article-title">{{ post.title }}</h3>
                <span class="article-slug">/blog/{{ post.slug }}</span>
              </div>

              <!-- Summary snippet -->
              <p class="article-summary">{{ post.summary }}</p>

              <!-- Tags pills -->
              <div class="tags-pill-list">
                @for (t of post.tags; track t) {
                  <span class="tag-pill">#{{ t }}</span>
                }
              </div>

              <!-- Metadata Footer: Author, Date & Actions -->
              <div class="card-meta-footer">
                <div class="author-meta">
                  <div class="author-avatar">{{ initials(post.author) }}</div>
                  <div class="author-info">
                    <span class="author-name">{{ post.author }}</span>
                    <span class="author-date">{{ formatDate(post.created_at) }}</span>
                  </div>
                </div>

                <div class="action-buttons-group">
                  <button class="btn-icon edit" (click)="openEditModal(post)" title="Edit Article">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button class="btn-icon delete" (click)="deletePost(post.id)" title="Delete Article">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>

            </div>
          }

          @if (filteredPosts().length === 0) {
            <div class="empty-grid-notice">
              <i class="fa-solid fa-book-open text-3xl"></i>
              <p>No articles match your search or filter.</p>
            </div>
          }
        </div>
      }

      <!-- Option B: Crisp Data Table Layout -->
      @if (viewMode() === 'table') {
        <div class="admin-card table-card">
          <div class="table-responsive-wrapper">
            <table class="blog-table">
              <thead>
                <tr>
                  <th style="width: 320px;">Article Title & Slug</th>
                  <th style="width: 150px;">Author</th>
                  <th style="width: 220px;">Topic Tags</th>
                  <th style="width: 140px; text-align: center;">Status</th>
                  <th style="width: 120px; text-align: right;">Published</th>
                  <th style="width: 110px; text-align: right;">Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (post of filteredPosts(); track post.id) {
                  <tr class="table-row-hover">
                    <td>
                      <div class="title-cell-wrap">
                        <span class="table-title">{{ post.title }}</span>
                        <span class="table-slug">/blog/{{ post.slug }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="author-cell">
                        <div class="small-avatar">{{ initials(post.author) }}</div>
                        <span class="table-author">{{ post.author }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="table-tags-flex">
                        @for (t of post.tags; track t) {
                          <span class="tag-pill sm">#{{ t }}</span>
                        }
                      </div>
                    </td>
                    <td style="text-align: center;">
                      <span class="admin-badge" [class]="post.published ? 'admin-badge-emerald' : 'admin-badge-amber'">
                        <span class="admin-badge-dot"></span>
                        {{ post.published ? 'Published' : 'Draft' }}
                      </span>
                    </td>
                    <td class="table-date" style="text-align: right;">
                      {{ formatDate(post.created_at) }}
                    </td>
                    <td style="text-align: right;">
                      <div class="action-buttons-group right">
                        <button class="btn-icon edit sm" (click)="openEditModal(post)" title="Edit">
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-icon delete sm" (click)="deletePost(post.id)" title="Delete">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

    }

    <!-- ── Add/Edit Article Modal ── -->
    @if (showModal()) {
      <div class="modal-backdrop animate-fade" (click)="closeModal()">
        <div class="modal-window" (click)="$event.stopPropagation()">

          <div class="modal-header">
            <div>
              <h2 class="modal-title">{{ isEdit() ? 'Edit Advisory Article' : 'Compose New Farm Advisory' }}</h2>
              <p class="modal-sub">Draft educational content, guides, and subsidy updates for farmers</p>
            </div>
            <button class="close-x-btn" (click)="closeModal()" aria-label="Close modal">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>

          <form [formGroup]="postForm" (ngSubmit)="savePost()" class="modal-form">

            <div class="form-field">
              <label class="field-label">Article Headline</label>
              <input class="field-input"
                     formControlName="title"
                     (input)="autoGenerateSlug()"
                     placeholder="e.g. How to Apply for PMKSY Drip Subsidy in Tamil Nadu" />
            </div>

            <div class="form-row-grid">
              <div class="form-field">
                <label class="field-label">URL Slug</label>
                <input class="field-input"
                       formControlName="slug"
                       placeholder="pmksy-subsidy-guide" />
              </div>
              <div class="form-field">
                <label class="field-label">Author Name</label>
                <input class="field-input"
                       formControlName="author"
                       placeholder="Jayachandran" />
              </div>
            </div>

            <div class="form-field">
              <label class="field-label">Article Preview Summary</label>
              <textarea class="field-textarea sm"
                        formControlName="summary"
                        placeholder="Brief 2-line preview displayed on the website blog card..."></textarea>
            </div>

            <div class="form-field">
              <label class="field-label">Full Content (Supports Markdown & Lists)</label>
              <textarea class="field-textarea lg"
                        formControlName="content"
                        placeholder="Write detailed guide, required documents (Chitta, Adangal, FMB sketch), procedure..."></textarea>
            </div>

            <div class="form-row-grid items-center">
              <div class="form-field">
                <label class="field-label">Comma-Separated Tags</label>
                <input class="field-input"
                       formControlName="tagsRaw"
                       placeholder="subsidy, drip, pmksy, horticulture" />
              </div>

              <div class="publish-checkbox-field">
                <label class="checkbox-label">
                  <input type="checkbox" formControlName="published" class="styled-checkbox" />
                  <div class="checkbox-meta">
                    <span class="chk-title">Publish Live to Public Website</span>
                    <span class="chk-sub">Visible instantly at /blog</span>
                  </div>
                </label>
              </div>
            </div>

            <div class="modal-actions-bar">
              <button type="button" class="btn-cancel" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-save" [disabled]="postForm.invalid">
                <i class="fa-solid fa-floppy-disk"></i>
                <span>{{ isEdit() ? 'Update Article' : 'Publish Article' }}</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    }

  </div>
  `,
  styles: [`
  .blog-canvas {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ── Header Card ── */
  .blog-header-card {
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
    flex-wrap: wrap;
  }

  .view-mode-toggle {
    display: flex;
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 3px;
    gap: 3px;
  }

  .toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.72rem;
    font-weight: 700;
    font-family: inherit;
    color: #94A3B8;
    background: transparent;
    border: none;
    padding: 0.35rem 0.65rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .toggle-btn:hover { color: #FFFFFF; }
  .toggle-btn.active {
    background: #282C32;
    color: #34D399;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  .new-post-btn {
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
  .new-post-btn:hover {
    background: #059669;
    transform: translateY(-1px);
  }

  /* ── Toolbar ── */
  .blog-toolbar {
    padding: 0.875rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .search-box {
    position: relative;
    flex: 1;
    min-width: 250px;
  }
  .search-icon {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748B;
    font-size: 0.85rem;
  }
  .search-input {
    width: 100%;
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 9px;
    padding: 0.55rem 1rem 0.55rem 2.4rem;
    color: #FFFFFF;
    font-size: 0.8125rem;
    font-family: inherit;
  }
  .search-input:focus {
    border-color: #10B981;
    outline: none;
  }
  .search-input::placeholder { color: #64748B; }

  .status-filter-pills {
    display: flex;
    gap: 0.35rem;
  }

  .status-btn {
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.07);
    color: #94A3B8;
    padding: 0.4rem 0.75rem;
    border-radius: 7px;
    font-size: 0.72rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .status-btn:hover { color: #FFFFFF; background: #282C32; }
  .status-btn.active {
    background: #282C32;
    color: #34D399;
    border-color: rgba(52, 211, 153, 0.3);
    font-weight: 700;
  }

  /* ── Card Grid Layout ── */
  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 1.5rem;
  }

  .article-card {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.25rem;
  }
  .article-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.55);
  }

  .card-meta-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .read-time-chip {
    font-size: 0.68rem;
    color: #94A3B8;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .card-title-block {
    display: flex;
    flex-direction: column;
  }
  .article-title {
    font-size: 1.05rem;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.35;
    letter-spacing: -0.01em;
  }
  .article-slug {
    font-family: monospace;
    font-size: 0.68rem;
    color: #64748B;
    margin-top: 0.25rem;
  }

  .article-summary {
    font-size: 0.78rem;
    color: #94A3B8;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .tags-pill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
  .tag-pill {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #94A3B8;
    padding: 0.2rem 0.55rem;
    border-radius: 9999px;
    font-size: 0.68rem;
    font-weight: 600;
  }
  .tag-pill.sm {
    font-size: 0.62rem;
    padding: 0.15rem 0.45rem;
  }

  .card-meta-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 0.875rem;
  }

  .author-meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .author-avatar {
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    font-weight: 800;
    color: #FFFFFF;
  }
  .author-info {
    display: flex;
    flex-direction: column;
  }
  .author-name {
    font-size: 0.75rem;
    font-weight: 700;
    color: #E2E8F0;
  }
  .author-date {
    font-size: 0.65rem;
    color: #64748B;
  }

  .action-buttons-group {
    display: flex;
    gap: 0.4rem;
  }
  .action-buttons-group.right {
    justify-content: flex-end;
  }

  .btn-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid transparent;
    font-size: 0.8rem;
    transition: all 0.15s ease;
  }
  .btn-icon.sm {
    width: 28px;
    height: 28px;
    font-size: 0.72rem;
  }

  .btn-icon.edit {
    background: #282C32;
    border-color: rgba(255, 255, 255, 0.08);
    color: #E2E8F0;
  }
  .btn-icon.edit:hover {
    background: #32373E;
    color: #FFFFFF;
  }

  .btn-icon.delete {
    background: rgba(239, 68, 68, 0.08);
    border-color: rgba(239, 68, 68, 0.25);
    color: #F87171;
  }
  .btn-icon.delete:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #FCA5A5;
  }

  /* ── Table View Styling ── */
  .table-card {
    overflow: hidden;
    padding: 0;
  }
  .table-responsive-wrapper { overflow-x: auto; }

  .blog-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.8125rem;
  }
  .blog-table th {
    background: #1B1E22;
    color: #94A3B8;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    white-space: nowrap;
  }
  .blog-table td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: middle;
  }
  .table-row-hover:hover td {
    background: rgba(255, 255, 255, 0.02);
  }

  .title-cell-wrap { display: flex; flex-direction: column; }
  .table-title { font-weight: 700; color: #FFFFFF; }
  .table-slug { font-family: monospace; font-size: 0.68rem; color: #64748B; }

  .author-cell { display: flex; align-items: center; gap: 0.5rem; }
  .small-avatar {
    width: 24px;
    height: 24px;
    background: #282C32;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    color: #CBD5E1;
  }
  .table-author { font-size: 0.78rem; color: #CBD5E1; }

  .table-tags-flex { display: flex; flex-wrap: wrap; gap: 0.25rem; }
  .table-date { font-size: 0.72rem; color: #64748B; }

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
    max-width: 660px;
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
  }
  .close-x-btn:hover { color: #FFFFFF; }

  .modal-form {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
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
  }
  .field-input:focus, .field-textarea:focus {
    border-color: #10B981;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    outline: none;
  }
  .field-textarea.sm { min-height: 60px; resize: vertical; }
  .field-textarea.lg { min-height: 150px; resize: vertical; }

  .publish-checkbox-field {
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 0.65rem 0.85rem;
  }

  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.65rem;
    cursor: pointer;
  }
  .styled-checkbox {
    margin-top: 3px;
    width: 16px;
    height: 16px;
    accent-color: #10B981;
  }
  .checkbox-meta { display: flex; flex-direction: column; }
  .chk-title { font-size: 0.78rem; font-weight: 700; color: #FFFFFF; }
  .chk-sub   { font-size: 0.68rem; color: #94A3B8; }

  .modal-actions-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 1rem;
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
  }
  .btn-save:hover:not(:disabled) { background: #059669; }
  .btn-save:disabled { opacity: 0.5; cursor: not-allowed; }

  .empty-grid-notice {
    grid-column: 1 / -1;
    text-align: center;
    padding: 4rem;
    color: #64748B;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
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
    .articles-grid { grid-template-columns: 1fr; }
    .form-row-grid { grid-template-columns: 1fr; }
  }
  `]
})
export class BlogManagerComponent implements OnInit {
  api = inject(ApiService);
  fb = inject(FormBuilder);

  posts = signal<BlogPost[]>([]);
  loading = signal(true);
  showModal = signal(false);
  isEdit = signal(false);
  selectedId: number | null = null;

  viewMode = signal<'grid' | 'table'>('grid');
  searchQuery = '';
  statusFilter = signal<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  postForm = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    summary: ['', Validators.required],
    content: ['', Validators.required],
    author: ['Jayachandran', Validators.required],
    tagsRaw: ['subsidy, drip'],
    published: [true]
  });

  filteredPosts = computed(() => {
    return this.posts().filter(p => {
      const matchFilter = this.statusFilter() === 'ALL' ||
        (this.statusFilter() === 'PUBLISHED' && p.published) ||
        (this.statusFilter() === 'DRAFT' && !p.published);

      const q = this.searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));

      return matchFilter && matchSearch;
    });
  });

  publishedCount = computed(() => this.posts().filter(p => p.published).length);
  draftCount = computed(() => this.posts().filter(p => !p.published).length);

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.api.getBlogPosts().subscribe(data => {
      this.posts.set(data && data.length > 0 ? data : SAMPLE_POSTS);
      this.loading.set(false);
    });
  }

  autoGenerateSlug() {
    if (!this.isEdit()) {
      const title = this.postForm.get('title')?.value || '';
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      this.postForm.patchValue({ slug });
    }
  }

  openAddModal() {
    this.isEdit.set(false);
    this.selectedId = null;
    this.postForm.reset({
      title: '',
      slug: '',
      summary: '',
      content: '',
      author: 'Jayachandran',
      tagsRaw: 'subsidy, drip',
      published: true
    });
    this.showModal.set(true);
  }

  openEditModal(p: BlogPost) {
    this.isEdit.set(true);
    this.selectedId = p.id;
    this.postForm.patchValue({
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      content: p.content || p.summary,
      author: p.author,
      tagsRaw: (p.tags || []).join(', '),
      published: p.published
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  savePost() {
    if (this.postForm.invalid) return;

    const val = this.postForm.value;
    const tags = (val.tagsRaw || '')
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload: Partial<BlogPost> = {
      title: val.title!,
      slug: val.slug!,
      summary: val.summary!,
      content: val.content!,
      author: val.author!,
      tags,
      published: !!val.published
    };

    if (this.isEdit() && this.selectedId) {
      this.api.updateBlogPost(this.selectedId, payload).subscribe({
        next: updated => {
          this.posts.update(list => list.map(p => p.id === updated.id ? updated : p));
          this.closeModal();
        },
        error: () => {
          this.posts.update(list => list.map(p => p.id === this.selectedId ? { ...p, ...payload } as BlogPost : p));
          this.closeModal();
        }
      });
    } else {
      this.api.createBlogPost(payload).subscribe({
        next: created => {
          this.posts.update(list => [created, ...list]);
          this.closeModal();
        },
        error: () => {
          const newPost = { id: Date.now(), ...payload, created_at: new Date().toISOString() } as BlogPost;
          this.posts.update(list => [newPost, ...list]);
          this.closeModal();
        }
      });
    }
  }

  deletePost(id: number) {
    if (!confirm('Are you sure you want to permanently delete this article?')) return;

    this.api.deleteBlogPost(id).subscribe({
      next: () => {
        this.posts.update(list => list.filter(p => p.id !== id));
      },
      error: () => {
        this.posts.update(list => list.filter(p => p.id !== id));
      }
    });
  }

  initials(name: string): string {
    if (!name) return 'TN';
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  }

  formatDate(iso?: string): string {
    if (!iso) return 'Recent';
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
