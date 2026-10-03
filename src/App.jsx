import { useEffect, useState } from "react";
import { photos } from "./photos";

const content = {
  pl: {
    nav: {home:"Strona główna", about:"O mnie", services:"Oferta", portfolio:"Portfolio", contact:"Kontakt"},
    book:"Umów sesję", menu:"Menu", toDark:"Włącz ciemny motyw", toLight:"Włącz jasny motyw",
    heroEyebrow:"Naturalne emocje", heroTitle:"Fotografia, która opowiada historie",
    heroText:"Uwieczniam wyjątkowe chwile, ludzi i miejsca. Naturalnie, autentycznie, z pasją.",
    heroAlt:"Para młoda na wzgórzu o zachodzie słońca",
    view:"Zobacz portfolio →", contact:"Skontaktuj się",
    servicesTitle:"Moja oferta",
    servicesText:"Profesjonalna fotografia na każdą okazję — od reportażu ślubnego po portrety i podróże.",
    serviceItems:[
      ["Fotografia ślubna","Wasz wyjątkowy dzień w naturalnych, emocjonalnych kadrach."],
      ["Sesje rodzinne","Naturalne zdjęcia pełne bliskości i prawdziwych emocji."],
      ["Sesje portretowe","Portrety z charakterem, dopasowane do Ciebie."],
      ["Fotografia krajobrazowa","Piękno miejsc, które warto zapamiętać."]
    ],
    portfolioTitle:"Wybrane realizacje",
    filters:{All:"Wszystkie", Wedding:"Śluby", Families:"Rodziny", Portrait:"Portrety", Travel:"Podróże"},
    aboutTitle:"Cześć, jestem Marcin",
    aboutText:"Jestem fotografem z pasją do ludzi, emocji i pięknych miejsc. W swojej pracy stawiam na naturalność, autentyczność i ponadczasowy charakter zdjęć. Każda sesja ma swoją historię — moim zadaniem jest ją opowiedzieć.",
    aboutButton:"Poznaj mnie bliżej →",
    aboutAlt:"Marcin Nowak z aparatem",
    stats:[["150+","zrealizowanych sesji"],["8 lat","doświadczenia"],["PL + EU","sesje w Polsce i za granicą"]],
    quote:"Piękne zdjęcia i wspaniała atmosfera podczas sesji. Polecam z całego serca!",
    contactTitle:"Porozmawiajmy o Twojej sesji",
    contactText:"Napisz kilka słów o swoim pomyśle, terminie i miejscu. Odpowiem i przygotuję indywidualną ofertę."
  },
  en: {
    nav: {home:"Home", about:"About", services:"Services", portfolio:"Portfolio", contact:"Contact"},
    book:"Book a session", menu:"Menu", toDark:"Switch to dark theme", toLight:"Switch to light theme",
    heroEyebrow:"Natural emotions", heroTitle:"Photography that tells stories",
    heroText:"I capture unique moments, people and places. Naturally, authentically, with passion.",
    heroAlt:"Wedding couple on a hill at sunset",
    view:"View portfolio →", contact:"Get in touch",
    servicesTitle:"My services",
    servicesText:"Professional photography for every occasion — from wedding stories to portraits and travel.",
    serviceItems:[
      ["Wedding photography","Your special day captured naturally and emotionally."],
      ["Family sessions","Natural photographs full of closeness and real emotion."],
      ["Portrait sessions","Characterful portraits created around you."],
      ["Landscape photography","The beauty of places worth remembering."]
    ],
    portfolioTitle:"Selected works",
    filters:{All:"All", Wedding:"Weddings", Families:"Families", Portrait:"Portraits", Travel:"Travel"},
    aboutTitle:"Hi, I'm Marcin",
    aboutText:"I'm a photographer passionate about people, emotions and beautiful places. I focus on naturalness, authenticity and timeless images. Every session has a story — my job is to tell it.",
    aboutButton:"Learn more →",
    aboutAlt:"Marcin Nowak with a camera",
    stats:[["150+","completed sessions"],["8 years","of experience"],["PL + EU","sessions in Poland and abroad"]],
    quote:"Beautiful photos and a wonderful atmosphere during the session. Highly recommended!",
    contactTitle:"Let's talk about your session",
    contactText:"Tell me a little about your idea, date and location. I'll reply with a tailored offer."
  }
};

const serviceImages = [photos.wedding, photos.family, photos.portrait, photos.landscape];

const gallery = [
  {id:"wedding-silhouette", photo:photos.weddingSilhouette, category:"Wedding", alt:{pl:"Sylwetki pary młodej o zachodzie słońca", en:"Wedding couple silhouettes at sunset"}},
  {id:"family-play", photo:photos.familyPlay, category:"Families", alt:{pl:"Tata podrzuca córkę podczas sesji rodzinnej", en:"Dad lifting his daughter during a family session"}},
  {id:"mountain-lake", photo:photos.mountainLake, category:"Travel", alt:{pl:"Górskie jezioro o zachodzie słońca", en:"Mountain lake at sunset"}},
  {id:"portrait-stripes", photo:photos.portraitStripes, category:"Portrait", alt:{pl:"Portret kobiety w świetle zachodu", en:"Portrait of a woman in sunset light"}},
  {id:"bouquet", photo:photos.bouquet, category:"Wedding", alt:{pl:"Panna młoda z bukietem", en:"Bride holding a bouquet"}},
  {id:"krakow", photo:photos.krakow, category:"Travel", alt:{pl:"Rynek Główny w Krakowie", en:"Main Market Square in Kraków"}},
  {id:"family-kiss", photo:photos.familyKiss, category:"Families", alt:{pl:"Mama całuje córeczkę", en:"Mother kissing her little daughter"}},
  {id:"portrait-city", photo:photos.portraitCity, category:"Portrait", alt:{pl:"Portret kobiety w mieście", en:"Portrait of a woman in the city"}}
];

const gallerySizes = "(max-width: 520px) 92vw, (max-width: 850px) 46vw, 40vw";
const email = "kontakt@marcinnowak.photo";

function useStoredState(key, initial, valid) {
  const [value, setValue] = useState(() => {
    try { const saved = localStorage.getItem(key); if (valid(saved)) return saved; } catch {}
    return typeof initial === "function" ? initial() : initial;
  });
  useEffect(() => { try { localStorage.setItem(key, value); } catch {} }, [key, value]);
  return [value, setValue];
}

function useLanguage() {
  const [lang, setLang] = useStoredState("mn-lang", "pl", v => v === "pl" || v === "en");
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return [lang, () => setLang(v => v === "pl" ? "en" : "pl")];
}

function useTheme() {
  const [theme, setTheme] = useStoredState("mn-theme",
    () => window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    v => v === "light" || v === "dark");
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return [theme, () => setTheme(v => v === "dark" ? "light" : "dark")];
}

function Nav({t, lang, toggleLang, theme, toggleTheme}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    const onKey = e => { if (e.key === "Escape") setOpen(false); };
    const onResize = () => { if (window.innerWidth > 850) setOpen(false); };
    onScroll();
    window.addEventListener("scroll", onScroll, {passive:true});
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, []);
  const items = [["#home",t.nav.home],["#about",t.nav.about],["#services",t.nav.services],["#portfolio",t.nav.portfolio],["#contact",t.nav.contact]];
  const themeLabel = theme === "dark" ? t.toLight : t.toDark;
  return <nav className={scrolled || open ? "scrolled" : ""}><div className="container nav">
    <a className="logo" href="#home">MN<small>PHOTOGRAPHY</small></a>
    <div id="nav-links" className={`links ${open ? "open" : ""}`}>{items.map(([href,label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</div>
    <div className="actions">
      <button className="icon-btn" type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
        {theme === "dark"
          ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/></svg>
          : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>}
      </button>
      <button className="lang" type="button" onClick={toggleLang} aria-label="Język / Language">{lang === "pl" ? <>PL / <b>EN</b></> : <><b>PL</b> / EN</>}</button>
      <a className="btn" href="#contact">{t.book}</a>
      <button className="menu" type="button" onClick={() => setOpen(!open)} aria-label={t.menu} aria-expanded={open} aria-controls="nav-links">{open ? "✕" : "☰"}</button>
    </div>
  </div></nav>
}

export default function App() {
  const [lang, toggleLang] = useLanguage();
  const [theme, toggleTheme] = useTheme();
  const t = content[lang];
  const [filter, setFilter] = useState("All");
  const selected = filter === "All" ? gallery : gallery.filter(x => x.category === filter);

  return <>
    <Nav t={t} lang={lang} toggleLang={toggleLang} theme={theme} toggleTheme={toggleTheme}/>

    <header className="hero" id="home">
      <img className="hero-bg" src={photos.hero.src} srcSet={photos.hero.srcSet} sizes="100vw" alt={t.heroAlt} fetchPriority="high"/>
      <div className="container"><div className="hero-copy">
        <div className="eyebrow">{t.heroEyebrow}</div>
        <h1>{t.heroTitle}</h1>
        <p>{t.heroText}</p>
        <div className="hero-buttons"><a className="btn" href="#portfolio">{t.view}</a><a className="btn alt" href="#contact">{t.contact}</a></div>
      </div></div>
    </header>

    <main>
      <section id="services"><div className="container">
        <div className="section-head"><div><div className="eyebrow">Oferta / Services</div><h2 className="title">{t.servicesTitle}</h2></div><p>{t.servicesText}</p></div>
        <div className="services">{t.serviceItems.map(([title,text],i) =>
          <article className="card" key={i}>
            <img src={serviceImages[i].src} srcSet={serviceImages[i].srcSet} sizes="(max-width: 520px) 92vw, (max-width: 1100px) 46vw, 290px" alt={title} loading="lazy" decoding="async"/>
            <div className="card-body"><h3>{title}</h3><p>{text}</p><a className="more" href="#contact" aria-label={`${t.book}: ${title}`}>→</a></div>
          </article>
        )}</div>
      </div></section>

      <section className="portfolio" id="portfolio"><div className="container">
        <div className="section-head"><div><div className="eyebrow">Portfolio</div><h2 className="title">{t.portfolioTitle}</h2></div>
          <div className="filters">{Object.entries(t.filters).map(([key,label]) =>
            <button key={key} type="button" className={filter === key ? "active" : ""} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>
          )}</div>
        </div>
        <div className="gallery">{selected.map((item,i) =>
          <figure key={item.id} className={`g${i+1}`}><img src={item.photo.src} srcSet={item.photo.srcSet} sizes={gallerySizes} alt={item.alt[lang]} loading="lazy" decoding="async"/></figure>
        )}</div>
      </div></section>

      <section className="about" id="about"><div className="container"><div className="about-grid">
        <img className="about-img" src={photos.photographer.src} srcSet={photos.photographer.srcSet} sizes="(max-width: 850px) 92vw, 380px" alt={t.aboutAlt} loading="lazy" decoding="async"/>
        <div className="about-copy"><div className="eyebrow">O mnie / About me</div><h2 className="title">{t.aboutTitle}</h2><p>{t.aboutText}</p><a className="btn dark" href="#contact">{t.aboutButton}</a></div>
        <div className="stats">{t.stats.map(([value,label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      </div></div></section>

      <section className="quote"><div className="container quote-box"><div className="quote-mark" aria-hidden="true">“</div><blockquote className="quote-text">{t.quote}</blockquote><p className="author">ANNA I PIOTR · SESJA ŚLUBNA</p></div></section>

      <section className="contact" id="contact"><div className="container contact-grid">
        <div><div className="eyebrow">Kontakt / Contact</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a className="btn alt" href={`mailto:${email}`}>{email} →</a></div>
        <div className="contact-info">
          <div>📞 <a href="tel:+48123456789">+48 123 456 789</a></div>
          <div>✉ <a href={`mailto:${email}`}>{email}</a></div>
          <div>📍 Poznań, Polska / Poland</div>
          <div>◎ Instagram: <a href="https://instagram.com/marcinnowak.photo" target="_blank" rel="noopener noreferrer">@marcinnowak.photo</a></div>
        </div>
      </div></section>
    </main>

    <footer><div className="container footer"><span>© 2026 Marcin Nowak Photography</span><span>PL / EN · Made with passion</span></div></footer>
  </>
}
