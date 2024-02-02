import FloatInput from "@/base/components/Form/FloatInput";
import { useUserContext } from "@/base/context/userContext";
import { InputText } from "primereact/inputtext";
import StaticText from "@/base/components/Form/StaticText";
export default function UserEmail({ type = "INPUT" }) {
  const { user } = useUserContext();

  if (type == "INPUT") {
    return (
      <FloatInput className="col-12 md:col-4 mt-3" label="Correo Electronico">
        <InputText name="email" value={user?.email} readOnly />
        <small className="font-bold">
          Si desea cambiar su correo, dirijase a Mi Cuenta.
        </small>
      </FloatInput>
    );
  }

  return (
    <div className="col-12 md:col-4 mt-3">
      <StaticText
        label="Correo Electronico"
        value={user?.email}
        className=""
      />
      <small className="font-bold">
        Si desea cambiar su correo, dirijase a Mi Cuenta.
      </small>
    </div>
  );
}
