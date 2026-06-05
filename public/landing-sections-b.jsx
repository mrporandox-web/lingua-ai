// ============================================================
// landing-sections-b.jsx — Inside, Pricing, FAQ, Final CTA, Footer
// ============================================================

/* ====================== 5. WHAT'S INSIDE ====================== */
function Inside() {
  const items = [
    { t:"Весь курс A1 → B2", s:"64 темы — от первых фраз до уверенного разговора.", Icon: LStar },
    { t:"Объяснения на русском", s:"Грамматика понятным языком, под твой уровень.", Icon: LBook },
    { t:"Озвучка фраз", s:"Слушаешь живое произношение — прокачиваешь аудирование.", Icon: LSpeaker },
    { t:"Стрики и цели", s:"Маленькие цели и серии дней — привычка, которую не бросишь.", Icon: LFlame },
    { t:"Умное повторение", s:"Возврат слов по кривой забывания — выученное остаётся.", Icon: LRepeat },
    { t:"Speaking каждый день", s:"Говоришь вслух с первого урока — голосом, без стеснения.", Icon: LVoice },
  ];
  return (
    <section className="section-pad">
      <div className="wrap" style={{ display:"grid", gridTemplateColumns:"minmax(280px, 380px) 1fr", gap:"clamp(32px,5vw,64px)", alignItems:"start" }}>
        <div style={{ position:"sticky", top: 40 }}>
          <p className="eyebrow reveal"><span className="dot" /> Что внутри</p>
          <h2 className="h-sec reveal d1" style={{ marginTop: 16 }}>Всё, чтобы<br/>заговорить — <span className="grad-gold">в одном небе</span></h2>
          <p className="lead reveal d2" style={{ marginTop: 18 }}>
            Без распылённости. Один продуманный путь от нуля до уверенного B2.
          </p>
          <div className="reveal d2" style={{ display:"flex", gap:18, marginTop: 28, flexWrap:"wrap" }}>
            <div><div className="display grad-gold" style={{ fontSize:34 }}>64</div><p className="dim" style={{ fontSize:13, fontWeight:700, marginTop:2 }}>темы A1–B2</p></div>
            <div><div className="display grad-gold" style={{ fontSize:34 }}>A1–C2</div><p className="dim" style={{ fontSize:13, fontWeight:700, marginTop:2 }}>точная диагностика</p></div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:14 }}>
          {items.map((it, i) => (
            <div key={i} className={"card reveal d" + ((i % 3) + 1)} style={{ padding:22, display:"flex", gap:14, alignItems:"flex-start" }}>
              <div style={{ width:42, height:42, borderRadius:13, flexShrink:0, background:"rgba(239,192,121,.12)", boxShadow:"inset 0 0 0 1px rgba(239,192,121,.28)", display:"grid", placeItems:"center", color:"var(--gold)" }}>
                <it.Icon size={21} fill={it.Icon === LStar} />
              </div>
              <div>
                <h3 style={{ fontSize:16.5, fontFamily:"var(--font-body)", fontWeight:800, letterSpacing:0 }}>{it.t}</h3>
                <p className="muted" style={{ fontSize:13.5, lineHeight:1.5, marginTop:6 }}>{it.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== 6. PRICING ====================== */
function Pricing() {
  const perks = [
    "Весь курс A1–B2 и все 64 темы",
    "Персональная подача под твой стиль",
    "Speaking, озвучка и умное повторение",
    "Новые темы и улучшения — без доплат",
  ];
  return (
    <section id="cena" className="section-pad" style={{ position:"relative", scrollMarginTop: 20 }}>
      <div className="aura" style={{ width:560, height:560, top:"20%", left:"50%", transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(239,192,121,.26), transparent 66%)" }} />
      <div className="wrap">
        <div style={{ textAlign:"center", maxWidth: 600, margin:"0 auto 48px" }}>
          <p className="eyebrow reveal" style={{ justifyContent:"center" }}><span className="dot" /> Цена</p>
          <h2 className="h-sec reveal d1" style={{ marginTop: 16 }}>Учись по своему<br/><span className="grad-gold">персональному методу</span></h2>
        </div>
        <div className="reveal d1" style={{ maxWidth: 480, margin:"0 auto" }}>
          <div className="card" style={{ padding:"clamp(28px,4vw,40px)", position:"relative", overflow:"hidden", borderColor:"rgba(239,192,121,.34)", boxShadow:"0 0 0 1px rgba(239,192,121,.2), 0 40px 90px -40px rgba(239,192,121,.4)" }}>
            <div style={{ position:"absolute", top:-60, right:-40, width:200, height:200, borderRadius:"50%", background:"radial-gradient(circle, var(--gold-glow), transparent 70%)", pointerEvents:"none" }} />
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <LOrb size={40} />
              <span className="chip chip-gold"><LStar size={13} fill/> Один тариф — всё включено</span>
            </div>
            <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:24 }}>
              <span className="display" style={{ fontSize:"clamp(48px,8vw,68px)" }}>299&nbsp;₽</span>
              <span className="muted" style={{ fontSize:18, fontWeight:700 }}>/ мес</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:13, marginTop:26 }}>
              {perks.map((p, i) => (
                <div key={i} style={{ display:"flex", gap:11, alignItems:"flex-start" }}>
                  <span style={{ width:24, height:24, borderRadius:8, flexShrink:0, background:"rgba(127,217,166,.13)", boxShadow:"inset 0 0 0 1px rgba(127,217,166,.32)", display:"grid", placeItems:"center", color:"var(--good)" }}>
                    <LCheck size={15} sw={2.4}/>
                  </span>
                  <span style={{ fontSize:15.5, fontWeight:600, lineHeight:1.4 }}>{p}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { window.location.href = "/start"; }} className="btn btn-primary btn-block btn-lg" style={{ marginTop:30 }}>Попробовать бесплатно <LArrow size={20}/></button>
            <p className="dim" style={{ fontSize:13, textAlign:"center", marginTop:14, fontWeight:600 }}>Отмена в любой момент</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================== 7. FAQ ====================== */
function FAQItem({ q, a, open, onToggle }) {
  return (
    <div className="card" style={{ padding:0, overflow:"hidden", borderColor: open ? "var(--line-2)" : "var(--line)" }}>
      <button onClick={onToggle} aria-expanded={open}
        style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, padding:"22px 24px", textAlign:"left" }}>
        <span style={{ fontSize:"clamp(16px,2vw,18px)", fontWeight:800, letterSpacing:"-.01em" }}>{q}</span>
        <span style={{ width:34, height:34, flexShrink:0, borderRadius:11, background:"var(--surface-2)", boxShadow:"inset 0 0 0 1px var(--line-2)", display:"grid", placeItems:"center", color: open ? "var(--gold)":"var(--text-2)", transition:"color .2s" }}>
          {open ? <LMinus size={18}/> : <LPlus size={18}/>}
        </span>
      </button>
      <div style={{ maxHeight: open ? 260 : 0, overflow:"hidden", transition:"max-height .4s var(--ease)" }}>
        <p className="muted" style={{ padding:"0 24px 24px", fontSize:15.5, lineHeight:1.6, maxWidth: 640 }}>{a}</p>
      </div>
    </div>
  );
}
function FAQ() {
  const [open, setOpen] = useStateL(0);
  const qs = [
    { q:"Нужно ли скачивать из сторов?", a:"Нет. Lyra — это PWA: открываешь ссылку и ставишь приложение прямо с сайта одним касанием. Без App Store и Google Play, без долгих загрузок. Иконка появится на экране как у обычного приложения." },
    { q:"Это правда бесплатно на старте?", a:"Да. Начать можно бесплатно — пройти диагностику, собрать своё небо и сделать первые уроки. Платная подписка открывает весь курс и все возможности, но попробовать ничего не стоит." },
    { q:"Чем Lyra отличается от Duolingo?", a:"Lyra — не игра «угадай слово», а персональный AI-репетитор. Главное отличие: она запоминает, как именно тебе понятнее, и подбирает подачу под тебя. Плюс объяснения на русском, реальный speaking и грамматика, а не только узнавание." },
    { q:"Подойдёт ли с полного нуля?", a:"Да. Диагностика определит уровень от A1, и Lyra начнёт ровно оттуда, где ты есть — мягко, на русском, маленькими шагами. С нуля это даже комфортнее: ты сразу учишься в своём темпе." },
  ];
  return (
    <section className="section-pad">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <div style={{ textAlign:"center", marginBottom: 44 }}>
          <p className="eyebrow reveal" style={{ justifyContent:"center" }}><span className="dot" /> Частые вопросы</p>
          <h2 className="h-sec reveal d1" style={{ marginTop: 16 }}>Коротко о главном</h2>
        </div>
        <div className="reveal d1" style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {qs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== 8. FINAL CTA ====================== */
function FinalCTA() {
  return (
    <section className="section-pad" style={{ position:"relative", overflow:"hidden" }}>
      <div className="aura" style={{ width:640, height:640, top:"-10%", left:"50%", transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(143,168,255,.26), transparent 64%)" }} />
      <div className="wrap" style={{ textAlign:"center", maxWidth: 760 }}>
        <div className="reveal" style={{ display:"flex", justifyContent:"center" }}>
          <LOrb size={88} style={{ marginBottom: 32 }} />
        </div>
        <h2 className="display reveal d1" style={{ fontSize:"clamp(34px,6vw,60px)" }}>
          Учим не всех одинаково,<br/><span className="grad-gold">а именно тебя</span>
        </h2>
        <p className="lead reveal d2" style={{ marginTop: 22, maxWidth: 520, marginInline:"auto" }}>
          Зажги первую звезду сегодня. Дальше Lyra поведёт сама — по твоему методу.
        </p>
        <div className="reveal d2" style={{ marginTop: 34, display:"flex", justifyContent:"center" }}>
          <a href="#cena" className="btn btn-primary btn-lg">Начать бесплатно <LArrow size={20}/></a>
        </div>
        <p className="reveal d3 dim" style={{ marginTop: 16, fontSize:14, fontWeight:600 }}>
          Без скачивания из сторов · Ставится за 5 секунд
        </p>
      </div>
    </section>
  );
}

/* ====================== FOOTER ====================== */
function Footer() {
  return (
    <footer style={{ borderTop:"1px solid var(--line)", paddingBlock: 36 }}>
      <div className="wrap" style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:18 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <LOrb size={26} />
          <span className="display" style={{ fontSize:22 }}>Lyra</span>
        </div>
        <p className="dim" style={{ fontSize:13.5, fontWeight:600 }}>AI-репетитор английского для русскоговорящих</p>
        <p className="dim" style={{ fontSize:13 }}>© 2026 Lyra</p>
      </div>
    </footer>
  );
}

Object.assign(window, { Inside, Pricing, FAQ, FinalCTA, Footer });
