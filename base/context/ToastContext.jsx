import { createContext, useRef, useContext } from "react";
import { Toast } from "primereact/toast";

const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  const toast = useRef(null);

  const templateContent = (summary, detail, icon) => {
    return (
      <>
        <span className={`p-toast-message-icon ${icon}`}></span>
        <div className="p-toast-message-text">
          <span className="p-toast-summary">{summary}</span>
          <div
            className="p-toast-detail"
            dangerouslySetInnerHTML={{ __html: detail }}
          ></div>
        </div>
      </>
    );
  };

  const showSuccessMsg = (detail, sticky) => {
    toast.current.show({
      severity: "success",
      life: 5000,
      sticky: sticky,
      content: templateContent("Realizado!", detail, "pi pi-check"),
    });
  };

  const showInfoMsg = (detail, sticky) => {
    toast.current.show({
      severity: "info",
      life: 5000,
      sticky: sticky,
      content: templateContent("Informacion!", detail, "pi pi-info-circle"),
    });
  };

  const showWarnMsg = (detail, sticky) => {
    toast.current.show({
      severity: "warn",
      life: 5000,
      sticky: sticky,
      content: templateContent(
        "Advertencia!",
        detail,
        "pi pi-exclamation-triangle"
      ),
    });
  };

  const showErrorMsg = (detail, sticky) => {
    toast.current.show({
      severity: "error",
      life: 5000,
      sticky: sticky,
      content: templateContent("Error!", detail, "pi pi-times"),
    });
  };

  const data = {
    showSuccessMsg,
    showInfoMsg,
    showWarnMsg,
    showErrorMsg,
  };

  return (
    <ToastContext.Provider value={data}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContextProvider };

export const useToastContext = () => useContext(ToastContext);
