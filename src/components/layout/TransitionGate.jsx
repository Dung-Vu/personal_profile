export function TransitionGate({ gateRef, gateLabelRef }) {
  return (
    <div className="transition-gate" ref={gateRef} aria-hidden="true">
      <span ref={gateLabelRef}>loading profile</span>
    </div>
  );
}
