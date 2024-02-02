import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import DialogLupa from "./DialogLupa";
import FloatInput from "@/base/components/Form/FloatInput";

export default function Lupa(props) {
  const [showDialog, setShowDialog] = useState(false);
  const [selection, setSelection] = useState(null);

  const openDialog = () => {
    setShowDialog(true);
  };

  const onHideDialog = () => {
    setShowDialog(false);
  };

  const onSelect = () => {
    const value = selection[props.selectionValue];

    // Simulo evento para value
    const eventValue = {
      target: {
        value: value,
        name: props.valueName,
      },
    };
    // Ejecuto la funcion que le pase
    props.onSelectValue(eventValue);

    // Simulo evento para input
    const eventInput = {
      target: {
        value: selection,
        name: props.inputName,
      },
    };
    // Ejecuto la funcion que le pase
    props.onSelectInput(eventInput);

    // Oculto dialog
    onHideDialog();
  };

  const onClean = () => {
    // Simulo evento para value
    const eventValue = {
      target: {
        value: null,
        name: props.valueName,
      },
    };
    // Ejecuto la funcion que le pase
    props.onSelectValue(eventValue);

    // Simulo evento para input
    const eventInput = {
      target: {
        value: null,
        name: props.inputName,
      },
    };
    // Ejecuto la funcion que le pase
    props.onSelectInput(eventInput);

    // Limpiamos estado de seleccion
    setSelection(null);
    onHideDialog();
  };

  /** Obtenemos value a mostrar en input */
  const getValue = () => {
    if (props.inputValue) {
      return props.inputTemplateValue(props.inputValue);
    }
    return "";
  };

  /** Cada vez que abro el dialog, limpio la fila seleccionada */
  useEffect(() => {
    setSelection(null);
  }, [showDialog]);

  return (
    <>
      <FloatInput
        className={props.className}
        label={props.label}
        errorName={props.errorName}
        formErrors={props.formErrors}
        inputGroup
        addon={
          props.showSearchButton && (
            <Button
              icon="pi pi-search"
              className="p-button-primary"
              onClick={openDialog}
            />
          )
        }
      >
        <InputText
          key={props.inputValue}
          readOnly
          value={getValue()}
          onChange={() => {}}
          className={props.inputClassName}
        />
      </FloatInput>

      <DialogLupa
        title={props.title}
        url={props.url}
        params={props.params}
        columns={props.columns}
        showDialog={showDialog}
        onHideDialog={onHideDialog}
        onSelect={onSelect}
        onClean={onClean}
        selection={selection}
        setSelection={setSelection}
      />
    </>
  );
}
