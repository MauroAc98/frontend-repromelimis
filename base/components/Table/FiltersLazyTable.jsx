import { Fieldset } from "primereact/fieldset";
import { cloneElement, useEffect, useState } from "react";
import { Button } from "primereact/button";

export default function FiltersLazyTable(props) {
  return (
    <>
    <Fieldset
      className="mb-4"
      legend="Filtros"
      toggleable
      collapsed
    >
      <form
        className="grid"
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
      >
        {cloneElement(props.children, props)}
        <div className="col-12 text-center">
          <Button
            type="button"
            onClick={() => props.setFilters({})}
            label="Limpiar"
            className="p-button-secondary p-button-sm"
            icon="pi pi-eraser"
          />
        </div>
      </form>
    </Fieldset>
    </>
  );
}
