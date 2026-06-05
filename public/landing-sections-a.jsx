// ============================================================
// landing-sections-a.jsx — Hero, Pain→Solution, Interactive demo, How
// ============================================================

/* ====================== 1. HERO ====================== */
function Hero() {
  return (
    <header className="section-pad" style={{ paddingTop: "clamp(48px, 8vw, 96px)", position:"relative" }}>
      <div className="aura" style={{ width:520, height:520, top:-120, left:"42%", background:"radial-gradient(circle, rgba(143,168,255,.4), transparent 68%)" }} />
      <div className="aura" style={{ width:440, height:440, top:60, right:"-6%", background:"radial-gradient(circle, rgba(239,192,121,.3), transparent 68%)" }} />
      <div className="wrap" style={{ display:"grid", gridTemplateColumns:"1.05fr .95fr", gap:"clamp(32px,5vw,72px)", alignItems:"center" }}>
        {/* left */}
        <div className="hero-copy">
          <div className="eyebrow reveal"><LOrb size={16} style={{ boxShadow:"none" }} /> AI-репетитор английского</div>
          <h1 className="display reveal d1" style={{ marginTop: 22 }}>
            Учим не всех<br/>одинаково,<br/><span className="grad-gold">а именно тебя</span>
          </h1>
          <p className="lead reveal d2" style={{ marginTop: 26, maxWidth: 520 }}>
            Lyra понимает, <b style={{ color:"var(--text)", fontWeight:700 }}>как</b> ты запоминаешь —
            и подстраивает каждое объяснение под тебя.
          </p>
          <div className="reveal d3" style={{ marginTop: 34, display:"flex", flexWrap:"wrap", gap:14, alignItems:"center" }}>
            <a href="#cena" className="btn btn-primary btn-lg">Начать бесплатно <LArrow size={20}/></a>
          </div>
          <p className="reveal d3 dim" style={{ marginTop: 18, fontSize:14, fontWeight:600, lineHeight:1.5, maxWidth:440 }}>
            Бесплатно. Без скачивания из App&nbsp;Store / Google&nbsp;Play. Ставится за&nbsp;5&nbsp;секунд.
          </p>
        </div>
        {/* right — phone */}
        <div className="hero-phone reveal d2" style={{ display:"flex", justifyContent:"center" }}>
          <PhoneWelcome />
        </div>
      </div>
    </header>
  );
}

/* ====================== 2. PAIN → SOLUTION ====================== */
function PainSolution() {
  const rows = [
    { pain:"Учат всех одинаково", sol:"Подстраиваемся под тебя", desc:"Один курс на миллион людей не работает. Lyra ведёт по твоему темпу и стилю.", Icon: LTarget },
    { pain:"Учат узнавать, а не говорить", sol:"Speaking с первого дня", desc:"Не копишь слова «в стол». Говоришь вслух с первого урока — голосом, без стеснения.", Icon: LVoice },
    { pain:"Не объясняют грамматику", sol:"Объясняем на русском", desc:"Понятно, под твой уровень и через сравнение с родным языком. Без зубрёжки правил.", Icon: LBook },
  ];
  return (
    <section className="section-pad">
      <div className="wrap">
        <div style={{ maxWidth: 620 }}>
          <p className="eyebrow reveal"><span className="dot" /> Не очередная обучалка</p>
          <h2 className="h-sec reveal d1" style={{ marginTop: 16 }}>
            То, что бесит в приложениях, — <span className="grad-gold">мы делаем наоборот</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:18, marginTop: 48 }}>
          {rows.map((r, i) => (
            <div key={i} className={"card reveal d" + (i+1)} style={{ padding: 26 }}>
              <div style={{ width:48, height:48, borderRadius:15, background:"rgba(239,192,121,.12)", boxShadow:"inset 0 0 0 1px rgba(239,192,121,.3)", display:"grid", placeItems:"center", color:"var(--gold)" }}>
                <r.Icon size={24} />
              </div>
              <p className="dim" style={{ marginTop:20, fontSize:15, fontWeight:700, textDecoration:"line-through", textDecorationColor:"rgba(255,139,130,.5)", textDecorationThickness:"2px" }}>
                {r.pain}
              </p>
              <h3 style={{ fontSize:22, marginTop:8, fontFamily:"var(--font-display)", fontWeight:700, lineHeight:1.12 }}>{r.sol}</h3>
              <p className="muted" style={{ marginTop:12, fontSize:14.5, lineHeight:1.55 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== 3. INTERACTIVE DEMO (wow) ====================== */
function InteractiveDemo() {
  const [picked, setPicked] = useStateL(null);
  const methods = [
    {
      id:"rule", emoji:"📐", t:"Правило → примеры",
      s:"Сначала формула, потом тренировка",
      reveal:"Ты любишь опору. Lyra даёт чёткую формулу, а потом закрепляет её примерами — от простого к сложному.",
    },
    {
      id:"pattern", emoji:"🧩", t:"Примеры → правило",
      s:"Ловишь закономерность сам",
      reveal:"Ты схватываешь на интуиции. Lyra показывает живые примеры, а правило ты выводишь сам — так оно запоминается крепче.",
    },
    {
      id:"story", emoji:"💬", t:"В диалоге / истории",
      s:"Грамматика внутри ситуации",
      reveal:"Тебе нужен контекст. Lyra прячет грамматику в живой диалог — ты учишь её, проживая ситуацию, а не зубря.",
    },
    {
      id:"compare", emoji:"🔁", t:"Сравнение с русским",
      s:"Как в русском vs как в английском",
      reveal:"Тебе важна опора на родной язык. Lyra объясняет через мостик «как в русском» — и непонятное становится очевидным.",
    },
  ];
  const sel = methods.find((m) => m.id === picked);

  return (
    <section className="section-pad" style={{ position:"relative" }}>
      <div className="aura" style={{ width:680, height:680, top:"30%", left:"50%", transform:"translateX(-50%)", background:"radial-gradient(circle, rgba(183,155,255,.26), transparent 66%)", opacity: picked ? .9 : .4, transition:"opacity 1s var(--ease)" }} />
      <div className="wrap">
        <div style={{ textAlign:"center", maxWidth: 680, margin:"0 auto" }}>
          <p className="eyebrow reveal" style={{ justifyContent:"center" }}><LSpark size={15} fill style={{ color:"var(--cool)" }}/> Главная фишка</p>
          <h2 className="h-sec reveal d1" style={{ marginTop: 16 }}>
            Lyra находит, <span className="grad-cool">как тебя учить</span>
          </h2>
          <p className="lead reveal d2" style={{ marginTop: 18 }}>
            Возьмём одну тему — <b style={{ color:"var(--text)", fontWeight:700 }}>Present Perfect</b>. Какое объяснение
            заходит именно тебе? Выбери — и почувствуй разницу.
          </p>
        </div>

        {/* method picker */}
        <div className="reveal d2" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(230px, 1fr))", gap:14, marginTop: 44, maxWidth: 880, marginInline:"auto" }}>
          {methods.map((m) => {
            const on = picked === m.id;
            return (
              <button key={m.id} onClick={() => setPicked(m.id)} aria-pressed={on}
                className="card" style={{
                  padding:"20px 18px", textAlign:"left", cursor:"pointer",
                  minHeight: 110,
                  transition:"transform .2s var(--ease), box-shadow .3s, border-color .3s, background .3s",
                  borderColor: on ? "var(--cool)" : "var(--line)",
                  background: on ? "rgba(143,168,255,.1)" : undefined,
                  boxShadow: on ? "0 0 0 1px var(--cool), 0 18px 44px -16px var(--cool-glow)" : undefined,
                  transform: on ? "translateY(-3px)" : undefined,
                }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:26, lineHeight:1, filter: on ? "none" : "saturate(.8)" }}>{m.emoji}</span>
                  <div>
                    <div style={{ fontWeight:800, fontSize:16.5, color: on ? "var(--cool)" : "var(--text)" }}>{m.t}</div>
                    <div className="dim" style={{ fontSize:13, marginTop:3 }}>{m.s}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* reveal */}
        <div className="reveal d3" style={{ marginTop: 24, maxWidth: 880, marginInline:"auto" }}>
          <div className="card" style={{
            position:"relative", overflow:"hidden",
            padding:"clamp(26px, 4vw, 40px)",
            borderColor: sel ? "rgba(183,155,255,.4)" : "var(--line)",
            background: sel ? "linear-gradient(180deg, rgba(143,168,255,.1), rgba(183,155,255,.04))" : undefined,
            transition:"all .5s var(--ease)",
            minHeight: 150,
          }}>
            {sel && <div style={{ position:"absolute", top:-80, left:"50%", transform:"translateX(-50%)", width:340, height:340, borderRadius:"50%", background:"radial-gradient(circle, var(--cool-glow), transparent 70%)", pointerEvents:"none", animation:"tw 4s ease-in-out infinite" }} />}
            {!sel ? (
              <div style={{ display:"flex", alignItems:"center", gap:16, justifyContent:"center", textAlign:"center", color:"var(--text-3)", minHeight: 90 }}>
                <LOrb size={40} cool style={{ opacity:.5, filter:"grayscale(.3)" }} />
                <p style={{ fontSize:16, fontWeight:600, maxWidth: 360 }}>Выбери способ выше — Lyra покажет, как объяснит тебе</p>
              </div>
            ) : (
              <div key={sel.id} style={{ position:"relative" }} className="demo-reveal-in">
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <LOrb size={48} cool />
                  <div>
                    <p className="grad-cool" style={{ fontSize:12, fontWeight:800, letterSpacing:".16em", textTransform:"uppercase" }}>Нашли, как тебе учить лучше</p>
                    <h3 style={{ fontSize:"clamp(22px,3vw,30px)", marginTop:6, fontFamily:"var(--font-display)", fontWeight:700 }}>{sel.t}</h3>
                  </div>
                </div>
                <p className="muted" style={{ marginTop:18, fontSize:"clamp(16px,2vw,19px)", lineHeight:1.55, maxWidth: 640 }}>{sel.reveal}</p>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:20, flexWrap:"wrap" }}>
                  <span className="chip chip-cool"><LBolt size={14}/> Так ты учишься заметно быстрее</span>
                  <span className="chip"><LBrain size={14}/> Запомнено в твоём профиле</span>
                </div>
              </div>
            )}
          </div>
          <p className="dim" style={{ fontSize:14, textAlign:"center", marginTop:20, lineHeight:1.6, maxWidth: 560, marginInline:"auto" }}>
            Это и есть фишка Lyra — <b style={{ color:"var(--text-2)" }}>память про то, как ты учишься</b>. Чем дальше — тем точнее.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ====================== 4. HOW IT WORKS ====================== */
function HowItWorks() {
  const steps = [
    { n:"01", t:"Диагностика уровня", s:"Короткий старт определяет твой уровень от A1 до C2 — без скучных тестов.", Icon: LTarget },
    { n:"02", t:"Персональный план", s:"Lyra собирает программу под твою цель и подбирает подачу, которая тебе заходит.", Icon: LSpark },
    { n:"03", t:"Закрепление до автоматизма", s:"Умное повторение возвращает слова в нужный момент — ты не забываешь выученное.", Icon: LRepeat },
  ];
  return (
    <section className="section-pad">
      <div className="wrap">
        <div style={{ maxWidth: 620 }}>
          <p className="eyebrow reveal"><span className="dot" /> Как это работает</p>
          <h2 className="h-sec reveal d1" style={{ marginTop: 16 }}>Три шага до английского, который остаётся</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:18, marginTop: 48 }}>
          {steps.map((s, i) => (
            <div key={i} className={"card reveal d" + (i+1)} style={{ padding: 28, position:"relative", overflow:"hidden" }}>
              <div className="display grad-gold" style={{ fontSize: 44, opacity:.32 }}>{s.n}</div>
              <div style={{ width:46, height:46, borderRadius:14, background:"var(--surface-2)", boxShadow:"inset 0 0 0 1px var(--line-2)", display:"grid", placeItems:"center", color:"var(--gold)", marginTop:14 }}>
                <s.Icon size={23}/>
              </div>
              <h3 style={{ fontSize:21, marginTop:18, fontFamily:"var(--font-display)", fontWeight:700, lineHeight:1.15 }}>{s.t}</h3>
              <p className="muted" style={{ marginTop:10, fontSize:14.5, lineHeight:1.55 }}>{s.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, PainSolution, InteractiveDemo, HowItWorks });
