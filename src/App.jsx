import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import hero from "./hero.jpg";
import heroAlt from "./hero-alt.jpg";
import services from "./services.jpg";
import galleryAlt from "./gallery-alt.jpg";
import about from "./about.jpg";
import portfolio from "./portfolio.jpg";
import reviews from "./reviews.jpg";

export const content = {
  pl: {
    nav: {home:"Strona główna", about:"O mnie", services:"Oferta", portfolio:"Portfolio", contact:"Kontakt"},
    heroEyebrow:"Naturalne emocje", heroTitle:"Fotografia, która opowiada historie",
    heroText:"Uwieczniam wyjątkowe chwile, ludzi i miejsca. Naturalnie, autentycznie, z pasją.",
    view:"Zobacz portfolio →", contact:"Skontaktuj się", book:"Umów sesję",
    servicesEyebrow:"Oferta", servicesTitle:"Moja oferta",
    servicesText:"Profesjonalna fotografia na każdą okazję — od reportażu ślubnego po portrety i podróże.",
    serviceItems:[
      ["Fotografia ślubna","Wasz wyjątkowy dzień w naturalnych, emocjonalnych kadrach."],
      ["Sesje rodzinne","Naturalne zdjęcia pełne bliskości i prawdziwych emocji."],
      ["Sesje portretowe","Portrety z charakterem, dopasowane do Ciebie."],
      ["Fotografia krajobrazowa","Piękno miejsc, które warto zapamiętać."]
    ],
    portfolioEyebrow:"Portfolio", portfolioTitle:"Wybrane realizacje",
    filters:["Wszystkie","Śluby","Rodziny","Portrety","Podróże"], viewAll:"Zobacz całe portfolio →",
    aboutEyebrow:"O mnie", aboutTitle:"Cześć, jestem Marcin",
    aboutText:"Jestem fotografem z pasją do ludzi, emocji i pięknych miejsc. W swojej pracy stawiam na naturalność, autentyczność i ponadczasowy charakter zdjęć. Każda sesja ma swoją historię — moim zadaniem jest ją opowiedzieć.",
    aboutButton:"Poznaj mnie bliżej →",
    stats:[["150+","zrealizowanych sesji"],["8 lat","doświadczenia"],["PL + EU","sesje w Polsce i za granicą"]],
    quote:"Piękne zdjęcia i wspaniała atmosfera podczas sesji. Polecam z całego serca!",
    author:"ANNA I PIOTR · SESJA ŚLUBNA",
    contactEyebrow:"Kontakt", contactTitle:"Porozmawiajmy o Twojej sesji",
    contactText:"Napisz kilka słów o swoim pomyśle, terminie i miejscu. Odpowiem i przygotuję indywidualną ofertę.",
    send:"Napisz wiadomość →", pagePortfolio:"Portfolio", pageAbout:"O mnie", pageServices:"Oferta", pageContact:"Kontakt",
    portfolioIntro:"Każde zdjęcie ma swoją historię. Wybierz kategorię i zobacz wybrane realizacje.",
    all:"Wszystkie", back:"← Strona główna", close:"Zamknij"
  },
  en: {
    nav: {home:"Home", about:"About", services:"Services", portfolio:"Portfolio", contact:"Contact"},
    heroEyebrow:"Natural emotions", heroTitle:"Photography that tells stories",
    heroText:"I capture unique moments, people and places. Naturally, authentically, with passion.",
    view:"View portfolio →", contact:"Get in touch", book:"Book a session",
    servicesEyebrow:"Services", servicesTitle:"My services",
    servicesText:"Professional photography for every occasion — from wedding stories to portraits and travel.",
    serviceItems:[
      ["Wedding photography","Your special day captured naturally and emotionally."],
      ["Family sessions","Natural photographs full of closeness and real emotion."],
      ["Portrait sessions","Characterful portraits created around you."],
      ["Landscape photography","The beauty of places worth remembering."]
    ],
    portfolioEyebrow:"Portfolio", portfolioTitle:"Selected works",
    filters:["All","Weddings","Families","Portraits","Travel"], viewAll:"View full portfolio →",
    aboutEyebrow:"About me", aboutTitle:"Hi, I'm Marcin",
    aboutText:"I'm a photographer passionate about people, emotions and beautiful places. I focus on naturalness, authenticity and timeless images. Every session has a story — my job is to tell it.",
    aboutButton:"Learn more →",
    stats:[["150+","completed sessions"],["8 years","of experience"],["PL + EU","sessions in Poland and abroad"]],
    quote:"Beautiful photos and a wonderful atmosphere during the session. Highly recommended!",
    author:"ANNA & PIOTR · WEDDING SESSION",
    contactEyebrow:"Contact", contactTitle:"Let's talk about your session",
    contactText:"Tell me a little about your idea, date and location. I'll reply with a tailored offer.",
    send:"Write a message →", pagePortfolio:"Portfolio", pageAbout:"About me", pageServices:"Services", pageContact:"Contact",
    portfolioIntro:"Every photograph has its own story. Choose a category and explore selected work.",
    all:"All", back:"← Home", close:"Close"
  }
};

export const gallery = [
  {id:"1", image:hero, category:"Wedding", alt:"Wedding couple at sunset"},
  {id:"2", image:galleryAlt, category:"Families", alt:"Family outdoor session"},
  {id:"3", image:heroAlt, category:"Travel", alt:"Mountain landscape"},
  {id:"4", image:about, category:"Portrait", alt:"Portrait photography"},
  {id:"5", image:services, category:"Wedding", alt:"Wedding details"},
  {id:"6", image:portfolio, category:"Travel", alt:"Travel photography"},
  {id:"7", image:reviews, category:"Families", alt:"Family session"},
  {id:"8", image:galleryAlt, category:"Portrait", alt:"Editorial portrait"},
  {id:"9", image:heroAlt, category:"Travel", alt:"Mountain lake"},
  {id:"10", image:services, category:"Wedding", alt:"Wedding couple"},
  {id:"11", image:about, category:"Portrait", alt:"Portrait session"},
  {id:"12", image:portfolio, category:"Families", alt:"Outdoor family photography"}
];

const filterMap = {
  pl: {Wszystkie:"All", Śluby:"Wedding", Rodziny:"Families", Portrety:"Portrait", Podróże:"Travel"},
  en: {All:"All", Weddings:"Wedding", Families:"Families", Portraits:"Portrait", Travel:"Travel"}
};

export function useLanguage() {
  const [lang, setLang] = useState(() => localStorage.getItem("mn-lang") || "pl");
  useEffect(() => { localStorage.setItem("mn-lang", lang); document.documentElement.lang = lang; }, [lang]);
  return [lang, content[lang], () => setLang(v => v === "pl" ? "en" : "pl")];
}

function Header({t, lang, toggle}) {
  const [open,setOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  useEffect(() => {
    const fn=()=>setScrolled(window.scrollY>30);
    window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn);
  },[]);
  const items=[["/",t.nav.home],["/about",t.nav.about],["/services",t.nav.services],["/portfolio",t.nav.portfolio],["/contact",t.nav.contact]];
  return <nav className={`nav-wrap ${scrolled?"scrolled":""}`}>
    <div className="container nav">
      <Link className="logo" to="/">MN<small>PHOTOGRAPHY</small></Link>
      <div className={`links ${open?"open":""}`}>{items.map(([to,label])=><NavLink key={to} to={to} onClick={()=>setOpen(false)}>{label}</NavLink>)}</div>
      <div className="actions"><button className="lang" onClick={toggle}>{lang==="pl"?<>PL / <b>EN</b></>:<><b>PL</b> / EN</>}</button><Link className="btn" to="/contact">{t.book}</Link></div>
      <button className="menu" onClick={()=>setOpen(!open)} aria-label="Menu">☰</button>
    </div>
  </nav>
}

function Reveal({children,className=""}) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export function Layout({children}) {
  const [lang,t,toggle]=useLanguage();
  return <><Header t={t} lang={lang} toggle={toggle}/>{children}<footer><div className="container footer"><span>© 2026 Marcin Nowak Photography</span><span>PL / EN · Made with passion</span></div></footer></>
}

export function Home() {
  const [lang,t]=useLanguage();
  const [filter,setFilter]=useState("All");
  const selected=filter==="All"?gallery:gallery.filter(x=>x.category===filter);
  return <>
    <header className="hero" id="home"><div className="container"><Reveal className="hero-copy"><div className="eyebrow">{t.heroEyebrow}</div><h1>{t.heroTitle}</h1><p>{t.heroText}</p><div className="hero-buttons"><Link className="btn" to="/portfolio">{t.view}</Link><Link className="btn alt" to="/contact">{t.contact}</Link></div></Reveal></div></header>
    <section id="services"><div className="container"><Reveal><div className="section-head"><div><div className="eyebrow">{t.servicesEyebrow}</div><h2 className="title">{t.servicesTitle}</h2></div><p>{t.servicesText}</p></div></Reveal><div className="services">{t.serviceItems.map(([title,text],i)=><Reveal className="card" key={title}><img src={[services,galleryAlt,about,heroAlt][i]} alt={title}/><div className="card-body"><h3>{title}</h3><p>{text}</p><Link className="more" to="/contact">→</Link></div></Reveal>)}</div></div></section>
    <section className="portfolio"><div className="container"><Reveal><div className="section-head"><div><div className="eyebrow">{t.portfolioEyebrow}</div><h2 className="title">{t.portfolioTitle}</h2></div><div className="filters">{t.filters.map(label=>{const key=filterMap[lang][label];return <button key={label} className={filter===key?"active":""} onClick={()=>setFilter(key)}>{label}</button>})}</div></div></Reveal><div className="gallery">{selected.slice(0,8).map((item,i)=><Reveal key={item.id} className={`g${i+1}`}><img src={item.image} alt={item.alt}/></Reveal>)}</div><Reveal className="portfolio-more"><Link className="btn alt" to="/portfolio">{t.viewAll}</Link></Reveal></div></section>
    <AboutPreview t={t}/>
    <section className="quote"><div className="container quote-box"><Reveal><div className="quote-mark">“</div><div className="quote-text">{t.quote}</div><p className="author">{t.author}</p></Reveal></div></section>
    <ContactPreview t={t}/>
  </>
}

function AboutPreview({t}) {
  return <section className="about"><div className="container about-grid"><Reveal><img className="about-img" src={about} alt="Marcin, photographer"/></Reveal><Reveal><div className="eyebrow">{t.aboutEyebrow}</div><h2 className="title">{t.aboutTitle}</h2><p>{t.aboutText}</p><Link className="btn dark" to="/about">{t.aboutButton}</Link></Reveal><Reveal><div className="stats">{t.stats.map(([v,l])=><div className="stat" key={v}><strong>{v}</strong><span>{l}</span></div>)}</div></Reveal></div></section>
}

function ContactPreview({t}) {
  return <section className="contact"><div className="container contact-grid"><Reveal><div className="eyebrow">{t.contactEyebrow}</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><Link className="btn alt" to="/contact">{t.send}</Link></Reveal><Reveal className="contact-info"><div>📞 +48 123 456 789</div><div>✉ kontakt@marcinnowak.photo</div><div>📍 Poznań, Polska / Poland</div><div>◎ Instagram: @marcinnowak.photo</div></Reveal></div></section>
}

export function Portfolio() {
  const [lang,t]=useLanguage(); const [filter,setFilter]=useState("All"); const [lightbox,setLightbox]=useState(null);
  const selected=filter==="All"?gallery:gallery.filter(x=>x.category===filter);
  return <PageShell title={t.pagePortfolio} intro={t.portfolioIntro}><div className="filters page-filters">{t.filters.map(label=>{const key=filterMap[lang][label];return <button key={label} className={filter===key?"active":""} onClick={()=>setFilter(key)}>{label}</button>})}</div><div className="full-gallery">{selected.map(item=><Reveal key={item.id}><button className="gallery-item" onClick={()=>setLightbox(item)}><img src={item.image} alt={item.alt}/><span>{item.category}</span></button></Reveal>)}</div>{lightbox&&<div className="lightbox" onClick={()=>setLightbox(null)}><button className="lightbox-close" onClick={()=>setLightbox(null)}>×</button><img src={lightbox.image} alt={lightbox.alt}/></div>}</PageShell>
}

function PageShell({title,intro,children}) {
  const [lang,t]=useLanguage();
  return <main className="page"><div className="container"><Link className="back" to="/">{t.back}</Link><Reveal><div className="eyebrow">{title}</div><h1 className="page-title">{title}</h1>{intro&&<p className="page-intro">{intro}</p>}</Reveal>{children}</div></main>
}

export function About() {
  const [lang,t]=useLanguage();
  return <PageShell title={t.pageAbout}><div className="about-page"><Reveal><img src={about} alt="Marcin, photographer"/></Reveal><Reveal><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="stats">{t.stats.map(([v,l])=><div className="stat" key={v}><strong>{v}</strong><span>{l}</span></div>)}</div></Reveal></div></PageShell>
}

export function Services() {
  const [lang,t]=useLanguage();
  return <PageShell title={t.pageServices} intro={t.servicesText}><div className="service-list">{t.serviceItems.map(([title,text],i)=><Reveal className="service-row" key={title}><img src={[services,galleryAlt,about,heroAlt][i]} alt={title}/><div><div className="eyebrow">0{i+1}</div><h2>{title}</h2><p>{text}</p><Link className="more" to="/contact">{t.book} →</Link></div></Reveal>)}</div></PageShell>
}

export function Contact() {
  const [lang,t]=useLanguage();
  return <PageShell title={t.pageContact}><div className="contact-page"><Reveal><div className="eyebrow">{t.contactEyebrow}</div><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contact-info"><div>📞 +48 123 456 789</div><div>✉ kontakt@marcinnowak.photo</div><div>📍 Poznań, Polska / Poland</div><div>◎ Instagram: @marcinnowak.photo</div></div></Reveal><Reveal><form onSubmit={e=>{e.preventDefault(); alert(lang==="pl"?"Dziękuję! To demo formularza.":"Thank you! This is a demo form.");}}><label>{lang==="pl"?"Imię i nazwisko":"Name"}<input required/></label><label>Email<input type="email" required/></label><label>{lang==="pl"?"Rodzaj sesji":"Session type"}<select><option>{t.serviceItems[0][0]}</option><option>{t.serviceItems[1][0]}</option><option>{t.serviceItems[2][0]}</option><option>{t.serviceItems[3][0]}</option></select></label><label>{lang==="pl"?"Wiadomość":"Message"}<textarea rows="6" required/></label><button className="btn dark" type="submit">{t.send}</button></form></Reveal></div></PageShell>
}
