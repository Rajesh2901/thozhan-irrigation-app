import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SolutionItem {
  id: string;
  name: string;
  nameTa: string;
  category: string;
  image: string;
  desc: string;
  benefitTag: string;
  idealFor: string;
}

interface FaqItem {
  q: string;
  a: string;
}

const SOLUTIONS: SolutionItem[] = [
  {
    id: 'drip',
    name: 'Drip Irrigation Systems',
    nameTa: 'சொட்டு நீர் பாசனம்',
    category: 'Micro Irrigation',
    image: 'photos/drip.png',
    desc: 'Targeted root-zone water delivery with pressure-compensating emitters, reducing evaporation and surface runoff.',
    benefitTag: 'Suitable for Row Crops & Orchards',
    idealFor: 'Vegetables, Banana, Coconut, Mango, Cotton'
  },
  {
    id: 'sprinkler',
    name: 'Micro Sprinkler Systems',
    nameTa: 'தெளிப்பு நீர் பாசனம்',
    category: 'Overhead Irrigation',
    image: 'photos/sprinkler.png',
    desc: 'Uniform high-frequency misting and rain-like spray over broad acreage with minimal soil erosion.',
    benefitTag: 'Uniform Open-Field Coverage',
    idealFor: 'Groundnut, Pulses, Tea, Nursery & Vegetables'
  },
  {
    id: 'raingun',
    name: 'Rain Gun Irrigation',
    nameTa: 'மழை துப்பாக்கி பாசனம்',
    category: 'High-Throw Cannon',
    image: 'photos/raingun.png',
    desc: 'Heavy-duty high-throw water cannons capable of irrigating up to one acre per stand position with minimal labor.',
    benefitTag: 'Large-Area Coverage',
    idealFor: 'Sugarcane, Forage Grass, Maize & Pastures'
  },
  {
    id: 'solar',
    name: 'Solar Irrigation Pumping',
    nameTa: 'சூரிய ஒளி பம்ப் செட்',
    category: 'Renewable Power',
    image: 'photos/solar.png',
    desc: 'Grid-independent solar pumping units equipped with MPPT hybrid controllers and automated water level protection.',
    benefitTag: 'Grid-Free Solar Pumping',
    idealFor: 'Off-grid farms, borewells & open wells'
  }
];

const FAQS: FaqItem[] = [
  {
    q: 'Which irrigation system is suitable for my farm?',
    a: 'System selection depends on your crop type, soil texture, water availability, and field layout. Row crops and horticulture (banana, vegetables, coconut) perform best with Drip Irrigation. Close-growing crops (groundnut, pulses) benefit from Sprinklers, while tall crops like sugarcane are ideal for Rain Guns. We provide a free on-site farm assessment to recommend the optimal engineering setup.'
  },
  {
    q: 'How can I check government subsidy eligibility?',
    a: 'Under the Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) and Tamil Nadu Horticulture Department schemes, small and marginal farmers (owning up to 5 acres as per Patta records) are eligible for up to 100% subsidy. Other farmers (above 5 to 12 acres) qualify for up to 75% subsidy. You can use our online Subsidy Calculator or call us with your Patta details.'
  },
  {
    q: 'What documents are required to apply for the subsidy?',
    a: 'The basic documents include: 1) Patta and Chitta copies, 2) Adangal or FMB sketch, 3) Aadhaar Card copy, 4) Bank Passbook copy with IFSC, and 5) Passport-size photos. Our dedicated documentation team assists with collecting, verifying, and submitting the paperwork directly to the local Assistant Director of Horticulture (ADH) office.'
  },
  {
    q: 'Do you handle the complete installation and setup?',
    a: 'Yes. Thozhan Irrigation provides end-to-end turnkey installation. Our certified agricultural technicians conduct the initial site survey, design the hydraulic network, trench and lay BIS-standard piping, install the filtration and fertigation units, calibrate emitter pressure, and conduct comprehensive field testing.'
  },
  {
    q: 'Is maintenance and warranty support available after installation?',
    a: 'All our equipment comes with standard manufacturer warranties. We also provide initial free maintenance visits, farmer training on filter flushing and acid treatment, and a dedicated local service hotline with field technician response within 48 hours for any technical support.'
  },
  {
    q: 'How can I request a formal quotation or farm visit?',
    a: 'You can submit the online Quote Request form, message us directly on WhatsApp at +91 94895 28432, or call our farmer hotline at 94895 28432. We will arrange a convenient time for an engineer to visit your land in any of the 18 districts we serve.'
  }
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="home-wrapper">

    <!-- ── 1. HERO SECTION (Prototype A: Daylight Clean & High Contrast) ──── -->
    <section class="hero-section">
      <div class="container-wide hero-container">
        <div class="hero-content">
          <!-- Eyebrow Badge -->
          <div class="hero-eyebrow">
            <span class="badge-dot"></span>
            <span>Government Authorized Irrigation Solutions</span>
          </div>

          <!-- Main Headline -->
          <h1 class="hero-headline">
            Smart Irrigation Systems <br />
            <span class="text-highlight">For Better Yields & Lower Water Usage</span>
          </h1>

          <!-- Tamil translation subtitle -->
          <p class="hero-tamil-sub">
            விவசாயிகளுக்கு தரமான நுண்ணீர் பாசன அமைப்புகள் மற்றும் அரசு மானிய வழிகாட்டுதல்
          </p>

          <!-- Supporting Text -->
          <p class="hero-description">
            Government-approved micro-irrigation solutions with subsidy support, precision engineering, and after-sales service for farmers across Tamil Nadu.
          </p>

          <!-- Action CTAs -->
          <div class="hero-actions">
            <a routerLink="/pricing" class="btn btn-amber btn-lg">
              <i class="fa-solid fa-calculator"></i>
              <span>Check Subsidy Eligibility</span>
            </a>
            <a routerLink="/services" class="btn btn-outline-light btn-lg">
              <i class="fa-solid fa-faucet-drip"></i>
              <span>Explore Solutions</span>
            </a>
          </div>

          <!-- Trust Points below CTAs -->
          <div class="hero-trust-points">
            <div class="trust-point">
              <i class="fa-solid fa-circle-check"></i>
              <span>Government Authorized</span>
            </div>
            <div class="trust-point">
              <i class="fa-solid fa-circle-check"></i>
              <span>Subsidy Assistance</span>
            </div>
            <div class="trust-point">
              <i class="fa-solid fa-circle-check"></i>
              <span>End-to-End Support</span>
            </div>
          </div>
        </div>

        <!-- Hero Visual Card -->
        <div class="hero-visual">
          <div class="visual-card">
            <div class="visual-image-wrapper">
              <img src="photos/drip.png" alt="Agricultural Irrigation System in Field" class="hero-img" />
              <div class="visual-badge">
                <i class="fa-solid fa-droplet"></i>
                <div>
                  <span class="badge-title">Micro-Irrigation Setup</span>
                  <span class="badge-sub">BIS Certified Components</span>
                </div>
              </div>
            </div>

            <!-- Floating Stat Card -->
            <div class="floating-stat">
              <div class="stat-icon">
                <i class="fa-solid fa-users"></i>
              </div>
              <div>
                <div class="stat-number">1,200+</div>
                <div class="stat-label">Tamil Nadu Farms Served Since 2012</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 2. TRUST STRIP (Compact 4 Items) ─────────────────────────────── -->
    <section class="trust-strip">
      <div class="container-wide">
        <div class="trust-grid">
          <div class="trust-card">
            <div class="trust-icon-box">
              <i class="fa-solid fa-certificate"></i>
            </div>
            <div class="trust-info">
              <h4>Government Authorized</h4>
              <p>TN Horticulture & PMKSY scheme authorized partner with verified GST compliance.</p>
            </div>
          </div>

          <div class="trust-card">
            <div class="trust-icon-box">
              <i class="fa-solid fa-file-signature"></i>
            </div>
            <div class="trust-info">
              <h4>Subsidy Guidance</h4>
              <p>Complete paperwork processing from Patta verification to official grant clearance.</p>
            </div>
          </div>

          <div class="trust-card">
            <div class="trust-icon-box">
              <i class="fa-solid fa-screwdriver-wrench"></i>
            </div>
            <div class="trust-info">
              <h4>Professional Installation</h4>
              <p>Certified field technicians calculate hydraulic pressure and install precision pipe networks.</p>
            </div>
          </div>

          <div class="trust-card">
            <div class="trust-icon-box">
              <i class="fa-solid fa-headset"></i>
            </div>
            <div class="trust-info">
              <h4>Reliable After-Sales Support</h4>
              <p>Direct technician visits, filter maintenance training, and equipment warranty care.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 3. SOLUTIONS SECTION (Complete Irrigation Solutions) ─────────── -->
    <section class="section section-light" id="solutions">
      <div class="container-wide">
        <div class="section-header">
          <span class="section-eyebrow eyebrow-light">
            <i class="fa-solid fa-seedling"></i> Complete Equipment Range
          </span>
          <h2 class="section-title">Complete Irrigation Solutions for Every Farm</h2>
          <p class="section-subtitle">
            Choose the right irrigation system engineered for your specific crops, soil conditions, and water source requirements.
          </p>
        </div>

        <div class="grid-4 solutions-grid">
          @for (item of solutions; track item.id) {
            <div class="card-light solution-card hover-lift">
              <!-- Product Image -->
              <div class="solution-img-box">
                <img [src]="item.image" [alt]="item.name" class="solution-img" />
                <span class="category-pill">{{ item.category }}</span>
              </div>

              <!-- Content -->
              <div class="solution-body">
                <div class="solution-title-wrap">
                  <h3 class="solution-title">{{ item.name }}</h3>
                  <span class="solution-ta">{{ item.nameTa }}</span>
                </div>

                <p class="solution-desc">{{ item.desc }}</p>

                <!-- Verified Benefit Tag -->
                <div class="benefit-tag">
                  <i class="fa-solid fa-circle-check text-brand"></i>
                  <span>{{ item.benefitTag }}</span>
                </div>

                <div class="ideal-text">
                  <strong>Ideal for:</strong> {{ item.idealFor }}
                </div>

                <!-- Action CTAs -->
                <div class="solution-actions">
                  <a routerLink="/services" class="btn btn-outline-light btn-sm flex-1">
                    View Details
                  </a>
                  <a routerLink="/pricing" class="btn btn-primary btn-sm flex-1">
                    Get Estimate
                  </a>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── 4. SUBSIDY ASSISTANCE SECTION (Contrasting Warm Cream) ───────── -->
    <section class="section section-cream" id="subsidy-guidance">
      <div class="container-wide">
        <div class="subsidy-header text-center">
          <span class="section-eyebrow eyebrow-light">
            <i class="fa-solid fa-landmark"></i> Tamil Nadu Government Schemes
          </span>
          <h2 class="section-title">Get Guidance for Your Irrigation Subsidy</h2>
          <p class="section-subtitle">
            Understand your eligibility, required documents, application steps, and installation verification with full guidance from our team.
          </p>
        </div>

        <!-- 4-Step Visual Process -->
        <div class="subsidy-steps-grid">
          <div class="step-card">
            <div class="step-badge">1</div>
            <div class="step-icon"><i class="fa-solid fa-clipboard-check"></i></div>
            <h3 class="step-title">Check Eligibility</h3>
            <p class="step-desc">
              Verify your landholding (up to 5 acres for 100% small-farmer subsidy; 5–12 acres for 75% tier) under PMKSY guidelines.
            </p>
          </div>

          <div class="step-card">
            <div class="step-badge">2</div>
            <div class="step-icon"><i class="fa-solid fa-faucet-drip"></i></div>
            <h3 class="step-title">Select Your System</h3>
            <p class="step-desc">
              Our engineers match the right drip, micro-sprinkler, or rain gun kit based on your borewell yield and crop spacing.
            </p>
          </div>

          <div class="step-card">
            <div class="step-badge">3</div>
            <div class="step-icon"><i class="fa-solid fa-file-lines"></i></div>
            <h3 class="step-title">Prepare Documents</h3>
            <p class="step-desc">
              We assist in assembling and verifying your Patta, Chitta, Adangal / FMB sketch, Aadhaar card, and bank passbook.
            </p>
          </div>

          <div class="step-card">
            <div class="step-badge">4</div>
            <div class="step-icon"><i class="fa-solid fa-shield-check"></i></div>
            <h3 class="step-title">Installation & Support</h3>
            <p class="step-desc">
              Horticulture department site inspection clearance, precision equipment setup, and release of authorized government grants.
            </p>
          </div>
        </div>

        <!-- Subsidy CTA and Legal Note -->
        <div class="subsidy-footer">
          <div class="subsidy-cta-box">
            <a routerLink="/pricing" class="btn btn-amber btn-lg">
              <i class="fa-solid fa-calculator"></i>
              <span>Calculate My Subsidy Tier</span>
            </a>
            <a href="https://wa.me/919489528432?text=I%20want%20to%20know%20about%20subsidy%20eligibility"
               target="_blank"
               rel="noopener noreferrer"
               class="btn btn-whatsapp btn-lg">
              <i class="fa-brands fa-whatsapp"></i>
              <span>Ask Subsidy Officer on WhatsApp</span>
            </a>
          </div>

          <p class="subsidy-note">
            <i class="fa-solid fa-circle-info"></i>
            *Subsidy availability and eligibility may vary by scheme, location, crop type, water source, and Tamil Nadu Horticulture Department guidelines.
          </p>
        </div>
      </div>
    </section>

    <!-- ── 5. BENEFITS SECTION (Why Farmers Choose Us) ──────────────────── -->
    <section class="section section-light">
      <div class="container-wide">
        <div class="section-header">
          <span class="section-eyebrow eyebrow-light">
            <i class="fa-solid fa-award"></i> The Thozhan Advantage
          </span>
          <h2 class="section-title">Why Farmers Choose Us</h2>
          <p class="section-subtitle">
            Reliable engineering, honest subsidy paperwork guidance, and genuine field support that stays with you harvest after harvest.
          </p>
        </div>

        <div class="grid-5 benefits-grid">
          <div class="card-light benefit-card">
            <div class="benefit-icon"><i class="fa-solid fa-wheat-awn"></i></div>
            <h3>Solutions for Different Crops</h3>
            <p>Custom lateral layouts and emitter discharge tailored for bananas, vegetables, coconut, sugarcane, and groundnuts.</p>
          </div>

          <div class="card-light benefit-card">
            <div class="benefit-icon"><i class="fa-solid fa-file-invoice-dollar"></i></div>
            <h3>Government Subsidy Guidance</h3>
            <p>Complete paperwork processing with local Horticulture offices so you get the maximum authorized financial assistance.</p>
          </div>

          <div class="card-light benefit-card">
            <div class="benefit-icon"><i class="fa-solid fa-toolbox"></i></div>
            <h3>Professional Installation</h3>
            <p>Proper trenching, pressure regulation, and durable BIS-grade pipe joints installed by experienced field mechanics.</p>
          </div>

          <div class="card-light benefit-card">
            <div class="benefit-icon"><i class="fa-solid fa-shield-halved"></i></div>
            <h3>Quality Equipment</h3>
            <p>Clog-resistant emitters, UV-stabilized virgin plastic tubing, and heavy-duty disc/screen filters built for rural conditions.</p>
          </div>

          <div class="card-light benefit-card">
            <div class="benefit-icon"><i class="fa-solid fa-hand-holding-hand"></i></div>
            <h3>After-Sales Support</h3>
            <p>Farmer training on system operation, periodic flushing checks, and quick on-field technician support when needed.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 6. PRODUCT DETAILS & FARM ASSESSMENT SPOTLIGHT (2 Columns) ────── -->
    <section class="section section-mint">
      <div class="container-wide">
        <div class="grid-2 spotlight-grid items-center">
          <div class="spotlight-image-wrap">
            <img src="photos/sprinkler.png" alt="Farm Water Pressure Assessment" class="spotlight-img" />
            <div class="spotlight-badge">
              <i class="fa-solid fa-water"></i>
              <span>Hydraulic Survey Included</span>
            </div>
          </div>

          <div class="spotlight-content">
            <span class="section-eyebrow eyebrow-light">
              <i class="fa-solid fa-compass-drafting"></i> Engineering Precision
            </span>
            <h2 class="section-title text-left">Custom Farm Assessment Before Every Installation</h2>
            <p class="spotlight-text">
              Every farm has unique topography, water pump capacity, and soil infiltration rates. We don't just supply boxes of pipes — our engineers visit your land to inspect and calculate:
            </p>

            <ul class="spotlight-checklist">
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Borewell & Water Source Flow:</strong> We test pump HP, static head, and water output to avoid dry run or pressure drops.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Soil Type & Field Elevation:</strong> We determine appropriate emitter spacing (0.4m to 1.2m) based on soil absorption.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Filtration Requirement:</strong> Disc, hydrocyclone, or screen filtration configured according to your water sediment level.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Fertigation Integration:</strong> Venturi injectors and fertilizer tanks installed for automated nutrient delivery.
                </div>
              </li>
            </ul>

            <div class="spotlight-actions">
              <a routerLink="/contact" class="btn btn-primary">
                <i class="fa-solid fa-calendar-check"></i> Request Free Field Visit
              </a>
              <a href="tel:9489528432" class="btn btn-outline-light">
                <i class="fa-solid fa-phone"></i> Call Jayachandran: 94895 28432
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 7. INSTALLATION PROCESS JOURNEY (Timeline) ───────────────────── -->
    <section class="section section-light">
      <div class="container-wide">
        <div class="section-header">
          <span class="section-eyebrow eyebrow-light">
            <i class="fa-solid fa-route"></i> Seamless Journey
          </span>
          <h2 class="section-title">Installation Process Journey</h2>
          <p class="section-subtitle">
            From your first inquiry to watering your first crop, here is how we ensure a hassle-free experience.
          </p>
        </div>

        <div class="timeline-journey">
          <div class="journey-step">
            <div class="journey-number">01</div>
            <h4>Consultation</h4>
            <p>Understand crop layout, land acreage, and water availability.</p>
          </div>

          <div class="journey-arrow"><i class="fa-solid fa-arrow-right"></i></div>

          <div class="journey-step">
            <div class="journey-number">02</div>
            <h4>Farm Assessment</h4>
            <p>On-site survey of soil contour, water pressure, and pipeline paths.</p>
          </div>

          <div class="journey-arrow"><i class="fa-solid fa-arrow-right"></i></div>

          <div class="journey-step">
            <div class="journey-number">03</div>
            <h4>System Blueprint</h4>
            <p>Engineered layout map, official subsidy paperwork, and cost estimate.</p>
          </div>

          <div class="journey-arrow"><i class="fa-solid fa-arrow-right"></i></div>

          <div class="journey-step">
            <div class="journey-number">04</div>
            <h4>Installation</h4>
            <p>Precision trenching, pipeline welding, filter assembly, and trial run.</p>
          </div>

          <div class="journey-arrow"><i class="fa-solid fa-arrow-right"></i></div>

          <div class="journey-step">
            <div class="journey-number">05</div>
            <h4>Support & Warranty</h4>
            <p>Farmer training, routine flushing guidance, and prompt after-sales care.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 8. TRUST & PROOF SECTION (Testimonials & Credentials) ────────── -->
    <section class="section section-cream">
      <div class="container-wide">
        <div class="section-header">
          <span class="section-eyebrow eyebrow-light">
            <i class="fa-solid fa-comments"></i> Real Farmer Experiences
          </span>
          <h2 class="section-title">Trusted by Farmers Across Tamil Nadu</h2>
          <p class="section-subtitle">
            Authentic feedback from agricultural communities we have worked with across Dindigul, Karur, Trichy, and surrounding districts.
          </p>
        </div>

        <div class="grid-3 testimonials-grid">
          <div class="card-light testimonial-card">
            <div class="stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="testimonial-quote">
              "Thozhan took care of my Patta and Chitta documents for the 100% subsidy drip system. Water usage reduced significantly and our first season yield was healthy and uniform."
            </p>
            <div class="testimonial-author">
              <div class="author-avatar"><i class="fa-solid fa-user"></i></div>
              <div>
                <strong class="author-name">Murugesan Krishnamurthy</strong>
                <span class="author-location">Paddy & Vegetable Farmer, Dindigul</span>
              </div>
            </div>
          </div>

          <div class="card-light testimonial-card">
            <div class="stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="testimonial-quote">
              "I had questions about documentation for our 3-acre banana grove. Jayachandran's team guided the entire process smoothly until the installation was completed and inspected."
            </p>
            <div class="testimonial-author">
              <div class="author-avatar"><i class="fa-solid fa-user"></i></div>
              <div>
                <strong class="author-name">Lakshmi Sundaram</strong>
                <span class="author-location">Banana Cultivator, Trichy District</span>
              </div>
            </div>
          </div>

          <div class="card-light testimonial-card">
            <div class="stars">
              <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
            </div>
            <p class="testimonial-quote">
              "The rain gun setup for our sugarcane farm was installed on time with high-pressure pipework. Clear guidance on the 75% subsidy tier for our acreage."
            </p>
            <div class="testimonial-author">
              <div class="author-avatar"><i class="fa-solid fa-user"></i></div>
              <div>
                <strong class="author-name">Selvam Thamizharasan</strong>
                <span class="author-location">Sugarcane Grower, Karur District</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Service Area & Credentials Banner -->
        <div class="credentials-bar card-light mt-8">
          <div class="cred-item">
            <i class="fa-solid fa-map-location-dot"></i>
            <div>
              <strong>18 Districts Covered</strong>
              <span>Dindigul, Madurai, Theni, Karur, Trichy, Salem & more</span>
            </div>
          </div>
          <div class="cred-item">
            <i class="fa-solid fa-shield-halved"></i>
            <div>
              <strong>Standard Equipment Warranty</strong>
              <span>BIS approved micro-irrigation lines & pumps</span>
            </div>
          </div>
          <div class="cred-item">
            <i class="fa-solid fa-id-card"></i>
            <div>
              <strong>Government Recognized</strong>
              <span>GSTIN: 33BSXPJ5723P1ZX · Established 2012</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 9. BLOG & GUIDES SECTION ────────────────────────────────────── -->
    <section class="section section-light" id="guides">
      <div class="container-wide">
        <div class="section-header">
          <span class="section-eyebrow eyebrow-light">
            <i class="fa-solid fa-book-open"></i> Farmer Knowledge Hub
          </span>
          <h2 class="section-title">Farmer Guides & Irrigation Insights</h2>
          <p class="section-subtitle">
            Practical advice, subsidy rules, and water management practices compiled by our field experts.
          </p>
        </div>

        <div class="grid-4 blog-grid">
          <div class="card-light blog-card hover-lift">
            <div class="blog-tag-wrap">
              <span class="tag tag-amber">Subsidy Guide</span>
            </div>
            <h3 class="blog-title">How to Apply for PMKSY Drip Irrigation Subsidy in Tamil Nadu</h3>
            <p class="blog-snippet">
              Step-by-step breakdown of eligibility rules, required revenue documents (Patta/Chitta), and department approval stages.
            </p>
            <a routerLink="/blog" class="blog-link">
              <span>Read Full Guide</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div class="card-light blog-card hover-lift">
            <div class="blog-tag-wrap">
              <span class="tag tag-mint">Comparison</span>
            </div>
            <h3 class="blog-title">Drip vs Sprinkler: Choosing the Right System for Your Crops</h3>
            <p class="blog-snippet">
              Compare water delivery rates, pressure requirements, and maintenance needs across common Tamil Nadu crops.
            </p>
            <a routerLink="/blog" class="blog-link">
              <span>Read Full Guide</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div class="card-light blog-card hover-lift">
            <div class="blog-tag-wrap">
              <span class="tag tag-blue">Solar Power</span>
            </div>
            <h3 class="blog-title">Solar Pump Integration with Micro-Irrigation Systems</h3>
            <p class="blog-snippet">
              How linking solar arrays with drip setups eliminates recurring power bills and provides daytime watering flexibility.
            </p>
            <a routerLink="/blog" class="blog-link">
              <span>Read Full Guide</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>

          <div class="card-light blog-card hover-lift">
            <div class="blog-tag-wrap">
              <span class="tag tag-mint">Water Management</span>
            </div>
            <h3 class="blog-title">Preventing Emitter Clogging: Filter Maintenance Tips</h3>
            <p class="blog-snippet">
              Essential tips on regular screen and disc filter backwashing to prevent silt accumulation and preserve flow uniformity.
            </p>
            <a routerLink="/blog" class="blog-link">
              <span>Read Full Guide</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 10. FAQ ACCORDION SECTION ───────────────────────────────────── -->
    <section class="section section-cream" id="faq">
      <div class="container-narrow">
        <div class="section-header">
          <span class="section-eyebrow eyebrow-light">
            <i class="fa-solid fa-circle-question"></i> Common Questions
          </span>
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="section-subtitle">
            Answers to common questions about systems, government subsidies, and installation procedures.
          </p>
        </div>

        <div class="faq-list">
          @for (faq of faqs; track faq.q; let idx = $index) {
            <div class="faq-item" [class.active]="activeFaq() === idx">
              <button class="faq-header" (click)="toggleFaq(idx)">
                <span>{{ faq.q }}</span>
                <span class="faq-icon"><i class="fa-solid fa-chevron-down"></i></span>
              </button>
              @if (activeFaq() === idx) {
                <div class="faq-body animate-fade">
                  <p>{{ faq.a }}</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- ── 11. FINAL QUOTE & WHATSAPP CTA BANNER (Deep Forest Green) ───── -->
    <section class="section section-darker cta-section">
      <div class="container-narrow text-center">
        <span class="section-eyebrow eyebrow-dark">
          <i class="fa-solid fa-tractor"></i> Start Modernizing Your Farm
        </span>
        <h2 class="section-title">Plan the Right Irrigation System for Your Farm</h2>
        <p class="section-subtitle mb-8">
          Speak directly with our agricultural team about your crop, land acreage, water source, and eligible government subsidy options.
        </p>

        <div class="cta-button-group">
          <a routerLink="/contact" class="btn btn-amber btn-lg">
            <i class="fa-solid fa-calculator"></i>
            <span>Get a Custom Quote</span>
          </a>
          <a href="https://wa.me/919489528432?text=Hello%20Thozhan%20Irrigation,%20I%20would%20like%20to%20plan%20an%20irrigation%20system%20for%20my%20farm."
             target="_blank"
             rel="noopener noreferrer"
             class="btn btn-whatsapp btn-lg">
            <i class="fa-brands fa-whatsapp"></i>
            <span>Chat on WhatsApp: 94895 28432</span>
          </a>
        </div>

        <div class="cta-direct-contact">
          <span>Direct Proprietor Contact: <strong>ஜெயசந்திரன் (Jayachandran)</strong></span>
          <span class="divider">·</span>
          <span>Dindigul Office Hotline: <a href="tel:9489528432" class="hotline-link">94895 28432</a></span>
        </div>
      </div>
    </section>

  </div>
  `,
  styles: [`
  /* ── 1. Hero Section (Prototype A: Daylight Theme) ── */
  .hero-section {
    background: linear-gradient(180deg, #F3F7F4 0%, #FFFFFF 100%);
    color: var(--text-primary);
    padding: 5.5rem 1.5rem 5rem;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--border-light);
  }
  .hero-section::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(13, 107, 61, 0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-container {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 3.5rem;
    align-items: center;
  }
  .hero-content {
    max-width: 620px;
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--mint-soft);
    color: var(--brand-main);
    font-size: 0.8125rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.4rem 0.9rem;
    border-radius: var(--radius-full);
    border: 1px solid var(--border-light);
    margin-bottom: 1.25rem;
  }
  .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--brand-main);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
  .hero-headline {
    font-size: clamp(2.4rem, 4vw, 3.4rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  .text-highlight {
    color: var(--brand-main);
  }
  .hero-tamil-sub {
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--brand-main);
    margin-bottom: 1.25rem;
  }
  .hero-description {
    font-size: 1.0625rem;
    line-height: 1.65;
    color: var(--text-secondary);
    margin-bottom: 2rem;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .hero-trust-points {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-light);
  }
  .trust-point {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
  }
  .trust-point i {
    color: var(--brand-main);
  }

  /* Hero Visual Card */
  .hero-visual {
    position: relative;
  }
  .visual-card {
    position: relative;
    border-radius: var(--radius-xl);
    padding: 0.75rem;
    background: var(--white);
    border: 1.5px solid var(--border-light);
    box-shadow: 0 16px 36px rgba(16, 35, 27, 0.08);
  }
  .visual-image-wrapper {
    position: relative;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background-color: var(--mint-soft);
    aspect-ratio: 4/3;
  }
  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .visual-badge {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background: rgba(6, 39, 29, 0.92);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(39, 196, 106, 0.3);
    padding: 0.6rem 1rem;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--white);
  }
  .visual-badge i {
    font-size: 1.25rem;
    color: var(--brand-bright);
  }
  .badge-title {
    display: block;
    font-size: 0.8125rem;
    font-weight: 700;
  }
  .badge-sub {
    font-size: 0.7rem;
    color: var(--text-dark-sub);
  }
  .floating-stat {
    position: absolute;
    bottom: -1.5rem;
    right: -1rem;
    background: var(--white);
    color: var(--text-primary);
    padding: 0.875rem 1.25rem;
    border-radius: var(--radius-lg);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 0.875rem;
    border: 1px solid var(--border-light);
  }
  .stat-icon {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-md);
    background: var(--mint-soft);
    color: var(--brand-main);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
  }
  .stat-number {
    font-size: 1.35rem;
    font-weight: 800;
    color: var(--forest-deep);
    line-height: 1.1;
  }
  .stat-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 600;
  }

  /* ── 2. Trust Strip ── */
  .trust-strip {
    background-color: var(--cream-warm);
    border-bottom: 1px solid var(--border-light);
    padding: 2.25rem 1.5rem;
  }
  .trust-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
  .trust-card {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }
  .trust-icon-box {
    width: 42px;
    height: 42px;
    border-radius: var(--radius-md);
    background: var(--white);
    border: 1px solid var(--border-light);
    color: var(--brand-main);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    flex-shrink: 0;
    box-shadow: var(--shadow-sm);
  }
  .trust-info h4 {
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.25rem;
  }
  .trust-info p {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.45;
  }

  /* ── 3. Solutions Section ── */
  .solutions-grid {
    margin-top: 1rem;
  }
  .solution-card {
    display: flex;
    flex-direction: column;
    padding: 1.25rem;
  }
  .solution-img-box {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    aspect-ratio: 16/10;
    background-color: #E8F2EC;
    margin-bottom: 1.25rem;
  }
  .solution-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .category-pill {
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
  .solution-body {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .solution-title-wrap {
    margin-bottom: 0.75rem;
  }
  .solution-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1.3;
  }
  .solution-ta {
    font-size: 0.8125rem;
    color: var(--brand-main);
    font-weight: 600;
    display: block;
    margin-top: 0.15rem;
  }
  .solution-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.55;
    margin-bottom: 1rem;
    flex: 1;
  }
  .benefit-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--forest-deep);
    background-color: var(--mint-soft);
    padding: 0.35rem 0.75rem;
    border-radius: var(--radius-md);
    margin-bottom: 0.75rem;
  }
  .ideal-text {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 1.25rem;
    border-top: 1px solid var(--border-subtle);
    padding-top: 0.75rem;
  }
  .solution-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
  }

  /* ── 4. Subsidy Assistance Section ── */
  .subsidy-steps-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin: 3rem 0;
  }
  .step-card {
    background-color: var(--white);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 2rem 1.5rem;
    position: relative;
    box-shadow: var(--shadow-sm);
    transition: var(--transition-smooth);
  }
  .step-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
    border-color: var(--brand-main);
  }
  .step-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--mint-soft);
    color: var(--brand-main);
    font-weight: 800;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .step-icon {
    width: 50px;
    height: 50px;
    border-radius: var(--radius-md);
    background-color: var(--cream-warm);
    color: var(--forest-deep);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    margin-bottom: 1.25rem;
  }
  .step-title {
    font-size: 1.1rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  .step-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.55;
  }
  .subsidy-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }
  .subsidy-cta-box {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }
  .subsidy-note {
    font-size: 0.8125rem;
    color: var(--text-muted);
    text-align: center;
    max-width: 720px;
  }

  /* ── 5. Benefits Section ── */
  .benefits-grid {
    margin-top: 1rem;
  }
  .benefit-card {
    text-align: center;
    padding: 2rem 1.25rem;
  }
  .benefit-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--mint-soft);
    color: var(--brand-main);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    margin: 0 auto 1.25rem;
  }
  .benefit-card h3 {
    font-size: 1rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }
  .benefit-card p {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  /* ── 6. Spotlight (2 Columns) ── */
  .spotlight-grid {
    gap: 3.5rem;
  }
  .spotlight-image-wrap {
    position: relative;
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-md);
  }
  .spotlight-img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
  }
  .spotlight-badge {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: rgba(6, 39, 29, 0.95);
    color: var(--white);
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    font-size: 0.8125rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .spotlight-badge i { color: var(--water-blue); }
  .text-left { text-align: left; }
  .spotlight-text {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  .spotlight-checklist {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  .spotlight-checklist li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: var(--text-primary);
    line-height: 1.5;
  }
  .spotlight-checklist i {
    color: var(--brand-main);
    font-size: 1rem;
    margin-top: 0.2rem;
    flex-shrink: 0;
  }
  .spotlight-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  /* ── 7. Timeline Journey ── */
  .timeline-journey {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;
    gap: 0.5rem;
  }
  .journey-step {
    flex: 1;
    background: var(--cream-warm);
    border: 1px solid var(--border-light);
    border-radius: var(--radius-lg);
    padding: 1.75rem 1rem;
    text-align: center;
    transition: var(--transition-fast);
  }
  .journey-step:hover {
    background: var(--white);
    transform: translateY(-4px);
    box-shadow: var(--shadow-sm);
  }
  .journey-number {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--brand-main);
    margin-bottom: 0.5rem;
  }
  .journey-step h4 {
    font-size: 0.9375rem;
    font-weight: 800;
    color: var(--text-primary);
    margin-bottom: 0.4rem;
  }
  .journey-step p {
    font-size: 0.75rem;
    color: var(--text-secondary);
    line-height: 1.4;
  }
  .journey-arrow {
    color: var(--border-light);
    font-size: 1.25rem;
    padding: 0 0.25rem;
  }

  /* ── 8. Testimonials & Credentials ── */
  .testimonial-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
  }
  .stars {
    color: #F5A623;
    font-size: 0.875rem;
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1rem;
  }
  .testimonial-quote {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--text-primary);
    font-style: italic;
    margin-bottom: 1.5rem;
    flex: 1;
  }
  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-top: 1px solid var(--border-subtle);
    padding-top: 1rem;
  }
  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--mint-soft);
    color: var(--brand-main);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }
  .author-name {
    display: block;
    font-size: 0.875rem;
    color: var(--text-primary);
  }
  .author-location {
    font-size: 0.75rem;
    color: var(--text-muted);
  }
  .credentials-bar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 1.75rem 2rem;
  }
  .cred-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .cred-item i {
    font-size: 1.75rem;
    color: var(--brand-main);
  }
  .cred-item strong {
    display: block;
    font-size: 0.9375rem;
    color: var(--text-primary);
  }
  .cred-item span {
    font-size: 0.8125rem;
    color: var(--text-secondary);
  }

  /* ── 9. Blog Cards ── */
  .blog-card {
    display: flex;
    flex-direction: column;
    padding: 1.75rem;
  }
  .blog-tag-wrap {
    margin-bottom: 0.875rem;
  }
  .blog-title {
    font-size: 1.0625rem;
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1.4;
    margin-bottom: 0.75rem;
  }
  .blog-snippet {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    line-height: 1.55;
    margin-bottom: 1.25rem;
    flex: 1;
  }
  .blog-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8125rem;
    font-weight: 700;
    color: var(--brand-main);
    text-decoration: none;
    margin-top: auto;
  }
  .blog-link:hover {
    color: var(--forest-deep);
  }

  /* ── 11. Final CTA Banner ── */
  .cta-section {
    padding: 5.5rem 1.5rem;
  }
  .cta-button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .cta-direct-contact {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: var(--text-dark-sub);
    flex-wrap: wrap;
  }
  .cta-direct-contact strong {
    color: var(--white);
  }
  .hotline-link {
    color: var(--brand-bright);
    font-weight: 700;
  }
  .hotline-link:hover {
    color: var(--white);
  }

  /* Responsive Breakpoints */
  @media (max-width: 1024px) {
    .hero-container { grid-template-columns: 1fr; gap: 3rem; }
    .hero-visual { max-width: 520px; margin: 0 auto; }
    .floating-stat { right: 0; bottom: -1rem; }
    .trust-grid { grid-template-columns: repeat(2, 1fr); }
    .subsidy-steps-grid { grid-template-columns: repeat(2, 1fr); }
    .timeline-journey { flex-direction: column; gap: 1rem; }
    .journey-arrow { transform: rotate(90deg); padding: 0.5rem 0; }
    .credentials-bar { grid-template-columns: 1fr; gap: 1.25rem; }
  }

  @media (max-width: 640px) {
    .hero-section { padding: 3.5rem 1rem; }
    .hero-headline { font-size: 2.1rem; }
    .hero-actions { flex-direction: column; width: 100%; }
    .hero-actions .btn { width: 100%; }
    .trust-grid { grid-template-columns: 1fr; gap: 1.25rem; }
    .subsidy-steps-grid { grid-template-columns: 1fr; }
    .floating-stat { display: none; }
    .cta-button-group { flex-direction: column; }
    .cta-button-group .btn { width: 100%; }
  }
  `]
})
export class HomeComponent {
  solutions = SOLUTIONS;
  faqs = FAQS;
  activeFaq = signal<number | null>(0);

  toggleFaq(index: number) {
    this.activeFaq.update(current => (current === index ? null : index));
  }
}
