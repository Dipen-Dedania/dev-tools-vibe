# Vercel CI/CD Pipeline for DevFlow

## File: `.github/workflows/ci.yml`

```yaml
name: CI/CD Pipeline - DevFlow

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  # ============================================================================
  # CONTINUOUS INTEGRATION: Code Quality & Testing
  # ============================================================================
  
  ci-checks:
    name: Code Quality & Tests
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [20.x]
    
    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: 🔧 Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
          registry-url: 'https://registry.npmjs.org/'

      - name: 📦 Install Dependencies
        run: npm ci --legacy-peer-deps
        env:
          npm_config_audit: false

      - name: 🔍 Run ESLint (Code Linting)
        run: npm run lint
        continue-on-error: false

      - name: 🎯 Run TypeScript Type Check
        run: npm run type-check
        continue-on-error: false

      - name: 🧪 Run Unit Tests with Coverage
        run: npm test -- --coverage --run
        continue-on-error: false

      - name: 📊 Upload Coverage Reports
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella
          fail_ci_if_error: false

      - name: 🏗️ Build Next.js Application
        run: npm run build
        env:
          NEXT_PUBLIC_APP_NAME: DevFlow
          NEXT_PUBLIC_VERSION: ${{ github.run_number }}

      - name: 📈 Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v9
        with:
          configPath: '.github/lighthouse.json'
          uploadArtifacts: true
          temporaryPublicStorage: true
        continue-on-error: true

  # ============================================================================
  # CONTINUOUS DEPLOYMENT: Deploy to Vercel
  # ============================================================================

  deploy-preview:
    name: Deploy Preview to Vercel
    runs-on: ubuntu-latest
    needs: ci-checks
    if: github.event_name == 'pull_request'
    
    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: 📦 Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: 🌐 Install Vercel CLI
        run: npm install --global vercel@latest

      - name: 🔐 Pull Vercel Environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}

      - name: 🏗️ Build Project Artifacts
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}

      - name: 🚀 Deploy to Vercel Preview
        id: deployment
        run: |
          DEPLOYMENT_URL=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})
          echo "deployment_url=$DEPLOYMENT_URL" >> $GITHUB_OUTPUT
          echo "Preview URL: $DEPLOYMENT_URL"

      - name: 💬 Comment PR with Preview URL
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const deploymentUrl = '${{ steps.deployment.outputs.deployment_url }}';
            const comment = `## 🚀 Preview Deployment Ready
            
            [Visit Preview →](${deploymentUrl})
            
            **Branch:** \`${{ github.head_ref }}\`
            **Commit:** \`${{ github.sha }}\`
            **Time:** ${new Date().toISOString()}`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });

  deploy-production:
    name: Deploy Production to Vercel
    runs-on: ubuntu-latest
    needs: ci-checks
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment:
      name: production
      url: https://devflow.dev
    
    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: 📦 Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: 🌐 Install Vercel CLI
        run: npm install --global vercel@latest

      - name: 🔐 Pull Vercel Environment (Production)
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: 🏗️ Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: 🚀 Deploy to Vercel Production
        id: deployment
        run: |
          DEPLOYMENT_URL=$(vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }})
          echo "deployment_url=$DEPLOYMENT_URL" >> $GITHUB_OUTPUT
          echo "🎉 Production Deployed: $DEPLOYMENT_URL"

      - name: 📢 Notify on Deployment
        run: |
          echo "✅ Production deployment successful!"
          echo "URL: ${{ steps.deployment.outputs.deployment_url }}"
          echo "Commit: ${{ github.sha }}"
          echo "Author: ${{ github.actor }}"

  # ============================================================================
  # SECURITY & QUALITY CHECKS
  # ============================================================================

  security-scan:
    name: Security Scan
    runs-on: ubuntu-latest
    
    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: 📦 Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: 🛡️ Run npm Audit
        run: npm audit --audit-level=moderate
        continue-on-error: true

      - name: 🔍 OWASP Dependency Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          path: '.'
          format: 'JSON'
          args: >
            -l VERBOSE
        continue-on-error: true

      - name: 📤 Upload OWASP Results
        uses: actions/upload-artifact@v3
        with:
          name: Dependency Check Report
          path: reports/dependency-check-report.json
        continue-on-error: true

  # ============================================================================
  # PERFORMANCE OPTIMIZATION
  # ============================================================================

  performance-check:
    name: Performance Analysis
    runs-on: ubuntu-latest
    needs: ci-checks
    
    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4

      - name: 🔧 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: 📦 Install Dependencies
        run: npm ci --legacy-peer-deps

      - name: 🏗️ Build Application
        run: npm run build

      - name: 📊 Analyze Bundle Size
        uses: relative-ci/bundle-stats-action@v4
        with:
          bundle-stats-config-path: '.bundlestatsrc.json'
        continue-on-error: true

      - name: 🚀 Check Performance Metrics
        run: |
          echo "🔍 Next.js Build Summary:"
          ls -lah .next/
          echo ""
          echo "📦 Bundle Analysis:"
          npm run analyze 2>/dev/null || echo "Bundle analyzer not configured"
        continue-on-error: true
```

---

## File: `.github/workflows/deploy.yml` (Alternative Simplified Version)

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install & Build
        run: |
          npm ci
          npm run lint
          npm run type-check
          npm test
          npm run build
      
      - name: Deploy to Vercel
        uses: BetaHuhn/deploy-to-vercel-action@v1
        with:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
          PRODUCTION: ${{ github.ref == 'refs/heads/main' }}
```

---

## File: `vercel.json` (Vercel Configuration)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci --legacy-peer-deps",
  "devCommand": "next dev",
  
  "env": {
    "NEXT_PUBLIC_APP_NAME": "DevFlow",
    "NEXT_PUBLIC_VERSION": "@latest"
  },
  
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=3600"
        }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ],
  
  "redirects": [],
  
  "rewrites": [],
  
  "functions": {
    "api/tools/[id].ts": {
      "maxDuration": 10
    }
  }
}
```

---

## File: `.github/lighthouse.json` (Lighthouse CI Configuration)

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "numberOfRuns": 1,
      "staticDistDir": "./.next/static"
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.90 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.90 }],
        "categories:seo": ["error", { "minScore": 0.90 }]
      }
    }
  }
}
```

---

## File: `package.json` (Scripts Section)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx --max-warnings 0",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit --strict",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "analyze": "ANALYZE=true next build",
    "preview": "vercel preview",
    "deploy": "vercel deploy --prod",
    "prepare": "husky install",
    "pre-commit": "lint-staged"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.4",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "husky": "^8.0.0",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

---

## Setup Instructions

### 1. **Create GitHub Secrets**

Go to: **Settings > Secrets and Variables > Actions**

Add these secrets:
- `VERCEL_TOKEN`: Get from Vercel Account Settings
- `VERCEL_ORG_ID`: Get from Vercel Project Settings
- `VERCEL_PROJECT_ID`: Get from Vercel Project Settings

### 2. **Directory Structure**

```
.github/
├── workflows/
│   ├── ci.yml
│   └── deploy.yml
├── lighthouse.json
vercel.json
```

### 3. **Install Vercel CLI Locally**

```bash
npm install -g vercel
vercel link  # Links your project to Vercel
```

### 4. **Environment Variables**

Create `.env.local`:
```
NEXT_PUBLIC_APP_NAME=DevFlow
NEXT_PUBLIC_VERSION=1.0.0
```

### 5. **Deploy Command** (Manual)

```bash
npm run deploy  # Deploys to production
npm run preview # Creates preview URL
```

---

## Features of This Pipeline

✅ **Automated Testing**: Unit tests, type checking, linting  
✅ **Security Scanning**: npm audit, dependency checks  
✅ **Performance Monitoring**: Lighthouse CI, bundle analysis  
✅ **Preview Deployments**: Auto-deploy PRs to preview URLs  
✅ **Production Deployments**: Auto-deploy main branch  
✅ **Code Coverage**: Codecov integration  
✅ **GitHub PR Comments**: Automated deployment feedback  
✅ **Security Headers**: OWASP compliance  
✅ **Caching**: Optimized node_modules caching  
✅ **Environment Separation**: Preview vs Production

---

## Monitoring & Insights

- **Lighthouse Scores**: 90+ for performance, accessibility, SEO
- **Bundle Size Tracking**: Monitor with relative-ci
- **Coverage Reports**: Codecov dashboard
- **Deployment Status**: Check Vercel dashboard
- **Performance Metrics**: Vercel Analytics

---

This pipeline ensures a production-grade developer experience with comprehensive testing, security scanning, and seamless deployments to Vercel.