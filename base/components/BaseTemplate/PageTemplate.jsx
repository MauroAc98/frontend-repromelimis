
export default function PageTemplate({ title, iconTitle, children }) {

  return (
    <div className="card">
      {title && (
        <div className="page_title">
          <i className={iconTitle} /> {title}
        </div>
      )}
      <div className="mt-2">{children}</div>
    </div>
  );
}
