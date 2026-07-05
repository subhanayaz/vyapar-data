import { HOW_IT_WORKS_STEPS } from "@/data/samples";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { DrawIcon } from "@/components/ui/DrawIcon";

function PickIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function SampleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" /><polyline points="9 15 12 18 15 15" /><line x1="12" y1="10" x2="12" y2="18" />
    </svg>
  );
}
function PayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const STEP_ICONS = [PickIcon, SampleIcon, PayIcon, DownloadIcon];

export function HowItWorks() {
  return (
    <section className="split-sec" id="how">
      {/* ── Split: coin LEFT, content + steps grid RIGHT (same column) ── */}
      <div className="split-grid panel-l">
        <div className="split-void" />

        <div className="split-panel">
          <ScrollReveal>
            <div className="sec-eyebrow">How it works</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="sec-h">From target to file in minutes</h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="sec-p">
              No calls, no sales pitch, no waiting on quotes. Four simple steps
              and a clean lead file is in your inbox - minutes, not days.
            </p>
          </ScrollReveal>
        </div>

        <div className="split-cards">
          <RevealStagger className="steps" fromTop>
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div key={i} className="step">
                  {Icon && <DrawIcon size={34} delay={i * 120}><Icon /></DrawIcon>}
                  <div className="step-n">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
