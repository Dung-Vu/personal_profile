import { getSiteContent } from "../content/index.js";
import { localizePath, useLocale } from "../lib/i18n.js";
import { Link } from "../lib/router.jsx";
import { Particles, rng, tones } from "../lib/particles.jsx";

const palette = [tones.ocean, tones.iris, tones.apricot, tones.ink];

function makeField(seed, count, mobile) {
    const r = rng(seed);
    return Array.from({ length: count }, (_, i) => {
        const t = r();
        return mobile
            ? { x: 62 + r() * 42, y: 16 + r() * 22, s: 2 + r() * 4, c: palette[i % 4], o: 0.12 + t * 0.45 }
            : { x: 48 + Math.pow(r(), 0.7) * 55, y: 8 + r() * 62, s: 2 + r() * 4, c: palette[i % 4], o: 0.12 + t * 0.45 };
    });
}
const fieldDesk = makeField(7, 140, false);
const fieldMob = makeField(7, 50, true);

const pillTones = ["t-ocean", "t-iris", "t-apricot"];

export function Hero() {
    const locale = useLocale();
    const { site, cta, stats, heroChips, ui } = getSiteContent(locale);
    const isEn = locale === "en";

    const workCta = ui?.home?.heroWorkBtn || (isEn ? "View work" : "Xem dự án");
    const scrollHint = ui?.home?.scrollHint || (isEn ? "Scroll to explore the story" : "Cuộn để xem câu chuyện");
    const avatarAlt = ui?.avatarAlt || (isEn ? `Portrait of ${site.name}` : `Ảnh chân dung ${site.name}`);

    return (
        <section className="hero" aria-labelledby="hero-title">
            <Particles list={fieldDesk} vw={1440} vh={900} className="particles only-desk" />
            <Particles list={fieldMob} vw={390} vh={844} className="particles only-mob" />
            <div className="wrap hero-grid">
                <div className="hero-copy">
                    <span className="label">
                        <span className="dot" />
                        {site.role}
                    </span>
                    <h1 id="hero-title" className="display hero-title">
                        <span>{site.firstLine}</span>
                        <span className="soft">{site.lastLine}</span>
                    </h1>
                    <p className="lead hero-lead">{site.pitch}</p>
                    <div className="tags">
                        {site.focus.map((f, i) => (
                            <span key={f} className={`pill ${pillTones[i % pillTones.length]}`}>
                                {f}
                            </span>
                        ))}
                    </div>
                    <div className="ctas">
                        <Link className="btn btn-ink" href={localizePath("/contact", locale)}>
                            {cta.long} <span aria-hidden="true">→</span>
                        </Link>
                        <Link className="btn btn-ghost" href={localizePath("/work", locale)}>
                            {workCta} <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
                <div className="ava">
                    <div className="ava-card">
                        <img src={site.avatar} alt={avatarAlt} width="720" height="926" fetchPriority="high" />
                    </div>
                    {heroChips.map((chip, i) => (
                        <div key={chip.title} className={`chip c${i + 1}`}>
                            {chip.kind === "led" ? <span className="led" /> : <span className={`pill pill-sm t-${chip.tone}`}>{chip.tag}</span>}
                            <div>
                                {chip.title}
                                <small>{chip.sub}</small>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="wrap">
                <dl className="stats">
                    {stats.map((s) => (
                        <div className="stat" key={s.label}>
                            <dt>{s.label}</dt>
                            <dd>{s.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
            <div className="scroll-hint label" aria-hidden="true">
                {scrollHint}
                <i />
            </div>
        </section>
    );
}
