import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import ButtonsSection from "@/base/components/Table/ButtonsSection";
import CustomTable from "@/base/components/Table/CustomTable";
import PageTemplateSolicitud from "@/project/components/Guias/Solicitudes/PageTemplateSolicitud";
import DialogMovimientoRescate from "@/project/components/Guias/Solicitudes/Rescate/DialogMovimientoRescate";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
import useGetSolicitudGuiaData from "@/project/hooks/endpointsHooks/useGetSolicitudGuiaData";
import { Button } from "primereact/button";
import { useState } from "react";
import { Image } from "primereact/image";
import useGenericDelete from "@/base/hooks/useGenericDelete";
import { useRouter } from "next/router";
import { SITIOS_GUIAS } from "@/pages/guias-traslado/solicitudes";

export default function MovimientosColmenasRescate() {
  const { datosMovimientos, requestStatus, getSolicitudActual } =
    useSolicitudGuiaContext();
  const [showForm, setShowForm] = useState(false);
  const [submitAction, setSubmitAction] = useState("");
  const [movimientoData, setMovimientoData] = useState(null);
  const router = useRouter();
  const { genericDelete } = useGenericDelete();

  const onHideForm = () => {
    setShowForm(false);
  };

  const actionButtons = (rowData) => {
    return (
      <ActionButtonsTable
        handleClickDelete={() => handleClickDelete(rowData)}
      />
    );
  };

  const handleClickContinuar = () => {
    router.push("/guias-traslado/solicitudes");
  };

  const handleClickNuevo = () => {
    setShowForm(true);
    setSubmitAction("add");
  };

  function onSucessDelete() {
    getSolicitudActual();
  }

  const handleClickDelete = (rowData) => {
    genericDelete(
      `/movimientos-guias/destroy-tmp-rescate/${rowData.id}`,
      null,
      onSucessDelete
    );
  };

  const getSitioTraslado = (rowData) => {
    const { label } = SITIOS_GUIAS.find(
      (item) => item.value == rowData.sitio_traslado
    );
    return label;
  };

  const columns = [
    {
      field: "especie_rescate",
      header: "Especie - Nombre Comun",
      body: (rowData) =>
        rowData.especie_rescate
          ? `${rowData.especie_rescate.nombre} - ${rowData.especie_rescate.nombre_comun}`
          : "Sin especie",
      style: { minWidth: "300px" },
    },
    {
      field: "colmena_instalada_tronco",
      header: "Colmena instalada en sección de tronco, tora, torita?",
      align: "center",
      body: (rowData) => (rowData.colmena_instalada_tronco ? "Si" : "No"),
      style: { minWidth: "300px" },
    },
    {
      field: "lugar_instalada",
      header: "Lugar Instalada",
      align: "center",
      body: (rowData) =>
        rowData.lugar_instalada ? rowData.lugar_instalada : " ",
    },
    {
      field: "largo_seccion",
      header: "Largo Seccion",
      align: "center",
      body: (rowData) => `${rowData.largo_seccion} cm`,
    },
    {
      field: "sitio_traslado",
      header: "Sitio de la colmena a trasladar",
      body: getSitioTraslado,
      align: "center",
      style: { minWidth: "300px" },
    },
    {
      field: "foto_colmena",
      header: "Foto de colmena",
      align: "center",
      body: (rowData) => (
        <Image
          src={rowData.foto_colmena.original_url}
          alt="Image"
          width="100"
          preview
        />
      ),
      style: { minWidth: "200px" },
    },
    {
      field: "foto_panoramica",
      header: "Foto panoramica",
      align: "center",
      body: (rowData) => (
        <Image
          src={rowData.foto_panoramica?.original_url}
          alt="Image"
          width="100"
          preview
        />
      ),
      style: { minWidth: "200px" },
    },
    {
      field: "action_buttons",
      header: "Acciones",
      body: actionButtons,
      align: "center",
    },
  ];

  return (
    <>
      <DialogMovimientoRescate
        setShowForm={setShowForm}
        showForm={showForm}
        onHideForm={onHideForm}
        submitAction={submitAction}
        extraccionData={movimientoData}
      />

      <CustomTable
        hidePaginator={true}
        columns={columns}
        data={datosMovimientos}
        loading={requestStatus == "LOADING" ? true : false}
        buttonsSection={<ButtonsSection handleClickAdd={handleClickNuevo} />}
      />
      <div className="mt-3 flex justify-content-end">
        <Button
          className="p-button-sm"
          label="Continuar"
          onClick={handleClickContinuar}
        />
      </div>
    </>
  );
}
