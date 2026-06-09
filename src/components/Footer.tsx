import { Link } from "react-router-dom";
import { useT } from "../i18n";
import { InstagramIcon } from "./icons";

export default function Footer() {
  const t = useT();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand">
            <img className="brand-logo" src="/logo.png" alt="" aria-hidden="true" />
            <span className="brand-name">
              Fusion<span className="accent">Lab</span>
            </span>
          </span>
          <p className="footer-tagline">{t("footer.tagline")}</p>
          <a
            className="footer-ig"
            href="https://instagram.com/fusionlab0"
            target="_blank"
            rel="noreferrer noopener"
          >
            <InstagramIcon />
            fusionlab0
          </a>
        </div>

        <nav className="footer-links" aria-label={t("footer.studio")}>
          <span className="footer-col-title">{t("footer.studio")}</span>
          <Link to="/contact">{t("nav.contact")}</Link>
        </nav>

        <nav className="footer-links" aria-label={t("footer.legal")}>
          <span className="footer-col-title">{t("footer.legal")}</span>
          <Link to="/privacy-policy">{t("footer.privacy")}</Link>
          <Link to="/cookies">{t("footer.cookies")}</Link>
        </nav>
      </div>

      <div className="container footer-bottom">
        <span className="mono dim">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </span>
        <span className="mono dim">{t("footer.builtWith")}</span>
      </div>
    </footer>
  );
}
