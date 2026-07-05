import { CATEGORIES } from "@/data/categories";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { DrawIcon } from "@/components/ui/DrawIcon";

function ManufacturingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="1" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      <line x1="8" y1="12" x2="8" y2="16" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="16" y1="12" x2="16" y2="16" />
    </svg>
  );
}
function RetailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
function HealthcareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
function EducationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
function RealEstateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function HospitalityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}

const ICONS: Record<string, React.FC> = {
  "Manufacturers":       ManufacturingIcon,
  "Retailers & traders": RetailIcon,
  "Healthcare":          HealthcareIcon,
  "Education":           EducationIcon,
  "Real estate":         RealEstateIcon,
  "Hotels & restaurants": HospitalityIcon,
};

export function Categories() {
  return (
    <section className="split-sec" id="categories">
      {/* ── Split: content + card grid LEFT (same column), coin RIGHT ── */}
      <div className="split-grid panel-r">
        <div className="split-panel">
          <ScrollReveal>
            <div className="sec-eyebrow">Categories</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="sec-h">Leads for every market</h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="sec-p">
              Whether you sell B2B or B2C, pick your target, filter by city or
              state, and get contacts that match exactly who you&apos;re after.
            </p>
          </ScrollReveal>
        </div>

        <div className="split-cards">
          <RevealStagger className="cat-grid" fromTop>
            {CATEGORIES.map((cat, i) => {
              const Icon = ICONS[cat.name];
              return (
                <div key={cat.name} className="cat-card">
                  <div className="cat-num">{cat.number}</div>
                  {Icon && <DrawIcon size={36} delay={i * 90}><Icon /></DrawIcon>}
                  <div className="cat-name">{cat.name}</div>
                  <p className="cat-desc">{cat.description}</p>
                </div>
              );
            })}
          </RevealStagger>
        </div>

        <div className="split-void" />
      </div>
    </section>
  );
}
