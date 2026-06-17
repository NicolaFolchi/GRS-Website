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

The workflow builds with:

```bash
NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }} npm run build
```

That makes assets work when hosted at a project URL such as:

```text
https://<username>.github.io/GlobalRentalSolutionsWebsite/
```

For a custom domain hosted at the root, remove the `NEXT_PUBLIC_BASE_PATH` environment variable from the workflow.
