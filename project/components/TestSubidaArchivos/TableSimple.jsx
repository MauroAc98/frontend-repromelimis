import LazyTable from "@/base/components/Table/LazyTable";
import SimpleTable from "@/base/components/Table/SimpleTable";
import useGenericDelete from "@/base/hooks/useGenericDelete";
import { useState } from "react";
import TestFilter from "./Filter";

export default function TableSimple({
  setContent,
  setFormData,
  setFormAction,
}) {
  const [refreshTable, setRefreshTable] = useState(0);

  /** DELETE */
  const { genericDelete } = useGenericDelete();

  function onSucessDelete() {
    setRefreshTable(refreshTable + 1);
  }
  const handleDelete = (rowData) => {
    genericDelete(`/test-archivos/${rowData.id}`, null, onSucessDelete);
  };

  /** NEW */
  const handleNew = () => {
    setContent("form");
    setFormData(null);
    setFormAction("add");
  };

  /** EDIT */
  const handleEdit = (rowData) => {
    setFormData(rowData);
    setContent("form");
    setFormAction("edit");
  };

  const actionButtons = (rowData) => {
    return (
      <>
        <button className="mr-2" onClick={() => handleEdit(rowData)}>
          Editar
        </button>
        <button onClick={() => handleDelete(rowData)}>Eliminar</button>
      </>
    );
  };

  const columns = [
    {
      field: "descripcion",
      header: "Descripcion",
    },
    {
      field: "created_at",
      header: "Fecha Creacion",
    },
    {
      field: "actionButtons",
      header: "Acciones",
      body: actionButtons,
    },
  ];

  return (
    <div className="mt-5">
      <SimpleTable
        title={"Test Archivos"}
        iconTitle={"pi pi-check-circle"}
        url={"test-archivos/list"}
        columns={columns}
        pageSize={5}
        showGeneralSearch={true}
        refreshTable={refreshTable}
        buttonsSection={
          <>
            <button onClick={handleNew}>Nuevo</button>
          </>
        }
      />
      {/* <LazyTable
        columns={columns}
        title={"Test Archivos Lazy"}
        url={"test-archivos/list-paginate"}
        pageSize={5}
        filterTemplate={<TestFilter />}
      /> */}
    </div>
  );
}
