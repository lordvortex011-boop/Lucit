// ponytail: intentionally near-empty footer — whitespace carries the close;
// add quiet legal line when company entity exists.
export function Footer() {
  return (
    <footer aria-hidden>
      <div className="h-10" />
    </footer>
  );
}
