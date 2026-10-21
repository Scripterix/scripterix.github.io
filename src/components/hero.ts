interface HeroAction {
  href: string;
  label: string;
  icon: string;
  primary?: boolean;
}

interface HeroVisual {
  ariaLabel: string;
  windowTitle: string;
  imageSrc: string;
  imageAlt: string;
  imageLabel: string;
  imageStrong: string;
}

interface HeroConfig {
  kicker: string;
  coordinate: string;
  title: string;
  lead: string;
  detail?: string;
  actions: HeroAction[];
  visual?: HeroVisual;
  footnote?: string;
  footnoteHref?: string;
  footnoteLabel?: string;
}

const studioCodeImage = new URL("../../assets/img/studio-code.jpg", import.meta.url).href;
const agenticDesktopImage = new URL("../../assets/img/prntScreen/1/desktop.png", import.meta.url).href;

const heroConfigs: Record<string, HeroConfig> = {
  home: {
    kicker: "Niezależny developer / Scripterix Studio",
    coordinate: "[ pomysł → kod → rezultat ]",
    title: "<span>Naprawiam kod.</span> <span class=\"mint-text\">Automatyzuję pracę.</span> <span>Buduję aplikacje.</span>",
    lead: "Od błędu w istniejącym kodzie po własną aplikację. Projektuję i programuję narzędzia webowe, łączę systemy i zamieniam powtarzalną pracę w automatyzacje.",
    detail: "Pracuję z JavaScript, TypeScript i Pythonem. Łączę programowanie z narzędziami AI — od analizy problemu po testy działającego rozwiązania.",
    actions: [
      { href: "pages/portfolio.html", label: "Zobacz, co tworzę", icon: "bi-arrow-down-right", primary: true },
      { href: "pages/kontakt.html", label: "Porozmawiajmy", icon: "bi-arrow-up-right" }
    ],
    visual: {
      ariaLabel: "Ilustracja warsztatu Scripterix: kod, przepływ danych i działająca aplikacja",
      windowTitle: "scripterix / workspace",
      imageSrc: studioCodeImage,
      imageAlt: "",
      imageLabel: "Z konkretnego problemu",
      imageStrong: "powstaje dobry kod."
    }
  },
  services: {
    kicker: "01 / Usługi i kompetencje",
    coordinate: "[ problem → rozwiązanie → rezultat ]",
    title: "<span>Trzy obszary.</span> <span class=\"mint-text\">Jeden działający rezultat.</span>",
    lead: "Naprawiam to, co blokuje pracę. Buduję to, czego jeszcze brakuje. Dobieram rozwiązanie do problemu i sprawdzam je w praktyce.",
    detail: "Development, automatyzacje i narzędzia AI łączę w zakres dopasowany do konkretnego zadania.",
    actions: [
      { href: "../index.html#wspolpraca", label: "Jak pracuję", icon: "bi-arrow-down-right", primary: true },
      { href: "kontakt.html", label: "Porozmawiajmy", icon: "bi-arrow-up-right" }
    ],
    visual: {
      ariaLabel: "Ilustracja usług Scripterix: kod, dane i rezultat",
      windowTitle: "scripterix / services",
      imageSrc: studioCodeImage,
      imageAlt: "",
      imageLabel: "Development. Automatyzacje. AI.",
      imageStrong: "Zakres dobrany do problemu."
    },
    footnote: "Development <i>/</i> Automation <i>/</i> AI Engineering",
    footnoteHref: "#kompetencje",
    footnoteLabel: "Poznaj mój warsztat"
  },
  portfolio: {
    kicker: "02 / Portfolio",
    coordinate: "[ projekt → kod → działający przykład ]",
    title: "<span>Możesz zajrzeć</span> <span class=\"mint-text\">pod maskę.</span>",
    lead: "Projekt własny i działające przykłady z jednego warsztatu. Każdy możesz otworzyć, sprawdzić i ocenić samodzielnie.",
    detail: "Portfolio obejmuje Agentic Studio oraz demonstratory wyszukiwarki i mikrointerakcji.",
    actions: [
      { href: "https://github.com/Scripterix", label: "Zobacz kod na GitHubie", icon: "bi-arrow-up-right", primary: true },
      { href: "kontakt.html", label: "Porozmawiajmy", icon: "bi-arrow-up-right" }
    ],
    visual: {
      ariaLabel: "Zrzut interfejsu projektu Agentic Studio",
      windowTitle: "scripterix / portfolio",
      imageSrc: agenticDesktopImage,
      imageAlt: "",
      imageLabel: "Agentic Studio",
      imageStrong: "Od iteracji do systemu."
    }
  },
  contact: {
    kicker: "Masz coś do zbudowania?",
    coordinate: "[ rozmowa → zakres → pierwszy krok ]",
    title: "<span>Porozmawiajmy</span> <span>o Twoim <span class=\"mint-text\">projekcie.</span></span>",
    lead: "Aplikacja do rozwinięcia, proces do zautomatyzowania, kod do naprawienia. Napisz, jaki efekt chcesz uzyskać — od tego zaczniemy.",
    detail: "W pierwszej wiadomości wystarczy opis problemu i oczekiwanego rezultatu.",
    actions: [
      { href: "mailto:Piotr.adamkowski@gmail.com", label: "Napisz do mnie", icon: "bi-arrow-up-right", primary: true },
      { href: "mailto:Piotr.adamkowski@gmail.com", label: "Piotr.adamkowski@gmail.com", icon: "bi-envelope" }
    ]
  }
};

function renderActions(actions: HeroAction[]): string {
  return actions.map((action) => `
    <a class="${action.primary ? "btn btn-dark" : "text-link"}" href="${action.href}">
      ${action.label} <i class="bi ${action.icon}" aria-hidden="true"></i>
    </a>
  `).join("");
}

function renderVisual(visual: HeroVisual): string {
  return `
    <div class="workbench" data-agent-card="hero-visual-asset" role="img"
      aria-label="${visual.ariaLabel}">
      <div class="workbench-orbit" aria-hidden="true"></div>
      <div class="code-window">
        <div class="workbench-title"><span class="window-dots"
          aria-hidden="true"><b></b><b></b><b></b></span><span>${visual.windowTitle}</span><i
          class="bi bi-code-slash" aria-hidden="true"></i></div>
        <div class="code-photo"><img src="${visual.imageSrc}" alt="${visual.imageAlt}" width="1200" height="800"
          fetchpriority="high"><span class="code-photo-label">${visual.imageLabel}<br><strong>${visual.imageStrong}</strong></span></div>
        <div class="code-lines" aria-hidden="true"><span><em>const</em> idea =
          <b>understand</b>(problem);</span><span><em>await</em> build(idea);</span><span><em>await</em>
          test(solution);</span><span class="code-comment">// mniej ręcznej pracy. więcej możliwości.</span>
        </div>
      </div>
      <div class="flow-note" aria-hidden="true">
        <div class="note-heading"><span class="tiny-square"></span>MAŁE SYSTEMY. DUŻE MOŻLIWOŚCI.</div>
        <div class="flow-nodes"><span><i class="bi bi-file-earmark-code"></i>Dane</span><b>→</b><span
          class="flow-engine"><i class="bi bi-braces"></i>Kod</span><b>→</b><span><i
          class="bi bi-check2-square"></i>Rezultat</span></div>
      </div>
      <span class="workbench-stamp" aria-hidden="true"><i class="bi bi-asterisk"></i>built with curiosity</span>
    </div>
  `;
}

const heroTarget = document.querySelector<HTMLElement>("[data-hero]");

if (heroTarget) {
  const config = heroConfigs[heroTarget.dataset.hero ?? ""];

  if (config) {
    heroTarget.className = `studio-hero${config.visual ? "" : " studio-hero--without-visual"}`;
    heroTarget.dataset.agentSection = "hero";
    heroTarget.innerHTML = `
      <div class="container">
        <div class="hero-kicker"><span class="section-label"><span class="status-dot"
          aria-hidden="true"></span>${config.kicker}</span><span class="hero-coordinate"
          aria-hidden="true">${config.coordinate}</span></div>
        <div class="studio-hero-grid">
          <div class="studio-hero-copy">
            <h1 data-agent-slot="hero-title">${config.title}</h1>
            <p class="studio-lead">${config.lead}</p>
            ${config.detail ? `<p class="hero-detail">${config.detail}</p>` : ""}
            <div class="studio-actions">${renderActions(config.actions)}</div>
          </div>
          ${config.visual ? renderVisual(config.visual) : ""}
        </div>
        ${config.footnote && config.footnoteHref && config.footnoteLabel ? `
          <div class="hero-footnote"><span>${config.footnote}</span><a href="${config.footnoteHref}">
            ${config.footnoteLabel} <i class="bi bi-arrow-down" aria-hidden="true"></i></a></div>
        ` : ""}
      </div>
    `;
  }
}
