export default function SignalRings() {
  return (
    <div className="signal-rings" aria-hidden="true">
      <div className="signal-rings__ring signal-rings__ring--outer" />
      <div className="signal-rings__ring signal-rings__ring--mid" />
      <div className="signal-rings__ring signal-rings__ring--inner" />
      <div className="signal-rings__flare signal-rings__flare--one" />
      <div className="signal-rings__flare signal-rings__flare--two" />
    </div>
  );
}
