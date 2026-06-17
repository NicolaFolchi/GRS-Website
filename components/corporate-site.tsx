"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "";
const publicAsset = (path: string) => `${basePath}${path}`;

const media = {
  offshorePlatform: publicAsset("/grs-media/image1.png"),
  maritimeOps: publicAsset("/grs-media/image2.jpg"),
  brookCertificate: publicAsset("/grs-media/image3.png"),
  brookDanos: publicAsset("/grs-media/image5.jpeg"),
  brookDanosWide: publicAsset("/grs-media/image6.jpeg"),
  msTaylor: publicAsset("/grs-media/image10.png"),
  msTaylorDetail: publicAsset("/grs-media/image7.jpeg"),
  msTaylorCertificate: publicAsset("/grs-media/image8.png"),
  subsea: publicAsset("/grs-media/image11.png"),
  headquartersCourtyard: publicAsset("/grs-media/image12.jpeg"),
  headquarters: publicAsset("/grs-media/image13.jpeg"),
};

const navItems = [
  ["Services", "#services"],
  ["Fleet", "#fleet"],
  ["Procurement", "#procurement"],
  ["HSE", "#hse"],
  ["Contact", "#contact"],
] as const;

const whoCards = [
  {
    title: "Energy & Hydrocarbons",
    copy: "Oil and gas support for onshore and offshore operations.",
    icon: "energy",
  },
  {
    title: "Maritime & Logistics",
    copy: "Fleet connectivity and continuous offshore logistics support.",
    icon: "fleet",
  },
  {
    title: "Underwater Industrial Sector",
    copy: "Commercial diving, inspection, maintenance, and civil works support.",
    icon: "subsea",
  },
];

const pillars = [
  {
    number: "01",
    title: "Oilfields",
    copy: "Specialized Slickline and Wireline operations, with comprehensive support for drilling, production, and pipeline systems.",
  },
  {
    number: "02",
    title: "Maritime Logistics",
    copy: "Operation of tugboats, crew boats, and fast personnel vessels for continuous offshore logistics support.",
  },
  {
    number: "03",
    title: "Underwater Services",
    copy: "Commercial diving, inspection, and maintenance of critical subsea infrastructure.",
  },
  {
    number: "04",
    title: "Global Procurement",
    copy: "Large-scale equipment supply, critical spare parts, and intelligent management of international logistics chains.",
  },
];

const oilfieldServices = [
  {
    title: "Well Operations",
    copy: "Specialists in Slickline and electric Wireline services with high technological standards.",
  },
  {
    title: "Drilling & Production",
    copy: "Operation, maintenance, and specialized technical support for wells and operational stations.",
  },
  {
    title: "Hydraulic Infrastructure",
    copy: "Pipeline laying, installation, and fluid engineering optimization.",
  },
];

const maritimeBullets = [
  "Tugboats and crew boats",
  "Continuous support for offshore platforms",
  "Agile connection to offshore production stations",
  "Compliance with maritime safety protocols",
];

type VesselAsset = {
  label: string;
  type: "Vessel Photo" | "USCG Document" | "Reference Image";
  src: string;
  alt: string;
  document?: boolean;
};

const vessels = [
  {
    name: "Brook Danos",
    copy: "Officially certified unit with active operational support.",
    assets: [
      {
        label: "Profile View",
        type: "Vessel Photo",
        src: media.brookDanos,
        alt: "Brook Danos vessel side profile",
      },
      {
        label: "USCG Certificate",
        type: "USCG Document",
        src: media.brookCertificate,
        alt: "Brook Danos USCG certificate of documentation",
        document: true,
      },
      {
        label: "Operational Photo",
        type: "Reference Image",
        src: media.brookDanosWide,
        alt: "Brook Danos vessel operational reference",
      },
    ] satisfies VesselAsset[],
  },
  {
    name: "MS Taylor",
    copy: "Approved vessel with maximum operational capacity.",
    assets: [
      {
        label: "Profile View",
        type: "Vessel Photo",
        src: media.msTaylor,
        alt: "MS Taylor vessel side profile",
      },
      {
        label: "USCG Certificate",
        type: "USCG Document",
        src: media.msTaylorCertificate,
        alt: "MS Taylor USCG certificate of documentation",
        document: true,
      },
      {
        label: "Operational Photo",
        type: "Reference Image",
        src: media.msTaylorDetail,
        alt: "MS Taylor vessel operational reference",
      },
    ] satisfies VesselAsset[],
  },
];

const subseaColumns = [
  {
    title: "Inspection & Maintenance",
    copy: "Professional diving services and subsea inspections to support the integrity of critical underwater assets.",
  },
  {
    title: "Underwater Technical Assistance",
    copy: "Advanced repair of subsea pipelines and technical support for maritime structures.",
  },
  {
    title: "Civil & Industrial Works",
    copy: "Planning and development of large-scale civil and energy infrastructure projects.",
  },
];

const partners = [
  {
    region: "International Clients",
    commercial: "US Replacement Parts / Rudy Export",
    service: "Global procurement, spare parts, and international logistics.",
  },
  {
    region: "Operations in Venezuela",
    commercial: "C.E.M.S.A. / Servicios y Transportes Diesel C.A.",
    service: "Engineering, technical support, and industrial maintenance.",
  },
  {
    region: "State-Owned Companies",
    commercial: "National Oil & Gas Operators",
    service: "Specialized Slickline and drilling services.",
  },
  {
    region: "EPC Contractors",
    commercial: "Major Engineering Consortia",
    service: "Strategic industrial supply for large-scale projects.",
  },
];

const compliance = [
  {
    title: "Legally Authorized Operation",
    copy: "Company duly incorporated and registered in full compliance with applicable laws, authorized to carry out lawful commercial and industrial activities within its corporate purpose.",
  },
  {
    title: "Safety Commitment - HSE",
    copy: "Operations are governed by strict Health, Safety, and Environment policies designed to minimize industrial risk exposure.",
  },
  {
    title: "International Oil & Gas Standards",
    copy: "The company supports integrity across logistics, maritime, and drilling procedures while aligning with stringent global industry standards.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`}
      data-visible={visible}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`stagger-group ${className}`}
      data-visible={visible}
    >
      {children}
    </div>
  );
}

function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal-item ${className}`}>{children}</div>;
}

function SectionHeader({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-center">
      <div className="mx-auto flex max-w-md items-center gap-4">
        <span className={`h-px flex-1 ${light ? "bg-white/18" : "bg-navy/12"}`} />
        <p className="eyebrow rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold">
          {eyebrow}
        </p>
        <span className={`h-px flex-1 ${light ? "bg-white/18" : "bg-navy/12"}`} />
      </div>
      <h2 className={`mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl ${light ? "text-white" : "text-navy"}`}>
        {title}
      </h2>
      {copy ? <p className={`mt-5 text-lg leading-8 ${light ? "text-white/68" : "text-charcoal/68"}`}>{copy}</p> : null}
    </Reveal>
  );
}

function Icon({ name }: { name: string }) {
  const common = "h-6 w-6";

  if (name === "fleet") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 15.5h18l-2.3 3.2a5 5 0 0 1-4.1 2.1H8.8a5 5 0 0 1-4.2-2.3L3 15.5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 15.5V9.8h7.6l3.1 5.7M9.2 7.2h3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "subsea") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v18M5 7.8c2.2 1.4 4.5 2.1 7 2.1s4.8-.7 7-2.1M5 16.2c2.2-1.4 4.5-2.1 7-2.1s4.8.7 7 2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6.5 12h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 5.5 13h5L9 20.5 18.5 9h-5L12 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    let frame = 0;

    const updateTheme = () => {
      frame = 0;
      const sampleY = 84;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-theme]"));
      const active = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= sampleY && rect.bottom > sampleY;
      });

      setTheme(active?.dataset.navTheme === "light" ? "light" : "dark");
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateTheme);
    };

    updateTheme();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const dark = theme === "dark";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b shadow-[0_14px_50px_rgba(11,28,61,0.12)] backdrop-blur-xl transition-[background-color,border-color,color] duration-300 ${
        dark ? "border-white/12 bg-navy/78 text-white" : "border-cool/80 bg-white/92 text-navy"
      }`}
    >
      <nav className="shell flex h-16 items-center justify-between gap-4">
        <a href="#top" className="premium-button flex items-center gap-3" aria-label="Global Rental Solutions home">
          <span className={`grid h-9 w-9 place-items-center rounded-full border border-gold/50 text-sm font-semibold text-gold shadow-sm ${dark ? "bg-white/8" : "bg-navy"}`}>
            GRS
          </span>
          <span className="hidden text-sm font-semibold tracking-[-0.01em] sm:block">Global Rental Solutions</span>
        </a>
        <div
          className={`flex max-w-[66vw] items-center gap-1 overflow-x-auto rounded-full border p-1 text-sm sm:max-w-none ${
            dark ? "border-white/10 bg-white/[0.07] text-white/74" : "border-cool bg-soft text-navy/70"
          }`}
        >
          {navItems.map(([label, href]) => (
            <a key={href} href={href} className="nav-link whitespace-nowrap rounded-full px-3 py-2">
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function PremiumButton({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const styles =
    variant === "primary"
      ? "border-gold bg-gold text-navy shadow-[0_18px_50px_rgba(197,160,89,0.24)]"
      : "border-white/18 bg-white/8 text-white backdrop-blur-xl";

  return (
    <a
      href={href}
      className={`premium-button inline-flex min-h-12 items-center justify-center rounded-full border px-6 text-sm font-semibold ${styles}`}
    >
      {children}
    </a>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual relative min-h-[390px] lg:min-h-[520px]">
      <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-white/[0.055] shadow-navy backdrop-blur-xl" />
      <div className="industrial-grid absolute inset-4 overflow-hidden rounded-[2.35rem] bg-navy/80">
        <Image
          src={media.offshorePlatform}
          alt="Offshore energy platform at sea"
          fill
          priority
          sizes="(min-width: 1024px) 42vw, 92vw"
          className="object-cover opacity-[0.82]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,61,0.18),rgba(11,28,61,0.78)),radial-gradient(circle_at_78%_18%,rgba(197,160,89,0.34),transparent_30%)]" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-20 left-8 h-64 w-64 rounded-full bg-steel/18 blur-3xl" />
        <div className="absolute left-6 top-6 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-medium text-white/76 backdrop-blur-md">
          Offshore energy and logistics network
        </div>
        <div className="absolute bottom-7 right-7 w-[min(78%,360px)] rounded-3xl border border-white/12 bg-white/10 p-5 backdrop-blur-xl">
          <div className="text-xs uppercase tracking-[0.18em] text-white/54">
            <span>Operational Scope</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-white">
            {[["Energy", "Support"], ["Marine", "Fleet"], ["Global", "Supply"]].map(([top, bottom]) => (
              <div key={top} className="rounded-2xl border border-white/10 bg-white/[0.07] p-3">
                <p className="text-sm font-semibold">{top}</p>
                <p className="mt-1 text-xs text-white/52">{bottom}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function IndustrialPanel({ label, image, alt }: { label: string; image: string; alt: string }) {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] bg-navy p-6 shadow-navy">
      <div className="industrial-grid absolute inset-0 opacity-70" />
      <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-gold/24 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-steel/20 blur-3xl" />
      <div className="relative z-10 flex h-full min-h-[372px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 46vw, 92vw" className="object-cover opacity-[0.72]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,61,0.16),rgba(11,28,61,0.86))]" />
        <div className="relative z-10 inline-flex w-fit rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur-md">
          {label}
        </div>
        <div className="relative mt-auto grid grid-cols-3 gap-3 text-white">
          {[
            ["24/7", "Support"],
            ["USCG", "Framework"],
            ["Global", "Reach"],
          ].map(([value, labelText]) => (
            <div key={value} className="rounded-2xl border border-white/10 bg-white/[0.07] p-3 text-center">
              <p className="text-lg font-semibold">{value}</p>
              <p className="mt-1 text-xs text-white/52">{labelText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogisticsNetwork() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-cool bg-white p-5 shadow-premium sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(197,160,89,0.18),transparent_32%),radial-gradient(circle_at_72%_72%,rgba(11,28,61,0.12),transparent_36%)]" />
      <div className="relative overflow-hidden rounded-[2rem] border border-cool/80 bg-soft p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow text-xs font-semibold text-gold">Supply Chain</p>
          <span className="rounded-full border border-navy/10 bg-white px-3 py-1 text-xs font-semibold text-navy/60">Global routing</span>
        </div>
        <svg className="mt-4 h-72 w-full" viewBox="0 0 560 320" fill="none" aria-hidden="true">
          <path d="M92 198 238 82l230 76M238 82l82 172M92 198l228 56 148-96" stroke="rgba(11,28,61,0.18)" strokeWidth="2" />
          <path d="M92 198 238 82" stroke="#C5A059" strokeWidth="2" strokeDasharray="7 9" />
          <path d="M238 82 468 158" stroke="#C5A059" strokeWidth="2" strokeDasharray="7 9" />
        {[
          [92, 198, "HQ", "Doral"],
          [238, 82, "OEM", "Manufacturers"],
          [468, 158, "Port", "Export"],
          [320, 254, "Site", "Operations"],
        ].map(([cx, cy, label, detail]) => (
          <g key={label as string}>
            <circle cx={cx as number} cy={cy as number} r="38" fill="white" stroke="rgba(197,160,89,0.55)" />
            <circle cx={cx as number} cy={cy as number} r="6" fill="#C5A059" />
            <text x={cx as number} y={(cy as number) + 57} textAnchor="middle" fill="#0B1C3D" fontSize="14" fontWeight="700">
              {label as string}
            </text>
            <text x={cx as number} y={(cy as number) + 76} textAnchor="middle" fill="rgba(33,37,41,0.58)" fontSize="12" fontWeight="500">
              {detail as string}
            </text>
          </g>
        ))}
      </svg>
      </div>
      <div className="relative z-10 mt-4 grid gap-3 sm:grid-cols-3">
        {[
          ["Source", "Authorized manufacturers and key distributors."],
          ["Coordinate", "Documentation, export routing, and response timing."],
          ["Deliver", "Critical parts and equipment to field operations."],
        ].map(([title, copy]) => (
          <div key={title} className="rounded-2xl border border-cool bg-white/86 p-4">
            <p className="text-sm font-semibold text-navy">{title}</p>
            <p className="mt-2 text-xs leading-5 text-charcoal/60">{copy}</p>
          </div>
        ))}
        </div>
    </div>
  );
}

function FleetVesselShowcase({ vessel }: { vessel: (typeof vessels)[number] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeAsset = vessel.assets[activeIndex];

  return (
    <article className="premium-card overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.065] p-4 backdrop-blur-xl sm:p-5">
      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <aside className="flex flex-col rounded-[1.75rem] border border-white/10 bg-[#07142c]/80 p-5">
          <p className="eyebrow text-xs font-semibold text-gold">Certified Vessel</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">{vessel.name}</h3>
          <p className="mt-4 leading-7 text-white/64">{vessel.copy}</p>

          <div className="mt-8 space-y-3">
            {vessel.assets.map((asset, index) => {
              const selected = activeIndex === index;

              return (
                <button
                  key={asset.label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveIndex(index)}
                  className={`premium-button grid w-full grid-cols-[72px_1fr] gap-4 rounded-2xl border p-3 text-left ${
                    selected
                      ? "border-gold/70 bg-gold/12 text-white shadow-[0_18px_44px_rgba(197,160,89,0.14)]"
                      : "border-white/10 bg-white/[0.055] text-white/72"
                  }`}
                >
                  <span className="relative h-16 overflow-hidden rounded-xl border border-white/10 bg-white">
                    <Image
                      src={asset.src}
                      alt=""
                      fill
                      sizes="72px"
                      className={`${asset.document ? "object-contain p-1" : "object-cover"}`}
                    />
                  </span>
                  <span className="min-w-0 self-center">
                    <span className={`block text-xs font-semibold uppercase tracking-[0.14em] ${selected ? "text-gold" : "text-white/40"}`}>
                      {asset.type}
                    </span>
                    <span className="mt-1 block text-sm font-semibold">{asset.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="rounded-[1.75rem] border border-white/10 bg-[#061127] p-4 sm:p-5">
          <div className="mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{activeAsset.type}</p>
              <h4 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">{activeAsset.label}</h4>
            </div>
          </div>

          <div className={`relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-white ${activeAsset.document ? "h-[620px]" : "h-[460px] sm:h-[560px]"}`}>
            <Image
              key={activeAsset.src}
              src={activeAsset.src}
              alt={activeAsset.alt}
              fill
              sizes="(min-width: 1280px) 720px, 92vw"
              className={`${activeAsset.document ? "object-contain p-3 sm:p-5" : "object-contain p-3"}`}
            />
          </div>

        </div>
      </div>
    </article>
  );
}

export function CorporateSite() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formspreeEndpoint) {
      setFormStatus("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    setFormStatus("submitting");

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <main id="top" className="overflow-hidden bg-white">
      <Header />

      <section data-nav-theme="dark" className="relative flex min-h-screen items-center overflow-hidden bg-navy pb-16 pt-24 text-white">
        <div className="absolute inset-0 bg-radial-gold" />
        <div className="industrial-grid absolute inset-0 opacity-[0.55]" />
        <div className="gold-line absolute left-1/2 top-16 h-px w-[80vw] -translate-x-1/2" />
        <div className="shell relative z-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <div className="hero-copy flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              <span className="h-px w-12 bg-gold" />
              <span>Global Rental Solutions LLC</span>
            </div>
            <h1 className="hero-title mt-5 max-w-3xl text-4xl font-semibold uppercase leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl xl:text-7xl">
              Global Rental Solutions LLC
            </h1>
            <p className="hero-copy hero-copy-delay mt-6 max-w-xl text-base font-medium leading-7 text-white/82 sm:text-lg">
              Global solutions for energy, maritime logistics, and industrial operations.
            </p>
            <p className="hero-copy hero-copy-delay mt-3 max-w-xl text-sm leading-7 text-white/58 sm:text-base">
              Integrated services, logistics support, global procurement, and specialized engineering solutions for energy, hydrocarbons, maritime, subsea, and industrial sectors.
            </p>
            <div className="hero-copy hero-copy-delay mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/48">
              {[
                "Energy",
                "Maritime Logistics",
                "Subsea Operations",
                "Global Procurement",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  {item}
                </span>
              ))}
            </div>
            <div className="hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
              <PremiumButton href="#services">Explore Services</PremiumButton>
              <PremiumButton href="#contact" variant="secondary">
                Contact Us
              </PremiumButton>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <section id="services" data-nav-theme="light" className="bg-soft py-24 sm:py-32">
        <div className="shell">
          <SectionHeader
            eyebrow="Who We Are"
            title="Integrated Logistics, Procurement, and Engineering Support"
            copy="Global Rental Solutions LLC is an integrated services and global procurement company established to provide specialized engineering solutions, logistics support, and services for complex industrial operations."
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {whoCards.map((card) => (
              <StaggerItem key={card.title}>
                <article className="premium-card h-full rounded-[2rem] border border-cool bg-white p-7 shadow-sm">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-gold">
                    <Icon name={card.icon} />
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-navy">{card.title}</h3>
                  <p className="mt-3 leading-7 text-charcoal/64">{card.copy}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section data-nav-theme="light" className="bg-white py-24 sm:py-32">
        <div className="shell">
          <SectionHeader eyebrow="Strategic Pillars" title="Operational Strength Across Four Core Lines" />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
            {pillars.map((pillar) => (
              <StaggerItem key={pillar.number}>
                <article className="premium-card group h-full rounded-[2rem] border border-cool bg-white p-8 shadow-sm">
                  <div className="flex items-start justify-between gap-6">
                    <span className="text-sm font-semibold text-gold">{pillar.number}</span>
                    <span className="h-px flex-1 translate-y-2 bg-gradient-to-r from-gold/50 to-transparent" />
                  </div>
                  <h3 className="mt-9 text-2xl font-semibold tracking-[-0.03em] text-navy">{pillar.title}</h3>
                  <p className="mt-4 max-w-xl leading-7 text-charcoal/64">{pillar.copy}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section data-nav-theme="light" className="bg-soft py-24 sm:py-32">
        <div className="shell grid items-center gap-12 lg:grid-cols-[0.95fr_1fr]">
          <Reveal>
            <p className="eyebrow text-xs font-semibold text-gold">Oilfields</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">
              Oilfield Support for Onshore & Offshore Operations
            </h2>
            <div className="mt-9 space-y-4">
              {oilfieldServices.map((service) => (
                <article key={service.title} className="premium-card rounded-3xl border border-cool bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-navy">{service.title}</h3>
                  <p className="mt-2 leading-7 text-charcoal/64">{service.copy}</p>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <IndustrialPanel image={media.maritimeOps} alt="Offshore maritime construction and oilfield support vessel" label="Onshore and offshore systems" />
          </Reveal>
        </div>
      </section>

      <section data-nav-theme="light" className="bg-white py-24 sm:py-32">
        <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <div className="relative min-h-[440px] overflow-hidden rounded-[2.5rem] bg-navy p-6 shadow-navy">
              <Image src={media.brookDanosWide} alt="Brook Danos vessel supporting maritime logistics" fill sizes="(min-width: 1024px) 52vw, 92vw" className="object-cover opacity-[0.78]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,61,0.08),rgba(11,28,61,0.74))]" />
              <div className="industrial-grid absolute inset-0 opacity-70" />
              <div className="absolute left-8 top-8 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur-md">
                Offshore Logistics Support
              </div>
              <div className="absolute bottom-7 left-7 right-7 rounded-3xl border border-white/12 bg-white/10 p-5 text-white backdrop-blur-xl">
                <p className="text-lg font-semibold tracking-[-0.02em]">Fleet connectivity for offshore continuity</p>
                <p className="mt-2 text-sm leading-6 text-white/62">Tugboats, crew boats, and personnel vessels supporting cargo and technical movement.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow text-xs font-semibold text-gold">Maritime Logistics</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">
              Specialized Naval Fleet for Offshore Continuity
            </h2>
            <p className="mt-6 text-lg leading-8 text-charcoal/68">
              Global Rental Solutions operates a fleet designed to ensure the continuous movement of technical personnel and cargo for offshore operations.
            </p>
            <div className="mt-8 space-y-3">
              {maritimeBullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3 rounded-2xl border border-cool bg-soft px-4 py-3 text-charcoal/76">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="fleet" data-nav-theme="dark" className="relative bg-navy py-24 text-white sm:py-32">
        <div className="industrial-grid absolute inset-0 opacity-45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(197,160,89,0.2),transparent_28%),radial-gradient(circle_at_75%_70%,rgba(180,190,210,0.12),transparent_35%)]" />
        <div className="shell relative z-10">
          <SectionHeader
            eyebrow="International Certifications"
            title="Documented Fleet with USCG Compliance"
            copy="Marine units operate under a strict regulatory framework and are authorized by the United States Coast Guard through the National Vessel Documentation Center."
            light
          />
          <Reveal className="mx-auto mt-12 flex max-w-md items-center justify-center rounded-[2rem] border border-gold/35 bg-gold/10 p-7 text-center shadow-navy backdrop-blur-xl">
            <div>
              <p className="text-6xl font-semibold tracking-[-0.06em] text-gold">100%</p>
              <p className="eyebrow mt-2 text-xs font-semibold text-white/70">USCG Compliance</p>
            </div>
          </Reveal>
          <Stagger className="mt-10 grid gap-8">
            {vessels.map((vessel) => (
              <StaggerItem key={vessel.name}>
                <FleetVesselShowcase vessel={vessel} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section data-nav-theme="dark" className="relative bg-[#07142c] py-24 text-white sm:py-32">
        <Image src={media.subsea} alt="Commercial diving and underwater operations" fill sizes="100vw" className="object-cover opacity-[0.28]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,20,44,0.78),rgba(7,20,44,0.94)),radial-gradient(circle_at_50%_0%,rgba(180,190,210,0.16),transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(180,190,210,0.16),transparent_38%)]" />
        <div className="shell relative z-10">
          <SectionHeader eyebrow="Subsea Operations" title="Commercial Diving & Subsea Civil Works" light />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {subseaColumns.map((column) => (
              <StaggerItem key={column.title}>
                <article className="premium-card h-full rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 backdrop-blur-xl">
                  <div className="mb-10 h-px w-full bg-gradient-to-r from-gold/80 to-transparent" />
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{column.title}</h3>
                  <p className="mt-4 leading-7 text-white/62">{column.copy}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="procurement" data-nav-theme="light" className="bg-soft py-24 sm:py-32">
        <div className="shell grid items-center gap-12 lg:grid-cols-[0.92fr_1fr]">
          <Reveal>
            <p className="eyebrow text-xs font-semibold text-gold">Global Procurement</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-navy sm:text-5xl">
              Global Procurement & International Supply
            </h2>
            <div className="mt-9 grid gap-5">
              <article className="premium-card rounded-[2rem] border border-cool bg-white p-7 shadow-sm">
                <h3 className="text-xl font-semibold text-navy">International Equipment Supply</h3>
                <p className="mt-4 leading-7 text-charcoal/66">
                  Import and export of industrial-grade equipment, including heavy machinery, industrial tools, high-spec technical components, and critical spare parts from authorized global manufacturers.
                </p>
              </article>
              <article className="premium-card rounded-[2rem] border border-cool bg-white p-7 shadow-sm">
                <h3 className="text-xl font-semibold text-navy">Intelligent Procurement & Logistics Management</h3>
                <p className="mt-4 leading-7 text-charcoal/66">
                  We support a secure, reliable, and continuous international supply chain through optimized response times and direct coordination with major manufacturers and key distributors worldwide.
                </p>
              </article>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <LogisticsNetwork />
          </Reveal>
        </div>
      </section>

      <section data-nav-theme="light" className="bg-white py-24 sm:py-32">
        <div className="shell">
          <SectionHeader eyebrow="Clients & Commercial Partners" title="Executive View of Commercial Engagements" />
          <Stagger className="mt-14 grid gap-4">
            {partners.map((row) => (
              <StaggerItem key={row.region}>
                <article className="premium-card grid gap-5 rounded-[1.75rem] border border-cool bg-white p-5 shadow-sm md:grid-cols-[0.8fr_1fr_1.2fr] md:items-center md:p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Region / Client Type</p>
                    <h3 className="mt-2 text-lg font-semibold text-navy">{row.region}</h3>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/38">Commercial Partners</p>
                    <p className="mt-2 text-charcoal/72">{row.commercial}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/38">Service Line</p>
                    <p className="mt-2 text-charcoal/72">{row.service}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="hse" data-nav-theme="light" className="bg-soft py-24 sm:py-32">
        <div className="shell">
          <SectionHeader eyebrow="Legal Compliance & HSE" title="Disciplined Governance for Critical Operations" />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
            {compliance.map((item) => (
              <StaggerItem key={item.title}>
                <article className="premium-card h-full rounded-[2rem] border border-cool bg-white p-7 shadow-sm">
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m6 12.2 3.5 3.5L18.5 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.02em] text-navy">{item.title}</h3>
                  <p className="mt-4 leading-7 text-charcoal/64">{item.copy}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="contact" data-nav-theme="dark" className="relative bg-navy py-24 text-white sm:py-32">
        <Image src={media.headquarters} alt="Operational headquarters in Doral, Florida" fill sizes="100vw" className="object-cover opacity-[0.18]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,28,61,0.96),rgba(11,28,61,0.82)),radial-gradient(circle_at_18%_18%,rgba(197,160,89,0.18),transparent_30%)]" />
        <div className="industrial-grid absolute inset-0 opacity-40" />
        <div className="shell relative z-10 grid gap-12 lg:grid-cols-[0.85fr_1fr]">
          <Reveal>
            <p className="eyebrow text-xs font-semibold text-gold">Contact / Headquarters</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Operational Headquarters</h2>
            <p className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white/86 sm:text-3xl">Doral, Florida 33172, USA</p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/66">
              Contact Global Rental Solutions for integrated energy, maritime logistics, subsea operations, and international procurement support.
            </p>
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl">
              <div className="relative h-56 overflow-hidden rounded-[1.45rem]">
                <Image src={media.headquartersCourtyard} alt="Doral operational headquarters and industrial facilities" fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="input-field rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white placeholder:text-white/42" name="name" placeholder="Name" aria-label="Name" required />
                <input className="input-field rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white placeholder:text-white/42" name="company" placeholder="Company" aria-label="Company" />
                <input className="input-field rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white placeholder:text-white/42" name="email" type="email" placeholder="Email" aria-label="Email" required />
                <input className="input-field rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white placeholder:text-white/42" name="phone" placeholder="Phone" aria-label="Phone" />
              </div>
              <textarea className="input-field mt-4 min-h-36 w-full resize-none rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white placeholder:text-white/42" name="message" placeholder="Message" aria-label="Message" required />
              <input type="hidden" name="subject" value="Global Rental Solutions website inquiry" />
              <button className="premium-button mt-5 w-full rounded-full border border-gold bg-gold px-6 py-3 text-sm font-semibold text-navy disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={formStatus === "submitting"}>
                {formStatus === "submitting" ? "Sending Inquiry..." : "Submit Inquiry"}
              </button>
              {formStatus === "success" ? (
                <p className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm leading-6 text-emerald-100">
                  Your inquiry has been sent. The Global Rental Solutions team will review it shortly.
                </p>
              ) : null}
              {formStatus === "error" ? (
                <p className="mt-4 rounded-2xl border border-red-300/20 bg-red-400/10 p-4 text-sm leading-6 text-red-100">
                  The message could not be sent. Please try again shortly.
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-navy py-8 text-white">
        <div className="shell flex flex-col gap-5 text-sm text-white/58 md:flex-row md:items-center md:justify-between">
          <p className="font-semibold text-white">Global Rental Solutions LLC</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              "Energy",
              "Maritime Logistics",
              "Subsea Operations",
              "Global Procurement",
              "Legal Compliance & HSE",
            ].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
