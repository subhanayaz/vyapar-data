import { TICKER_ITEMS } from "@/data/site";

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker" id="ticker" aria-hidden>
      <div className="ticker-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="tick-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
