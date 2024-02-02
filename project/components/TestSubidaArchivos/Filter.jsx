export default function TestFilter({ filters, setFilters }) {
  const handleSearch = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
  };

  return (
    <>
      <label>Descripcion: </label>
      <input
        type="text"
        name="descripcion"
        value={filters.descripcion ?? ""}
        onChange={handleSearch}
      />
    </>
  );
}
