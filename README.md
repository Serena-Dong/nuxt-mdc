# Nuxt MDC BLOG

## 1. Blog Minimal con Prose Components

**Obiettivo:** Creare un blog semplice utilizzando Prose Components per visualizzare articoli.

### Requisiti:

- Nuxt
- Nuxt MDC
- Nozioni di base sui componenti Vue

### Scaletta:

1. **Setup del progetto Nuxt:**

   - Inizia un nuovo progetto Nuxt.
   - Installa il modulo MDC.

2. **Creazione della struttura del blog:**

   - Definisci la struttura degli articoli markdown.
   - Crea componenti Vue per titoli, paragrafi, e immagini.

3. **Integrazione di Prose Components:**

   - Personalizza componenti Prose (`<ProseP>`, `<ProseImg>`) per il blog.

4. **Testing e debug:**
   - Verifica la visualizzazione degli articoli.
   - Risolvi eventuali problemi di rendering.

---

## 2. Documentazione Interattiva per il Codice

**Obiettivo:** Mostrare ed evidenziare il codice sorgente in modo interattivo.

### Requisiti:

- Familiarità con Markdown
- Shiki per evidenziazione del codice

### Scaletta:

1. **Configurazione del progetto:**

   - Imposta un ambiente Nuxt.
   - Installa e configura Nuxt MDC.

2. **Parsing e rendering del contenuto:**

   - Usa `parseMarkdown` per analizzare il codice.
   - Implementa `<MDCRenderer>` per il rendering.

3. **Implementazione della funzionalità di evidenziazione:**

   - Configura Shiki per evidenziare blocchi di codice.

4. **Verifica e miglioramenti:**
   - Testa la documentazione interattiva.
   - Aggiungi componenti di avviso per feedback.

---

## 3. Pagina di Snippet Riutilizzabili

**Obiettivo:** Aggregare contenuti utilizzando snippet riutilizzabili.

### Requisiti:

- Uso di `provide/inject` di Vue
- Gestione di markdown dinamico

### Scaletta:

1. **Progetta un sistema di snippet:**

   - Definisci e gestisci snippet di markdown.

2. **Implementazione di `provide/inject`:**

   - Usa `provide/inject` per gestire i dati tra componenti.

3. **Rendering e verifica:**
   - Utilizza MDC per renderizzare gli snippet.
   - Prevenire ricorsioni nei componnti snippet.

---

## 4. Demo di Componenti Asincroni

**Obiettivo:** Implementare componenti asincroni in una demo funzionale.

### Requisiti:

- Uso di Setup asincrono
- Componenti Vue

### Scaletta:

1. **Creazione dell'ambiente:**

   - Configura un progetto di demo in Nuxt.

2. **Implementazione di componenti asincroni:**

   - Usa `async setup()` per simulari caricamenti di dati.

3. **Rendering dei componenti:**

   - Visualizza i componenti usando `<MDCRenderer>`.

4. **Testing asincrono:**

   - Testa il comportamento dei componenti asincroni.

---

## 5. Experiment with markdown parser (remark)

Under the hood, Nuxt MDC uses `remark` to parse the markdown content into Abstract Syntax Tree (AST, aka a Javascript object) and `rehype` to convert the AST into HTML.
Explore the libraries to find ways to solve the following problems.
`remark` discourages direct manipulation of the parser and instead encourages the use of extensions. This task mostly deals with trying to use `remark` plugins to solve the problems below.
You can also use `rehype` plugins if you want to modify how the AST is converted into HTML.

1. Check the docs to see if any extensions solves the problems in the list below. [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md#list-of-plugins), [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md#list-of-plugins)
2. Create a custom plugin to handle specific markdown syntax
   Example:s

- add a function that localizes internal paths in markdown (i.e.: [link](/posts/test-markdown-text) => <a href="/en-us/posts/test-markdown-text">link</a>) -> i.e. with localized routes like with nuxt-i18n-micro
- add an extension to convert [lang=xx](word) to <span lang="xx">word</span>
- add an extension to convert **word** to <u>word</u>
- handle nested lists

---

## 6. Mock CMS per Contenuti Markdown Dinamici

**Obiettivo:** Simulare un CMS per contenuti markdown dinamici.

### Requisiti:

- Nuxt MDC
- Integrità del markdown

### Scaletta:

1. **Setup del mock CMS:**

   - Definisci dati mock markdown nel progetto.

2. **Parsing del contenuto mock:**

   - Usa `parseMarkdown` per analizzare i dati mock.

3. **Gestione di componenti dinamici:**

   - Rendi dinamica la selezione dei componenti markdown.

4. **Visualizzazione e verifica:**
   - Assicurati che il contenuto sia correttamente renderizzato.

---

- Nuxt UI per estetica
- Layout:
  - header
  - homepage

Features:

- code with syntx highlighting (rehype plugins/Shiki etc)
- snippets
