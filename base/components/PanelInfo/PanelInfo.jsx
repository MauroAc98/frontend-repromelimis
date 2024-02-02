import styles from "./PanelInfo.module.css";

export default function PanelInfo({ text, title, icon }) {
  return (
    <div className="mb-4">
      <div className={styles["panel_header"]}>
        <div className="text-lg">
          <span className="font-bold mr-1">
            <i className={icon}></i> {title}
          </span>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}
