const { useState: useStateL, useEffect: useEffectL, useRef: useRefL } = React;
function LIco({ d, fill, size = 24, sw = 1.9, ...p }) {
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: fill ? "currentColor" : "none",
      stroke: fill ? "none" : "currentColor",
      strokeWidth: sw,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      ...p
    },
    d
  );
}
const LArrow = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M5 12h13M13 6l6 6-6 6" })) });
const LCheck = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 12.5l5 5 11-12" })) });
const LStar = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3l1.9 4.6L18.8 9l-3.6 3.1 1 5L12 14.9 7.8 17l1-5L5.2 9l4.9-1.4z" })) });
const LSpark = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3c.4 3.6 1.9 5.1 5.5 5.5-3.6.4-5.1 1.9-5.5 5.5-.4-3.6-1.9-5.1-5.5-5.5C10.1 8.1 11.6 6.6 12 3z" }), /* @__PURE__ */ React.createElement("path", { d: "M18.5 14.5c.2 1.7.9 2.4 2.5 2.6-1.6.2-2.3.9-2.5 2.6-.2-1.7-.9-2.4-2.5-2.6 1.6-.2 2.3-.9 2.5-2.6z" })) });
const LFlame = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 3c.6 3 2.4 4.2 3.6 6 1.4 2 1.4 4.6 0 6.4A5.4 5.4 0 016.6 13c0-1.4.6-2.4 1.2-3 0 1 .6 1.8 1.4 2 .3-2.2-.4-4 2.8-9z" })) });
const LSpeaker = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 9v6h3.5L13 19V5L7.5 9z" }), /* @__PURE__ */ React.createElement("path", { d: "M16 9a3.5 3.5 0 010 6M18.5 6.5a7 7 0 010 11" })) });
const LVoice = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("rect", { x: "9", y: "2.5", width: "6", height: "11.5", rx: "3" }), /* @__PURE__ */ React.createElement("path", { d: "M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" })) });
const LBrain = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M9 5a2.6 2.6 0 00-2.6 2.6c-1.3.3-2.2 1.4-2.2 2.8 0 .9.4 1.7 1 2.2-.4.5-.6 1.1-.6 1.8A2.7 2.7 0 007.3 19c.5 1 1.5 1.6 2.7 1.6V5z" }), /* @__PURE__ */ React.createElement("path", { d: "M15 5a2.6 2.6 0 012.6 2.6c1.3.3 2.2 1.4 2.2 2.8 0 .9-.4 1.7-1 2.2.4.5.6 1.1.6 1.8A2.7 2.7 0 0116.7 19c-.5 1-1.5 1.6-2.7 1.6V5z" })) });
const LBolt = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, fill: true, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M13 2L4 13h6l-1 9 9-12h-6z" })) });
const LRepeat = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 8a6 6 0 019.5-3.5L17 7M17 4v3h-3" }), /* @__PURE__ */ React.createElement("path", { d: "M20 16a6 6 0 01-9.5 3.5L7 17M7 20v-3h3" })) });
const LTarget = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "8" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3.4" })) });
const LChat = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7A2.5 2.5 0 0117.5 16H9l-4 3.5V16H6.5" })) });
const LPlus = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })) });
const LMinus = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14" })) });
const LBook = (p) => /* @__PURE__ */ React.createElement(LIco, { ...p, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M4 5.5A2.5 2.5 0 016.5 3H19v15H6.5A2.5 2.5 0 004 20.5" }), /* @__PURE__ */ React.createElement("path", { d: "M4 5.5v15" })) });
function LOrb({ size = 64, cool = false, style, className = "" }) {
  return /* @__PURE__ */ React.createElement("div", { className: "orb" + (cool ? " cool" : "") + (className ? " " + className : ""), style: { width: size, height: size, ...style } });
}
function useReveal() {
  useEffectL(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const all = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    const lock = (e) => {
      e.style.opacity = "1";
      e.style.transform = "none";
      e.classList.remove("in");
    };
    if (reduce) {
      all.forEach(lock);
      return;
    }
    const done = /* @__PURE__ */ new WeakSet();
    const reveal = (e) => {
      if (done.has(e)) return;
      done.add(e);
      e.classList.add("in");
      setTimeout(() => lock(e), 880);
    };
    let raf = 0;
    const scan = () => {
      raf = 0;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      all.forEach((e) => {
        if (done.has(e)) return;
        const r = e.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > -40) reveal(e);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(scan);
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    scan();
    const iv = setInterval(scan, 200);
    const fallbacks = all.map(
      (e, i) => setTimeout(() => reveal(e), 1500 + Math.min(i, 26) * 55)
    );
    const stopIv = setTimeout(() => clearInterval(iv), 6e3);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      clearInterval(iv);
      clearTimeout(stopIv);
      fallbacks.forEach(clearTimeout);
    };
  }, []);
}
function PStatus() {
  const c = "#F3F0E9";
  return /* @__PURE__ */ React.createElement("div", { className: "pstatus" }, /* @__PURE__ */ React.createElement("span", null, "9:41"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, alignItems: "center" } }, /* @__PURE__ */ React.createElement("svg", { width: "17", height: "11", viewBox: "0 0 18 12" }, /* @__PURE__ */ React.createElement("g", { fill: c }, /* @__PURE__ */ React.createElement("rect", { x: "0", y: "7", width: "3", height: "5", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "5", y: "4.5", width: "3", height: "7.5", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "10", y: "2", width: "3", height: "10", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "15", y: "0", width: "3", height: "12", rx: "1", opacity: ".4" }))), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "11", viewBox: "0 0 17 12", fill: "none", stroke: c, strokeWidth: "1.3" }, /* @__PURE__ */ React.createElement("path", { d: "M1 4.5C4.5 1 12.5 1 16 4.5M3.5 7C6 4.6 11 4.6 13.5 7M6 9.4c1.4-1.3 3.6-1.3 5 0", strokeLinecap: "round" })), /* @__PURE__ */ React.createElement("svg", { width: "24", height: "11", viewBox: "0 0 26 12" }, /* @__PURE__ */ React.createElement("rect", { x: "0.5", y: "0.5", width: "21", height: "11", rx: "3", fill: "none", stroke: c, opacity: ".5" }), /* @__PURE__ */ React.createElement("rect", { x: "2", y: "2", width: "16", height: "8", rx: "1.6", fill: c }), /* @__PURE__ */ React.createElement("rect", { x: "23", y: "4", width: "2", height: "4", rx: "1", fill: c, opacity: ".5" }))));
}
function PhoneWelcome() {
  return /* @__PURE__ */ React.createElement("div", { className: "phone" }, /* @__PURE__ */ React.createElement("div", { className: "screen" }, /* @__PURE__ */ React.createElement("div", { className: "pstars twinkle" }), /* @__PURE__ */ React.createElement(PStatus, null), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 30px" } }, /* @__PURE__ */ React.createElement(LOrb, { size: 104, style: { marginBottom: 34 } }), /* @__PURE__ */ React.createElement("div", { className: "display", style: { fontSize: 44, letterSpacing: "-.03em" } }, "Lyra"), /* @__PURE__ */ React.createElement("p", { className: "muted", style: { fontSize: 15, lineHeight: 1.5, marginTop: 14, maxWidth: 230 } }, "\u042F\u0437\u044B\u043A \u2014 \u044D\u0442\u043E \u0441\u0432\u0435\u0442.", /* @__PURE__ */ React.createElement("br", null), "\u0422\u0432\u043E\u0439 AI-\u043D\u0430\u0441\u0442\u0430\u0432\u043D\u0438\u043A \u0437\u0430\u0436\u0436\u0451\u0442", /* @__PURE__ */ React.createElement("br", null), "\u0441 \u0442\u043E\u0431\u043E\u0439 \u0446\u0435\u043B\u043E\u0435 \u043D\u0435\u0431\u043E."), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary btn-block", style: { marginTop: 36, fontSize: 14.5, minHeight: 54 }, tabIndex: -1 }, "\u0417\u0430\u0436\u0435\u0447\u044C \u043F\u0435\u0440\u0432\u0443\u044E \u0437\u0432\u0435\u0437\u0434\u0443 ", /* @__PURE__ */ React.createElement(LArrow, { size: 18 })), /* @__PURE__ */ React.createElement("p", { className: "dim", style: { fontSize: 13, marginTop: 16, fontWeight: 700 } }, "\u0423 \u043C\u0435\u043D\u044F \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442")), /* @__PURE__ */ React.createElement("div", { className: "home-ind" })));
}
function PhoneLesson() {
  return /* @__PURE__ */ React.createElement("div", { className: "phone" }, /* @__PURE__ */ React.createElement("div", { className: "screen" }, /* @__PURE__ */ React.createElement("div", { className: "pstars" }), /* @__PURE__ */ React.createElement(PStatus, null), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 54, left: 0, right: 0, bottom: 0, padding: "6px 20px 20px", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 34, height: 34, borderRadius: 12, background: "var(--surface-2)", boxShadow: "inset 0 0 0 1px var(--line-2)", display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement(LIco, { size: 17, d: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("path", { d: "M11 6l-5 6 5 6" })), style: { color: "var(--text-2)" } })), /* @__PURE__ */ React.createElement("div", { className: "chip chip-gold", style: { fontSize: 11.5, padding: "6px 11px" } }, /* @__PURE__ */ React.createElement(LFlame, { size: 13, fill: true }), " \u0423\u0440\u043E\u043A 4 \xB7 B1"), /* @__PURE__ */ React.createElement("div", { style: { width: 34 } })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, marginTop: 16 } }, [1, 1, 1, 0.35, 0.35, 0.35].map((o, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, height: 5, borderRadius: 4, background: o > 0.5 ? "linear-gradient(90deg,var(--gold-2),var(--gold))" : "var(--surface-2)" } }))), /* @__PURE__ */ React.createElement("div", { className: "card", style: { marginTop: 18, padding: 16, position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: -26, right: -26, width: 110, height: 110, borderRadius: "50%", background: "radial-gradient(circle,var(--cool-glow),transparent 70%)", pointerEvents: "none" } }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "center" } }, /* @__PURE__ */ React.createElement(LOrb, { size: 34, cool: true }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { className: "grad-cool", style: { fontSize: 10.5, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" } }, "Lyra \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442"), /* @__PURE__ */ React.createElement("p", { className: "dim", style: { fontSize: 11, marginTop: 2 } }, "\u043F\u043E\u0434 \u0442\u0432\u043E\u0439 \u0441\u0442\u0438\u043B\u044C \xB7 \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 \u0441 \u0440\u0443\u0441\u0441\u043A\u0438\u043C"))), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, lineHeight: 1.5, marginTop: 13, color: "var(--text)" } }, "Present Perfect \u2014 \u044D\u0442\u043E \xAB\u0443\u0436\u0435 \u0441\u0434\u0435\u043B\u0430\u043B, \u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0441\u0435\u0439\u0447\u0430\u0441\xBB. \u0412 \u0440\u0443\u0441\u0441\u043A\u043E\u043C \u043C\u044B \u0433\u043E\u0432\u043E\u0440\u0438\u043C", /* @__PURE__ */ React.createElement("b", { style: { color: "var(--cool)" } }, " \xAB\u044F \u0443\u0436\u0435 \u043F\u043E\u0435\u043B\xBB"), " \u2014 \u0442\u043E \u0436\u0435 \u0447\u0443\u0432\u0441\u0442\u0432\u043E.")), /* @__PURE__ */ React.createElement("div", { className: "card", style: { marginTop: 12, padding: "14px 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 800, fontSize: 16 } }, "I have ", /* @__PURE__ */ React.createElement("span", { className: "grad-gold" }, "eaten"), "."), /* @__PURE__ */ React.createElement("button", { style: { width: 34, height: 34, borderRadius: 11, background: "rgba(239,192,121,.13)", boxShadow: "inset 0 0 0 1px rgba(239,192,121,.3)", display: "grid", placeItems: "center", color: "var(--gold)" }, tabIndex: -1 }, /* @__PURE__ */ React.createElement(LSpeaker, { size: 17 }))), /* @__PURE__ */ React.createElement("p", { className: "dim", style: { fontSize: 12.5, marginTop: 6 } }, "\u042F \u0443\u0436\u0435 \u043F\u043E\u0435\u043B (\u0438 \u0441\u0435\u0439\u0447\u0430\u0441 \u0441\u044B\u0442)")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary btn-block", style: { minHeight: 52, fontSize: 15 }, tabIndex: -1 }, /* @__PURE__ */ React.createElement(LBolt, { size: 17 }), " \u041F\u043E\u043D\u044F\u0442\u043D\u043E, \u0434\u0430\u043B\u044C\u0448\u0435")), /* @__PURE__ */ React.createElement("div", { className: "home-ind" })));
}
Object.assign(window, {
  useStateL,
  useEffectL,
  useRefL,
  LIco,
  LArrow,
  LCheck,
  LStar,
  LSpark,
  LFlame,
  LSpeaker,
  LVoice,
  LBrain,
  LBolt,
  LRepeat,
  LTarget,
  LChat,
  LPlus,
  LMinus,
  LBook,
  LOrb,
  useReveal,
  PStatus,
  PhoneWelcome,
  PhoneLesson
});
