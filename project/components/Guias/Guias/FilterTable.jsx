import FloatInput from "@/base/components/Form/FloatInput";
import { useRouter } from "next/router";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";

export default function FilterTable({ filters, setFilters }) {
  const router = useRouter();

  const handleSearch = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
  };

  return (
    <>
      <FloatInput className="col-12 lg:col-6 mt-3" label="Nro de guia">
        <InputText
          name="nro"
          onChange={handleSearch}
          value={filters.nro ?? ""}
        />
      </FloatInput>
    </>
  );
}
