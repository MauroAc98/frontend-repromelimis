
import axios from "axios";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useToastContext } from "@/base/context/ToastContext";
import { useUserContext } from "@/base/context/userContext";
import { getAuthMsg, getResponseError, removeAuthMsg } from '@/base/helpers/api';
import useCustomForm from '@/base/hooks/useCustomForm';
import FloatInput from '@/base/components/Form/FloatInput';
import { validateEmail } from '@/project/helpers/utils';
import { setToken } from '@/base/helpers/api';
import { useGeneralContext } from '@/base/context/GeneralContext';


export default function Login() {
    const { showErrorMsg, showSuccessMsg } = useToastContext()
    const { setSessionData } = useUserContext();
    const router = useRouter();
    const { formData, handleFormChange, handleSetFormErrors, formErrors } = useCustomForm();
    const [verifySuccess, setVerifySuccess] = useState(true);
    const [data, setData] = useState(null);
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();

    const validateForm = () => {
        let valid = true;
        if (!formData?.email || formData?.email === "") {
            valid = false;
            handleSetFormErrors("email", "Campo requerido");
        } else if (!validateEmail(formData?.email)) {
            valid = false;
            handleSetFormErrors("email", "Email inválido");
        }

        if (!formData?.password || formData?.password === "") {
            valid = false;
            handleSetFormErrors("password", "Campo requerido");
        }

        return valid;
    };

    const onLogin = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            showBackdropLoader();
            try {
                const formulario = {
                    'email': formData.email,
                    'password': formData.password
                }
                const { data } = await axios.post(`${process.env.url_back}/auth-externo/login?`, formulario);
                setData(data);
                if (data.error) {
                    setVerifySuccess(false);
                    return;
                }
                // code 200
                setSessionData(data.user);
                setToken(data.access_token)
                router.push('/');
            } catch (error) {
                // code != 200
                showErrorMsg(getResponseError(error))
            } finally {
                hideBackdropLoader();
            }
        }
    }

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

    const checkMsgs = () => {
        const msg = getAuthMsg();
        if (msg) {
            showSuccessMsg(msg, true);
            removeAuthMsg();
        }
    }

    const eventClave = () => {
        router.push('/auth/olvide-mi-clave');
    }

    const onRegistrarme = () => {
        router.push('/auth/registrarme');
    }

    const sendVerifyEmail = async () => {
        showBackdropLoader();
        if (validateForm()) {
            try {
                const formulario = {
                    'email': formData.email,
                }
                const { data } = await axios.post(`${process.env.url_back}/auth-externo/send-verify-email?`, formulario);
            
                if (data.error) {
                    setVerifySuccess(false);
                    return;
                }

                showSuccessMsg(data.message);
            } catch (error) {
                showErrorMsg(getResponseError(error))
            } finally {
                hideBackdropLoader();
            }
        }
    }

    /** Verificamos si tenemos algun msg en localStorage y luego lo eliminamos */
    useEffect(() => {
        checkMsgs();
    }, []);

    return (
        <>
            <div className={containerClassName}>
                <div className="flex flex-column align-items-center justify-content-center">
                    {!verifySuccess ? (
                        <div className="surface-card w-8 px-4 sm:px-6 py-4 sm:py-6 text-center" style={{ borderRadius: '20px' }}>
                            <div className="text-900 text-2xl font-medium mb-4">{data?.error}</div>
                            <div className="text-700 font-medium mb-4 w-10" style={{ margin: '0 auto' }}>{`Se enviará un correo de verificación a ${formData.email} para poder iniciar sesión`}</div>
                            <div className='containerButton'>
                                <Button type='button' label="Enviar"  className="w-full p-2 w-5" onClick={sendVerifyEmail}></Button>
                                <Button type='button' label="Volver al login"  className="w-full w-6 p-2 bg-red-400" onClick={() => setVerifySuccess(true)}></Button>
                            </div>
                        </div>

                    ) : (

                        <div>
                            <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                                <div className="text-center mb-5">
                                    <img
                                        className="auth_logo_img"
                                        src={process.env.topbar_logo}
                                        alt="logo"
                                    />
                                    <div className="text-900 text-2xl font-medium mb-3">Iniciar Sesión</div>
                                </div>

                                <form onSubmit={onLogin}>
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
                                        errorName="password"
                                        formErrors={formErrors}
                                    >
                                        <Password
                                            className={`w-full ${formErrors?.password && "p-invalid"}`}
                                            name="password"
                                            value={formData?.password ?? ''}
                                            onChange={handleFormChange}
                                            toggleMask
                                            feedback={false} />
                                    </FloatInput>

                                    <div className='mt-5'>
                                        <Button type='submit' label="Iniciar" className="w-full p-2" ></Button>
                                    </div>
                                    <div className='mt-3 text-center'>
                                        <div className='lblText' style={{ cursor: 'pointer' }} onClick={eventClave}>
                                            ¿Olvidaste tu clave?
                                        </div>
                                        <div className='separador'></div>
                                        <div className='mt-3'>
                                            <Button type='button' label="Registrarme" className="w-full p-2 bg-red-400" onClick={onRegistrarme}></Button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>

                    )}
                </div>

            </div>

        </>
    );
}