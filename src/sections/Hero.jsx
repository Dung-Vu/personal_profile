import { briefMailto, heroChips, site, stats } from "../content/site.js";
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
    return (
        <section className="hero" aria-labelledby="hero-title">
            <Particles list={fieldDesk} className="particles only-desk" />
            <Particles list={fieldMob} className="particles only-mob" />
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
                            <span key={f} className={`pill ${pillTones[i]}`}>
                                {f}
                            </span>
                        ))}
                    </div>
                    <div className="ctas">
                        <a className="btn btn-ink" href={briefMailto}>
                            Gửi brief cho mình <span aria-hidden="true">→</span>
                        </a>
                        <Link className="btn btn-ghost" href="/#cau-chuyen">
                            Xem câu chuyện <span aria-hidden="true">↓</span>
                        </Link>
                    </div>
                </div>
                <div className="ava">
                    <div className="ava-card">
                        <img src={site.avatar} alt={`Ảnh chân dung ${site.name}`} width="720" height="926" fetchPriority="high" />
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
                Cuộn để xem câu chuyện
                <i />
            </div>
        </section>
    );
}
