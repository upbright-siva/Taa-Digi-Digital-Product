import { Reveal } from "./Reveal";
import { categories } from "../data";

export function CategoriesSection() {
  return (
    <section className="categories" id="included">
      <div className="wrap">
        <div className="cat-head">
          <Reveal className="eyebrow">WHAT&apos;S INSIDE</Reveal>
          <Reveal delay={1}>
            <h2 className="section-title">A template for literally every business</h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="section-sub" style={{ margin: "0 auto", color: "rgba(255,255,255,.65)" }}>
              One bundle, every category — mix, match and post in minutes.
            </p>
          </Reveal>
        </div>

        <div className="cat-grid">
          {categories.map((cat, i) => (
            <Reveal
              key={cat.name}
              delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              className={`cat-card ${cat.theme}`}
            >
              <span className="emoji">{cat.emoji}</span>
              <span className="tag">{cat.tag}</span>
              <span className="name">{cat.name}</span>
            </Reveal>
          ))}
        </div>
        <Reveal delay={5} className="cat-more">
          + Digital marketing, branding, events, offers and more — new categories
          added every month.
        </Reveal>
      </div>
    </section>
  );
}
