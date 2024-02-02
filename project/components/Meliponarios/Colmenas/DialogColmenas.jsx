import { Dialog } from "primereact/dialog";
import FormColmena from "./FormColmena";
import { TabView, TabPanel } from "primereact/tabview";
import MovimientosColmenas from "./MovimientosColmenas/MovimientosColmenas";
import styles from "./Colmenas.module.css";
import HeaderColmenas from "./HeaderColmenas";
import { useEffect, useState } from "react";

export default function DialogColmenas(props) {
  const [cantidadActual, setCantidadActual] = useState(0);

  const updateCantidadActual = (cantidad, action) => {
    if (action == "SUMAR") {
      setCantidadActual(cantidadActual + cantidad);
    } else if (action == "RESTAR") {
      setCantidadActual(cantidadActual - cantidad);
    }
  };

  const onHideDialog = () => {
    props.setShowDialog(false);
  };

  useEffect(() => {
    setCantidadActual(props.editData?.cantidad_actual);
  }, [props.editData]);

  return (
    <Dialog
      header={props.submitAction == "add" ? "Nueva Colmena" : `Editar Colmena N° ${props.editData?.nro}`}
      visible={props.showDialog}
      style={{ width: "80vw" }}
      footer={null}
      onHide={onHideDialog}
      position={"center"}
    >
      {props.submitAction == "add" ? (
        <FormColmena
          idMeliponarioTmp={props.idMeliponarioTmp}
          submitAction={props.submitAction}
          getColmenas={props.getColmenas}
          onHideDialog={onHideDialog}
          editData={props.editData}
        />
      ) : (
        <>
          <HeaderColmenas cantidadActual={cantidadActual} />
          <TabView>
            <TabPanel header="Datos de colmena">
              <FormColmena
                idMeliponarioTmp={props.idMeliponarioTmp}
                submitAction={props.submitAction}
                getColmenas={props.getColmenas}
                onHideDialog={onHideDialog}
                editData={props.editData}
              />
            </TabPanel>
            <TabPanel header="Movimientos">
              <MovimientosColmenas
                idColmena={props.editData?.id}
                getColmenas={props.getColmenas}
                updateCantidadActual={updateCantidadActual}
              />
            </TabPanel>
          </TabView>
        </>
      )}
    </Dialog>
  );
}
