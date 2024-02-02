import FloatInput from "@/base/components/Form/FloatInput";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import useGetDepartamentos from "@/base/hooks/endpointsHooks/useGetDepartamentos";
import useGetLocalidades from "@/base/hooks/endpointsHooks/useGetLocalidades";
import MapWithCoords from "../Map/MapWithCoords";
import SectionLoader from "@/base/components/Loader/SectionLoader";

export default function FormDireccion(props) {
  const [departamentosOptions, setDepartamentosOptions] = useState({
    requestStatus: "LOADING",
    data: [],
  });
  const [localidadesOptions, setLocalidadesOptions] = useState({
    requestStatus: "LOADING",
    data: [],
  });

  /** ---GET DEPARTAMENTOS--- */
  const { getDepartamentos } = useGetDepartamentos(onSuccessGetDepartamentos);

  function onSuccessGetDepartamentos(response) {
    setDepartamentosOptions({
      requestStatus: "SUCCESS",
      data: response,
    });
  }
  /** ---END GET DEPARTAMENTOS--- */

  /** ---GET LOCALIDADES--- */
  const { getLocalidades } = useGetLocalidades(onSuccessGetLocalidades);

  function onSuccessGetLocalidades(response) {
    setLocalidadesOptions((prevVal) => ({
      requestStatus: "SUCCESS",
      data: response,
    }));
  }
  /** ---END GET LOCALIDADES--- */

  /** Al cambiar departamento, busco las localidades */
  const handleChangeDepartamento = (event) => {
    props.handleFormChange(event);
    // Limpiamos localidad
    setLocalidadesOptions((prevVal) => ({
      requestStatus: "SUCCESS",
      data: [],
    }));
    getLocalidades(event.target.value);
  };

  useEffect(() => {
    getDepartamentos();
    // Si le pasamos id_departamento, buscamos las localidades
    if (props.inputValue?.id_departamento) {
      getLocalidades(props.inputValue?.id_departamento);
    }
  }, [props.inputValue?.id_departamento]);

  if (
    departamentosOptions.requestStatus == "LOADING" &&
    localidadesOptions.requestStatus == "LOADING"
  ) {
    return (
      <div className="col-12">
        <SectionLoader />
      </div>
    );
  }


  return (
    <>
      {/* DATOS DIRECCION */}
      <div className="col-12 md:col-6">
        <div className="grid">
          <FloatInput
            className="col-12 md:col-6 mt-3"
            label="Departamento"
            errorName={`${props.objName ? `${props.objName}.` : ""
              }id_departamento`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <Dropdown
              className={`${props.errorValue?.id_departamento && "p-invalid"
                }  w-full`}
              name={`${props.objName ? `${props.objName}.` : ""
                }id_departamento`} //concatena . si es necesario
              value={props.inputValue?.id_departamento ?? ""}
              options={departamentosOptions.data}
              onChange={handleChangeDepartamento}
              optionLabel="nombre"
              optionValue="id"
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-6 mt-3"
            label="Localidad"
            errorName={`${props.objName ? `${props.objName}.` : ""
              }id_localidad`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <Dropdown
              className={`${props.errorValue?.id_localidad && "p-invalid"
                }  w-full`}
              name={`${props.objName ? `${props.objName}.` : ""}id_localidad`} //concatena . si es necesario
              value={props.inputValue?.id_localidad ?? ""}
              options={localidadesOptions.data}
              onChange={props.handleFormChange}
              optionLabel="nombre"
              optionValue="id"
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Calle"
            errorName={`${props.objName ? `${props.objName}.` : ""}calle`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.calle && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}calle`} //concatena . si es necesario
              value={props.inputValue?.calle ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Altura"
            errorName={`${props.objName ? `${props.objName}.` : ""}altura`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.altura && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}altura`} //concatena . si es necesario
              value={props.inputValue?.altura ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Piso"
            errorName={`${props.objName ? `${props.objName}.` : ""}piso`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.piso && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}piso`} //concatena . si es necesario
              value={props.inputValue?.piso ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Seccion"
            errorName={`${props.objName ? `${props.objName}.` : ""}seccion`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.seccion && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}seccion`} //concatena . si es necesario
              value={props.inputValue?.seccion ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Chacra"
            errorName={`${props.objName ? `${props.objName}.` : ""}chacra`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.chacra && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}chacra`} //concatena . si es necesario
              value={props.inputValue?.chacra ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Manzana"
            errorName={`${props.objName ? `${props.objName}.` : ""}manzana`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.manzana && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}manzana`} //concatena . si es necesario
              value={props.inputValue?.manzana ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Parcela"
            errorName={`${props.objName ? `${props.objName}.` : ""}parcela`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.parcela && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}parcela`} //concatena . si es necesario
              value={props.inputValue?.parcela ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Sub Parcela"
            errorName={`${props.objName ? `${props.objName}.` : ""}subparcela`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.subparcela && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}subparcela`} //concatena . si es necesario
              value={props.inputValue?.subparcela ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Partida"
            errorName={`${props.objName ? `${props.objName}.` : ""}partida`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.partida && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}partida`} //concatena . si es necesario
              value={props.inputValue?.partida ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Paraje"
            errorName={`${props.objName ? `${props.objName}.` : ""}paraje`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.paraje && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}paraje`} //concatena . si es necesario
              value={props.inputValue?.paraje ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Colonia"
            errorName={`${props.objName ? `${props.objName}.` : ""}colonia`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.colonia && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}colonia`} //concatena . si es necesario
              value={props.inputValue?.colonia ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 md:col-4 mt-3"
            label="Lote"
            errorName={`${props.objName ? `${props.objName}.` : ""}lote`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.lote && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}lote`} //concatena . si es necesario
              value={props.inputValue?.lote ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>

          <FloatInput
            className="col-12 mt-3"
            label="IDGIS"
            errorName={`${props.objName ? `${props.objName}.` : ""}idgis`} //concatena . si es necesario
            formErrors={props.formErrors}
          >
            <InputText
              className={`${props.errorValue?.idgis && "p-invalid"}`}
              name={`${props.objName ? `${props.objName}.` : ""}idgis`} //concatena . si es necesario
              value={props.inputValue?.idgis ?? ""}
              onChange={props.handleFormChange}
              autoComplete="off" // Desactivar el autocompletado
            />
          </FloatInput>
        </div>
      </div>

      {/* MAPA */}
      <div className="col-12 md:col-6">
        <MapWithCoords
          objName={props.objName}
          inputValue={props.inputValue}
          handleFormChange={props.handleFormChange}
          formErrors={props.formErrors}
          errorValue={props.errorValue}
        />
      </div>
    </>
  );
}
