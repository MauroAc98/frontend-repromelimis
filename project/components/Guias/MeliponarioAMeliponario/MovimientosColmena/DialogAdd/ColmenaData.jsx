import CustomTable from "@/base/components/Table/CustomTable";
import { useEffect } from "react";
import { useState } from "react";
import api from "@/base/helpers/api";
import { Button } from "primereact/button";
import CardColmena from "./CardColmena";

export default function ColmenaData(props) {
  const [colmenasData, setColmenasData] = useState({
    loading: true,
    data: [],
  });

  const getColmenas = async () => {
    try {
      setColmenasData({
        loading: true,
        data: [],
      });

      const { data } = await api.get(`/movimientos-guias/get-colmenas-to-add`, {
        params: {
          type: props.type,
          id_especie: props.formData?.colmena_origen?.id_especie,
        },
      });

      setColmenasData({
        loading: false,
        data: data,
      });
    } catch (error) {
      setColmenasData({
        loading: false,
        data: [],
      });
    }
  };

  const handleClickSelectRow = (rowData) => {
    if (props.type == "ORIGEN") {
      props.setFormData({
        colmena_origen: rowData,
      });
    } else if (props.type == "DESTINO") {
      props.setFormData((prevVal) => ({
        ...prevVal,
        colmena_destino: rowData,
      }));
    }
  };

  const columns = [
    {
      field: "nro",
      header: "N°",
    },
    {
      field: "especie",
      header: "Especie - Nombre Comun",
      body: (rowData) =>
        `${rowData.especie.nombre} - ${rowData.especie.nombre_comun}`,
    },
    {
      field: "tipo_colmena",
      header: "Tipo de colmena",
      align: "center",
    },
    {
      field: "cantidad_actual",
      header: "Cantidad actual",
      align: "center",
    },
    {
      field: "action_buttons",
      header: "Acciones",
      align: "center",
      body: (rowData) => (
        <Button
          tooltip="Seleccionar"
          className="p-button-sm p-button-outlined p-button-secondary"
          icon="pi pi-arrow-left"
          onClick={() => handleClickSelectRow(rowData)}
        />
      ),
    },
  ];

  /** Evaluamos que contenido mostrar */
  const evalContent = () => {
    if (props.type == "ORIGEN" && props.formData?.colmena_origen) {
      return (
        <CardColmena
          colmenaData={props.formData.colmena_origen}
          setFormData={props.setFormData}
          type="ORIGEN"
        />
      );
    } else if (props.type == "DESTINO" && props.formData?.colmena_destino) {
      return (
        <CardColmena
          colmenaData={props.formData.colmena_destino}
          setFormData={props.setFormData}
          type="DESTINO"
        />
      );
    }

    return (
      <CustomTable
        hidePaginator={true}
        columns={columns}
        data={colmenasData.data}
        loading={colmenasData.loading}
      />
    );
  };

  /** Si todavia no seleccionamos una colmena, traemos el listado */
  useEffect(() => {
    if (props.type == "ORIGEN" && !props.formData?.colmena_origen) {
      getColmenas();
    } else if (props.type == "DESTINO" && !props.formData?.colmena_destino) {
      getColmenas();
    }
  }, []);

  return (
    <div className="mb-5">
      <h3 className="mb-2">
        Colmena {props.type == "ORIGEN" ? "origen" : "destino"}
      </h3>
      {evalContent()}
    </div>
  );
}
