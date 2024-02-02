import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import DialogLupa from "./DialogLupa";
import FloatInput from "@/base/components/Form/FloatInput";
import { useToastContext } from "@/base/context/ToastContext";
import { Chips } from "primereact/chips";

export default function LupaMultiple(props) {
  const { showErrorMsg } = useToastContext();
  const [showDialog, setShowDialog] = useState(false);
  const [selection, setSelection] = useState(null);

  const openDialog = () => {
    setShowDialog(true);
  };

  const onHideDialog = () => {
    setShowDialog(false);
  };

  const concatNewValue = (newVal) => {
    const _values = props.values ?? [];
    const _inputValues = props.inputValues ?? [];

    // Verificamos si que el valor no se repita
    if (_values.includes(newVal)) {
      return {
        exists: true,
      };
    }

    // Si no se repite
    const values = [..._values, newVal];
    const inputValues = [..._inputValues, selection];

    return {
      values,
      inputValues,
      exists: false,
    };
  };

  const onSelect = () => {
    // Fila seleccionada
    const value = selection[props.selectionValue];

    // Concatenamos nuevos valores
    const arrayValues = concatNewValue(value);

    // Si ya existe el valor en el array, muestro mensaje
    if (arrayValues.exists) {
      showErrorMsg("El registro ya se encuentra seleccionado.");
      return;
    }

    // Simulo evento para value
    const eventValue = {
      target: {
        value: arrayValues.values,
        name: props.valueName,
      },
    };
    // Ejecuto la funcion que le pase
    props.onSelectValue(eventValue);

    // Simulo evento para input
    const eventInput = {
      target: {
        value: arrayValues.inputValues,
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
        value: [],
        name: props.valueName,
      },
    };
    // Ejecuto la funcion que le pase
    props.onSelectValue(eventValue);

    // Simulo evento para input
    const eventInput = {
      target: {
        value: [],
        name: props.inputName,
      },
    };
    // Ejecuto la funcion que le pase
    props.onSelectInput(eventInput);

    // Limpiamos estado de seleccion
    setSelection(null);
    onHideDialog();
  };

  const itemTemplate = (item) => {
    if (item) {
      return props.inputTemplateValue(item);
    }
    return "";
  };

  const onRemove = (item) => {
    // Obtengo item a eliminar
    const selectedItem = item.value[0];

    // Value a eliminar
    const deleteValue = selectedItem[props.selectionValue];

    // -----VALUE
    let newValues = [...props.values];

    // Elimino value del array
    newValues = newValues.filter((item) => item != deleteValue);

    // Simulo evento para value
    const eventValue = {
      target: {
        value: newValues,
        name: props.valueName,
      },
    };
    // Ejecuto la funcion que le pase
    props.onSelectValue(eventValue);

    // ------INPUT VALUE
    let newInputValues = [...props.inputValues];

    // Elimino value del array
    newInputValues = newInputValues.filter(
      (item) => item[props.selectionValue] != deleteValue
    );

    // Simulo evento para input
    const eventInput = {
      target: {
        value: newInputValues,
        name: props.inputName,
      },
    };
    // Ejecuto la funcion que le pase
    props.onSelectInput(eventInput);
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
        <Chips
          className={`lupa_multiple_input ${props.inputClassName}`}
          value={props.inputValues}
          onChange={() => {}}
          itemTemplate={itemTemplate}
          onRemove={onRemove}
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
