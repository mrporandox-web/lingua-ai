// Фоновый слой Lingua-AI: aurora (3 размытых блоба) + grid-overlay.
// Чистая декорация, без состояния. Портировано из prototype/lesson.html.

export function Backdrop() {
  return (
    <>
      <div className="aurora">
        <i />
      </div>
      <div className="grid" />
    </>
  );
}
