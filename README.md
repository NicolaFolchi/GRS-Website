# Global Rental Solutions Website

Static Next.js website for Global Rental Solutions LLC.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Static Build

```bash
npm run build
```

The static site is exported to `out/` and includes `.nojekyll` for GitHub Pages.

## GitHub Pages

This repository includes `.github/workflows/deploy-github-pages.yml`.

In GitHub, set **Settings > Pages > Source** to **GitHub Actions**.

For the contact form, create a Formspree form that forwards to the desired recipient, then add the endpoint URL as a repository variable:

```text
Settings > Secrets and variables > Actions > Variables
Name: NEXT_PUBLIC_FORMSPREE_ENDPOINT
Value: https://formspree.io/f/your-form-id
```

The recipient email is configured inside Formspree and is not displayed on the website.

The workflow builds with optional environment variables from repository variables:

```bash
NEXT_PUBLIC_BASE_PATH=${{ vars.NEXT_PUBLIC_BASE_PATH }} npm run build
```

For the configured custom domain `globalrentalsolutions.llc`, leave `NEXT_PUBLIC_BASE_PATH` unset so assets resolve from the domain root.

If hosting at a GitHub project URL instead, set `NEXT_PUBLIC_BASE_PATH` to the repository path, for example:

```text
/GRS-Website
```
