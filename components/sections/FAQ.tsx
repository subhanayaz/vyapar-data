"use client";

import { useState } from "react";
import { FAQS } from "@/data/faqs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="split-sec" id="faq">
      {/* ── Split: content LEFT, coin RIGHT ── */}
      <div className="split-head panel-r">
        <div className="split-panel">
          <ScrollReveal>
            <div className="sec-eyebrow">FAQ</div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="sec-h">Common questions</h2>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <div className="faq-wrap">
              {FAQS.map((faq, index) => (
                <div key={faq.question} className={`fq${openIndex === index ? " open" : ""}`}>
                  <button
                    type="button"
                    className="fq-q"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    {faq.question}
                    <span className="fq-ico">+</span>
                  </button>
                  <div className="fq-a">{faq.answer}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Coin RIGHT ── */}
        <div className="split-void" />
      </div>
    </section>
  );
}
