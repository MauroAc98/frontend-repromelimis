import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import FiltersLazyTable from "@/base/components/Table/FiltersLazyTable";
import api from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";
import { InputText } from "primereact/inputtext";

export default function LazyTable({
  columns,
  pageSize,
  url,
  params,
  filterTemplate,
  refreshTable,
  buttonsSection,
  title,
  iconTitle,
  selectionMode,
  selection,
  onSelectionChange,
  showGeneralSearch,
  initialFilters,
}) {
  const { showErrorMsg } = useToastContext();
  // Estado donde se almacenan los registros
  const [data, setData] = useState([]);
  // Params de la tabla
  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: pageSize,
    page: 0,
  });
  // Loading en tabla
  const [loading, setLoading] = useState(false);
  // Estado para almacenar total de registros
  const [totalRecords, setTotalRecords] = useState(0);
  // Estado para almacenar los filtros
  const [filters, setFilters] = useState(initialFilters ?? {});
  // Estado para almacenar general search
  const [generalSearch, setGeneralSearch] = useState("");

  /** Crea columnas */
  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        align={col.align}
      />
    );
  });

  /** Al hacer click en paginacion */
  const onPage = (event) => {
    // Sumamos +1 porque laravel cuenta las paginas a partir de 1 y no 0
    const _page = event.page + 1;
    setLazyParams({ ...event, page: _page });
  };

  /** Peticion al back */
  const loadLazyData = async () => {
    setLoading(true);

    try {
      const { data } = await api.get(url, {
        params: {
          page: lazyParams.page,
          pageSize: lazyParams.rows,
          filters: JSON.stringify(filters),
          search: generalSearch,
          ...params,
        },
      });

      setData(data.data);
      setTotalRecords(data.total);
    } catch (error) {
      showErrorMsg("Ocurrió un error al traer los datos.");
    } finally {
      setLoading(false);
    }
  };

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

  /** Cada vez que cambie algun param de la tabla, los params, o filters, llamo al endpoint */
  useEffect(() => {
    loadLazyData();
  }, [lazyParams, filters, generalSearch, refreshTable, params]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Si le paso un componente para filtros, lo muestro */}
      {typeof filterTemplate === "object" && (
        <FiltersLazyTable filters={filters} setFilters={setFilters}>
          {filterTemplate}
        </FiltersLazyTable>
      )}

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
              onChange={(e) => setGeneralSearch(e.target.value)}
              placeholder="Buscar"
            />
          </span>
        </div>
      )}

      <DataTable
        lazy
        value={data}
        responsiveLayout="scroll"
        paginator
        onPage={onPage}
        first={lazyParams.first}
        rows={lazyParams.rows}
        totalRecords={totalRecords}
        loading={loading}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName="justify-content-end"
        selectionMode={selectionMode}
        selection={selection}
        onSelectionChange={onSelectionChange}
      >
        {dynamicColumns}
      </DataTable>
    </>
  );
}
