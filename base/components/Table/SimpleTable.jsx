import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { useToastContext } from "@/base/context/ToastContext";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import api from "@/base/helpers/api";

export default function SimpleTable({
  columns,
  url,
  params,
  pageSize,
  sortField,
  sortOrder,
  showGeneralSearch,
  title,
  iconTitle,
  refreshTable,
  buttonsSection
}) {
  const { showErrorMsg } = useToastContext();

  // Estado donde se almacenan los registros
  const [data, setData] = useState([]);
  // Loading en tabla
  const [loading, setLoading] = useState(false);
  //   Estado para almacenar valor de input
  const [generalSearch, setGeneralSearch] = useState("");
  //   Estado para almacenar de filtro general
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
  });

  /** Funcion cada vez que ingreso algo en input de filtro */
  const handleChangeGeneralSearch = (e) => {
    // Valor de input
    const value = e.target.value;
    // Tomamos valor de estado
    const _filters = { ...filters };
    // Cambiamos solo el value
    _filters["global"].value = value;
    // Seteamos a filtros
    setFilters(_filters);
    // Seteamos a input
    setGeneralSearch(value);
  };

  /** Peticion al back */
  const getDataTable = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(url, {
        params: params,
      });
      setData(data);
    } catch (error) {
      showErrorMsg("Ocurrió un error al traer los datos.");
    } finally {
      setLoading(false);
    }
  };

  /** Crea columnas */
  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        sortable={col.sortable}
      />
    );
  });

  const paginatorTemplate = {
    layout:
      "CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown",
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
      ];

      return (
        <>
          <span className="mx-1 pl-6">Items por pagina: </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span>
          Mostrando {options.first} - {options.last} de {options.totalRecords}{" "}
          registros
        </span>
      );
    },
  };

  useEffect(() => {
    getDataTable();
  }, [refreshTable]);

  return (
    <>
      <div className="header_table">
        <div className="page_title">
          <i className={iconTitle} /> {title}
        </div>
        {/* Si le paso botones, los muestro */}
        {typeof buttonsSection === "object" && (
          <div className="buttons">
            <div className="buttons_section">{buttonsSection}</div>
          </div>
        )}
      </div>

      {/* Busqueda General */}
      {showGeneralSearch && (
        <div className="mb-4">
          <span className="p-input-icon-left w-full md:w-5">
            <i className="pi pi-search" />
            <InputText
              value={generalSearch}
              onChange={handleChangeGeneralSearch}
              placeholder="Buscar"
            />
          </span>
        </div>
      )}

      <DataTable
        filters={showGeneralSearch ? filters : null}
        value={data}
        removableSort
        responsiveLayout="scroll"
        paginator
        first={0}
        rows={pageSize}
        loading={loading}
        sortOrder={sortOrder}
        sortField={sortField}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName="justify-content-end"
      >
        {dynamicColumns}
      </DataTable>
    </>
  );
}
