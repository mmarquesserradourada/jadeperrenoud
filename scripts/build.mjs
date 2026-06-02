import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, 'content', name), 'utf8'));

const site = readJson('site.json');
const nav = readJson('navigation.json');
const home = readJson('home.json');
const services = readJson('services.json');
const blog = readJson('blog.json');
const faq = readJson('faq.json');
const footer = readJson('footer.json');

let html = fs.readFileSync(path.join(root, 'templates', 'index.template.html'), 'utf8');

const navItems = nav.items.map(i => `<a href="${i.href}">${i.label}</a>`).join('');
const heroParagraphs = home.hero.paragraphs.map(p => `<p>${p}</p>`).join('');
const serviceItems = services.items.map(s => `<article class="card"><h3>${s.title}</h3><p>${s.description}</p></article>`).join('');
const blogItems = blog.items.map(p => `<article class="card post"><img src="${p.image}" alt="${p.title}" /><small>${p.category} • ${p.date}</small><h3>${p.title}</h3><p>${p.excerpt}</p></article>`).join('');
const faqItems = faq.items.map(f => `<details><summary>${f.question}</summary><p>${f.answer}</p></details>`).join('');
const footerColumns = footer.columns.map(c => `<div><h4>${c.title}</h4>${c.links.map(l => `<p><a href="${l.href}">${l.label}</a></p>`).join('')}</div>`).join('');

const replacements = {
  '{{seo.title}}': site.seo.title,
  '{{seo.description}}': site.seo.description,
  '{{seo.keywords}}': site.seo.keywords,
  '{{brand.siteName}}': site.brand.siteName,
  '{{brand.tagline}}': site.brand.tagline,
  '{{brand.professionalName}}': site.brand.professionalName,
  '{{nav.items}}': navItems,
  '{{nav.cta.href}}': nav.cta.href,
  '{{nav.cta.label}}': nav.cta.label,
  '{{home.hero.title}}': home.hero.title,
  '{{home.hero.paragraphs}}': heroParagraphs,
  '{{home.hero.buttonHref}}': home.hero.buttonHref,
  '{{home.hero.buttonLabel}}': home.hero.buttonLabel,
  '{{home.hero.image}}': home.hero.image,
  '{{home.hero.nameCard}}': home.hero.nameCard,
  '{{home.hero.oabCard}}': home.hero.oabCard,
  '{{services.title}}': services.title,
  '{{services.items}}': serviceItems,
  '{{blog.title}}': blog.title,
  '{{blog.items}}': blogItems,
  '{{faq.title}}': faq.title,
  '{{faq.items}}': faqItems,
  '{{contact.whatsapp}}': site.contact.whatsapp,
  '{{contact.email}}': site.contact.email,
  '{{contact.instagram}}': site.contact.instagram,
  '{{footer.columns}}': footerColumns,
  '{{footer.copyright}}': footer.copyright
};

for (const [k, v] of Object.entries(replacements)) {
  html = html.replaceAll(k, v);
}

const outputDir = path.join(root, 'editable-preview');
fs.mkdirSync(outputDir, { recursive: true });
const outputIndex = path.join(outputDir, 'index.html');
fs.writeFileSync(outputIndex, html, 'utf8');

console.log('Build complete: editable-preview/index.html generated from content/*.json');
