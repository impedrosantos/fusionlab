import { useEffect, useState } from "react";
import { subscribePosts, type Post } from "../lib/posts";
import { RichTextView } from "./RichText";
import { useT } from "../i18n";

export default function Gallery() {
  const t = useT();
  const [posts, setPosts] = useState<Post[]>([]);
  const [active, setActive] = useState<Post | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => subscribePosts(setPosts), []);

  // On mobile, tapping a card must not open the lightbox viewer.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 680px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section id="gallery" className="section">
      <div className="container">
        <header className="section-head">
          <span className="kicker mono">{t("gallery.kicker")}</span>
          <h2>{t("gallery.title")}</h2>
        </header>

        {posts.length === 0 ? (
          <p className="empty mono">{t("gallery.empty")}</p>
        ) : (
          <div className="gallery-grid">
            {posts.map((p) => {
              const inner = (
                <>
                  <div className="gallery-img">
                    <img src={p.imageUrl} alt={p.title} loading="lazy" />
                    <span className="gallery-material mono">{p.material}</span>
                  </div>
                  <div className="gallery-meta">
                    <h3>{p.title}</h3>
                    <RichTextView html={p.description} />
                  </div>
                </>
              );
              return isMobile ? (
                <div key={p.id} className="gallery-card gallery-card-static">
                  {inner}
                </div>
              ) : (
                <button
                  key={p.id}
                  className="gallery-card"
                  onClick={() => setActive(p)}
                >
                  {inner}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              aria-label={t("gallery.close")}
              onClick={() => setActive(null)}
            >
              ×
            </button>
            <img src={active.imageUrl} alt={active.title} />
            <div className="lightbox-meta">
              <span className="gallery-material mono">{active.material}</span>
              <h3>{active.title}</h3>
              <RichTextView html={active.description} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
