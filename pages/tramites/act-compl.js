import PageTemplateTramite from "@/base/components/BaseTemplate/PageTemplateTramite";
import CustomTable from "@/base/components/Table/CustomTable";
import { useTramiteContext } from "@/project/context/TramiteContext";
import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import useGenericDelete from "@/base/hooks/useGenericDelete";
import { Button } from 'primereact/button';
import { useRouter } from "next/router";
import { useState } from "react";
import { Form } from "@/project/components/ActividadesComplementarias/Form";
import CartMessage from "@/project/components/CartMessage";

export default function ActividadesComplementarias() {
    const router = useRouter();
    const { datosActividadesComplementarias, requestStatus, getTramiteActual, datosCapacitacion } = useTramiteContext();
    const [submitAction, setSubmitAction] = useState('add');
    const [editData, setEditData] = useState(null);
    const { genericDelete } = useGenericDelete();

    const handleClickContinuar = () => {
        router.push('/tramites');
    }


    /** DELETE */
    function onSucessDelete() {
        getTramiteActual();
        setEditData(null);
    }

    const handleClickDelete = (rowData) => {
        genericDelete(`/actividades/destroy-tmp/${rowData.id}`, null, onSucessDelete);
    };
    /** END DELETE */

    const handleClickEdit = (rowData) => {
        setSubmitAction('edit');
        setEditData(rowData);
    }

    const actionButtons = (rowData) => {
        return (
            <ActionButtonsTable
                handleClickDelete={() => handleClickDelete(rowData)}
                handleClickEdit={() => handleClickEdit(rowData)}
            />
        )
    }

    const columns = [
        {
            field: "tipo_actividad",
            header: "Tipo Actividad"
        },
        {
            field: "actividad",
            header: "Actividad",
        },
        {
            field: "descripcion",
            header: "Descripcion"
        },
        {
            field: "action_buttons",
            header: "Acciones",
            body: actionButtons
        }
    ];

    return (
        <>
            {datosCapacitacion?.tipo_capacitacion === 'SIN_CAPACITACION_DESEA_REALIZAR' ? <CartMessage
                titulo="ERROR"
                mensaje={'No puede acceder al formulario porque ud. eligió la opción que desea realizar capacitación.'}
                tituloBoton="Volver a mis trámites"
                classIcon="pi pi-times"
                url="/tramites"
                colorIcon="red"
            /> :
                <PageTemplateTramite title={'Actividades Complementarias'}>
                    <Form
                        setSubmitAction={setSubmitAction}
                        submitAction={submitAction}
                        editData={editData}
                        setEditData={setEditData}
                    />
                    <CustomTable
                        hidePaginator={true}
                        columns={columns}
                        data={datosActividadesComplementarias}
                        loading={requestStatus == 'LOADING' ? true : false}
                    />
                    <div className='mt-3 flex justify-content-end'>
                        <Button className="p-button-sm" label="Continuar" onClick={handleClickContinuar} />
                    </div>
                </PageTemplateTramite>}
        </>
    )
}