
import PageTemplateTramite from "@/base/components/BaseTemplate/PageTemplateTramite";
import ButtonsSection from "@/base/components/Table/ButtonsSection";
import CustomTable from "@/base/components/Table/CustomTable";
import DialogExtraccionMiel from "@/project/components/ExtraccionMiel/DialogExtraccionMiel";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { useRouter } from "next/router";
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { useState } from "react";
import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import useGenericDelete from "@/base/hooks/useGenericDelete";
import CartMessage from "@/project/components/CartMessage";

export default function ExtraccionMiel() {
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();
    const [submitAction, setSubmitAction] = useState('');
    const { datosExtraccionMiel, requestStatus, getTramiteActual, datosCapacitacion } = useTramiteContext();
    const { genericDelete } = useGenericDelete();
    const [extraccionData, setExtraccionData] = useState(null);

    const handleClickContinuar = () => {
        router.push('/tramites/act-compl');
    }

    const handleClickNuevo = () => {
        setShowForm(true);
        setSubmitAction('add');
    }
    function onSucessDelete() {
        getTramiteActual();
    }

    const handleClickDelete = (rowData) => {
        genericDelete(`/extraccion-miel/destroy-tmp/${rowData.id}`, null, onSucessDelete);
    };

    const handleClickEdit = (rowData) => {
        setExtraccionData(rowData);
        setShowForm(true);
        setSubmitAction('edit');
    }

    const HabilitacionTemplate = (rowData) => {
        return (
            <Tag value={rowData.habilitada ? "SI" : "NO"} />
        );
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
            field: "propietario",
            header: "Propietario",
            align: "center"
        },
        {
            field: "habilitada",
            header: "Habilitada",
            body: HabilitacionTemplate,
            align: "center"
        },
        {
            field: "action_buttons",
            header: "Acciones",
            body: actionButtons,
            align: "center"
        }
    ];

    return (
        <>

            <DialogExtraccionMiel
                setShowForm={setShowForm}
                showForm={showForm}
                submitAction={submitAction}
                extraccionData={extraccionData}
                setExtraccionData={setExtraccionData}
            />
            {datosCapacitacion?.tipo_capacitacion === 'SIN_CAPACITACION_DESEA_REALIZAR' ? <CartMessage
                titulo="ERROR"
                mensaje={'No puede acceder al formulario porque ud. eligió la opción que desea realizar capacitación.'}
                tituloBoton="Volver a mis trámites"
                classIcon="pi pi-times"
                url="/tramites"
                colorIcon="red"
            /> :
                <PageTemplateTramite
                    title={'Extracción de miel'}
                >
                    <CustomTable
                        hidePaginator={true}
                        columns={columns}
                        data={datosExtraccionMiel}
                        loading={requestStatus == 'LOADING' ? true : false}
                        buttonsSection={<ButtonsSection handleClickAdd={handleClickNuevo} />}
                    />
                    <div className='mt-3 flex justify-content-end'>
                        <Button className="p-button-sm" label="Continuar" onClick={handleClickContinuar} />
                    </div>
                </PageTemplateTramite>
            }
        </>

    )
}