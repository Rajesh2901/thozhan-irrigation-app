import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { BlogPost } from '../../core/models/interfaces';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-content">
      <div class="hero-section text-center" style="margin-bottom: 2rem;">
        <h1 class="hero-title">Irrigation Insights & Guides</h1>
        <p class="hero-subtitle">Expert advice, subsidy guides, and farming tips for maximum yield.</p>
        
        <div class="search-bar">
          <i class="fa-solid fa-search search-icon"></i>
          <input 
            type="text" 
            class="form-control search-input" 
            placeholder="Search articles..."
            [(ngModel)]="searchQuery"
          />
        </div>
      </div>

      <div class="tag-filter">
        @for (tag of allTags; track tag) {
          <button 
            class="badge tag-btn" 
            [class.active]="activeTag() === tag"
            (click)="activeTag.set(tag)"
          >
            {{ tag | titlecase }}
          </button>
        }
      </div>

      @if (loading()) {
        <div class="loading-center">
          <div class="spinner"></div>
          <p>Loading articles...</p>
        </div>
      } @else {
        <div class="grid-3 blog-grid">
          @for (post of filteredPosts(); track post.id) {
            <div class="glass-card hover-lift blog-card">
              <div class="blog-cover" [style.backgroundColor]="getCoverColor(post.id)">
                <div class="blog-badges">
                  @for (tag of post.tags.slice(0, 2); track tag) {
                    <span class="badge badge-brand">{{ tag }}</span>
                  }
                </div>
              </div>
              <div class="blog-content">
                <div class="blog-meta">
                  <span><i class="fa-regular fa-calendar"></i> {{ post.created_at | date:'mediumDate' }}</span>
                  <span><i class="fa-regular fa-user"></i> {{ post.author }}</span>
                </div>
                <h3 class="blog-title">{{ post.title }}</h3>
                <p class="blog-summary">{{ post.summary }}</p>
                <div style="margin-top: auto;">
                  <button class="btn btn-secondary btn-sm" style="width: 100%;">
                    Read Article <i class="fa-solid fa-arrow-right" style="margin-left: 0.5rem;"></i>
                  </button>
                </div>
              </div>
            </div>
          }
          @if (filteredPosts().length === 0) {
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
              <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter.</p>
              <button class="btn btn-primary" style="margin-top: 1rem;" (click)="searchQuery.set(''); activeTag.set('All')">Clear Filters</button>
            </div>
          }
        </div>
      }

      <div class="glass-card cta-section" style="margin-top: 4rem; text-align: center;">
        <h2>Never Miss an Update</h2>
        <p style="margin-bottom: 2rem;">Get the latest subsidy news and irrigation tips delivered to your WhatsApp.</p>
        <button class="btn btn-whatsapp btn-lg">
          <i class="fa-brands fa-whatsapp"></i> Join WhatsApp Community
        </button>
      </div>
    </div>
  `,
  styles: [`
    .search-bar {
      position: relative;
      max-width: 500px;
      margin: 2rem auto 0;
    }
    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
    }
    .search-input {
      padding-left: 2.5rem;
      border-radius: 50px;
    }
    .tag-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .tag-btn {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
      padding: 0.5rem 1rem;
      transition: all 0.2s ease;
    }
    .tag-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .tag-btn.active {
      background: var(--brand-600);
      border-color: var(--brand-500);
      color: white;
    }
    .blog-card {
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow: hidden;
    }
    .blog-cover {
      height: 200px;
      position: relative;
      display: flex;
      align-items: flex-end;
      padding: 1rem;
    }
    .blog-badges {
      display: flex;
      gap: 0.5rem;
    }
    .blog-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .blog-meta {
      display: flex;
      justify-content: space-between;
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-bottom: 1rem;
    }
    .blog-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }
    .blog-summary {
      color: #cbd5e1;
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .cta-section {
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(4, 31, 20, 0.8) 100%);
      border: 1px solid rgba(34, 197, 94, 0.2);
    }
  `]
})
export class BlogComponent implements OnInit {
  private apiService = inject(ApiService);

  allTags = ['All', 'subsidy', 'drip', 'sprinkler', 'solar', 'documents', 'tips'];
  
  posts = signal<BlogPost[]>([
    {
      id: 1,
      title: 'How to Apply for PMKSY Drip Irrigation Subsidy (2025 Guide)',
      slug: 'pmksy-guide-2025',
      summary: 'A step-by-step guide to applying for the Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) scheme in Tamil Nadu. Learn about eligibility, documents required, and the application process to get up to 100% subsidy.',
      author: 'Jayachandran',
      tags: ['subsidy', 'how-to', 'drip'],
      cover_image: null,
      published: true,
      created_at: '2025-03-15T10:00:00Z'
    },
    {
      id: 2,
      title: 'Drip vs. Sprinkler Irrigation: Which is Best for Your Farm?',
      slug: 'drip-vs-sprinkler',
      summary: 'Compare drip and sprinkler irrigation systems to make an informed decision. We cover water efficiency, cost, suitability for different crops like sugarcane, cotton, and vegetables, and maintenance requirements.',
      author: 'Jayachandran',
      tags: ['drip', 'sprinkler', 'tips'],
      cover_image: null,
      published: true,
      created_at: '2025-03-10T09:30:00Z'
    },
    {
      id: 3,
      title: 'Integrating Solar Pumps with Your Irrigation System',
      slug: 'solar-pump-integration',
      summary: 'Reduce your electricity bills and ensure continuous water supply by integrating solar water pumps. Discover the benefits, setup costs, and government subsidies available for PM-KUSUM solar pumps.',
      author: 'Jayachandran',
      tags: ['solar', 'tips'],
      cover_image: null,
      published: true,
      created_at: '2025-02-28T14:15:00Z'
    },
    {
      id: 4,
      title: '5 Common Mistakes in Drip System Maintenance',
      slug: 'drip-maintenance-mistakes',
      summary: 'Avoid these costly errors in maintaining your drip irrigation system. From neglecting filter cleaning to ignoring acid treatment for clogged emitters, learn how to extend the life of your laterals.',
      author: 'Jayachandran',
      tags: ['tips', 'drip'],
      cover_image: null,
      published: true,
      created_at: '2025-02-15T11:00:00Z'
    },
    {
      id: 5,
      title: 'Complete Guide to Chitta, Adangal & FMB for Subsidy',
      slug: 'chitta-adangal-guide',
      summary: 'Confused about the revenue documents needed for irrigation subsidies? This complete guide explains Chitta, Adangal, FMB sketches, and how to obtain them online through the TN e-Sevai portal.',
      author: 'Jayachandran',
      tags: ['documents', 'subsidy'],
      cover_image: null,
      published: true,
      created_at: '2025-01-20T16:45:00Z'
    },
    {
      id: 6,
      title: 'Maximizing Sugarcane Yield with Rain Gun Sprinklers',
      slug: 'rain-gun-sugarcane',
      summary: 'See the data on how rain gun sprinklers are revolutionizing sugarcane farming. Learn about proper spacing, pressure requirements, and timing to increase tonnage per acre significantly.',
      author: 'Jayachandran',
      tags: ['sprinkler', 'tips'],
      cover_image: null,
      published: true,
      created_at: '2025-01-05T08:20:00Z'
    }
  ]);

  searchQuery = signal('');
  activeTag = signal('All');
  loading = signal(false);

  filteredPosts = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const tag = this.activeTag();
    let currentPosts = this.posts();

    if (tag !== 'All') {
      currentPosts = currentPosts.filter(p => p.tags.includes(tag));
    }

    if (q) {
      currentPosts = currentPosts.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.summary.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return currentPosts;
  });

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.loading.set(true);
    this.apiService.getBlogPosts().subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.posts.set(response);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching posts, using samples', err);
        this.loading.set(false);
      }
    });
  }

  getCoverColor(id: number): string {
    const colors = [
      'linear-gradient(135deg, #047857 0%, #064e3b 100%)', // green
      'linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%)', // blue
      'linear-gradient(135deg, #b45309 0%, #78350f 100%)', // amber
      'linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%)', // purple
      'linear-gradient(135deg, #be123c 0%, #881337 100%)', // rose
      'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)', // teal
    ];
    return colors[id % colors.length];
  }
}
