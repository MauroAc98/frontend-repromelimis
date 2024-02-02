export default function FormErrorMsg({ formErrors, inputName }) {
 
  /**
   * formErrors = es el objeto donde se almacenan los mensajes de errores
   * inputName = es nombre del input y ademas el atributo dentro de formErrors que contiene el mensaje
   */

  // Funcion para verificar si en algun lado poseo la propiedad ya que podria tener un name tipo "persona.nombres" con signo .
  const hasNestedProperty = (obj, propertyPath) => {
    const nestedProperties = propertyPath.split(".");
    let currentObj = obj;
    for (let i = 0; i < nestedProperties.length; i++) {
      const property = nestedProperties[i];
      if (!currentObj || !currentObj.hasOwnProperty(property)) {
        return false;
      }
      currentObj = currentObj[property];
    }
    return true;
  };

  // Busca dentro de formErrors la propiedad en caso que se pase "persona.nombres" con signo .
  const getPropertyByPath = (obj, path) => {
    const properties = path.split(".");
    let value = obj;
    for (let property of properties) {
      if (value && value.hasOwnProperty(property)) {
        value = value[property];
      } else {
        return null; // Devuelve null si no se encuentra la propiedad
      }
    }
    return value;
  };

  if (formErrors && hasNestedProperty(formErrors, inputName)) {
    return (
      <small className="p-error block">
        {getPropertyByPath(formErrors, inputName)}
      </small>
    );
  }
}
