/**
 * @fileoverview Shared utility functions for BANN & Associates website
 * @environment browser
 */

/** @type {Document} */
/** @type {Window & typeof globalThis} */

/**
 */


(function () {
  "use strict";

  /* global document, window, Image, IntersectionObserver, setInterval, setTimeout, HTMLElement, Node */

  /* ── NAV: solid on scroll ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNav = () => {
      nav.classList.toggle('solid', window.scrollY > 50);
    };
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });
  }

  /* ── NAV: mobile burger panel ── */
  const burger = document.getElementById('navBurger');
  if (burger && nav) {
    const links = nav.querySelector('.nav-links');
    const closeMenu = function () {
      nav.classList.remove('menu-open');
      document.body.classList.remove('menu-lock');
      burger.setAttribute('aria-expanded', 'false');
    };
    const openMenu = function () {
      nav.classList.add('menu-open');
      document.body.classList.add('menu-lock');
      burger.setAttribute('aria-expanded', 'true');
    };

    if (links) {
      let mobileSearchItem = links.querySelector('.nav-mobile-search-item');
      if (!mobileSearchItem) {
        mobileSearchItem = document.createElement('li');
        mobileSearchItem.className = 'nav-mobile-search-item';
        mobileSearchItem.innerHTML = '<button type="button" class="nav-mobile-search-btn" id="mobileSearchToggle" aria-label="Open search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>';
        links.appendChild(mobileSearchItem);
      }

      burger.addEventListener('click', function () {
        if (nav.classList.contains('menu-open')) closeMenu();
        else openMenu();
      });

      links.addEventListener('click', function (e) {
        const target = e.target;
        if (!(target instanceof HTMLElement)) return;
        if (target.closest('a')) closeMenu();
      });

      document.addEventListener('click', function (e) {
        if (!(e.target instanceof Node)) return;
        if (!nav.classList.contains('menu-open')) return;
        if (!links.contains(e.target) && !burger.contains(e.target)) {
          closeMenu();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
          closeMenu();
        }
      });

      const mobileSearchBtn = document.getElementById('mobileSearchToggle');
      if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function () {
          closeMenu();
          const searchToggleBtn = document.getElementById('searchToggle');
          if (searchToggleBtn) searchToggleBtn.click();
        });
      }
    }
  }

  /* ── TICKER rotation ── */
  const tickerItems = document.querySelectorAll('.ticker-item');
  const dots = document.querySelectorAll('.ticker-dots span');
  if (tickerItems.length > 0) {
    let tickIdx = 0;
    const rotateTicker = (to) => {
      tickerItems[tickIdx].classList.remove('on');
      if (dots.length > 0) dots[tickIdx].classList.remove('on');
      
      tickIdx = to != null ? to : (tickIdx + 1) % tickerItems.length;
      
      tickerItems[tickIdx].classList.add('on');
      if (dots.length > 0) dots[tickIdx].classList.add('on');
    };
    
    dots.forEach((d, i) => d.addEventListener('click', () => rotateTicker(i)));
    setInterval(() => rotateTicker(), 6000);
  }
 /* ── Person-photo img fallback ── */
  function initPersonPhoto(el) {
    const bgImg = el.style.backgroundImage;
    const match = bgImg.match(/url\(['"]?([^'"]+)/);
    const src = match ? match[1] : null;
    if (src !== null) {
      const img = new Image();
      img.onload = function () { el.style.opacity = "1"; };
      img.onerror = function () { el.style.display = "none"; };
      el.style.opacity = "0";
      el.style.transition = "opacity .5s";
      img.src = src;
    }
  }
  document.querySelectorAll('.person-photo').forEach(initPersonPhoto);

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.rv');
  if (revealEls.length > 0) {
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        revealObs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach((el) => revealObs.observe(el));
  }

  /* ── SEARCH: global toggle + client-side results ── */
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = searchOverlay ? searchOverlay.querySelector('input[name="q"]') : null;

  const getRelativePrefix = function () {
    const path = window.location.pathname || '';
    const segments = path.split('/').filter(Boolean);
    
    // Detects if we are on GitHub or a custom domain/GoDaddy
    const isGitHubPages = window.location.hostname.includes('github.io');

    if (isGitHubPages) {
      window.location.replace('https://bannandassociates.com' + window.location.pathname.replace('/bannand-redesign', ''));
    }

    // Logic: If on GitHub Pages, root is /bannand-redesign/ (2 segments).
    // If on custom domain, root is / (0-1 segments).
    const depth = isGitHubPages ? segments.length - 1 : segments.length;
    
    if (depth <= 0) return './';
    return '../'.repeat(depth);
  };

  const toRelativeUrl = function (path) {
    return getRelativePrefix() + path.replace(/^\.?\//, '');
  };

  const SEARCH_INDEX = [
    { type: 'Page', title: 'Home', url: './', excerpt: 'Landing page with firm overview and latest highlights.', keywords: 'home bann associates legal ghana' },
    { type: 'Page', title: 'About Us', url: 'about-us/', excerpt: 'Firm history, mission, and strategic legal positioning.', keywords: 'about firm mission profile' },
    { type: 'Page', title: 'Expertise', url: 'services/', excerpt: 'Practice matrix across corporate, disputes, family, energy, and financial sectors.', keywords: 'services expertise practice corporate disputes family energy financial' },
    { type: 'Page', title: 'People', url: 'team/', excerpt: 'Meet the lawyers and legal strategists at BANN & Associates.', keywords: 'team people lawyers partners counsel' },
    { type: 'Page', title: 'Legal Notice', url: 'legal-notices/', excerpt: 'Terms, legal notices, and policy disclosures.', keywords: 'legal notice terms policy' },
    { type: 'Insight', title: 'Legal 500 Country Comparative Guides 2026: Ghana - Sports Law', url: 'insights/sports-law-2026/', excerpt: 'Overview of Ghanaian sports statutes, dispute resolution, governance, integrity, advertising rules, and esports.', keywords: 'sports law legal 500 ghana act 934 li 2477 gfa nsa gada esports anti-doping' },
    { type: 'Insight', title: "Ghana's Cybersecurity (Amendment) Bill 2025", url: 'insights/cybersecurity-amendment-2025/', excerpt: 'Regulatory implications for cyber compliance, licensing, and digital enforcement.', keywords: 'cybersecurity amendment bill 2025 compliance csa digital' },
    { type: 'Insight', title: 'International Comparative Legal Guides: Workplace Pensions 2026', url: 'insights/workplace-pensions-2026/', excerpt: 'Guidance on pension framework and workplace obligations in Ghana.', keywords: 'workplace pensions retirement compliance ghana' },
    { type: 'Insight', title: 'Who Pays for the Wrong? Vicarious Liability', url: 'insights/vicarious-liability-2026/', excerpt: 'Employer liability principles and practical risk management.', keywords: 'vicarious liability employer risk litigation' },
    { type: 'Insight', title: 'Paris Olympics 2024 Legal Readiness', url: 'insights/paris-olympics-2024/', excerpt: 'Regulatory and sports-law considerations around the Olympic cycle.', keywords: 'olympics sports law paris compliance' },
    { type: 'Page', title: 'Insights Library', url: 'insights/', excerpt: 'Legal perspectives, regulatory analysis, and foundational intelligence.', keywords: 'library publications articles insights analysis' }
  ];

  const ensureSearchResultsHost = function () {
    if (!searchOverlay) return null;
    let results = searchOverlay.querySelector('#searchResults');
    if (!results) {
      results = document.createElement('div');
      results.id = 'searchResults';
      results.className = 'search-results';
      const formWrap = searchOverlay.querySelector('.search-form');
      if (formWrap) formWrap.appendChild(results);
    }
    return results;
  };

  const renderSearchResults = function (query) {
    const resultsHost = ensureSearchResultsHost();
    if (!resultsHost) return;

    const q = (query || '').trim().toLowerCase();
    if (!q) {
      resultsHost.innerHTML = '<p class="search-results-empty">Type a page, topic, or keyword to search the site.</p>';
      return;
    }

    const results = filterSearchResults(q);

    if (!results.length) {
      resultsHost.innerHTML = '<p class="search-results-empty">No results found. Try terms like <strong>services</strong>, <strong>team</strong>, <strong>cybersecurity</strong>, or <strong>pensions</strong>.</p>';
      return;
    }

    resultsHost.innerHTML = buildSearchResultsHTML(results);
  };

  const filterSearchResults = function (q) {
    return SEARCH_INDEX
      .map(function (item) {
        const hay = (item.title + ' ' + item.excerpt + ' ' + item.keywords).toLowerCase();
        const score = hay.includes(q) ? 1 : 0;
        return { item: item, score: score };
      })
      .filter(function (entry) { return entry.score > 0; })
      .slice(0, 8);
  };

  const buildSearchResultsHTML = function (results) {
    return results.map(function (entry) {
      const item = entry.item;
      return (
        '<a class="search-result-item" href="' + toRelativeUrl(item.url) + '">' +
          '<span class="search-result-meta">' + item.type + '</span>' +
          '<span class="search-result-title">' + item.title + '</span>' +
          '<span class="search-result-excerpt">' + item.excerpt + '</span>' +
        '</a>'
      );
    }).join('');
  };

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', function (e) {
      e.preventDefault();
      searchOverlay.classList.add('active');
      const input = searchOverlay.querySelector('input');
      if (input) setTimeout(() => input.focus(), 100);
      renderSearchResults(input ? input.value : '');
    });
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener('click', function () {
      searchOverlay.classList.remove('active');
    });
  }

  const searchForm = searchOverlay ? searchOverlay.querySelector('form') : null;
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      renderSearchResults(searchInput ? searchInput.value : '');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      renderSearchResults(searchInput.value);
    });
  }

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
    }
  });

  /* ── INSIGHTS: Next Article Carousel ── */
  const nextArticles = [
    { url: '../sports-law-2026/', title: "Legal 500 Country Comparative Guides 2026: Ghana - Sports Law" },
    { url: '../cybersecurity-amendment-2025/', title: "Ghana's Cybersecurity (Amendment) Bill 2025: What Businesses and Professionals Need to Know" },
    { url: '../workplace-pensions-2026/', title: "International Comparative Legal Guides: Workplace Pensions 2026 - Ghana Chapter" },
    { url: '../vicarious-liability-2026/', title: "Who Pays for the \"Wrong\"? Understanding the Dynamics of Vicarious Liability" },
    { url: '../paris-olympics-2024/', title: "Get Ready for the Paris 2024 Olympics with BANN & Associates" }
  ];

  const insightNextBtn = document.getElementById('nextArticleBtn');
  const insightNextTitle = document.getElementById('nextArticleTitle');
  const insightNextLink = document.getElementById('nextArticleLink');

  if (insightNextBtn && insightNextTitle && insightNextLink) {
    const pathParts = window.location.pathname.split('/').filter(p => p && p !== 'index.html');
    const currentFolder = pathParts[pathParts.length - 1] || '';
    const currentIndex = nextArticles.findIndex(a => currentFolder && a.url.includes(currentFolder));
    const initialHref = insightNextLink.getAttribute ? (insightNextLink.getAttribute('href') || '') : (insightNextLink.href || '');
    const initialMatchedIndex = nextArticles.findIndex(a => initialHref && a.url === initialHref);
    let displayedIndex = initialMatchedIndex !== -1
      ? initialMatchedIndex
      : (currentIndex + 1) % nextArticles.length;

    insightNextBtn.addEventListener('click', function() {
      displayedIndex = (displayedIndex + 1) % nextArticles.length;
      if (displayedIndex === currentIndex) {
        displayedIndex = (displayedIndex + 1) % nextArticles.length;
      }
      
      insightNextTitle.style.opacity = '0';
      setTimeout(() => {
        insightNextTitle.textContent = nextArticles[displayedIndex].title;
        insightNextLink.href = nextArticles[displayedIndex].url;
        insightNextTitle.style.opacity = '1';
      }, 200);
    });
  }

})();
