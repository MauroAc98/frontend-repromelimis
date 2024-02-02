import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

export default function CustomTable({
  data,
  columns,
  loading,
  iconTitle,
  title,
  buttonsSection,
  showGeneralSearch,
  customGeneralSearchState,
  hidePaginator,
  hideHeader ,
}) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: "contains" },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        sortable={col.sortable}
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        align={col.align}
        style={col.style}
      />
    );
  });

  /** FILTERS */
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const onCustomGlobalFilterChange = (value) => {
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  /** END FILTERS */

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

  /** Si le paso un estado para el filtro general */
  useEffect(() => {
    if (customGeneralSearchState != undefined) {
      onCustomGlobalFilterChange(customGeneralSearchState);
    }
  }, [customGeneralSearchState]);

  return (
    <>
      {!hideHeader && (
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
      )}

      {/* Busqueda General */}
      {showGeneralSearch && (
        <div className="mb-4">
          <span className="p-input-icon-left w-full md:w-5">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Buscar"
            />
          </span>
        </div>
      )}

      {/* Margin si tengo buttons y no tengo el filter */}
      {!showGeneralSearch && buttonsSection && (
        <div className="separator"></div>
      )}

      <DataTable
        value={data}
        paginator
        rows={hidePaginator ? 1000 : 5}
        responsiveLayout="scroll"
        filters={filters}
        loading={loading}
        paginatorTemplate={hidePaginator ? <></> : paginatorTemplate}
        paginatorClassName="justify-content-end"
      >
        {dynamicColumns}
      </DataTable>
    </>
  );
}
