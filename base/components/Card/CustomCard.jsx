export default function CustomCard({
  title,
  quantity,
  iconClass,
  bgIconClass,
  iconColorClass,
}) {
  return (
    <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
      <div className="flex justify-content-between mb-3">
        <div>
          <span className="block text-500 font-medium mb-3">{title}</span>
          <div className="text-900 font-medium text-xl">{quantity}</div>
        </div>
        <div
          className={`flex align-items-center justify-content-center border-round ${bgIconClass}`}
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <i className={`${iconClass} ${iconColorClass} text-xl`}></i>
        </div>
      </div>
    </div>
  );
}
