import { useEffect, useState } from "react";
import hero from "./hero.jpg";
import heroAlt from "./hero-alt.jpg";
import services from "./services.jpg";
import galleryAlt from "./gallery-alt.jpg";
import about from "./about.jpg";
import portfolio from "./portfolio.jpg";
import reviews from "./reviews.jpg";

const content = {
  pl: {
    nav: {home:"Strona główna", about:"O mnie", services:"Oferta", portfolio:"Portfolio", contact:"Kontakt"},
    book:"Umów sesję",
    heroEyebrow:"Naturalne emocje", heroTitle:"Fotografia, która opowiada historie",
    heroText:"Uwieczniam wyjątkowe chwile, ludzi i miejsca. Naturalnie, autentycznie, z pasją.",
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
    stats:[["150+","zrealizowanych sesji"],["8 lat","doświadczenia"],["PL + EU","sesje w Polsce i za granicą"]],
    quote:"Piękne zdjęcia i wspaniała atmosfera podczas sesji. Polecam z całego serca!",
    contactTitle:"Porozmawiajmy o Twojej sesji",
    contactText:"Napisz kilka słów o swoim pomyśle, terminie i miejscu. Odpowiem i przygotuję indywidualną ofertę."
  },
  en: {
    nav: {home:"Home", about:"About", services:"Services", portfolio:"Portfolio", contact:"Contact"},
    book:"Book a session",
    heroEyebrow:"Natural emotions", heroTitle:"Photography that tells stories",
    heroText:"I capture unique moments, people and places. Naturally, authentically, with passion.",
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
    stats:[["150+","completed sessions"],["8 years","of experience"],["PL + EU","sessions in Poland and abroad"]],
    quote:"Beautiful photos and a wonderful atmosphere during the session. Highly recommended!",
    contactTitle:"Let's talk about your session",
    contactText:"Tell me a little about your idea, date and location. I'll reply with a tailored offer."
  }
};

const serviceImages = [services, galleryAlt, about, heroAlt];

const gallery = [
  {image:hero, category:"Wedding", alt:"Wedding couple at sunset"},
  {image:galleryAlt, category:"Families", alt:"Family outdoor session"},
  {image:heroAlt, category:"Travel", alt:"Mountain landscape"},
  {image:about, category:"Portrait", alt:"Portrait photography"},
  {image:services, category:"Wedding", alt:"Wedding details"},
  {image:portfolio, category:"Travel", alt:"Travel photography"},
  {image:reviews, category:"Families", alt:"Family session"},
  {image:galleryAlt, category:"Portrait", alt:"Editorial portrait"}
];

const email = "kontakt@marcinnowak.photo";

function useLanguage() {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem("mn-lang") === "en" ? "en" : "pl"; } catch { return "pl"; }
  });
  useEffect(() => {
    try { localStorage.setItem("mn-lang", lang); } catch {}
    document.documentElement.lang = lang;
  }, [lang]);
  return [lang, () => setLang(v => v === "pl" ? "en" : "pl")];
}

function Nav({t, lang, toggle}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const items = [["#home",t.nav.home],["#about",t.nav.about],["#services",t.nav.services],["#portfolio",t.nav.portfolio],["#contact",t.nav.contact]];
  return <nav className={scrolled ? "scrolled" : ""}><div className="container nav">
    <a className="logo" href="#home">MN<small>PHOTOGRAPHY</small></a>
    <div className={`links ${open ? "open" : ""}`}>{items.map(([href,label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</div>
    <div className="actions"><button className="lang" type="button" onClick={toggle} aria-label="Language / Język">{lang === "pl" ? <>PL / <b>EN</b></> : <><b>PL</b> / EN</>}</button><a className="btn" href="#contact">{t.book}</a></div>
    <button className="menu" type="button" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>☰</button>
  </div></nav>
}

export default function App() {
  const [lang, toggle] = useLanguage();
  const t = content[lang];
  const [filter, setFilter] = useState("All");
  const selected = filter === "All" ? gallery : gallery.filter(x => x.category === filter);

  return <>
    <Nav t={t} lang={lang} toggle={toggle}/>

    <header className="hero" id="home"><div className="container"><div className="hero-copy">
      <div className="eyebrow">{t.heroEyebrow}</div>
      <h1>{t.heroTitle}</h1>
      <p>{t.heroText}</p>
      <div className="hero-buttons"><a className="btn" href="#portfolio">{t.view}</a><a className="btn alt" href="#contact">{t.contact}</a></div>
    </div></div></header>

    <section id="services"><div className="container">
      <div className="section-head"><div><div className="eyebrow">Oferta / Services</div><h2 className="title">{t.servicesTitle}</h2></div><p>{t.servicesText}</p></div>
      <div className="services">{t.serviceItems.map(([title,text],i) =>
        <article className="card" key={i}><img src={serviceImages[i]} alt={title}/><div className="card-body"><h3>{title}</h3><p>{text}</p><a className="more" href="#contact" aria-label={t.book}>→</a></div></article>
      )}</div>
    </div></section>

    <section className="portfolio" id="portfolio"><div className="container">
      <div className="section-head"><div><div className="eyebrow">Portfolio</div><h2 className="title">{t.portfolioTitle}</h2></div>
        <div className="filters">{Object.entries(t.filters).map(([key,label]) =>
          <button key={key} type="button" className={filter === key ? "active" : ""} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>
        )}</div>
      </div>
      <div className="gallery">{selected.map((item,i) =>
        <figure key={item.alt} className={`g${i+1}`}><img src={item.image} alt={item.alt}/></figure>
      )}</div>
    </div></section>

    <section className="about" id="about"><div className="container"><div className="about-grid">
      <img className="about-img" src={about} alt="Marcin Nowak"/>
      <div className="about-copy"><div className="eyebrow">O mnie / About me</div><h2 className="title">{t.aboutTitle}</h2><p>{t.aboutText}</p><a className="btn dark" href="#contact">{t.aboutButton}</a></div>
      <div className="stats">{t.stats.map(([value,label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </div></div></section>

    <section className="quote"><div className="container quote-box"><div className="quote-mark">“</div><div className="quote-text">{t.quote}</div><p className="author">ANNA I PIOTR · SESJA ŚLUBNA</p></div></section>

    <section className="contact" id="contact"><div className="container contact-grid">
      <div><div className="eyebrow">Kontakt / Contact</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a className="btn alt" href={`mailto:${email}`}>{email} →</a></div>
      <div className="contact-info"><div>📞 +48 123 456 789</div><div>✉ {email}</div><div>📍 Poznań, Polska / Poland</div><div>◎ Instagram: @marcinnowak.photo</div></div>
    </div></section>

    <footer><div className="container footer"><span>© 2026 Marcin Nowak Photography</span><span>PL / EN · Made with passion</span></div></footer>
  </>
}
