
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useToastContext } from "@/base/context/ToastContext";
import { getAuthMsg, getResponseError, removeAuthMsg } from '@/base/helpers/api';
import useCustomForm from '@/base/hooks/useCustomForm';
import FloatInput from '@/base/components/Form/FloatInput';
import { arePasswordsEqual } from '@/project/helpers/utils';
import { Password } from 'primereact/password';
import { useGeneralContext } from '@/base/context/GeneralContext';
import CartMessage from '@/project/components/CartMessage';
import axios from "axios";

export default function ResetearClave() {
    const { formData, setFormData, handleFormChange, handleSetFormErrors, formErrors } = useCustomForm();
    const { showErrorMsg, showSuccessMsg } = useToastContext()
    const router = useRouter();
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
    const [resetPass, setResetPass] = useState('initial');
    const [data, setData] = useState(null);

    const validateForm = () => {
        let valid = true;
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


    const onResetearClave = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            showBackdropLoader();
            try {
                const formulario = {
                    'email': formData.email,
                    'token': formData.token,
                    'password': formData.password1,
                    'password_confirmation': formData.password2
                }
                const { data } = await axios.post(`${process.env.url_back}/auth-externo/reset-password?`, formulario);
                setData(data);
                setResetPass('successResetPass');
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


    const processQueryParams = async () => {
        if (router.isReady) {
            const token = router.query?.token;
            const email = router.query?.email;

            if (email && token) {
                showBackdropLoader();
                try {
                    const formulario = {
                        'email': email,
                        'token': token,
                    }
                    const { data } = await axios.post(`${process.env.url_back}/auth-externo/verify-reset-pass-token?`, formulario);
                    if (data.error) {
                        setResetPass('error');
                        setData(data);
                    } else {
                        setFormData((prevVal) => ({ ...prevVal, email: email, token: token }));
                        setResetPass('success');
                    }
                } catch (error) {
                    showErrorMsg(getResponseError(error));
                } finally {
                    hideBackdropLoader();
                }
            }
        }
    };

    useEffect(() => {
        processQueryParams();
    }, [router.query]);


    useEffect(() => {
        checkMsgs();
    }, []);

    return (
        <div className={containerClassName}>
            <div className="mt-5 flex">
                <div>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        {resetPass == 'success' ? (
                            <>
                                <div className="text-center mb-5">
                                    <img
                                        className="auth_logo_img"
                                        src={process.env.topbar_logo}
                                        alt="logo"
                                    />
                                    <div className="text-900 text-2xl font-medium mb-3">Resetear clave</div>
                                </div>
                                <form onSubmit={onResetearClave}>
                                    <FloatInput
                                        className="mt-5"
                                        label="Nueva clave"
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

                                    <div className='containerButton'>
                                        <Button type='submit' label="Confirmar" className="w-full w-6 p-2" ></Button>
                                        <Button type='button' label="Cancelar" className="w-full p-2 w-5 bg-red-400" onClick={onCancel}></Button>
                                    </div>
                                </form>
                            </>
                        ) : resetPass == 'error' ? (<CartMessage
                            titulo="Error de verificación"
                            mensaje={data.error}
                            tituloBoton="Volver al login"
                            classIcon="pi pi-times"
                            url="/auth/login"
                            colorIcon="red"
                        />) : resetPass == 'successResetPass' ? (
                            <CartMessage
                                titulo="Restablecido con éxito"
                                mensaje={data.message}
                                tituloBoton="Volver al login"
                                classIcon="pi pi-check"
                                url="/auth/login"
                                colorIcon="green"
                            />
                        ) : null}

                    </div>
                </div>
            </div>
        </div>
    );
}