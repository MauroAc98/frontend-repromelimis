
import PageTemplateTramite from "@/base/components/BaseTemplate/PageTemplateTramite";
import FormProdComercializacion from "@/project/components/Prod-comercializacion/FormProdComercializacion";
import ActionButtonsTable from "@/base/components/Table/ActionButtonsTable";
import CustomTable from "@/base/components/Table/CustomTable";
import useGenericDelete from "@/base/hooks/useGenericDelete";
import { useTramiteContext } from "@/project/context/TramiteContext";
import { Button } from 'primereact/button';
import { useState } from "react";
import { useRouter } from "next/router";
import CartMessage from "@/project/components/CartMessage";
export default function ProdComercializacion() {

    const { genericDelete } = useGenericDelete();
    const { datosProdComercializacion, requestStatus, getTramiteActual, datosCapacitacion } = useTramiteContext();
    const [submitAction, setSubmitAction] = useState('add');
    const [editData, setEditData] = useState(null);
    const router = useRouter();

    const handleClickDelete = (rowData) => {
        genericDelete(`/prod-comercializacion/destroy-tmp/${rowData.id}`, null, onSucessDelete);
    };

    const handleClickEdit = (rowData) => {
        setSubmitAction('edit');
        setEditData(rowData);
    }

    function onSucessDelete() {
        getTramiteActual();
        setEditData(null);
    }

    const handleClickContinuar = () => {
        router.push('/tramites/extraccion-miel');
    }

    const actionButtons = (rowData) => {
        return (
            <ActionButtonsTable
                handleClickDelete={() => handleClickDelete(rowData)}
                handleClickEdit={() => handleClickEdit(rowData)}
            />
        )
    }

    const cantidadTemplate = (rowData) => {
        let unidad_medida = "";
        switch (rowData.producto.unidad_medida) {
            case "GR":
                unidad_medida = "(Gramos)"
                break;
            case "U":
                unidad_medida = "(Unidades)"
                break;
        }
        return `${rowData.cantidad} ${unidad_medida}`;
    }

    const columns = [
        {
            field: "producto.nombre_producto",
            header: "Producto",
            align: "center"
        },
        {
            field: "cantidad",
            header: "Cantidad",
            align: "center",
            body: cantidadTemplate
        },
        {
            field: "tipo_comercializacion",
            header: "Tipo Comercialización",
            align: "center"
        },
        {
            field: "action_buttons",
            header: "Acciones",
            align: "center",
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
                <PageTemplateTramite
                    title={'Productos y Comercialización'}
                >
                    <FormProdComercializacion setSubmitAction={setSubmitAction}
                        submitAction={submitAction}
                        editData={editData}
                        setEditData={setEditData} />
                    <CustomTable
                        hidePaginator={true}
                        columns={columns}
                        data={datosProdComercializacion}
                        loading={requestStatus == 'LOADING' ? true : false}
                    />
                    <div className='mt-3 flex justify-content-end px-5 col-12'>
                        <Button label="Continuar" className='w-full md:w-2 md:p-2' onClick={handleClickContinuar} ></Button>
                    </div>
                </PageTemplateTramite>
            }
        </>

    )
}