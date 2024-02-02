
import PageTemplateTramite from "@/base/components/BaseTemplate/PageTemplateTramite";
import CustomTable from "@/base/components/Table/CustomTable";
import DialogMeliponarios from "@/project/components/Meliponarios/DialogMeliponarios";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { Button } from 'primereact/button';
import { useState } from "react";
import { Tag } from 'primereact/tag';
import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import useGenericDelete from "@/base/hooks/useGenericDelete";
import ButtonsSection from "@/base/components/Table/ButtonsSection";
import { useRouter } from "next/router";
import CartMessage from "@/project/components/CartMessage";
import SimpleLoader from "@/base/components/Loader/SimpleLoader";

export default function Meliponarios() {
    const router = useRouter();
    const { datosMeliponarios, requestStatus, getTramiteActual, datosCapacitacion } = useTramiteContext();
    const { genericDelete } = useGenericDelete();
    const [showForm, setShowForm] = useState(false);
    const [meliData, setMeliData] = useState(null);
    const [submitAction, setSubmitAction] = useState('');

    const handleClickContinuar = () => {
        router.push('/tramites/prod-comercializacion');
    }

    const handleClickNuevo = () => {
        setShowForm(true);
        setSubmitAction('add');
    }

    /** DELETE */
    function onSucessDelete() {
        getTramiteActual();
    }

    const handleClickDelete = (rowData) => {
        genericDelete(`/meliponarios/destroy-tmp/${rowData.id}`, null, onSucessDelete);
    };
    /** END DELETE */

    const handleClickEdit = (rowData) => {
        setMeliData(rowData);
        setShowForm(true);
        setSubmitAction('edit');
    }

    const actionButtons = (rowData) => {
        return (
            <ActionButtonsTable
                handleClickDelete={rowData.id_registro_actual ? undefined : () => handleClickDelete(rowData)}
                handleClickEdit={() => handleClickEdit(rowData)}
                moreButtons={
                    <>
                        <Button
                            tooltip="Colmenas"
                            icon="pi pi-home"
                            className="p-button-sm p-button-outlined p-button-secondary"
                            onClick={() => router.push(`/tramites/meliponarios/colmenas?id_meliponario=${rowData.id}`)}
                        />
                    </>
                }
            />
        )
    }

    const tipoProduccionTemplate = (rowData) => {
        if (rowData.tipo_produccion == "CONVENCIONAL") {
            return <Tag value="CONVENCIONAL" />
        }
        return <Tag value="AGRO ECOLOGICA" />
    }

    const estadoTemplate = (rowData) => {
        if (rowData.estado == "ACTIVO") {
            return <Tag severity="success" value={rowData.estado} />
        }
        return <Tag severity="danger" value={rowData.estado} />
    }

    const columns = [
        {
            field: "nro",
            header: "N°",
        },
        {
            field: "tipo_produccion",
            header: "Tipo Producción",
            body: tipoProduccionTemplate
        },
        {
            field: "nro_sucp",
            header: "N° SUCP",
        },
        {
            field: "estado",
            header: "Estado",
            body: estadoTemplate
        },
        {
            field: "action_buttons",
            header: "Acciones",
            align: 'center',
            body: actionButtons
        }
    ];


    return (
        <>
            {requestStatus === 'LOADING' && <SimpleLoader />}
            <DialogMeliponarios
                setShowForm={setShowForm}
                showForm={showForm}
                meliData={meliData}
                setMeliData={setMeliData}
                submitAction={submitAction}
                getTramiteActual={getTramiteActual}
            />
            {datosCapacitacion?.tipo_capacitacion === 'SIN_CAPACITACION_DESEA_REALIZAR' ? <CartMessage
                titulo="ERROR"
                mensaje={'No puede acceder al formulario porque ud. eligió la opción que desea realizar capacitación.'}
                tituloBoton="Volver a mis trámites"
                classIcon="pi pi-times"
                url="/tramites"
                colorIcon="red"
            /> :
                <PageTemplateTramite title={'Meliponarios'}>
                    <CustomTable
                        hidePaginator={true}
                        columns={columns}
                        data={datosMeliponarios}
                        loading={requestStatus == 'LOADING' ? true : false}
                        buttonsSection={<ButtonsSection handleClickAdd={handleClickNuevo} />}
                    />
                    <div className='mt-3 flex justify-content-end'>
                        <Button className="p-button-sm" label="Continuar" onClick={handleClickContinuar} />
                    </div>
                </PageTemplateTramite>}
        </>
    )
}