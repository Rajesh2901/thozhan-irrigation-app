import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  signal,
  NgZone,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

export interface HotspotInfo {
  id: string;
  name: string;
  category: string;
  pressure: string;
  flowRate: string;
  material: string;
  description: string;
  position: { x: number; y: number; z: number };
}

@Component({
  selector: 'app-three-d-irrigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="canvas-wrapper" #containerRef>
      <!-- WebGL 3D Canvas -->
      <canvas #canvasRef class="webgl-canvas" [class.paused]="!isPlaying()"></canvas>

      <!-- Overlay Telemetry & Controls UI -->
      <div class="overlay-controls">
        <div class="controls-top">
          <div class="mode-pills">
            <button 
              class="mode-pill" 
              [class.active]="currentMode() === 'drip'"
              (click)="setMode('drip')">
              <i class="fa-solid fa-faucet-drip"></i> Drip Network
            </button>
            <button 
              class="mode-pill" 
              [class.active]="currentMode() === 'sprinkler'"
              (click)="setMode('sprinkler')">
              <i class="fa-solid fa-sprinkler"></i> Sprinkler Spread
            </button>
            <button 
              class="mode-pill" 
              [class.active]="currentMode() === 'underground'"
              (click)="setMode('underground')">
              <i class="fa-solid fa-layer-group"></i> Sub-Surface Trench
            </button>
          </div>

          <div class="playback-actions">
            <button class="icon-btn" (click)="togglePlay()" [title]="isPlaying() ? 'Pause Flow' : 'Resume Flow'">
              <i class="fa-solid" [class.fa-pause]="isPlaying()" [class.fa-play]="!isPlaying()"></i>
            </button>
            <button class="icon-btn" (click)="resetCamera()" title="Reset Camera View">
              <i class="fa-solid fa-arrows-rotate"></i>
            </button>
          </div>
        </div>

        <!-- Hotspot Inspection Card (Dynamic when hotspot selected) -->
        @if (selectedHotspot(); as spot) {
          <div class="hotspot-card animate-fade">
            <div class="hotspot-card-header">
              <div class="hotspot-badge">
                <i class="fa-solid fa-circle-dot"></i> {{ spot.category }}
              </div>
              <button class="close-card-btn" (click)="selectedHotspot.set(null)">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
            <h4 class="hotspot-title">{{ spot.name }}</h4>
            <p class="hotspot-desc">{{ spot.description }}</p>

            <div class="hotspot-specs-grid">
              <div class="spec-pill">
                <span class="spec-lbl">Operating Pressure</span>
                <span class="spec-val">{{ spot.pressure }}</span>
              </div>
              <div class="spec-pill">
                <span class="spec-lbl">Discharge Velocity</span>
                <span class="spec-val">{{ spot.flowRate }}</span>
              </div>
              <div class="spec-pill">
                <span class="spec-lbl">BIS Standard</span>
                <span class="spec-val">{{ spot.material }}</span>
              </div>
            </div>
          </div>
        } @else {
          <!-- Quick Hint Bar -->
          <div class="interaction-hint">
            <i class="fa-solid fa-hand-pointer"></i>
            <span>Drag to rotate 3D field · Scroll to zoom · Click numbered nodes for specs</span>
          </div>
        }

        <!-- Interactive Hotspot Pins Overlay -->
        <div class="pins-overlay">
          @for (spot of hotspots; track spot.id) {
            <button 
              class="hotspot-pin"
              [class.selected]="selectedHotspot()?.id === spot.id"
              [style.left]="getScreenPos(spot.id).x + 'px'"
              [style.top]="getScreenPos(spot.id).y + 'px'"
              (click)="selectHotspot(spot)">
              <span class="pin-inner">{{ spot.id }}</span>
              <span class="pin-label">{{ spot.name }}</span>
            </button>
          }
        </div>
      </div>

      <!-- Fallback message if WebGL unavailable -->
      @if (webglError()) {
        <div class="webgl-fallback">
          <i class="fa-solid fa-cube text-3xl mb-2"></i>
          <h4>Hardware Accelerated 3D View</h4>
          <p>Interactive 3D simulation running in simplified fallback mode.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      position: relative;
    }
    .canvas-wrapper {
      position: relative;
      width: 100%;
      height: 480px;
      border-radius: var(--radius-lg, 16px);
      overflow: hidden;
      background: radial-gradient(circle at 50% 30%, #173819 0%, #0E2410 100%);
      box-shadow: 0 12px 36px rgba(19, 46, 21, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.12);
      user-select: none;
    }
    .webgl-canvas {
      width: 100%;
      height: 100%;
      display: block;
      cursor: grab;
    }
    .webgl-canvas:active {
      cursor: grabbing;
    }

    .overlay-controls {
      position: absolute;
      inset: 0;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1.25rem;
    }

    .controls-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      pointer-events: auto;
      flex-wrap: wrap;
    }

    .mode-pills {
      display: flex;
      background: rgba(14, 36, 16, 0.75);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 0.25rem;
      border-radius: 9999px;
      gap: 0.25rem;
    }
    .mode-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.8);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .mode-pill:hover {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.1);
    }
    .mode-pill.active {
      background: #FFCC00;
      color: #1E4620;
      box-shadow: 0 2px 8px rgba(255, 204, 0, 0.35);
    }

    .playback-actions {
      display: flex;
      gap: 0.5rem;
    }
    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(14, 36, 16, 0.75);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .icon-btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    .hotspot-card {
      pointer-events: auto;
      max-width: 360px;
      background: rgba(14, 36, 16, 0.92);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 204, 0, 0.4);
      border-radius: var(--radius-md, 12px);
      padding: 1rem 1.25rem;
      color: #FFFFFF;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      margin-top: auto;
    }
    .hotspot-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
    .hotspot-badge {
      font-size: 0.6875rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #FFCC00;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .close-card-btn {
      background: transparent;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      font-size: 0.875rem;
      padding: 0.2rem;
    }
    .close-card-btn:hover { color: #FFFFFF; }
    .hotspot-title {
      font-size: 1rem;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 0.35rem;
    }
    .hotspot-desc {
      font-size: 0.78125rem;
      color: rgba(255, 255, 255, 0.75);
      line-height: 1.45;
      margin-bottom: 0.75rem;
    }
    .hotspot-specs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 0.75rem;
    }
    .spec-pill {
      display: flex;
      flex-direction: column;
    }
    .spec-lbl {
      font-size: 0.625rem;
      color: rgba(255, 255, 255, 0.55);
      text-transform: uppercase;
      margin-bottom: 0.15rem;
    }
    .spec-val {
      font-size: 0.75rem;
      font-weight: 700;
      color: #00E5FF;
    }

    .interaction-hint {
      pointer-events: auto;
      align-self: center;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem 0.875rem;
      background: rgba(14, 36, 16, 0.8);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 9999px;
      color: rgba(255, 255, 255, 0.75);
      font-size: 0.75rem;
      font-weight: 500;
    }

    /* Hotspot Pins Overlay */
    .pins-overlay {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .hotspot-pin {
      position: absolute;
      pointer-events: auto;
      transform: translate(-50%, -50%);
      background: rgba(30, 70, 32, 0.85);
      border: 2px solid #FFCC00;
      border-radius: 9999px;
      padding: 0.25rem 0.6rem 0.25rem 0.35rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      color: #FFFFFF;
      font-size: 0.7rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .hotspot-pin:hover, .hotspot-pin.selected {
      background: #FFCC00;
      color: #1E4620;
      border-color: #FFFFFF;
      transform: translate(-50%, -50%) scale(1.1);
    }
    .pin-inner {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #0066CC;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      font-weight: 800;
    }
    .hotspot-pin.selected .pin-inner {
      background: #1E4620;
    }

    .webgl-fallback {
      position: absolute;
      inset: 0;
      background: #143216;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
    }

    @media (max-width: 768px) {
      .canvas-wrapper { height: 380px; }
      .mode-pill span { display: none; }
      .hotspot-card { max-width: 100%; }
      .interaction-hint { font-size: 0.6875rem; }
    }
  `]
})
export class ThreeDIrrigationComponent implements OnInit, OnDestroy {
  @ViewChild('containerRef', { static: true }) containerRef!: ElementRef<HTMLDivElement>;
  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ngZone = inject(NgZone);

  // Reactive state
  isPlaying = signal(true);
  currentMode = signal<'drip' | 'sprinkler' | 'underground'>('drip');
  selectedHotspot = signal<HotspotInfo | null>(null);
  webglError = signal(false);

  // Three.js instances
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animFrameId: number | null = null;

  // Scene objects
  private pipeGroup!: THREE.Group;
  private waterParticles!: THREE.Points;
  private groundMesh!: THREE.Mesh;
  private sprinklerMeshGroup!: THREE.Group;

  // Interaction tracking
  private isDragging = false;
  private previousMousePosition = { x: 0, y: 0 };
  private rotationMomentum = { x: 0, y: 0.003 };

  // Screen projected positions for 2D UI pins
  screenPositions = signal<{ [key: string]: { x: number; y: number } }>({});

  hotspots: HotspotInfo[] = [
    {
      id: '1',
      name: 'Main Filter Station',
      category: 'Head Control Unit',
      pressure: '2.5 – 3.2 Bar',
      flowRate: '15,000 LPH',
      material: 'BIS IS 12786',
      description: 'Dual screen disc filtration unit with automatic backwash preventing particulate emitter clogging.',
      position: { x: -4.5, y: 1.2, z: 0 }
    },
    {
      id: '2',
      name: 'Venturi Fertigation Unit',
      category: 'Nutrient Injection',
      pressure: '2.0 Bar Diff',
      flowRate: '120 LPH Suction',
      material: 'Chemical-Resistant Poly',
      description: 'Vacuum-driven fertilizer metering system introducing soluble micro-nutrients directly to crop roots.',
      position: { x: -2.2, y: 0.8, z: 0 }
    },
    {
      id: '3',
      name: '16mm Pressure Lateral',
      category: 'Sub-Main Distribution',
      pressure: '1.0 – 1.8 Bar',
      flowRate: '4.0 LPH / Emitter',
      material: 'Virgin HDPE UV-Grade',
      description: 'UV-stabilized inline drip tube with pressure-compensating labyrinth drippers spaced at 40cm.',
      position: { x: 1.5, y: 0.2, z: 2.0 }
    },
    {
      id: '4',
      name: 'Hydraulic Solenoid Valve',
      category: 'Zone Automation',
      pressure: '0.5 – 10 Bar',
      flowRate: 'Full Bore 2" Pipe',
      material: 'Glass-Filled Nylon',
      description: 'Automated pulse-actuated solenoid enabling precision sectional irrigation scheduling per crop plot.',
      position: { x: 3.5, y: 0.5, z: -1.5 }
    }
  ];

  ngOnInit() {
    this.initThree();
  }

  ngOnDestroy() {
    this.cleanupThree();
  }

  private initThree() {
    try {
      const container = this.containerRef.nativeElement;
      const canvas = this.canvasRef.nativeElement;
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 480;

      // 1. Scene
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x0e2410, 0.035);

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(0, 5.5, 9.5);
      this.camera.lookAt(0, 0, 0);

      // 3. Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 4. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      this.scene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xfffaed, 1.4);
      sunLight.position.set(6, 12, 8);
      this.scene.add(sunLight);

      const waterPointLight = new THREE.PointLight(0x00e5ff, 2, 15);
      waterPointLight.position.set(0, 2, 2);
      this.scene.add(waterPointLight);

      // 5. Construct Scene Elements
      this.buildGround();
      this.buildHydraulicNetwork();
      this.buildWaterParticles();
      this.buildSprinklerHead();

      // 6. Setup Event Listeners
      this.setupEventListeners();

      // 7. Start Render Loop outside Angular zone for high FPS
      this.ngZone.runOutsideAngular(() => {
        this.animate();
      });

    } catch (err) {
      console.warn('WebGL initialization failed, falling back:', err);
      this.webglError.set(true);
    }
  }

  private buildGround() {
    // Soil / Field Grid
    const groundGeo = new THREE.PlaneGeometry(24, 18, 24, 18);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x143216,
      roughness: 0.9,
      metalness: 0.1,
      wireframe: false
    });
    this.groundMesh = new THREE.Mesh(groundGeo, groundMat);
    this.groundMesh.rotation.x = -Math.PI / 2;
    this.groundMesh.position.y = -0.1;
    this.scene.add(this.groundMesh);

    // Subtle crop bed ridges
    const ridgeGroup = new THREE.Group();
    const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x1c441f, roughness: 0.8 });
    for (let z = -6; z <= 6; z += 2.5) {
      const ridgeGeo = new THREE.BoxGeometry(16, 0.15, 1.2);
      const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
      ridge.position.set(0, 0, z);
      ridgeGroup.add(ridge);
    }
    this.scene.add(ridgeGroup);
  }

  private buildHydraulicNetwork() {
    this.pipeGroup = new THREE.Group();

    // Main header pipe (PVC green / dark slate)
    const mainPipeGeo = new THREE.CylinderGeometry(0.22, 0.22, 14, 24);
    const mainPipeMat = new THREE.MeshStandardMaterial({
      color: 0x1e4620,
      metalness: 0.6,
      roughness: 0.3
    });
    const mainPipe = new THREE.Mesh(mainPipeGeo, mainPipeMat);
    mainPipe.rotation.z = Math.PI / 2;
    mainPipe.position.set(0, 0.4, -4);
    this.pipeGroup.add(mainPipe);

    // Filter station cylinder (Hotspot 1)
    const filterGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.4, 24);
    const filterMat = new THREE.MeshStandardMaterial({
      color: 0x0066cc,
      metalness: 0.5,
      roughness: 0.3
    });
    const filterMesh = new THREE.Mesh(filterGeo, filterMat);
    filterMesh.position.set(-4.5, 0.9, -4);
    this.pipeGroup.add(filterMesh);

    // Pressure Gauge ring
    const gaugeGeo = new THREE.TorusGeometry(0.22, 0.05, 12, 24);
    const gaugeMat = new THREE.MeshStandardMaterial({ color: 0xffcc00, metalness: 0.8 });
    const gauge = new THREE.Mesh(gaugeGeo, gaugeMat);
    gauge.position.set(-4.5, 1.8, -4);
    this.pipeGroup.add(gauge);

    // Venturi Injector manifold (Hotspot 2)
    const venturiGeo = new THREE.ConeGeometry(0.35, 0.8, 16);
    const venturiMat = new THREE.MeshStandardMaterial({ color: 0xe5a000, metalness: 0.7 });
    const venturi = new THREE.Mesh(venturiGeo, venturiMat);
    venturi.position.set(-2.2, 0.8, -4);
    this.pipeGroup.add(venturi);

    // Sub-main Laterals branching across field rows (Hotspot 3)
    const lateralGeo = new THREE.CylinderGeometry(0.08, 0.08, 9, 16);
    const lateralMat = new THREE.MeshStandardMaterial({
      color: 0x111111, // UV black HDPE
      roughness: 0.4
    });

    for (let x = -3; x <= 4; x += 1.8) {
      const lateral = new THREE.Mesh(lateralGeo, lateralMat);
      lateral.rotation.x = Math.PI / 2;
      lateral.position.set(x, 0.18, 0.5);
      this.pipeGroup.add(lateral);

      // Micro drippers along lateral
      for (let z = -3; z <= 4; z += 1.2) {
        const dripperGeo = new THREE.SphereGeometry(0.07, 12, 12);
        const dripperMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x0066cc, emissiveIntensity: 0.6 });
        const dripper = new THREE.Mesh(dripperGeo, dripperMat);
        dripper.position.set(x, 0.22, z);
        this.pipeGroup.add(dripper);
      }
    }

    // Solenoid Control Box (Hotspot 4)
    const boxGeo = new THREE.BoxGeometry(0.7, 0.8, 0.6);
    const boxMat = new THREE.MeshStandardMaterial({ color: 0x238636, metalness: 0.5 });
    const solenoidBox = new THREE.Mesh(boxGeo, boxMat);
    solenoidBox.position.set(3.5, 0.5, -4);
    this.pipeGroup.add(solenoidBox);

    this.scene.add(this.pipeGroup);
  }

  private buildWaterParticles() {
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00e5ff); // Cyan glow
    const c2 = new THREE.Color(0x0066cc); // Authority blue

    for (let i = 0; i < particleCount; i++) {
      // Scatter particles inside the pipes
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = 0.25 + Math.random() * 0.15;
      positions[i * 3 + 2] = -4 + Math.random() * 8;

      const mixedColor = c1.clone().lerp(c2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    this.waterParticles = new THREE.Points(geometry, material);
    this.scene.add(this.waterParticles);
  }

  private buildSprinklerHead() {
    this.sprinklerMeshGroup = new THREE.Group();
    const riserGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.5, 16);
    const riserMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.8 });
    const riser = new THREE.Mesh(riserGeo, riserMat);
    riser.position.set(0, 0.75, 1);
    this.sprinklerMeshGroup.add(riser);

    // Rotary nozzle
    const nozzleGeo = new THREE.ConeGeometry(0.2, 0.4, 16);
    const nozzleMat = new THREE.MeshStandardMaterial({ color: 0xffcc00, metalness: 0.7 });
    const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
    nozzle.rotation.z = Math.PI;
    nozzle.position.set(0, 1.5, 1);
    this.sprinklerMeshGroup.add(nozzle);

    this.sprinklerMeshGroup.visible = false;
    this.scene.add(this.sprinklerMeshGroup);
  }

  private setupEventListeners() {
    const canvas = this.canvasRef.nativeElement;

    canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    canvas.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.pipeGroup.rotation.y += deltaX * 0.006;
      this.groundMesh.rotation.z += deltaX * 0.006;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch support for mobile
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    });

    canvas.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      this.pipeGroup.rotation.y += deltaX * 0.008;
      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Resize listener
    window.addEventListener('resize', this.onWindowResize);
  }

  private onWindowResize = () => {
    if (!this.containerRef || !this.renderer || !this.camera) return;
    const width = this.containerRef.nativeElement.clientWidth;
    const height = this.containerRef.nativeElement.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private animate = () => {
    this.animFrameId = requestAnimationFrame(this.animate);

    if (this.isPlaying()) {
      // Gentle idle turntable drift when user not dragging
      if (!this.isDragging) {
        this.pipeGroup.rotation.y += 0.0018;
      }

      // Animate water flow particles
      if (this.waterParticles) {
        const positions = this.waterParticles.geometry.attributes['position'].array as Float32Array;
        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3 + 2] += 0.06; // Flow forward along z-axis laterals
          if (positions[i * 3 + 2] > 5) {
            positions[i * 3 + 2] = -4; // Reset to main manifold
          }
        }
        this.waterParticles.geometry.attributes['position'].needsUpdate = true;
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.updateScreenPositions();
  };

  private updateScreenPositions() {
    if (!this.camera || !this.containerRef) return;
    const width = this.containerRef.nativeElement.clientWidth;
    const height = this.containerRef.nativeElement.clientHeight;

    const newPositions: { [key: string]: { x: number; y: number } } = {};

    this.hotspots.forEach(spot => {
      const v = new THREE.Vector3(spot.position.x, spot.position.y, spot.position.z);
      // Apply pipeGroup rotation
      v.applyEuler(this.pipeGroup.rotation);

      v.project(this.camera);
      const x = (v.x * 0.5 + 0.5) * width;
      const y = (-(v.y * 0.5) + 0.5) * height;
      newPositions[spot.id] = { x, y };
    });

    this.screenPositions.set(newPositions);
  }

  getScreenPos(id: string): { x: number; y: number } {
    return this.screenPositions()[id] || { x: -100, y: -100 };
  }

  selectHotspot(spot: HotspotInfo) {
    this.selectedHotspot.set(spot);
  }

  togglePlay() {
    this.isPlaying.update(p => !p);
  }

  resetCamera() {
    this.pipeGroup.rotation.set(0, 0, 0);
    this.camera.position.set(0, 5.5, 9.5);
    this.camera.lookAt(0, 0, 0);
  }

  setMode(mode: 'drip' | 'sprinkler' | 'underground') {
    this.currentMode.set(mode);
    if (mode === 'sprinkler') {
      this.sprinklerMeshGroup.visible = true;
      this.groundMesh.position.y = -0.1;
    } else if (mode === 'underground') {
      this.sprinklerMeshGroup.visible = false;
      this.groundMesh.position.y = 0.4; // Soil layer over pipes
    } else {
      this.sprinklerMeshGroup.visible = false;
      this.groundMesh.position.y = -0.1;
    }
  }

  private cleanupThree() {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
    }
    window.removeEventListener('resize', this.onWindowResize);

    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      this.scene.clear();
    }
  }
}
