import { useEffect, useState } from "react";
import api, { getResponseError } from "@/base/helpers/api";
import CustomTable from "@/base/components/Table/CustomTable";
import ButtonsSection from "@/base/components/Table/ButtonsSection";
import { Tag } from "primereact/tag";
import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import { useToastContext } from "@/base/context/ToastContext";
import FormMovColmenas from "./FormMovColmenas";
import { formatDate } from "@/base/helpers/utils";
import useGenericDelete from "@/base/hooks/useGenericDelete";

export default function MovimientosColmenas(props) {
  const { showErrorMsg } = useToastContext();
  const [movimientosData, setMovimientosData] = useState({
    requestStatus: "LOADING",
    data: [],
  });
  const [showForm, setShowForm] = useState(false);
  const { genericDelete } = useGenericDelete();

  /** DELETE */
  function onSucessDelete(data) {
    const { deleted_data } = data;
    getMovimientos();
    props.getColmenas();
    // HAGO LA OPERACION INVERSA PARA VOLVER AL VALOR ANTERIOR
    props.updateCantidadActual(
      deleted_data.cantidad,
      deleted_data.motivo == "CREACION" ? "RESTAR" : "SUMAR"
    );
  }

  const handleClickDelete = (rowData) => {
    genericDelete(
      `/movimientos-colmenas/destroy-tmp/${rowData.id}`,
      null,
      onSucessDelete
    );
  };
  /** END DELETE */

  const handleClickNuevo = () => {
    setShowForm(true);
  };

  const getMovimientos = async () => {
    try {
      setMovimientosData({
        requestStatus: "LOADING",
        data: [],
      });
      const { data } = await api.get("/movimientos-colmenas/get-by-colmena", {
        params: {
          id_colmena: props.idColmena,
        },
      });

      setMovimientosData({
        requestStatus: "SUCCESS",
        data: data,
      });
    } catch (error) {
      showErrorMsg(getResponseError(error));
    }
  };

  const motivoTemplate = (rowData) => {
    console.log(rowData);
    if (rowData.motivo == "CREACION") {
      return <Tag value="CREACION" severity="success" />;
    } else if (rowData.motivo == "PERDIDA") {
      return <Tag value="PERDIDA" severity="danger" />;
    } else if (rowData.motivo == "TRASLADO_GUIA") {
      return (
        <div>
          <Tag value="TRASLADO GUIA" severity="primary" className="mr-2" />
          {rowData.tipo_traslado_guia == "EGRESO" ? (
            <Tag value="EGRESO" severity="danger" />
          ) : (
            <Tag value="INGRESO" severity="success" />
          )}
        </div>
      );
    }
  };

  const actionButtons = (rowData) => {
    return (
      <ActionButtonsTable
        handleClickDelete={
          rowData.id_registro_actual
            ? undefined
            : () => handleClickDelete(rowData)
        }
      />
    );
  };

  const columns = [
    {
      field: "motivo",
      header: "Motivo",
      body: motivoTemplate,
    },
    {
      field: "cantidad",
      header: "Cantidad",
    },
    {
      field: "fecha_movimiento",
      header: "Fecha movimiento",
      body: (rowData) => formatDate("dd/mm/yyyy", rowData.fecha_movimiento),
    },
    {
      field: "observacion",
      header: "Observación",
    },
    {
      field: "action_buttons",
      header: "Acciones",
      align: "center",
      body: actionButtons,
    },
  ];

  useEffect(() => {
    getMovimientos();
  }, []);

  return (
    <>
      <FormMovColmenas
        showForm={showForm}
        setShowForm={setShowForm}
        idColmena={props.idColmena}
        getMovimientos={getMovimientos}
        getColmenas={props.getColmenas}
        updateCantidadActual={props.updateCantidadActual}
      />
      <CustomTable
        columns={columns}
        data={movimientosData.data}
        loading={movimientosData.requestStatus == "LOADING"}
        buttonsSection={<ButtonsSection handleClickAdd={handleClickNuevo} />}
      />
    </>
  );
}
