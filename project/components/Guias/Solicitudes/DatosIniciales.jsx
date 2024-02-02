import { maskNroRepromelimis } from "@/project/helpers/utils";
import { Dropdown } from 'primereact/dropdown';
import FloatInput from '../../../../base/components/Form/FloatInput';
import useCustomForm from '@/base/hooks/useCustomForm';
import { Button } from 'primereact/button';
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import api, { getResponseError } from "@/base/helpers/api";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useSolicitudGuiaContext } from "@/project/context/SolicitudGuiaContext";
import { useRouter } from "next/router";


export default function DatosInicialesSoli(props) {
    const router = useRouter();
    const { setFormData, formData, formErrors, handleSetFormErrors } = useCustomForm();
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
    const { showErrorMsg, showSuccessMsg } = useToastContext();
    const { getSolicitudActual } = useSolicitudGuiaContext();

    const [openAlert, setOpenAlert] = useState({
        open: false,
        title: 'Atención',
        message: "Al cambiar el motivo luego del primer guardado, todos los datos cargados serán eliminados. ¿Desea continuar?"
    });

    const options_reasons_request = [
        { label: "RESCATE A ESPACIO PUBLICO", value: "RESCATE_A_ESPACIO_PUBLICO" },
        { label: "MELIPONARIO A MELIPONARIO", value: "MELIPONARIO_A_MELIPONARIO" }
    ];

    const validateForm = () => {
        let valid = true;
        if (!formData?.motivo_solicitud || formData?.motivo_solicitud === "") {
            valid = false;
            handleSetFormErrors("motivo_solicitud", "Campo requerido");
        } else {
            handleSetFormErrors("tipo_capacitacion", "");
        }

        return valid;
    };

    async function onSave(e) {
        e.preventDefault();
        if (props.datosSolicitud?.motivo_solicitud) {
            if (props.datosSolicitud?.motivo_solicitud != formData.motivo_solicitud) {
                setOpenAlert({ ...openAlert, open: true });
            } else {
                router.push("/guias-traslado/solicitudes/origen-destino");
            }
        } else {
            if (validateForm()) {
                try {
                    showBackdropLoader();
                    const url = '/solicitudes-guias/update-motivo-solicitud';
                    const { data } = await api.post(url, formData);
                    showSuccessMsg(data.message);
                    getSolicitudActual();
                    router.push("/guias-traslado/solicitudes/origen-destino");
                } catch (error) {
                    showErrorMsg(getResponseError(error));
                } finally {
                    hideBackdropLoader();
                }
            }
        }
    }

    const onConfirm = async () => {
        try {
            setOpenAlert({ ...openAlert, open: false });
            showBackdropLoader();
            const url = '/solicitudes-guias/delete-solicitud-data';
            const { data } = await api.post(url, formData);
            showSuccessMsg(data.message);
            getSolicitudActual();
            router.push("/guias-traslado/solicitudes/origen-destino");
        } catch (error) {
            showErrorMsg(getResponseError(error));
        } finally {
            hideBackdropLoader();
        }
    }

    const onCancel = () => {
        getSolicitudActual();
        setOpenAlert({ ...openAlert, open: false });
    }

    const footerContent = (
        <div>
            <Button
                label="Continuar"
                className="p-button"
                onClick={onConfirm}
            />
            <Button
                label="Cancelar"
                onClick={onCancel}
                className="p-button-danger p-button-text"
            />
        </div>
    );

    const onChangeMotivo = ({ target: { value } }) => {
        setFormData({ ...formData, motivo_solicitud: value })
    }

    useEffect(() => {
        setFormData(props.datosSolicitud);
    }, [props.datosSolicitud])


    return (
        <>
            <Dialog
                draggable={false}
                header={openAlert.title}
                visible={openAlert.open}
                footer={footerContent}
                closable={true}
                breakpoints={{ '768px': '50vw', '425px': '90vw' }}
                onHide={() => setOpenAlert({ ...openAlert, open: false })}
            >
                <p className="my-4">{openAlert.message}</p>
            </Dialog>
            <div className={["mt-4", "div_data"].join(" ")}>

                <div className="grid">

                    <div className="col-12 lg:col-4">
                        <div className="font-bold mb-2">N° ReProMeliMis</div>
                        <div>
                            {maskNroRepromelimis(
                                formData?.usuario_externo?.productor?.repromelimis?.id
                            )}
                        </div>
                    </div>
                    <div className="col-12 lg:col-4">
                        <div className="font-bold mb-2">Tipo persona</div>
                        <div>
                            {
                                formData?.usuario_externo?.productor?.persona_juridica ? "Jurídica" : "Física"
                            }
                        </div>
                    </div>
                    <div className="col-12 lg:col-4">
                        <div className="font-bold mb-2">CUIT/CUIL</div>
                        <div>{formData?.usuario_externo?.productor?.cuit}</div>
                    </div>

                    {props.formData?.usuario_externo?.productor?.razon_social ?
                        <div className="col-12 lg:col-4">
                            <div className="font-bold mb-2">Empresa</div>
                            <div>{formData?.usuario_externo?.productor?.razon_social}</div>
                        </div>
                        :
                        <>
                            <div className="col-12 lg:col-4">
                                <div className="font-bold mb-2">Apellido</div>
                                <div>{formData?.usuario_externo?.productor?.apellido}</div>
                            </div>
                            <div className="col-12 lg:col-4">
                                <div className="font-bold mb-2">Nombres</div>
                                <div>{formData?.usuario_externo?.productor?.nombres}</div>
                            </div>
                        </>
                    }
                </div>

            </div>
            <FloatInput
                className='mt-5 col-12 md:col-6 lg:col-4'
                label="Motivo solicitud"
                errorName="motivo_solicitud"
                formErrors={formErrors}
            >
                <Dropdown name="motivo_solicitud" value={formData?.motivo_solicitud ?? ''} options={options_reasons_request} onChange={onChangeMotivo} className={`p-inputtext-sm w-full ${formErrors?.motivo_solicitud && "p-invalid "}`} />

            </FloatInput>

            <div className='mt-3 flex justify-content-end'>
                <Button type='submit' label='Guardar y continuar' className="p-button-sm p-button-success mr-2" onClick={onSave} ></Button>
            </div>
        </>
    );
}
