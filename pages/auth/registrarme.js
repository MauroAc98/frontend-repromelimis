

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useToastContext } from "@/base/context/ToastContext";
import { getAuthMsg, getResponseError, removeAuthMsg } from '@/base/helpers/api';
import useCustomForm from '@/base/hooks/useCustomForm';
import FloatInput from '@/base/components/Form/FloatInput';
import { validateEmail, arePasswordsEqual } from '@/project/helpers/utils';
import { Password } from 'primereact/password';
import { useGeneralContext } from '@/base/context/GeneralContext';
import CartMessage from '@/project/components/CartMessage';
import axios from "axios";

export default function Registrarme() {
    const { formData, handleFormChange, handleSetFormErrors, formErrors } = useCustomForm();
    const { showErrorMsg, showSuccessMsg } = useToastContext()
    const router = useRouter();
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [data, setData] = useState(null);

    const validateForm = () => {
        let valid = true;
        if (!formData?.email || formData?.email.trim() === "") {
            valid = false;
            handleSetFormErrors("email", "Campo requerido");
        } else if (!validateEmail(formData?.email)) {
            valid = false;
            handleSetFormErrors("email", "Email inválido");
        } else {
            handleSetFormErrors("email", "");
        }

        if (!formData?.fullname || formData?.fullname.trim() === "") {
            valid = false;
            handleSetFormErrors("fullname", "Campo requerido");
        }

        if (!formData?.password1 || formData?.password1.trim() === "") {
            valid = false;
            handleSetFormErrors("password1", "Campo requerido");
        } else {
            handleSetFormErrors("password1", "");
        }
        if (!formData?.password2 || formData?.password2.trim() === "") {
            handleSetFormErrors("password2", "Campo requerido");
            valid = false;
        } else if (!arePasswordsEqual(formData?.password1, formData?.password2)) {
            handleSetFormErrors("password1", "Ambas claves deben coincidir");
            handleSetFormErrors("password2", "Ambas claves deben coincidir");
            valid = false;
        } else {
            handleSetFormErrors("password2", "");
        }

        return valid;
    };


    const onRegistrarse = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            showBackdropLoader();
            try {
                const formulario = {
                    'nombre_apellido': formData.fullname,
                    'email': formData.email,
                    'password': formData.password1,
                    'password_confirmation': formData.password2
                }
                const { data } = await axios.post(`${process.env.url_back}/auth-externo/register?`, formulario);
                setData(data);
                setRegisterSuccess(true);
            } catch (error) {
                showErrorMsg(getResponseError(error))
            } finally {
                hideBackdropLoader();
            }
        }
    }

    const onCancel = () => {
        router.push('/auth/login');
    }

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden ');

    const checkMsgs = () => {
        const msg = getAuthMsg();
        if (msg) {
            showSuccessMsg(msg, true);
            removeAuthMsg();
        }
    }

    useEffect(() => {
        checkMsgs();
    }, []);

    return (
        <div className={containerClassName}>
            <div className="mt-5 flex">
                <div>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        {registerSuccess ? (
                            <CartMessage
                                titulo="Registrado correctamente"
                                mensaje={data.message}
                                tituloBoton="Volver al login"
                                classIcon="pi pi-check"
                                url="/auth/login"
                                colorIcon="green"
                            />
                        ) : (

                            <>
                                <div className="text-center mb-5">
                                    <img
                                        className="auth_logo_img"
                                        src={process.env.topbar_logo}
                                        alt="logo"
                                    />
                                    <div className="text-900 text-2xl font-medium mb-3">Registrarse</div>
                                </div>
                                <form onSubmit={onRegistrarse}>

                                    <FloatInput
                                        className="mt-5"
                                        label="Nombre completo"
                                        errorName="fullname"
                                        formErrors={formErrors}
                                    >
                                        <InputText
                                            autoComplete='off'
                                            className={`${formErrors?.fullname && "p-invalid"}`}
                                            name="fullname"
                                            value={formData?.fullname ?? ''}
                                            onChange={handleFormChange} />
                                    </FloatInput>

                                    <FloatInput
                                        className="mt-5"
                                        label="Correo electrónico"
                                        errorName="email"
                                        formErrors={formErrors}
                                    >
                                        <InputText
                                            autoComplete='off'
                                            className={`${formErrors?.email && "p-invalid"}`}
                                            name="email"
                                            value={formData?.email ?? ''}
                                            onChange={handleFormChange} />

                                    </FloatInput>

                                    <FloatInput
                                        className="mt-5"
                                        label="Clave"
                                        errorName="password1"
                                        formErrors={formErrors}
                                    >
                                        <Password
                                            className={`w-full ${formErrors?.password1 && "p-invalid"}`}
                                            name="password1"
                                            value={formData?.password1 ?? ''}
                                            onChange={handleFormChange}
                                            toggleMask
                                            feedback={false} />
                                    </FloatInput>
                                    <FloatInput
                                        className="mt-5"
                                        label="Confirmar clave"
                                        errorName="password2"
                                        formErrors={formErrors}
                                    >
                                        <Password
                                            className={`w-full ${formErrors?.password2 && "p-invalid"}`}
                                            name="password2"
                                            value={formData?.password2 ?? ''}
                                            onChange={handleFormChange}
                                            toggleMask
                                            feedback={false} />
                                    </FloatInput>

                                    <div className="font-bold mt-3 text-xs">
                                        El correo electrónico será utilizado para enviar avisos y notificaciones.
                                    </div>

                                    <div className='containerButton'>
                                        <Button type='submit' label="Registrarme" className="w-full w-6 p-2" ></Button>
                                        <Button type='button' label="Cancelar" className="w-full p-2 w-5 bg-red-400" onClick={onCancel}></Button>
                                    </div>
                                </form>
                            </>

                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}