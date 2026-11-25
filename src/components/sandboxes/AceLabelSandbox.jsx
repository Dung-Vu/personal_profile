import { useId, useState } from "react";

const STYLES = [
    { id: "drape2", vi: "Rèm 2 vế", en: "2-panel drape", panels: 2, overlap: 100, code: "RM-2V" },
    { id: "single", vi: "1 vế", en: "Single panel", panels: 1, overlap: 0, code: "RM-1V" },
    { id: "sheer2", vi: "Voan 2 vế", en: "2-panel sheer", panels: 2, overlap: 100, code: "VN-2V" },
];

const PLEATS = [2.2, 2.5, 2.8];
const FABRICS = [280, 300];

const COPY = {
    vi: {
        controlsTitle: "Thông số đầu vào",
        widthLabel: "Chiều rộng cửa",
        heightLabel: "Chiều cao cửa",
        styleLabel: "Kiểu may",
        pleatLabel: "Độ nhún",
        fabricLabel: "Khổ vải cuộn",
        fabricUnit: "cm",
        ticketHead: "TEM CẮT XƯỞNG · ACE",
        ticketRoom: "Phòng khách · Cửa chính",
        ticketBatch: "LÔ #26-0418 · Ô 01/18",
        fieldStyle: "Kiểu rèm",
        fieldSplit: "Chia vế cắt",
        fieldCutH: "Cao cắt (+220mm lai/đầu)",
        fieldFabric: "Vải cần dùng",
        fieldHooks: "Khoen / móc (số chẵn)",
        fieldOverlap: "Chồng mí giữa",
        fieldA4: "Định mức in A4",
        a4Value: "18 tem / tờ A4 (có đường cắt)",
        panelWord: "vế",
        hooksUnit: "khoen",
        boltOk: (bolt) => `Vừa khổ ${bolt} cm · không cần nối ngang`,
        boltJoin: (bolt, drops) => `Cao cắt > khổ ${bolt} cm · cần nối ${drops} mảnh dọc`,
        formulaLabel: "Công thức tính ngang",
        formulaText: (w, p, hem, ov, total) =>
            `Tổng ngang = ${w.toLocaleString("vi-VN")} × ${p} + ${hem}mm biên${ov ? ` + ${ov}mm mí` : ""} = ${total.toLocaleString("vi-VN")} mm`,
    },
    en: {
        controlsTitle: "Input Specifications",
        widthLabel: "Window width",
        heightLabel: "Window height",
        styleLabel: "Drape style",
        pleatLabel: "Pleat ratio",
        fabricLabel: "Fabric bolt width",
        fabricUnit: "cm",
        ticketHead: "PRODUCTION CUT LABEL · ACE",
        ticketRoom: "Living Room · Main Window",
        ticketBatch: "LOT #26-0418 · SLOT 01/18",
        fieldStyle: "Style",
        fieldSplit: "Panel split",
        fieldCutH: "Cut height (+220mm hem)",
        fieldFabric: "Fabric required",
        fieldHooks: "Rings / hooks (even)",
        fieldOverlap: "Center overlap",
        fieldA4: "A4 print layout",
        a4Value: "18 labels / A4 sheet (cut lines)",
        panelWord: "panel",
        hooksUnit: "hooks",
        boltOk: (bolt) => `Fits ${bolt} cm bolt · seamless horizontal run`,
        boltJoin: (bolt, drops) => `Cut height > ${bolt} cm bolt · ${drops} vertical drops`,
        formulaLabel: "Deterministic width formula",
        formulaText: (w, p, hem, ov, total) =>
            `Total width = ${w.toLocaleString("en-US")} × ${p} + ${hem}mm hem${ov ? ` + ${ov}mm overlap` : ""} = ${total.toLocaleString("en-US")} mm`,
    },
};

export function AceLabelSandbox({ locale = "vi" }) {
    const lang = locale === "en" ? "en" : "vi";
    const t = COPY[lang];
    const numLocale = lang === "en" ? "en-US" : "vi-VN";

    const widthId = useId();
    const heightId = useId();

    const [width, setWidth] = useState(3000);
    const [height, setHeight] = useState(2800);
    const [styleId, setStyleId] = useState("drape2");
    const [pleat, setPleat] = useState(2.5);
    const [fabricWidth, setFabricWidth] = useState(280);

    const style = STYLES.find((s) => s.id === styleId) || STYLES[0];
    const panelCount = style.panels;
    const overlap = style.overlap;
    const hemAllowance = panelCount * 160;
    const totalWidth = Math.round(width * pleat + hemAllowance + overlap);
    const cutHeight = height + 220;
    const panelCutWidth = Math.round(totalWidth / panelCount);

    const rawHooks = Math.round(totalWidth / 160);
    const evenHooks = Math.max(6, rawHooks % 2 === 0 ? rawHooks : rawHooks + 1);
    const hooksPerPanel = Math.round(evenHooks / panelCount);

    const boltMm = fabricWidth * 10;
    const needsJoin = cutHeight > boltMm;
    const drops = needsJoin ? Math.ceil(totalWidth / boltMm) : 1;
    const fabricMeters = needsJoin ? (drops * cutHeight) / 1000 : totalWidth / 1000;

    const panelLabel =
        lang === "en"
            ? `${panelCount} ${panelCount > 1 ? "panels" : "panel"} × ${panelCutWidth.toLocaleString(numLocale)} mm`
            : `${panelCount} ${t.panelWord} × ${panelCutWidth.toLocaleString(numLocale)} mm`;

    return (
        <div className="sbx-ace">
            <div className="sbx-grid-2">
                <div className="sbx-panel">
                    <h3 className="sbx-panel-title">{t.controlsTitle}</h3>

                    <div className="sbx-field">
                        <div className="sbx-field-top">
                            <label htmlFor={widthId}>{t.widthLabel}</label>
                            <output htmlFor={widthId} className="sbx-mono-val">
                                {width.toLocaleString(numLocale)} mm
                            </output>
                        </div>
                        <input
                            id={widthId}
                            type="range"
                            className="sbx-range"
                            min={1000}
                            max={5000}
                            step={50}
                            value={width}
                            onChange={(e) => setWidth(Number(e.target.value))}
                        />
                        <div className="sbx-range-scale" aria-hidden="true">
                            <span>1,000 mm</span>
                            <span>3,000 mm</span>
                            <span>5,000 mm</span>
                        </div>
                    </div>

                    <div className="sbx-field">
                        <div className="sbx-field-top">
                            <label htmlFor={heightId}>{t.heightLabel}</label>
                            <output htmlFor={heightId} className="sbx-mono-val">
                                {height.toLocaleString(numLocale)} mm
                            </output>
                        </div>
                        <input
                            id={heightId}
                            type="range"
                            className="sbx-range"
                            min={1800}
                            max={3600}
                            step={50}
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                        />
                        <div className="sbx-range-scale" aria-hidden="true">
                            <span>1,800 mm</span>
                            <span>2,700 mm</span>
                            <span>3,600 mm</span>
                        </div>
                    </div>

                    <fieldset className="sbx-fieldset">
                        <legend>{t.styleLabel}</legend>
                        <div className="sbx-pills">
                            {STYLES.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    className={`sbx-pill-btn${styleId === opt.id ? " is-active" : ""}`}
                                    aria-pressed={styleId === opt.id}
                                    onClick={() => setStyleId(opt.id)}
                                >
                                    {opt[lang]}
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    <div className="sbx-inline-row">
                        <fieldset className="sbx-fieldset">
                            <legend>{t.pleatLabel}</legend>
                            <div className="sbx-pills">
                                {PLEATS.map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        className={`sbx-pill-btn${pleat === p ? " is-active" : ""}`}
                                        aria-pressed={pleat === p}
                                        onClick={() => setPleat(p)}
                                    >
                                        {p.toFixed(1)}×
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className="sbx-fieldset">
                            <legend>{t.fabricLabel}</legend>
                            <div className="sbx-pills">
                                {FABRICS.map((fw) => (
                                    <button
                                        key={fw}
                                        type="button"
                                        className={`sbx-pill-btn${fabricWidth === fw ? " is-active" : ""}`}
                                        aria-pressed={fabricWidth === fw}
                                        onClick={() => setFabricWidth(fw)}
                                    >
                                        {lang === "vi" ? `Khổ ${fw} ${t.fabricUnit}` : `${fw} ${t.fabricUnit} bolt`}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                    </div>

                    <div className="sbx-formula-box">
                        <span className="sbx-formula-label">{t.formulaLabel}</span>
                        <code>{t.formulaText(width, pleat.toFixed(1), hemAllowance, overlap, totalWidth)}</code>
                    </div>
                </div>

                <div className="sbx-ticket-wrap">
                    <article className="sbx-ticket" aria-label={t.ticketHead}>
                        <div className="sbx-ticket-top">
                            <div>
                                <span className="sbx-ticket-code">{t.ticketHead}</span>
                                <strong className="sbx-ticket-room">{t.ticketRoom}</strong>
                            </div>
                            <span className="sbx-ticket-badge">{style.code}</span>
                        </div>

                        <div className="sbx-ticket-meta">
                            <span>{t.ticketBatch}</span>
                            <span>
                                {width} × {height} mm · {pleat.toFixed(1)}×
                            </span>
                        </div>

                        <dl className="sbx-ticket-grid">
                            <div>
                                <dt>{t.fieldStyle}</dt>
                                <dd>{style[lang]}</dd>
                            </div>
                            <div>
                                <dt>{t.fieldSplit}</dt>
                                <dd className="sbx-mono">{panelLabel}</dd>
                            </div>
                            <div>
                                <dt>{t.fieldCutH}</dt>
                                <dd className="sbx-mono sbx-strong">{cutHeight.toLocaleString(numLocale)} mm</dd>
                            </div>
                            <div>
                                <dt>{t.fieldFabric}</dt>
                                <dd className="sbx-mono sbx-strong">{fabricMeters.toFixed(2)} m</dd>
                            </div>
                            <div>
                                <dt>{t.fieldHooks}</dt>
                                <dd className="sbx-mono">
                                    {evenHooks} {t.hooksUnit}
                                    {panelCount === 2 ? ` (${hooksPerPanel}×2)` : ""}
                                </dd>
                            </div>
                            <div>
                                <dt>{t.fieldOverlap}</dt>
                                <dd className="sbx-mono">{overlap} mm</dd>
                            </div>
                        </dl>

                        <div className={`sbx-ticket-bolt${needsJoin ? " is-warn" : ""}`}>
                            <span>{needsJoin ? t.boltJoin(fabricWidth, drops) : t.boltOk(fabricWidth)}</span>
                        </div>

                        <div className="sbx-ticket-foot">
                            <span>{t.fieldA4}</span>
                            <strong>{t.a4Value}</strong>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default AceLabelSandbox;
