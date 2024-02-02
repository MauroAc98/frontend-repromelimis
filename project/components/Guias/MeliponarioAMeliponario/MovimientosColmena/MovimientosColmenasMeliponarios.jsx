import CustomTable from "@/base/components/Table/CustomTable";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import ButtonsSection from "@/base/components/Table/ButtonsSection";
import { useState } from "react";
import DialogAdd from "./DialogAdd/DialogAdd";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
import useGenericDelete from "@/base/hooks/useGenericDelete";
import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import DialogVerDatos from "./DialogVerDatos";
import { Image } from "primereact/image";

export default function MovimientosColmenasMeliponarios() {
  const router = useRouter();
  const [showDialogAdd, setShowDialogAdd] = useState(false);
  const [dialogVerDatos, setDialogVerDatos] = useState({
    title: "",
    show: false,
    data: {},
  });
  const { datosMovimientos, requestStatus, getSolicitudActual } =
    useSolicitudGuiaContext();
  const { genericDelete } = useGenericDelete();

  /** DELETE */
  function onSucessDelete() {
    getSolicitudActual();
  }

  const handleClickDelete = (rowData) => {
    genericDelete(
      `/movimientos-guias/destroy-tmp-meli-a-meli/${rowData.id}`,
      null,
      onSucessDelete
    );
  };
  /** END DELETE */

  const actionButtons = (rowData) => {
    return (
      <ActionButtonsTable
        handleClickDelete={() => handleClickDelete(rowData)}
      />
    );
  };

  const datosColmena = (colmenaData) => {
    return (
      <div>
        <div className="">
          <div>
            <span className="font-bold">N°: </span>
            <span>{colmenaData?.nro}</span>
          </div>
          <div>
            <span className="font-bold">Tipo de colmena: </span>
            <span>{colmenaData?.tipo_colmena}</span>
          </div>
          <div>
            <span className="font-bold">Cantidad actual: </span>
            <span>{colmenaData?.cantidad_actual}</span>
          </div>
        </div>
      </div>
    );
  };

  const columns = [
    {
      field: "especie",
      header: "Especie - Nombre Comun",
      body: (rowData) =>
        `${rowData.colmena_origen?.especie.nombre} - ${rowData.colmena_origen?.especie.nombre_comun}`,
      style: { minWidth: "300px" },
    },
    {
      field: "datos_colmena_origen",
      header: "Datos Colmena Origen",
      align: "left",
      body: (rowData) => datosColmena(rowData.colmena_origen),
      style: { minWidth: "300px" },
    },
    {
      field: "datos_colmena_destino",
      header: "Datos Colmena Destino",
      align: "left",
      body: (rowData) => datosColmena(rowData.colmena_destino),
      style: { minWidth: "300px" },
    },
    {
      field: "cantidad_a_trasladar",
      header: "Cantidad a trasladar",
      align: "center",
      style: { minWidth: "200px" },
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
      field: "action_buttons",
      header: "Acciones",
      align: "center",
      body: actionButtons,
    },
  ];
  return (
    <>
      <DialogAdd showDialog={showDialogAdd} setShowDialog={setShowDialogAdd} />
      <CustomTable
        hidePaginator={true}
        columns={columns}
        data={datosMovimientos}
        loading={requestStatus == "LOADING" ? true : false}
        buttonsSection={
          <ButtonsSection
            titleAdd={"Agregar"}
            handleClickAdd={() => setShowDialogAdd(true)}
          />
        }
      />
      <div className="mt-7 text-sm">
        <i>
          DECLARO BAJO JURAMENTO que la/las colmenas antes indicadas no son
          productos del tráfico de flora o fauna, y cumplen con lo establecido
          por el Artículo 5 de la ley VIII – N.° 90 que dispone: “ Se declara de
          Interés Provincial la preservación de abejas nativas de la tribu
          Meliponini, sus enjambres, colonias, nidos y colmenas encontrados en:
          “no proviene de: 1) áreas naturales protegidas, como ser parques
          nacionales, parques provinciales y reservas naturales; 2) bosques
          nativos en propiedad privada, tales como reservas privadas de usos
          múltiples y las propiedades privadas que forman parte de la Biosfera
          Yabotí; 3) bosques protectores de los ríos principales y el perímetro
          del Lago Urugua-í en un ancho de doscientos metros (200 m); 4) bosques
          protectores del suelo con pendientes iguales o mayores al quince por
          ciento (15 %) medidos en tramos de cien metros (100 m), en el sentido
          de la línea de máxima pendiente; 5) bosques protectores de cursos de
          agua, en un ancho sobre cada margen igual al triple del ancho de los
          mismos, sin que cada franja pueda ser inferior a diez metros (10 m);
          6) fajas ecológicas y áreas de interés especial, incluso privadas que
          por su valor biológico, turístico y cultural deben ser conservadas y
          que se determinen por el Poder Ejecutivo; 7) espacios públicos, como
          ser veredas, espacios verdes, reservas fiscales, plazas y parques
          municipales”. Que también se cumple con el Artículo 23 de la ley VIII
          – N.° 90 que dispones: “Se prohíbe en todo el territorio provincial:
          1) la instalación de trampas caza enjambres y la extracción de
          enjambres, colonias, nidos y colmenas que se encuentran en las áreas
          indicadas en el artículo 5 de esta ley, salvo autorización expresa de
          la autoridad de aplicación; 2) la destrucción parcial o total de
          colmenas en estado silvestre que se encuentre en zonas rurales o
          urbanas; 3) la extracción de colmena en estado silvestre que se
          encuentran en zonas rurales o urbanas, salvo ante situaciones de
          riesgo evidente que pongan en peligro su supervivencia y a los fines
          de su preservación. Estas colmenas pueden ser trasegadas a cajones
          tecnificados cuando la situación lo amerite o trasladadas en su estado
          natural hasta meliponarios registrados, para ser utilizadas con fines
          científicos en el marco de investigaciones debidamente acreditadas,
          con fines didácticos o a meliponarios públicos o productivos; 4) la
          explotación extractiva de las colmenas silvestres, exceptuando
          aquellas para consumo familiar de miel y otros productos y
          subproductos derivados, practicada por las comunidades originarias de
          la Provincia; 5) el tránsito dentro de la Provincia de material vivo
          sin la guía expedida por la autoridad de aplicación competente para su
          transporte; 6) el traslado fuera de la Provincia de abeja, colonia,
          nidos o colmenas, salvo autorización expresa de la autoridad de
          aplicación; 7) la utilización de productos o subproductos de las
          abejas Apis mellifera en colonias de abejas nativas. Así como también
          con la ley VIII – N.° 90 y su reglamentación. La presente reviste
          carácter de declaración jurada. Los datos de la declaración Jurada
          realizada por los titulares, se encuentran protegidos por la Ley de
          Protección de Datos por la Ley de Protección de Datos Personales (Ley
          N° 25.326)
        </i>
      </div>
      <div className="mt-3 flex justify-content-end">
        <Button
          className="p-button-sm"
          label="Continuar"
          onClick={() => router.push("/guias-traslado/solicitudes")}
        />
      </div>
    </>
  );
}
