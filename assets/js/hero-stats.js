(function () {
  const applyNumberFormatting = () => {
    const formatter = typeof window.formatShort === 'function' ? window.formatShort : null;
    document.querySelectorAll('.hero .hero-stat-number').forEach((el) => {
      const rawAttr = el.getAttribute('data-stat-value') ?? el.getAttribute('title') ?? el.textContent;
      const rawNumber = Number(rawAttr);
      if (!Number.isFinite(rawNumber)) {
        return;
      }
      if (!el.hasAttribute('title')) {
        el.setAttribute('title', rawNumber.toString());
      }
      if (formatter) {
        el.textContent = formatter(rawNumber);
      } else {
        el.textContent = rawNumber.toString();
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyNumberFormatting);
  } else {
    applyNumberFormatting();
  }

  (async function () {
    try {
      const response = await fetch('/assets/data/stats.json', { cache: 'no-cache' });
      if (!response.ok) {
        return;
      }
      const stats = await response.json();
      const statColor = stats && (stats.statColor || stats.stat_color);
      if (statColor) {
        document.querySelectorAll('.hero .hero-stat-number').forEach((el) => {
          el.style.color = statColor;
        });
      }
      if (stats && typeof window.formatShort === 'function') {
        applyNumberFormatting();
      }
    } catch (error) {
      console.warn('Hero stats data unavailable', error);
    }
  })();
})();
