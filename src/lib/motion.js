// Dòng thời gian của phim cuộn (đơn vị: khung hình, 30fps). Mỗi chương dài CH khung.
// Không import remotion ở đây để bản tĩnh không phải tải thư viện phim.
export const FPS = 30;
export const CH = 150;
export const DURATION = CH * 4;
// Phim chạy 60fps (SUB khung phim = 1 khung dòng thời gian) để cuộn chậm vẫn mượt.
export const SUB = 2;
export const FILM_FPS = FPS * SUB;
export const FILM_FRAMES = DURATION * SUB;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export const ease = {
    lin: (t) => t,
    out: (t) => 1 - Math.pow(1 - t, 3),
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    back: (t) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2),
};

// Bản tĩnh: mọi thứ đứng ở trạng thái nghỉ (đã vào, chưa rời).
const STATIC = { film: false, F: 0, L: 0, in: () => 1, out: () => 0 };

// m.in(a, b): 0 → 1 khi phần tử vào; m.out(a, b): 0 → 1 khi rời. a, b tính theo khung cục bộ của chương.
export function motion(F, start) {
    if (F == null) return STATIC;
    const L = F - start;
    const p = (a, b, e = ease.out) => e(clamp01((L - a) / (b - a)));
    return { film: true, F, L, in: p, out: p };
}

export const mix = (a, b, t) => a + (b - a) * t;

export function mixRgba(c1, c2, t) {
    const c = c1.map((v, i) => mix(v, c2[i], t));
    return `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${c[3].toFixed(3)})`;
}

// Kiểu "hiện lên rồi lui đi" dùng chung cho chữ và khối. Bản tĩnh không gắn style.
export function fade(m, inT, outT = 0, dy = 22) {
    if (!m.film) return undefined;
    const o = inT * (1 - outT);
    return {
        opacity: o,
        transform: `translateY(${((1 - inT) * dy - outT * dy * 0.6).toFixed(1)}px)`,
    };
}

// Toạ độ của el so với root, bỏ qua transform đang chạy (đo theo offset, không theo getBoundingClientRect).
export function offsetBox(el, root) {
    let x = 0;
    let y = 0;
    let e = el;
    while (e && e !== root) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}
