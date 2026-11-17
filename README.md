# BANN & Associates – Website Redesign

A modern, responsive law firm website built with HTML5, CSS3, and vanilla JavaScript.

## 🏗️ Architecture

This is a static website refactored for maintainability with:
- **Shared CSS** - Common styles extracted to `css/shared.css`
- **Shared JavaScript** - Common functionality in `js/shared.js`
- **Relative URLs** - All navigation uses relative paths for local/GitHub Pages compatibility

## 📄 Pages

### Core Pages
- **index.html** - Homepage with hero, featured articles, expertise grid, insights gallery, team, careers
- **about-us.html** - Firm overview with values and why choose us
- **services.html** - Expertise areas with 5 practice groups and 14 services
- **team.html** - Team roster with partners, associates, and management
- **contact.html** - Inquiry forms and office locations
- **legal-notices.html** - Terms of service and data policy
- **insights/index.html** - Searchable library of all articles

### Article Pages (Semantic Naming: `[topic]-[year].html`)
- **insights/cybersecurity-amendment-2025.html** - Ghana Cybersecurity Amendment Bill analysis
- **insights/workplace-pensions-2026.html** - International pensions compliance guide
- **insights/vicarious-liability-2026.html** - Employer liability & risk management
- **insights/paris-olympics-2024.html** - Olympics visa & travel requirements

All articles use consistent styling, sidebar CTAs, and cross-link to each other for navigation.

## 🎨 CSS Architecture

### shared.css (1000+ lines)
- CSS variables (colors, spacing)
- Navigation & footer
- Hero sections (main & page heroes)
- Section components (expertise, insights, people, careers)
- Grid systems & layouts
- Scroll-reveal animations
- Responsive breakpoints: 1024px, 820px, 560px
- Media queries for reduced motion

### Page-Specific CSS
Each HTML file has inline `<style>` blocks for page-specific components.

## 🚀 JavaScript

### shared.js
- **Search System** - Client-side search with modal overlay and keyword indexing
- **Navigation** - Sticky nav on scroll (scrollY > 50)
- **Mobile Menu** - Burger menu toggle
- **Ticker** - News ticker rotation (6s interval)
- **Image Preload** - Team photos with monogram fallback
- **Scroll Reveal** - IntersectionObserver for .rv elements

## 🎯 Design System

### Colors
- Navy: `#0B1E38`, `#132B48`, `#1A3855`
- Gold: `#B8966E`
- Cream: `#F5F3EE`
- White: `#FFFFFF`

### Typography
- Font: Arsenal (weights: 400, 700)
- Source: Google Fonts API

### Images
- Source: Unsplash CDN
- Hero: photo-1589829545856-d10d557cf95f
- All images have fallback colors and filters

## 📱 Responsive Breakpoints

- **1024px** - Tablet adjustments
- **820px** - Mobile navigation (burger menu)
- **560px** - Mobile-first single column

## 🚀 Deployment

### GitHub Pages
```bash
# Push to feature/refactor-architecture branch
git push origin feature/refactor-architecture

# Merge to main
git merge main

# GitHub Pages automatically serves from https://kn1ko1.github.io/bannand-redesign/
```

### Local Development
- Use **Live Server** (VS Code extension)
- Open on `localhost:5500`
- **Hard refresh** (Ctrl+Shift+R) to clear browser cache and ensure latest styles load

### Troubleshooting
If hero background image shows HTTP 304 (Not Modified), perform a hard refresh:
- **Chrome/Edge/Firefox**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- **Safari**: Cmd+Option+R

## ✨ Key Features

✅ **Responsive Design** - Mobile-first approach with breakpoints at 1024px, 820px, 560px
✅ **Accessibility** - Semantic HTML, ARIA labels, proper heading hierarchy
✅ **Zero Dependencies** - Vanilla JavaScript (no frameworks or libraries)
✅ **Performance Optimized** - Minimal CSS/JS, optimized images from Unsplash CDN
✅ **Relative URLs** - All navigation uses relative paths for local/GitHub Pages compatibility
✅ **Client-Side Search** - Instant search results via a pre-rendered JS index
✅ **Scroll Reveal** - IntersectionObserver-based animations for .rv elements
✅ **Dark Theme** - Modern navy + gold design system
✅ **Monogram Fallbacks** - Team photos with fallback monogram background

## 📝 Recent Changes (Refactor)

### URL Migration
- Converted all absolute URLs from `https://bannandassociates.com/` to relative paths (`./`, `../`)
- Enables smooth testing on localhost and GitHub Pages without cross-origin issues

### CSS Extraction
- **Shared Styles** extracted to `css/shared.css` (1000+ lines)
- Common components: nav, hero, footer, expertise grid, people grid, insights, careers band
- Page-specific styles remain in inline `<style>` blocks for maintainability

### JavaScript Consolidation
- Common functionality extracted to `js/shared.js` (~250 lines)
- Includes: client-side search, sticky nav, mobile menu, ticker rotation, image fallback, scroll reveal

### Page Heroes
- Added `.page-hero` CSS to shared.css for reuse on services.html and team.html
- Supports breadcrumb navigation, eyebrow labels, and responsive sizing

## 🔄 Git Workflow

```bash
# Current branch
git branch  # feature/refactor-architecture

# Push changes
git push origin feature/refactor-architecture

# Create pull request on GitHub
# After review, merge to main branch
```

## 📊 Project Statistics

- **HTML Pages**: 17 (6 root, 5 insights, 6 team bios)
- **CSS Size**: ~2000 lines (shared.css + page-specific)
- **JS Size**: ~250 lines (vanilla JS, includes search index)
- **Responsive Breakpoints**: 3 (1024px, 820px, 560px)
- **Team Members**: 6 members (2 partners, 2 associates, 2 management)
