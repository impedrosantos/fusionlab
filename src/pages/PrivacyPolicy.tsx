import { useT } from "../i18n";

export default function PrivacyPolicy() {
  const t = useT();
  return (
    <article className="section legal">
      <div className="container container-narrow">
        <span className="kicker mono">{t("privacy.kicker")}</span>
        <h1>{t("privacy.title")}</h1>
        <p className="dim mono">
          {t("privacy.updated", { year: new Date().getFullYear() })}
        </p>

        <p>{t("privacy.intro")}</p>

        <h2>{t("privacy.collectTitle")}</h2>
        <p>{t("privacy.collectText")}</p>

        <h2>{t("privacy.useTitle")}</h2>
        <p>{t("privacy.useText")}</p>

        <h2>{t("privacy.retentionTitle")}</h2>
        <p>{t("privacy.retentionText")}</p>

        <h2>{t("privacy.rightsTitle")}</h2>
        <p>{t("privacy.rightsText")}</p>

        <h2>{t("privacy.contactTitle")}</h2>
        <p>
          {t("privacy.contactTextA")}{" "}
          <a href="mailto:3dfusionlab@proton.me">3dfusionlab@proton.me</a>.
        </p>
      </div>
    </article>
  );
}
