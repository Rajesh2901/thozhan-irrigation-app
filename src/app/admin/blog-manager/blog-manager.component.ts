import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { BlogPost } from '../../core/models/interfaces';

const SAMPLE_POSTS: BlogPost[] = [
  { id: 1, title: 'How to Apply for PMKSY Drip Irrigation Subsidy (2025 Guide)', slug: 'pmksy-guide-2025', summary: 'Step-by-step guide to applying for the PMKSY drip irrigation subsidy through the TN Horticulture Department.', author: 'Jayachandran', cover_image: null, tags: ['subsidy', 'how-to'], published: true, created_at: '2025-03-15T10:00:00Z' },
  { id: 2, title: 'Drip vs Sprinkler: Which System is Right for Your Farm?', slug: 'drip-vs-sprinkler-comparison', summary: 'A practical comparison of drip and sprinkler irrigation for common Tamil Nadu crops.', author: 'Jayachandran', cover_image: null, tags: ['drip', 'sprinkler'], published: true, created_at: '2025-02-10T10:00:00Z' }
];

@Component({
  selector: 'app-blog-manager',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: `
  <div class="blog-mgr">
    <div class="flex-between mb-6">
      <div>
        <h1 class="text-2xl font-black text-white">Blog Manager</h1>
        <p class="text-xs text-muted">Create, edit, and publish agricultural guides & announcements</p>
      </div>
      <button class="btn btn-primary btn-sm" (click)="openAddModal()">
        <i class="fa-solid fa-plus"></i> New Post
      </button>
    </div>

    <!-- Blog Posts Table -->
    @if (loading()) {
      <div class="loading-center"><div class="spinner"></div><p>Loading blog posts...</p></div>
    } @else {
      <div class="glass-card overflow-hidden">
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Tags</th>
                <th>Status</th>
                <th>Published Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (post of posts(); track post.id) {
                <tr>
                  <td>
                    <div class="font-bold text-white text-sm">{{ post.title }}</div>
                    <div class="text-xs text-muted">/blog/{{ post.slug }}</div>
                  </td>
                  <td>{{ post.author }}</td>
                  <td>
                    <div class="flex gap-1 flex-wrap">
                      @for (t of post.tags; track t) {
                        <span class="badge badge-brand text-[9px] px-2 py-0.5">{{ t }}</span>
                      }
                    </div>
                  </td>
                  <td>
                    <span class="badge" [class]="post.published ? 'badge-green' : 'badge-amber'">
                      {{ post.published ? 'Published' : 'Draft' }}
                    </span>
                  </td>
                  <td class="text-xs text-muted">{{ formatDate(post.created_at) }}</td>
                  <td>
                    <div class="flex gap-2">
                      <button class="btn btn-secondary btn-sm btn-icon" (click)="openEditModal(post)" title="Edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button class="btn btn-danger btn-sm btn-icon" (click)="deletePost(post.id)" title="Delete">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              }
              @if (posts().length === 0) {
                <tr>
                  <td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted)">
                    No articles found. Click "New Post" to create one.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    }

    <!-- Modal Form -->
    @if (showModal()) {
      <div class="modal-backdrop animate-fade">
        <div class="modal-card">
          <div class="flex-between mb-4">
            <h2 class="text-lg font-black text-white">{{ isEdit() ? 'Edit Blog Post' : 'Create Blog Post' }}</h2>
            <button class="close-btn" (click)="closeModal()"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <form [formGroup]="postForm" (ngSubmit)="savePost()">
            <div class="form-group mb-4">
              <label>Title</label>
              <input class="form-control" formControlName="title" (input)="autoGenerateSlug()" placeholder="e.g. How to Apply for Drip Irrigation..." />
            </div>

            <div class="form-grid mb-4">
              <div class="form-group">
                <label>Slug</label>
                <input class="form-control" formControlName="slug" placeholder="e.g. apply-drip-irrigation" />
              </div>
              <div class="form-group">
                <label>Author</label>
                <input class="form-control" formControlName="author" placeholder="Jayachandran" />
              </div>
            </div>

            <div class="form-group mb-4">
              <label>Summary (Brief preview text)</label>
              <textarea class="form-control" formControlName="summary" placeholder="Provide a brief summary of the post..." style="min-height: 60px;"></textarea>
            </div>

            <div class="form-group mb-4">
              <label>Content (Full text or Markdown)</label>
              <textarea class="form-control" formControlName="content" placeholder="Write full post details here..." style="min-height: 180px;"></textarea>
            </div>

            <div class="form-grid mb-4">
              <div class="form-group">
                <label>Comma-separated Tags</label>
                <input class="form-control" formControlName="tagsRaw" placeholder="e.g. subsidy, drip, how-to" />
              </div>
              <div class="form-group flex-center" style="padding-top:1.5rem">
                <label class="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                  <input type="checkbox" formControlName="published" class="accent-brand-500" />
                  <span>Publish immediately</span>
                </label>
              </div>
            </div>

            <div class="flex gap-3 justify-end">
              <button type="button" class="btn btn-secondary btn-sm" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn btn-primary btn-sm" [disabled]="postForm.invalid">
                <i class="fa-solid fa-floppy-disk"></i> Save Article
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  </div>
  `,
  styles: [`
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
      width: 100%; max-width: 700px;
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
export class BlogManagerComponent implements OnInit {
  api = inject(ApiService);
  fb = inject(FormBuilder);

  posts = signal<BlogPost[]>([]);
  loading = signal(true);
  showModal = signal(false);
  isEdit = signal(false);
  editingId: number | null = null;

  postForm = this.fb.group({
    title: ['', Validators.required],
    slug: ['', Validators.required],
    summary: ['', Validators.required],
    content: ['', Validators.required],
    author: ['Jayachandran', Validators.required],
    tagsRaw: ['', Validators.required],
    published: [true]
  });

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.api.getBlogPosts().subscribe(data => {
      this.posts.set(data.length > 0 ? data : SAMPLE_POSTS);
      this.loading.set(false);
    });
  }

  autoGenerateSlug() {
    if (this.isEdit()) return;
    const titleVal = this.postForm.get('title')?.value || '';
    const generated = titleVal
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    this.postForm.patchValue({ slug: generated });
  }

  openAddModal() {
    this.isEdit.set(false);
    this.editingId = null;
    this.postForm.reset({
      title: '', slug: '', summary: '', content: '',
      author: 'Jayachandran', tagsRaw: '', published: true
    });
    this.showModal.set(true);
  }

  openEditModal(post: BlogPost) {
    this.isEdit.set(true);
    this.editingId = post.id;
    this.postForm.patchValue({
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      content: post.content || '',
      author: post.author,
      tagsRaw: post.tags.join(', '),
      published: post.published
    });
    this.showModal.set(true);
  }

  closeModal() {
    this.showModal.set(false);
  }

  savePost() {
    if (this.postForm.invalid) return;
    const val = this.postForm.value;

    const tagsArr = val.tagsRaw
      ? val.tagsRaw.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
      : [];

    const payload: Partial<BlogPost> = {
      title: val.title!,
      slug: val.slug!,
      summary: val.summary!,
      content: val.content!,
      author: val.author!,
      tags: tagsArr,
      published: val.published!,
      cover_image: null
    };

    if (this.isEdit() && this.editingId !== null) {
      this.api.updateBlogPost(this.editingId, payload).subscribe({
        next: (updated) => {
          this.posts.update(list => list.map(p => p.id === this.editingId ? updated : p));
          this.closeModal();
        },
        error: () => {
          // Local fallback edit
          this.posts.update(list => list.map(p => p.id === this.editingId ? { ...p, ...payload } as BlogPost : p));
          this.closeModal();
        }
      });
    } else {
      this.api.createBlogPost(payload).subscribe({
        next: (newPost) => {
          this.posts.update(list => [...list, newPost]);
          this.closeModal();
        },
        error: () => {
          // Local fallback creation
          const newMock: BlogPost = { id: Date.now(), created_at: new Date().toISOString(), ...payload } as BlogPost;
          this.posts.update(list => [...list, newMock]);
          this.closeModal();
        }
      });
    }
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.api.deleteBlogPost(id).subscribe({
        next: () => {
          this.posts.update(list => list.filter(p => p.id !== id));
        },
        error: () => {
          // Local fallback deletion
          this.posts.update(list => list.filter(p => p.id !== id));
        }
      });
    }
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}
