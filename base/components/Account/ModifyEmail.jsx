import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import FloatInput from "@/base/components/Form/FloatInput";
import useCustomForm from "@/base/hooks/useCustomForm";
import { Button } from "primereact/button";
import { useGeneralContext } from "@/base/context/GeneralContext";
import { useToastContext } from "@/base/context/ToastContext";
import api, {
  addAuthMsg,
  getResponseError,
  removeToken,
} from "@/base/helpers/api";
import { useRouter } from "next/router";
import { validateEmail } from "@/project/helpers/utils";

export default function ModifyEmail(props) {
  const { formData, handleFormChange, formErrors, handleSetFormErrors } =
    useCustomForm();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { showErrorMsg } = useToastContext();
  const router = useRouter();

  const onHide = () => {
    props.onHide();
  };

  const validateForm = () => {
    let valid = true;
    if (!formData?.email || formData?.email === "") {
      valid = false;
      handleSetFormErrors("email", "Campo requerido");
    } else if (!validateEmail(formData?.email)) {
      valid = false;
      handleSetFormErrors("email", "Email inválido");
    }

    return valid;
  };

  const onSubmitForm = async () => {
    if (validateForm()) {
      try {
        showBackdropLoader();
        const { data } = await api.post("/auth-externo/modify-email", formData);
        // Eliminamos token, creamos msj para pantalla de login, y redirijmos a login
        removeToken();
        addAuthMsg(data.message);
        router.push("/auth/login");
      } catch (error) {
        showErrorMsg(getResponseError(error));
        hideBackdropLoader();
      }
    }
  };

  return (
    <Dialog
      header={"Modificar Email"}
      visible={props.showDialog}
      onHide={onHide}
      style={{ width: "40vw" }}
      position="center"
      draggable={false}
    >
      <div className="grid mt-3">
        <FloatInput
          className="col-12 mt-3"
          label="Email"
          errorName={"email"}
          formErrors={formErrors}
        >
          <InputText
            autoComplete="off"
            className={`${formErrors?.email && "p-invalid"}`}
            name="email"
            value={formData?.email ?? ""}
            onChange={handleFormChange}
          />
        </FloatInput>
        <div className="flex justify-content-end col-12 mt-3">
          <Button
            onClick={onSubmitForm}
            type="button"
            label={`Modificar`}
            className="p-button-success"
          />
        </div>
      </div>
    </Dialog>
  );
}
