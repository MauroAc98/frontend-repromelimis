import { Dropdown } from 'primereact/dropdown';
import FloatInput from '../../../base/components/Form/FloatInput';
import { useEffect } from "react";
import useCustomForm from '@/base/hooks/useCustomForm';
import { Button } from 'primereact/button';
import { useGeneralContext } from '@/base/context/GeneralContext';
import { useToastContext } from "@/base/context/ToastContext";
import api, { getAuthMsg, getResponseError, removeAuthMsg } from '@/base/helpers/api';
import { InputText } from 'primereact/inputtext';
import FormDireccion from '@/base/components/Direccion/FormDireccion';
import { useTramiteContext } from '@/project/context/TramiteContext';


export default function FormExtraccionMiel(props) {
    const { formData, setFormData, handleFormChange, handleSetFormErrors, formErrors, resetForm } = useCustomForm();
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
    const { showErrorMsg, showSuccessMsg } = useToastContext()
    const { getTramiteActual, datosTramite } = useTramiteContext();

    const options_enabled = [
        { label: 'SI', value: true },
        { label: 'NO', value: false }
    ];


    const sendForm = async (e) => {
        e.preventDefault();


        if (validateForm()) {
            showBackdropLoader();
            try {

                const url =
                    props.submitAction == "add"
                        ? "/extraccion-miel/add-tmp"
                        : `/extraccion-miel/edit-tmp/${formData.id}`;

                // Copia de formData para manipularlo
                let formDataSend = { ...formData };

                // Concatenamos el id_tramite, si vamos a crear
                if (props.submitAction == "add") {
                    formDataSend = { ...formDataSend, id_tramite: datosTramite.id };
                }

                const { data } = await api.post(url, formDataSend);
                // Si todo esta OK, actualizamos tabla y ocultamos dialog
                getTramiteActual();
                showSuccessMsg(data.message);
                props.onHideForm();
            } catch (error) {
                showErrorMsg(getResponseError(error))
            } finally {
                hideBackdropLoader();
            }
        }

    }

    const validateForm = () => {
        let valid = true;
        if (!formData?.propietario || formData?.propietario === "") {
            valid = false;
            handleSetFormErrors("propietario", "Campo requerido");
        } else {
            handleSetFormErrors("propietario", "");
        }

        if (formData?.habilitada === undefined) {
            valid = false;
            handleSetFormErrors("habilitada", "Campo requerido");
        } else {
            handleSetFormErrors("habilitada", "");
        }

        return valid;
    };

    const checkMsgs = () => {
        const msg = getAuthMsg();
        if (msg) {
            showSuccessMsg(msg, true);
            removeAuthMsg();
        }
    }

    useEffect(() => {
        setFormData(props.extraccionData);
    }, [props.extraccionData]);

    useEffect(() => {
        checkMsgs();
    }, []);

    return (
        <>
            <form onSubmit={sendForm}>

                <div className='mt-7 grid'>

                    <FloatInput
                        className="mt-2 col-12 md:col-4"
                        label="Propietario"
                        errorName="propietario"
                        formErrors={formErrors}
                    >
                        <InputText
                            autoComplete='off'
                            className={`${formErrors?.propietario && "p-invalid"}`}
                            name="propietario"
                            value={formData?.propietario ?? ''}
                            onChange={handleFormChange} />

                    </FloatInput>

                    <FloatInput
                        className='mt-2 col-12 md:col-4'
                        label="Habilitada"
                        errorName="habilitada"
                        formErrors={formErrors}
                    >
                        <Dropdown name="habilitada" value={formData?.habilitada ?? ''} options={options_enabled} onChange={handleFormChange} className={`p-inputtext-sm w-full ${formErrors?.habilitada && "p-invalid "}`} />
                    </FloatInput>
                    <FormDireccion
                        objName="direccion"
                        inputValue={formData?.direccion}
                        errorValue={formErrors?.direccion}
                        handleFormChange={handleFormChange}
                        formData={formData}
                        formErrors={formErrors}
                    />
                </div>
                <div className='mt-3 flex justify-content-center gap-2'>
                    <Button type='submit' label='Guardar' className="p-button-sm p-button-success mr-2" ></Button>
                    <Button
                        type="button"
                        label="Cancelar"
                        className="p-button-sm p-button-danger"
                        onClick={props.onHideForm}
                    />
                </div>
            </form>

        </>

    );
}
