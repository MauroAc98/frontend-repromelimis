import FormErrorMsg from "@/base/components/Form/FormErrorMsg";

export default function FloatInput({
  className,
  label,
  children,
  errorName,
  formErrors,
  inputGroup,
  addon,
}) {
  return (
    <div className={className}>
      <div className={`${inputGroup ? "p-inputgroup" : ""}`}>
        <span className="p-float-label">
          {children}
          <label>{label}</label>
        </span>
        {addon}
      </div>
      <FormErrorMsg inputName={errorName} formErrors={formErrors} />
    </div>
  );
}
