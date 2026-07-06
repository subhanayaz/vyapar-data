import { CATEGORIES } from "@/data/categories";
import { BoxSlider } from "@/components/ui/BoxSlider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { DrawIcon } from "@/components/ui/DrawIcon";
import { CATEGORY_ICONS } from "@/components/ui/CategoryIcons";

export function Categories() {
  const renderCard = (cat: (typeof CATEGORIES)[number], i: number) => {
    const Icon = CATEGORY_ICONS[cat.name];
    return (
      <div key={cat.name} className="cat-card loc-cat-card">
        <div className="cat-num">{cat.number}</div>
        {Icon && <DrawIcon size={36} delay={i * 90}><Icon /></DrawIcon>}
        <div className="cat-name">{cat.name}</div>
        <p className="cat-desc">{cat.description}</p>
      </div>
    );
  };

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
          <RevealStagger className="cat-grid loc-grid-desktop" fromTop>
            {CATEGORIES.map(renderCard)}
          </RevealStagger>
          <BoxSlider ariaLabel="Leads for every market" className="loc-slider-mobile">
            {CATEGORIES.map(renderCard)}
          </BoxSlider>
        </div>

        <div className="split-void" />
      </div>
    </section>
  );
}
