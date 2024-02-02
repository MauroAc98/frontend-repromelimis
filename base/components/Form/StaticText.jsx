export default function StaticText({ className, label, value }) {
  return (
    <div className={className}>
      <label className="font-bold">{label}</label>
      <div className="mt-1">{value}</div>
    </div>
  );
}
