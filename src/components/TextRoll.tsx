/** Text-roll link: on hover each letter rolls up and its twin rolls in from below (after Skiper UI's skiper58, done in CSS). */
function Row({ letters, hidden }: { letters: string[]; hidden: boolean }) {
  return (
    <span className={hidden ? "roll__row roll__row--under" : "roll__row"} aria-hidden={hidden || undefined}>
      {letters.map((l, i) => (
        <span key={i} className="roll__l" style={{ transitionDelay: `${i * 28}ms` }}>
          {l === " " ? "\u00A0" : l}
        </span>
      ))}
    </span>
  );
}

export function TextRoll({ children }: { children: string }) {
  const letters = children.split("");
  return (
    <span className="roll">
      <Row letters={letters} hidden={false} />
      <Row letters={letters} hidden />
    </span>
  );
}
