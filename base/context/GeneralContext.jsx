import { createContext, useState, useContext } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from 'primereact/progressspinner';

const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [blockedDocument, setBlockedDocument] = useState(false);

  /** Dialog de confirmacion */
  const showConfirmDialog = (title, message, accept) => {
    confirmDialog({
      message: message,
      header: title,
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: accept,
      reject: () => {},
    });
  };

  /** Loaders con fondo bloqueado */
  const showBackdropLoader = () => {
    setBlockedDocument(true);
  };

  const hideBackdropLoader = () => {
    setBlockedDocument(false);
  };

  const data = {
    showConfirmDialog,
    showBackdropLoader,
    hideBackdropLoader,
  };

  return (
    <GeneralContext.Provider value={data}>
      <BlockUI
        blocked={blockedDocument}
        fullScreen
        template={<ProgressSpinner />}
      />
      <ConfirmDialog />
      {children}
    </GeneralContext.Provider>
  );
};

export { GeneralContextProvider };

export const useGeneralContext = () => useContext(GeneralContext);
