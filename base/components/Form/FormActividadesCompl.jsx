import { Dropdown } from 'primereact/dropdown';
import FloatInput from '../Form/FloatInput';
import { useEffect, useState } from "react";
import useCustomForm from '@/base/hooks/useCustomForm';
import { Button } from 'primereact/button';
import { useGeneralContext } from '@/base/context/GeneralContext';
import { useToastContext } from "@/base/context/ToastContext";
import { getAuthMsg, getResponseError, removeAuthMsg } from '@/base/helpers/api';
import { InputText } from 'primereact/inputtext';
import { useTramiteContext } from '@/project/context/TramiteContext';
import api, { MEDIA_HEADERS } from "@/base/helpers/api";
import useGetActividadesCom from "@/base/hooks/endpointsHooks/useGetActividadesCom";
import SimpleLoader from '../Loader/SimpleLoader';


export default function FormActividadesCompl() {
    const { formData, setFormData, handleFormChange, handleSetFormErrors, formErrors } = useCustomForm();
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
    const { showErrorMsg, showSuccessMsg } = useToastContext()
    const { datosTramite, getTramiteActual } = useTramiteContext();

    const [actividadOptions, setActividadOptions] = useState({
        requestStatus: "LOADING",
        data: [],
    });

    const [actividadesObject, setActividadesObject] = useState([]);


    const { getActividades } = useGetActividadesCom(onSuccessGetActividades);

    function onSuccessGetActividades(response) {
        setActividadesObject(response);
        console.log(response);
        setActividadOptions({
            requestStatus: "SUCCESS",
            data: response.map(item => item),
        });
    }

    const tipo_actividad = [
        { label: 'Fabrica', value: 'fabrica' },
        { label: 'Vende', value: 'vende' }
    ];

    const actividad = [
        { label: 'Cajones', value: 'cajones' },
        { label: 'Otros', value: 'otros' },
    ];

    const sendForm = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            showBackdropLoader();
            try {
                const actividadSeleccionado = actividadesObject.find(actividad => actividad.nombre_producto === formData.producto);
                const { data } = await api.post(`actividad-complementaria/create/${datosTramite.id}/${actividadSeleccionado.id}`, formData, MEDIA_HEADERS);
                showSuccessMsg(data.message)
                getTramiteActual();
            } catch (error) {
                showErrorMsg(getResponseError(error))
            } finally {
                hideBackdropLoader();
            }
        }

    }

    const validateForm = () => {
        let valid = true;
        

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
        checkMsgs();
        getActividades();
    }, []);

    if (
        actividadOptions.requestStatus == "LOADING"
    ) {
        return (
            <div className="col-12">
                <SimpleLoader />
            </div>
        );
    }

    return (
        <>
            <form onSubmit={sendForm}>

                <div className='mt-7 grid'>
                    
                </div>
                <div className='mt-3 flex justify-content-center'>
                    <Button type='submit' label='Guardar' className="w-full md:w-2 md:p-2" ></Button>
                </div>
            </form>

        </>

    );
}
