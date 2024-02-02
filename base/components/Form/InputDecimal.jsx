import { InputText } from "primereact/inputtext";

export default function InputDecimal(props) {
    
  const handleChange = (event) => {
    const { value } = event.target;
    const regex = /^[0-9]*(?:\.[0-9]*)?$/; // Expresión regular para permitir números y un punto decimal

    // Verificar si el nuevo valor cumple con las restricciones
    if (regex.test(value)) {
      // Actualizar el valor en el formulario
      props.onChange(event);
    } else {
      // Si el nuevo valor no cumple con las restricciones, eliminar el último carácter ingresado
      const newValue = value.slice(0, -1);
      event.target.value = newValue;
    }
  };

  return <InputText {...props} onChange={(event) => handleChange(event)} />;
}
