---
layout: post
title: "Post #7 Bootstrap and WebPack"
date: 2024-10-08 15:24:15
categories:
  - "Design Hub"
lang: pl
translation_id: bootstrap-webpack-7
writing_hours: 4
---

## Zaawansowana Konfiguracja Bootstrapa z WebPack

### Jak zainstalować Bootstrap z WP w odpowiedniej konfiguracji?

🐙Wersja bundle - czyli pakietu skompilowanego Web Pack. Od początku prosto jak najłatwiej.

### Czym jest Bootstrap ?

Bootstrap to popularny framework CSS, który zapewnia zestaw gotowych komponentów i stylów, ułatwiając tworzenie responsywnych stron internetowych. Jest prosty w użyciu i pozwala szybko stworzyć estetyczny interfejs użytkownika bez konieczności pisania dużo kodu CSS od zera.

Jest szybkim i przygotowanym w wersji estetycznego Ui frameworkiem i posiada wiele postawowych funkcji Ux. Sluży do szybkiego prototypowania. Posiada wiele zależności Sass i Css JavaScript i oczywiście HTML. Dodatkowo używa Popper.js i posiada zestaw własnych Icon.

### Czym jest Web-Pack ?

Webpack natomiast jest narzędziem do pakowania modułów JavaScript. Pozwala on na zarządzanie zależnościami między modułami, a następnie kompiluje je w jeden plik lub wiele plików w celu optymalizacji wydajności aplikacji. Webpack jest często wykorzystywany wraz z npm (Node Package Manager) do zarządzania zależnościami i instalowania pakietów.

### Zalety rozwiązania z użyciem Bootstrapa i Webpacka obejmują:

Łatwość użycia: Oba narzędzia są stosunkowo łatwe w użyciu, dzięki czemu nawet początkujący programiści mogą z nich korzystać.

Wydajność: Webpack umożliwia optymalizację aplikacji poprzez pakowanie modułów JavaScript i zarządzanie zależnościami, co przyczynia się do szybszego ładowania strony.

Elastyczność: Zarówno Bootstrap, jak i Webpack oferują wiele opcji konfiguracyjnych, które pozwalają dostosować aplikację do indywidualnych potrzeb.

Niestety, istnieją również pewne wady:

Konieczność nauki: Korzystanie z tych narzędzi wymaga pewnej nauki, zwłaszcza jeśli ktoś dopiero zaczyna swoją przygodę z tworzeniem aplikacji webowych.

Nadmierna złożoność: W niektórych przypadkach konfiguracja Webpacka może być zbyt skomplikowana, zwłaszcza dla mniejszych projektów, co może prowadzić do nadmiernego obciążenia dla programistów.

### Jak zainstalować Bootstrap i WebPack oraz webdev zależności

🐙Moja konfiguracja jest przykładowa i wyjściowo do powtarzalnych celów. Jest też dostępna na GitHub Scripterix, pod nazwą [officialBootWepack](https://github.com/Scripterix/officialBootWebpack)

**Poniżej kolejne komendy cli**

npm init -y

npm i -save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin

npm i --save bootstrap @popperjs/core

npm i --save-dev autoprefixer css-loader postcss-loader sass sass-loader style-loader

mkdir {src,src/js,src/scss}

touch src/index.html src/js/main.js src/scss/styles.scss webpack.config.js

**Poniższe polecenia skryptów do uruchomienia webpack i odświeżnia**

npm start - wystartowanie servera

npm run watch - odświeżanie

Następnie trzeba uzupełnić pliki index.html webpack.config.js i dodać skrypty startujące i obserwujące do package.json

🐙Najlepiej użyj git clone z repozytorium [BootWebpack](https://github.com/Scripterix/officialBootWebpack) ( cała nazwa repo: https://github.com/Scripterix/officialBootWebpack )  aby nie zaszła pomyłka. Nie zapomnij dodać gwiazdek do oceny repo.

**Poniżej plik index.html**

<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bootstrap w/ Webpack</title>
</head>

<body>
  <div class="container py-4 px-3 mx-auto">
    <h1 class="display-5">Hello, Bootstrap and Webpack ! !</h1>
    <p class="lead">Włącz watch mode <kbd>npm run watch</kbd></p>
    <button class="btn btn-primary mt-2" id="btn">Primary button !</button>
    <p class="fs-2 mt-4 hidden" id="textContent">Toggle / DisToggle</p>
  </div>

  <script>
    const textContent = document.getElementById('textContent');
    const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
      textContent.classList.toggle('hidden');
      console.log("Webpack works...");
    });
  </script>

  <script src="./main.js"></script>
</body>

</html>

**Poniżej plik configaracji WebPack**

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader',
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader',
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [autoprefixer],
              },
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};

**Poniżej Plik package.json z poleceniami skryptów**

{
  "name": "officialbootwebpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack serve",
    "build": "webpack --mode production",
    "watch": "webpack --watch --mode development"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^10.4.14",
    "css-loader": "^6.7.3",
    "html-webpack-plugin": "^5.5.0",
    "postcss-loader": "^7.1.0",
    "sass": "^1.60.0",
    "sass-loader": "^13.2.1",
    "style-loader": "^3.3.2",
    "webpack": "^5.76.3",
    "webpack-cli": "^5.0.1",
    "webpack-dev-server": "^4.13.1"
  },
  "dependencies": {
    "@popperjs/core": "^2.11.7",
    "bootstrap": "^5.2.3"
  }
}

W artykule omówiono zaawansowaną konfigurację Bootstrapa z wykorzystaniem WebPacka, skupiając się na instalacji i integracji Bootstrapa w projekcie za pomocą skompilowanej wersji bundle. Bootstrap to popularny framework CSS, który dostarcza zestaw gotowych komponentów i stylów, ułatwiając tworzenie responsywnych i estetycznych interfejsów użytkownika. Dzięki integracji z WebPackiem, proces ten staje się bardziej efektywny i zorganizowany.

**Zapraszamy do dyskusji!**

Czy korzystaliście już z Bootstrapa w swoich projektach? Jakie macie doświadczenia z integracją Bootstrapa i WebPacka? Podzielcie się swoimi spostrzeżeniami, pomysłami lub pytaniami w komentarzach poniżej. Wasze opinie są dla nas niezwykle cenne i mogą pomóc innym czytelnikom w lepszym zrozumieniu tematu.