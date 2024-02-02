import FloatInput from "@/base/components/Form/FloatInput";
import { InputText } from "primereact/inputtext";
import useCustomForm from "@/base/hooks/useCustomForm";
import { useEffect, useState } from "react";
import { useUserContext } from "@/base/context/userContext";
import { Button } from "primereact/button";
import api, { addAuthMsg, getResponseError } from "@/base/helpers/api";
import { useToastContext } from "@/base/context/ToastContext";
import { removeToken } from "@/base/helpers/api";
import { useRouter } from "next/router";
import { useGeneralContext } from "@/base/context/GeneralContext";
import ModifyEmail from "./ModifyEmail";

export default function MyAccount() {
  const {
    formData,
    setFormData,
    handleFormChange,
    formErrors,
    handleSetFormErrors,
  } = useCustomForm();
  const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
  const { user } = useUserContext();
  const { showErrorMsg } = useToastContext();
  const [modifyPass, setModfifyPass] = useState(false);
  const [showModifyEmail, setShowModifyEmail] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    let valid = true;
    if (!formData?.nombre_apellido || formData?.nombre_apellido === "") {
      valid = false;
      handleSetFormErrors("nombre_apellido", "Campo requerido");
    }

    if (modifyPass) {
      if (!formData?.password || formData?.password === "") {
        valid = false;
        handleSetFormErrors("password", "Campo requerido");
      }
    }

    return valid;
  };

  const onSuccessUpdate = (msg) => {
    removeToken();
    addAuthMsg(`${msg}`);
    router.push("/auth/login");
  };

  const updateMe = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        showBackdropLoader();
        const { data } = await api.post("/auth-externo/update-me", formData);
        // Eliminamos token, creamos msj para pantalla de login, y redirijmos a login
        onSuccessUpdate(data.message);
      } catch (error) {
        showErrorMsg(getResponseError(error));
        hideBackdropLoader();
      }
    }
  };

  const onChangeModifyPass = () => {
    setModfifyPass(!modifyPass);
    // Limpio el password para no enviar
    if (modifyPass) {
      setFormData({ ...formData, password: "" });
    }
  };

  /** Colocamos datos del usuario actual */
  useEffect(() => {
    setFormData({
      nombre_apellido: user.nombre_apellido,
      email: user.email,
    });
  }, []);

  return (
    <>
      <ModifyEmail
        showDialog={showModifyEmail}
        onHide={() => setShowModifyEmail(false)}
      />
      <form className="grid mt-2" onSubmit={updateMe} autoComplete="off">
        <FloatInput
          className="col-12 mt-3"
          label="Nombre y apellido"
          errorName={"nombre_apellido"}
          formErrors={formErrors}
        >
          <InputText
            className={`${formErrors?.nombre_apellido && "p-invalid"}`}
            name="nombre_apellido"
            value={formData?.nombre_apellido ?? ""}
            onChange={handleFormChange}
          />
        </FloatInput>

        {modifyPass && (
          <FloatInput
            className="col-12 md:col-6 mt-3"
            label="Contraseña"
            errorName={"password"}
            formErrors={formErrors}
          >
            <InputText
              className={`${formErrors?.password && "p-invalid"}`}
              name="password"
              value={formData?.password ?? ""}
              onChange={handleFormChange}
            />
          </FloatInput>
        )}

        <div className="flex gap-2 col-12 mt-3">
          <Button
            onClick={onChangeModifyPass}
            type="button"
            label={`${modifyPass ? "No" : ""} Cambiar Contraseña`}
            className="p-button-info"
          />
          <Button
            onClick={() => setShowModifyEmail(true)}
            type="button"
            label={`Modificar email`}
            className="p-button-info"
          />
        </div>

        {user.inhabilitado && (
          <div className="col-12">
            <div className="p-message p-message-error p-3">
              Usted se encuentra inhabilitado para realizar trámites.
              <div className="mt-3">
                {user.motivo_inhabilitado}
              </div>
            </div>
          </div>
        )}

        <div className="col-12 mt-3 flex justify-content-end">
          <Button
            type="submit"
            label="Guardar"
            className="p-button-success mr-2"
          />
        </div>
      </form>
    </>
  );
}
