import React, { useState } from "react";
import { Button } from "primereact/button";
import DialogDireccion from "@/base/components/Direccion/DialogDireccion";
import MeliponarioData from "@/project/components/Guias/MeliponarioAMeliponario/OrigenDestino/MeliponarioData";
import useCustomForm from "@/base/hooks/useCustomForm";


const DatosOrigenYDestino = (props) => {
    const [dialogDireccion, setDialogDireccion] = useState({
        show: false,
        title: "",
        direccionData: null,
    });

    return (
        <>
            {dialogDireccion.show && (
                <DialogDireccion
                    show={dialogDireccion.show}
                    data={dialogDireccion.direccionData}
                    title={dialogDireccion.title}
                    onHide={() => setDialogDireccion({ ...dialogDireccion, show: false })}
                />
            )}

            <div className="grid">
                {props.data?.motivo_solicitud == "MELIPONARIO_A_MELIPONARIO" ?
                    <>
                        <div className="col-12 mb-5">
                            <h3 className="mb-2">Meliponario origen</h3>
                            {props.data?.meliponario_origen && (
                                <MeliponarioData
                                    type="ORIGEN"
                                    meliponarioData={props.data.meliponario_origen}
                                />
                            )}
                        </div>

                        <div className="col-12 mb-5">
                            <h3 className="mb-2">Meliponario destino</h3>
                            {props.data?.meliponario_destino && (
                                <MeliponarioData
                                    type="DESTINO"
                                    meliponarioData={props.data.meliponario_destino}
                                />
                            )}
                        </div>
                    </>
                    :
                    <>
                        <div className="col-12 lg:col-3">

                            <Button
                                label={"Dirección Origen"}
                                tooltip="Ver"
                                icon="pi pi-map-marker"
                                className="p-button-outlined p-button-info mr-3"
                                onClick={() =>
                                    setDialogDireccion({
                                        show: true,
                                        direccionData: props.data?.direccion_origen,
                                        title: "Origen",
                                    })
                                }
                            />
                        </div>
                        <div className="col-12 lg:col-3">
                            <Button
                                label={"Dirección Destino"}
                                tooltip="Ver"
                                icon="pi pi-map-marker"
                                className="p-button-outlined p-button-info mr-3"
                                onClick={() =>
                                    setDialogDireccion({
                                        show: true,
                                        direccionData: props.data?.direccion_destino,
                                        title: "Destino",
                                    })
                                }
                            />
                        </div>
                    </>
                }
            </div>
        </>

    )
}
export default DatosOrigenYDestino;
