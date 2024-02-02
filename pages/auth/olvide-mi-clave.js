

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useToastContext } from "@/base/context/ToastContext";
import { getAuthMsg, getResponseError, removeAuthMsg } from '@/base/helpers/api';
import useCustomForm from '@/base/hooks/useCustomForm';
import FloatInput from '@/base/components/Form/FloatInput';
import { validateEmail } from '@/project/helpers/utils';
import { useGeneralContext } from '@/base/context/GeneralContext';
import axios from "axios";
import CartMessage from '@/project/components/CartMessage';


export default function OlvideMiClave() {
    const { showErrorMsg, showSuccessMsg } = useToastContext()
    const router = useRouter();
    const { formData, handleFormChange, handleSetFormErrors, formErrors } = useCustomForm();
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
    const [sendEmail, setSendEmail] = useState('initial');
    const [data, setData] = useState(null);

    const validateForm = () => {
        let valid = true;
        if (!formData?.username || formData?.username === "") {
            valid = false;
            handleSetFormErrors("username", "Campo requerido");
        } else if (!validateEmail(formData?.username)) {
            valid = false;
            handleSetFormErrors("username", "Email inválido");
        }
        return valid;
    };

    const onRecuperarClave = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            showBackdropLoader();
            try {
                const formulario = {
                    'email': formData.username
                }
                const { data } = await axios.post(`${process.env.url_back}/auth-externo/send-reset-password?`, formulario);
                setSendEmail('success');
                setData(data);
            } catch (error) {
                setSendEmail('error');
                console.log(getResponseError(error))
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
        <>
            <div className={containerClassName}>
                <div className=" mt-5 flex  containerRecuperarCuenta">
                    <div>
                        <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                            {sendEmail == 'initial' ? (
                                <>
                                    <div className="text-center mb-5">
                                        <img
                                            className="auth_logo_img"
                                            src={process.env.topbar_logo}
                                            alt="logo"
                                        />
                                        <div className="text-900 text-2xl font-medium mb-3">Recupera tu cuenta</div>
                                        <div className="text-500 mb-3 ">Ingresa tu correo electrónico y te enviaremos un email de reseteo de contraseña.</div>

                                    </div>


                                    <form onSubmit={onRecuperarClave}>
                                        <FloatInput
                                            className="mt-5"
                                            label="Correo electrónico"
                                            errorName="username"
                                            formErrors={formErrors}
                                        >
                                            <InputText
                                                autoComplete='off'
                                                className={`${formErrors?.username && "p-invalid"}`}
                                                name="username"
                                                value={formData?.username ?? ''}
                                                onChange={handleFormChange} />
                                        </FloatInput>


                                        <div className='containerButton'>
                                            <Button type='submit' label="Enviar" className="w-full p- text-xl w-5" ></Button>
                                            <Button type='button' label="Cancelar" className="w-full p-2 text-xl w-5 bg-red-400" onClick={onCancel}></Button>
                                        </div>
                                    </form>
                                </>
                            ) : sendEmail == 'success' ? (<CartMessage
                                titulo="Enviado con éxito"
                                mensaje={data.message}
                                tituloBoton="Volver al login"
                                classIcon="pi pi-check"
                                url="/auth/login"
                                colorIcon="green"
                            />) : sendEmail == 'error' ? (<CartMessage
                                titulo="Error de verificación"
                                mensaje={'Correo electrónico no registrado'}
                                tituloBoton="Volver al login"
                                classIcon="pi pi-times"
                                url="/auth/login"
                                colorIcon="red"
                            />) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}