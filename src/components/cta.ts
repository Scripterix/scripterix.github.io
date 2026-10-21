const ctaTarget = document.querySelector<HTMLElement>("[data-cta-target]");

if (ctaTarget) {
  const contactHref = window.location.pathname.includes("/pages/") ? "kontakt.html" : "pages/kontakt.html";

  ctaTarget.innerHTML = `
    <section class="studio-section collaboration-cta" data-agent-section="collaboration">
      <div class="container collaboration-cta-grid">
        <div>
          <span class="section-label">Współpraca</span>
          <h2>Od rozmowy<br>do działającego kodu.</h2>
        </div>
        <div class="collaboration-cta-copy">
          <p>Pracujesz bezpośrednio ze mną. Ustalam zakres, programuję, sprawdzam rezultat i przekazuję rozwiązanie z
            informacją, jak z niego korzystać.</p>
          <a class="btn btn-dark" href="${contactHref}">Porozmawiajmy <i class="bi bi-arrow-up-right"
            aria-hidden="true"></i></a>
        </div>
      </div>
    </section>
  `;
}
