const footerTarget = document.querySelector<HTMLElement>("[data-footer-target]");

if (footerTarget) {
  const homeHref = window.location.pathname.includes("/pages/") ? "../index.html#start" : "#start";

  footerTarget.innerHTML = `
    <div class="container"><a class="footer-brand" href="${homeHref}">s<span>.</span> <b>Scripterix
          Studio</b></a><span>Niezależny development. Własny warsztat.</span><a
        href="https://github.com/Scripterix">GitHub <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a><a
        href="${homeHref}" class="back-top" aria-label="Do góry">Do góry <i class="bi bi-arrow-up"
          aria-hidden="true"></i></a></div>
  `;
}
