import Search from "./Search";
import MeliponicultorData from "./MeliponicultorData";

export default function MeliponicultorResponsable(props) {
  return (
    <>
      <h5 className="col-12 mt-3">Meliponicultor Responsable</h5>
      {props.formData?.productor_responsable ? (
        <MeliponicultorData
        productor_responsable={
            props.formData?.productor_responsable
          }
          setFormData={props.setFormData}
        />
      ) : (
        <Search
          formErrors={props.formErrors}
          setFormData={props.setFormData}
          handleSetFormErrors={props.handleSetFormErrors}
        />
      )}
    </>
  );
}
