# Thozhan Irrigation App - Operations & Deployment Runbook

Welcome to the operations, deployment, and security runbook for the **Thozhan Irrigation** web application.

---

## 1. Quick Start & Local Setup

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- Docker (optional, for containerized deployments)

### Development Setup
```bash
# 1. Install project dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## 2. Automated Testing & Code Quality Checks

```bash
# Run Oxlint code quality verification
npm run lint

# Run Vitest unit & security test suite
npm run test

# Run Vite production build check
npm run build
```

---

## 3. Environment Variables & Secrets Management

To run in production environments, configure environment variables via `.env.production`:

| Variable Name | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_WHATSAPP_NUMBER` | Default target WhatsApp dispatch number | `9489528432` |
| `VITE_APP_TITLE` | Application Title Header | `Thozhan Irrigation` |
| `VITE_ENVIRONMENT` | Target environment label | `production` |

> [!IMPORTANT]
> Never check `.env.local` or secret keys into version control. Ensure all administrative passcode hashes are configured securely on server endpoints.

---

## 4. Production Build & Deployment

### Option A: Docker Deployment (Recommended)

1. **Build Docker Image**:
   ```bash
   docker build -t thozhan-irrigation:latest .
   ```

2. **Run Container**:
   ```bash
   docker run -d -p 80:80 --name thozhan-app thozhan-irrigation:latest
   ```

3. **Verify Health**:
   ```bash
   docker inspect --format='{{json .State.Health}}' thozhan-app
   ```

### Option B: Static Host Deployment (Vercel / Netlify / AWS S3)

1. Compile bundle: `npm run build`
2. Deploy the generated `dist/` directory to static hosting.
3. Configure redirect rules so `/` routes to `index.html`.

---

## 5. Security & Threat Mitigation Runbook

- **XSS Mitigation**: All inline edits and farmer input fields pass through `sanitizeInput()` in `src/utils/security.js`.
- **Passcode Protection**: Admin mode authentication verifies salted cryptographic hashes instead of storing plain-text keys in localStorage or URL query parameters.
- **CSP Headers**: Enforcement of strict Content Security Policy directives via `<meta>` tag and Nginx headers (`nginx.conf`).

---

## 6. Support & Contact

- **Base Operations**: Dindigul, Tamil Nadu
- **Subsidy Scheme Version**: TN-HORT-2026
