import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { BlogPost } from '../../core/models/interfaces';

const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'How to Apply for PMKSY Drip Irrigation Subsidy in Tamil Nadu (2025 Guide)',
    slug: 'pmksy-drip-subsidy-guide',
    summary: 'A step-by-step breakdown of eligibility rules, required revenue documents (Patta/Chitta/Adangal), and Horticulture department inspection milestones for small and marginal farmers.',
    author: 'ஜெயசந்திரன் (Jayachandran)',
    tags: ['Subsidy', 'Drip', 'PMKSY'],
    published: true,
    created_at: '2025-04-12T10:00:00Z',
    cover_image: null
  },
  {
    id: 2,
    title: 'Drip vs Sprinkler: Choosing the Right Irrigation System for Tamil Nadu Crops',
    slug: 'drip-vs-sprinkler-crop-selection',
    summary: 'Comparison of water delivery rates, pressure requirements, and maintenance needs across common Tamil Nadu crops including banana, groundnut, coconut, and sugarcane.',
    author: 'Engineering Cell',
    tags: ['Comparison', 'Drip', 'Sprinkler'],
    published: true,
    created_at: '2025-03-25T11:30:00Z',
    cover_image: null
  },
  {
    id: 3,
    title: 'Integrating Solar Agri Pumps with Micro-Irrigation Networks',
    slug: 'solar-pump-micro-irrigation-integration',
    summary: 'How linking solar PV arrays directly with low-pressure drip lateral systems eliminates recurring grid electricity costs and allows daytime watering without voltage drops.',
    author: 'Jayachandran',
    tags: ['Solar', 'Pumping', 'Cost-Saving'],
    published: true,
    created_at: '2025-02-18T09:15:00Z',
    cover_image: null
  },
  {
    id: 4,
    title: 'Preventing Emitter Clogging: Screen & Disc Filter Maintenance Tips',
    slug: 'preventing-emitter-clogging-filter-guide',
    summary: 'Essential procedures for periodic backwashing, algae treatment, and acid flushing to keep lateral drippers flowing with uniform discharge season after season.',
    author: 'Field Support Team',
    tags: ['Maintenance', 'Water Quality'],
    published: true,
    created_at: '2025-01-30T14:00:00Z',
    cover_image: null
  },
  {
    id: 5,
    title: 'Water Management for Banana & Sugarcane in Drought-Prone Districts',
    slug: 'water-management-banana-sugarcane',
    summary: 'Field data and lateral spacing layouts that helped farmers in Dindigul and Karur sustain healthy vegetative growth during lean summer months.',
    author: 'Agricultural Agronomy Cell',
    tags: ['Banana', 'Sugarcane', 'Drought Care'],
    published: true,
    created_at: '2025-01-15T08:45:00Z',
    cover_image: null
  },
  {
    id: 6,
    title: 'Key Differences Between 100% and 75% Micro-Irrigation Subsidies',
    slug: 'differences-100-75-subsidy-schemes',
    summary: 'Clear guidelines on land ceiling criteria, joint Patta documentation, and how small farmer family holdings are evaluated by district authorities.',
    author: 'Jayachandran',
    tags: ['Subsidy', 'Revenue Guidelines'],
    published: true,
    created_at: '2024-12-20T16:20:00Z',
    cover_image: null
  }
];

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="blog-page-wrapper">
      <!-- Header Banner -->
      <section class="section section-dark text-center blog-header">
        <div class="container-narrow">
          <span class="section-eyebrow eyebrow-dark">
            <i class="fa-solid fa-book-open"></i> Farmer Knowledge Hub
          </span>
          <h1 class="section-title">Irrigation Insights & Subsidy Guides</h1>
          <p class="section-subtitle">
            Expert agricultural engineering advice, official subsidy application steps, and water-saving strategies compiled by our field technicians.
          </p>

          <!-- Search Bar -->
          <div class="search-bar-wrap">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Search guides (e.g. Subsidy, Drip, Solar, Banana)..."
              [(ngModel)]="searchQuery"
            />
          </div>
        </div>
      </section>

      <!-- Main Blog Feed -->
      <section class="section section-light">
        <div class="container-wide">
          <!-- Tag Filter Pills -->
          <div class="tag-filter-bar">
            @for (tag of allTags; track tag) {
              <button 
                class="tag-filter-btn" 
                [class.active]="activeTag() === tag"
                (click)="activeTag.set(tag)">
                {{ tag }}
              </button>
            }
          </div>

          <!-- Loading State -->
          @if (loading()) {
            <div class="loading-center">
              <div class="spinner"></div>
              <p class="text-secondary mt-3">Loading articles...</p>
            </div>
          } @else {
            <div class="grid-3 blog-feed-grid">
              @for (post of filteredPosts(); track post.id) {
                <div class="card-light blog-feed-card hover-lift">
                  <div class="blog-card-top">
                    <div class="blog-tags-row">
                      @for (t of post.tags.slice(0, 2); track t) {
                        <span class="tag tag-mint">{{ t }}</span>
                      }
                    </div>
                    <span class="blog-date">
                      <i class="fa-regular fa-calendar"></i>
                      {{ post.created_at | date:'mediumDate' }}
                    </span>
                  </div>

                  <h3 class="blog-card-title">{{ post.title }}</h3>
                  <p class="blog-card-summary">{{ post.summary }}</p>

                  <div class="blog-card-footer">
                    <span class="author-name">
                      <i class="fa-solid fa-pen-nib"></i> {{ post.author }}
                    </span>
                    <a href="https://wa.me/919489528432?text=Hello,%20I%20have%20a%20question%20regarding%20the%20article:%20{{ post.title }}"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="read-more-link">
                      <span>Ask on WhatsApp</span>
                      <i class="fa-brands fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              }
            </div>

            @if (filteredPosts().length === 0) {
              <div class="card-cream text-center p-12 mt-6">
                <i class="fa-solid fa-folder-open text-3xl text-muted mb-3"></i>
                <h3 class="text-lg font-bold">No articles match your search</h3>
                <p class="text-secondary text-sm mb-4">Try searching for other terms like 'Subsidy', 'Drip', or 'Filter'.</p>
                <button class="btn btn-outline-light btn-sm" (click)="searchQuery = ''; activeTag.set('All')">
                  Clear Search & Filters
                </button>
              </div>
            }
          }
        </div>
      </section>

      <!-- Bottom WhatsApp Newsletter Banner -->
      <section class="section section-cream text-center">
        <div class="container-narrow">
          <span class="section-eyebrow eyebrow-light">
            <i class="fa-brands fa-whatsapp"></i> Farmer Broadcast Group
          </span>
          <h2 class="section-title" style="font-size: 1.85rem;">Get Direct Subsidy Updates on WhatsApp</h2>
          <p class="section-subtitle mb-6">
            Stay informed about Tamil Nadu Horticulture Department scheme openings, grant deadlines, and seasonal water management tips.
          </p>
          <a href="https://wa.me/919489528432?text=Please%20add%20me%20to%20the%20Thozhan%20Irrigation%20farmer%20broadcast%20list"
             target="_blank"
             rel="noopener noreferrer"
             class="btn btn-whatsapp btn-lg">
            <i class="fa-brands fa-whatsapp"></i> Join Farmer WhatsApp Broadcast
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .blog-header { padding: 4.5rem 1.5rem 4.5rem; }
    .search-bar-wrap {
      position: relative;
      max-width: 520px;
      margin: 1.75rem auto 0;
    }
    .search-icon {
      position: absolute;
      left: 1.25rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 1rem;
    }
    .search-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.95);
      border: 1.5px solid rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-full);
      padding: 0.85rem 1.25rem 0.85rem 2.85rem;
      font-size: 0.9375rem;
      color: var(--text-primary);
      outline: none;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      transition: var(--transition-fast);
    }
    .search-input:focus {
      background: var(--white);
      box-shadow: 0 6px 24px rgba(39, 196, 106, 0.25);
    }

    .tag-filter-bar {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2.5rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .tag-filter-btn {
      padding: 0.45rem 1rem;
      border-radius: var(--radius-full);
      font-size: 0.8125rem;
      font-weight: 700;
      color: var(--text-secondary);
      background-color: var(--cream-warm);
      border: 1px solid var(--border-light);
      cursor: pointer;
      transition: var(--transition-fast);
    }
    .tag-filter-btn:hover {
      background-color: var(--mint-soft);
      color: var(--brand-main);
    }
    .tag-filter-btn.active {
      background-color: var(--forest-deep);
      color: var(--white);
      border-color: var(--forest-deep);
    }

    .blog-feed-card {
      display: flex;
      flex-direction: column;
      padding: 1.75rem;
    }
    .blog-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .blog-tags-row {
      display: flex;
      gap: 0.35rem;
      flex-wrap: wrap;
    }
    .blog-date {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .blog-card-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1.35;
      margin-bottom: 0.75rem;
    }
    .blog-card-summary {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 1.5rem;
      flex: 1;
    }
    .blog-card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      border-top: 1px solid var(--border-subtle);
      padding-top: 1rem;
      margin-top: auto;
    }
    .author-name {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .read-more-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.8125rem;
      font-weight: 700;
      color: #128C7E;
      text-decoration: none;
    }
    .read-more-link:hover {
      color: #075E54;
    }
  `]
})
export class BlogComponent implements OnInit {
  private apiService = inject(ApiService);

  posts = signal<BlogPost[]>(DEFAULT_BLOG_POSTS);
  searchQuery = '';
  activeTag = signal<string>('All');
  loading = signal<boolean>(false);

  allTags = ['All', 'Subsidy', 'Drip', 'Sprinkler', 'Solar', 'Maintenance', 'Banana'];

  filteredPosts = computed(() => {
    const q = this.searchQuery.trim().toLowerCase();
    const tag = this.activeTag();

    return this.posts().filter(post => {
      const matchesTag = tag === 'All' || post.tags.some(t => t.toLowerCase() === tag.toLowerCase());
      const matchesSearch = !q || post.title.toLowerCase().includes(q) || post.summary.toLowerCase().includes(q);
      return matchesTag && matchesSearch;
    });
  });

  ngOnInit() {
    this.apiService.getBlogPosts().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.posts.set(res);
        }
      },
      error: () => console.log('Using default blog posts')
    });
  }
}
