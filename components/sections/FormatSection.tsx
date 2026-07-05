import { FORMAT_FEATURES, FORMAT_SAMPLE_ROWS } from "@/data/samples";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { DrawIcon } from "@/components/ui/DrawIcon";

function ExcelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  );
}
function ContactsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const FEATURE_ICONS = [ExcelIcon, ContactsIcon, BoltIcon];

export function FormatSection() {
  return (
    <section className="split-sec" id="format">
      {/* ── Split: content + sample table LEFT (same column), coin RIGHT ── */}
      <div className="split-grid panel-r">
        <div className="split-panel">
          <ScrollReveal>
            <div className="sec-eyebrow">What you get</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="sec-h">Clean Excel files,<br />ready to use</h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <RevealStagger className="format-info" fromTop>
              {FORMAT_FEATURES.map((feature, i) => {
                const Icon = FEATURE_ICONS[i];
                return (
                  <div key={feature.title} className="fi-item">
                    {Icon && <DrawIcon size={28} delay={i * 140}><Icon /></DrawIcon>}
                    <div className="fi-body">
                      <div className="fi-title">{feature.title}</div>
                      <p className="fi-desc">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </RevealStagger>
          </ScrollReveal>
        </div>

        <div className="split-cards">
          <ScrollReveal className="sample-table-section">
            <div className="sec-eyebrow">Sample row</div>
            <div className="sample-table-wrap">
              <div className="sample-table">
                <div className="st-head">
                  <span>Business</span><span>Mobile</span><span>City</span>
                  <span>Website</span><span>Type</span>
                </div>
                {FORMAT_SAMPLE_ROWS.slice(0, 5).map((row) => (
                  <div key={row.businessName} className="st-row">
                    <span>{row.businessName}</span>
                    <span className="muted-cell">{row.mobile}</span>
                    <span>{row.city}</span>
                    <span className="muted-cell">{row.websiteUrl}</span>
                    <span><span className="st-tag">{row.type}</span></span>
                  </div>
                ))}
              </div>
            </div>
            <p className="sample-preview-note">Preview only · real files include full details</p>
          </ScrollReveal>
        </div>

        <div className="split-void" />
      </div>
    </section>
  );
}
