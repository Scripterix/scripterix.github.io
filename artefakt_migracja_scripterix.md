# 🧩 ARTEFAKT MIGRACJI JEKYLL → GH PAGES
**Repo:** [Scripterix/scripterix.github.io](https://github.com/Scripterix/scripterix.github.io)

**Cel:** uproszczenie struktury, usunięcie niedozwolonych pluginów oraz przygotowanie dwujęzycznej witryny (PL jako domyślny, EN jako dodatkowy język) gotowej do natywnego builda na GitHub Pages.

---

## 🧱 TASK 1 — USUNIĘCIE PLUGINÓW I18N / SEO / FEED
**Cel:** oczyścić środowisko, aby GitHub Pages mógł zbudować stronę bez błędów.

### ✅ Kroki
1. **Gemfile** – pozostaw tylko pakiety wspierane przez GitHub Pages:
   ```ruby
   source "https://rubygems.org"

   gem "github-pages", group: :jekyll_plugins

   group :jekyll_plugins do
     gem "jekyll-paginate" # klasyczna paginacja, zgodna z GH Pages (opcjonalnie)
   end
   ```
2. **_config.yml** – usuń sekcję `plugins:` i pozostałe wpisy zależne od i18n, zastępując je minimalną konfiguracją:
   ```yaml
   title: "Scripterix"
   url: "https://scripterix.github.io"
   baseurl: ""

   lang_default: "pl"
   languages: ["pl", "en"]

   paginate_path: "/blog/page:num"
   # paginate: 10   # (do włączenia ręcznie)

   defaults:
     - scope: { path: "" }
       values: { layout: default }
     - scope: { path: "", type: "posts" }
       values: { layout: post }
     - scope: { path: "_logbook" }
       values: { layout: logbook }
   ```
3. **Usuń katalogi i pliki pluginów**, które nie zadziałają na natywnym buildzie GH Pages:
   - `_plugins/`
   - `_includes/i18n/`

---

## 🌐 TASK 2 — WDROŻENIE TŁUMACZEŃ OPARTYCH O POWIĄZANIA (`ref` + `lang`)
**Cel:** zastąpić wtyczkowy system tłumaczeń prostym helperem Liquid korzystającym z danych YAML.

### ✅ Kroki
1. **Struktura danych tłumaczeń:**
   ```text
   _data/
     i18n/
       pl.yml
       en.yml
   _includes/
     t.html
     lang-switch.html
     footer.html
   _data/nav.yml
   ```
2. **_data/i18n/pl.yml**
   ```yaml
   nav:
     home: "Start"
     blog: "Blog"
     about: "O nas"
     github: "GitHub"
   btn:
     read_more: "Czytaj dalej"
   ```
3. **_data/i18n/en.yml**
   ```yaml
   nav:
     home: "Home"
     blog: "Blog"
     about: "About"
     github: "GitHub"
   btn:
     read_more: "Read more"
   ```
4. **Helper tłumaczeń** – `_includes/t.html`:
   ```liquid
   {%- assign __lang = page.lang | default: site.lang_default -%}
   {%- assign __key  = include.key | split: "." -%}
   {%- assign __ns   = site.data.i18n[__lang] -%}
   {%- for k in __key -%}
     {%- assign __ns = __ns[k] -%}
   {%- endfor -%}
   {{ __ns }}
   ```
5. **Przełącznik języka** – `_includes/lang-switch.html`:
   ```liquid
   {%- assign current_ref = page.ref -%}
   {%- assign current_lang = page.lang | default: site.lang_default -%}
   {%- if current_lang == "pl" -%}
     {%- assign other_lang = "en" -%}
   {%- else -%}
     {%- assign other_lang = "pl" -%}
   {%- endif -%}
   {%- assign other_lang = current_lang == "pl" ? "en" : "pl" -%}
   {%- assign pool = site.pages | concat: site.posts | concat: site.collections.logbook.docs | concat: site.collections.works.docs -%}
   {%- assign sibling = pool | where: "ref", current_ref | where: "lang", other_lang | first -%}
   {%- if sibling -%}
   <a href="{{ sibling.url | relative_url }}">{{ other_lang | upcase }}</a>
   {%- endif -%}
   ```

---

## 🗂 TASK 3 — UJEDNOLICENIE STRUKTURY STRON I TŁUMACZEŃ
**Cel:** upewnić się, że wszystkie treści mają sparowane wersje PL/EN w spójnych lokalizacjach.

### ✅ Kroki
1. **Docelowa struktura katalogów:**
   ```text
   .
   ├─ pages/
   │  ├─ strona-polska.md
   │  └─ strona-angielska.md
   ├─ _posts/
   │  ├─ tytul-polski.md
   │  └─ tytul-polski-en.md
   ├─ logbook/
   │  ├─ dziennik-polski.md
   │  └─ dziennik-polski-en.md
   └─ works/
      ├─ projekt-polski.md
      └─ projekt-polski-en.md
   ```
2. **Front matter (PL wersja):**
   ```yaml
   ---
   title: "Strona Polska"
   ref: home
   lang: pl
   permalink: /strona-polska/
   ---
   ```
3. **Front matter (EN wersja):**
   ```yaml
   ---
   title: "English Page"
   ref: home
   lang: en
   permalink: /en/english-page/
   ---
   ```
4. **Posty** – analogicznie, pamiętając o `categories`, np. dla bloga ustaw `permalink: /en/blog/:year/:month/:day/:title/` w wersji EN.

---

## 🧭 TASK 4 — NAWIGACJA, FOOTER I LINK DO REPOZYTORIUM
**Cel:** dodać link do repo oraz zcentralizować etykiety nawigacji.

### ✅ Kroki
1. **_data/nav.yml**
   ```yaml
   items:
     - ref: home
       to: "/"
       to_en: "/en/"
     - ref: blog
       to: "/blog/"
       to_en: "/en/blog/"
     - ref: about
       to: "/about/"
       to_en: "/en/about/"
     - ref: github
       external: "https://github.com/Scripterix/scripterix.github.io"
   ```
2. **Fragment nawigacji** (np. w `_layouts/default.html`):
   ```liquid
   <nav>
     <ul>
       {%- assign __lang = page.lang | default: site.lang_default -%}
       {%- for item in site.data.nav.items -%}
         {%- if item.external -%}
           <li><a href="{{ item.external }}" target="_blank" rel="noopener">{% include t.html key="nav.github" %}</a></li>
         {%- else -%}
           {%- if __lang == "pl" -%}
             {%- assign href = item.to -%}
           {%- else -%}
             {%- assign href = item.to_en -%}
           {%- endif -%}
           {%- assign nav_key = "nav." | append: item.ref -%}
           <li><a href="{{ href | relative_url }}">{% include t.html key=nav_key %}</a></li>
         {%- endif -%}
       {%- endfor -%}
     </ul>
     {% include lang-switch.html %}
   </nav>
   ```
3. **Stopka** – `_includes/footer.html`:
   ```html
   <footer class="site-footer">
     <p>
       <a href="https://github.com/Scripterix/scripterix.github.io" target="_blank" rel="noopener">
         GitHub: Scripterix/scripterix.github.io
       </a>
     </p>
   </footer>
   ```

---

## 🏗 TASK 5 — PRZYGOTOWANIE DO BUILD GH PAGES
**Cel:** upewnić się, że repo jest gotowe do automatycznego budowania przez GitHub Pages.

### ✅ Lista kontrolna
- `_config.yml` bez nieobsługiwanych pluginów.
- Każda strona i post mają pary PL/EN (`ref`, `lang`).
- Wersje PL działają w katalogu głównym, EN pod `/en/`.
- Foldery `pages/`, `_posts/`, `logbook/`, `works/` zawierają sparowane pliki.
- Lokalny test `bundle exec jekyll serve` przechodzi bez błędów.
- GitHub Pages w repozytorium (gałąź `main`) jest aktywny.
- Po wdrożeniu strona działa pod `https://scripterix.github.io`.

---

## ⚙️ TASK 6 — (OPCJONALNY) SKRYPT DO TWORZENIA SZABLONÓW EN
**Cel:** przyspieszyć przygotowywanie wersji angielskich dla nowych treści.

```ruby
#!/usr/bin/env ruby
require "fileutils"
require "yaml"


def front_matter_and_body(path)
  text = File.read(path)
  if text =~ /\A---\s*\n(.*?)\n---\s*\n/m
    fm = YAML.safe_load($1) || {}
    body = text[$~.end(0)..-1]
    [fm, body]
  else
    [{}, text]
  end
end


def create_en_copy(src)
  fm, body = front_matter_and_body(src)
  return unless (fm["lang"] || "pl") == "pl"
  en_path = src.sub(/\.md$/, "-en.md")
  return if File.exist?(en_path)

  fm["lang"] = "en"
  fm["title"] = "#{fm["title"]} (EN)" if fm["title"]
  fm["permalink"] = "/en#{fm["permalink"]}" if fm["permalink"]

  content = +"---\n#{fm.to_yaml}---\n"
  content << "\n<!-- TODO: translate -->\n"
  content << body
  File.write(en_path, content)
  puts "Created: #{en_path}"
end


Dir.glob("{pages,_posts,logbook,works}/**/*.md").each do |p|
  create_en_copy(p)
end
```

Uruchomienie:
```bash
ruby scripts/make_en_copies.rb
```

---

## 🧩 TASK 7 — WIZUAL I ZASADA DZIAŁANIA
**Cel:** podsumować oczekiwany efekt końcowy dla Codex.

- Menu zawiera linki PL/EN oraz skrót do repozytorium GitHub.
- Przełącznik języka działa po `ref`, automatycznie łącząc powiązane pliki.
- Wszystkie etykiety i teksty interfejsu pochodzą z `_data/i18n/*.yml`.
- Brak dodatkowych wtyczek – czysty Liquid, w pełni zgodny z GH Pages.
- PL to język domyślny (adresy bez `/pl/`), EN jest serwowany spod `/en/`.
- Dodanie nowej treści: najpierw wersja PL → kopia EN (skrypt) → tłumaczenie.
- Build wykonywany natywnie przez GitHub Pages bez GitHub Actions.

---

**Artefakt gotowy do wklejenia do Codex (Ckodex) jako jeden dokument.**
