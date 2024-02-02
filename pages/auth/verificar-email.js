import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { classNames } from 'primereact/utils';
import { useGeneralContext } from '@/base/context/GeneralContext';
import { getResponseError, } from '@/base/helpers/api';
import { useToastContext } from "@/base/context/ToastContext";
import axios from "axios";
import CartMessage from "@/project/components/CartMessage";

export default function VerificarEmail() {
    const router = useRouter();
    const { showBackdropLoader, hideBackdropLoader } = useGeneralContext();
    const { showErrorMsg } = useToastContext()
    const [verifySuccess, setVerifySuccess] = useState('initial');
    const [data, setData] = useState(null);


    const onVerifyEmail = async (email, token) => {
        showBackdropLoader();
        try {

            const formulario = {
                'email': email,
                'token': token,
            }

            const { data } = await axios.post(`${process.env.url_back}/auth-externo/verify-email`, formulario);
            setData(data);
            if (data?.error) {
                setVerifySuccess('error');
                return;
            } else {
                setVerifySuccess('success');
            }
        } catch (error) {
            showErrorMsg(getResponseError(error))
        } finally {
            hideBackdropLoader();
        }
    }

    useEffect(() => {
        if (router.isReady) {
            const token = router.query?.token;
            const email = router.query?.email;

            if (email && token) {
                onVerifyEmail(email, token);
            }
        }
    }, [router.query]);


    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

    return (
        <div className={containerClassName}>
            <div className="surface-card w-4 px-4 sm:px-6 py-4 sm:py-6 text-center" style={{ borderRadius: '20px' }}>
                {verifySuccess === 'success' ? (
                    <CartMessage
                        titulo="Verificado correctamente"
                        mensaje={data.message}
                        tituloBoton="Volver al login"
                        classIcon="pi pi-check"
                        url="/auth/login"
                        colorIcon="green"
                    />
                ) : verifySuccess === 'error' ? (
                    <CartMessage
                        titulo="Error de verificación"
                        mensaje={data.error}
                        tituloBoton="Volver al login"
                        classIcon="pi pi-times"
                        url="/auth/login"
                        colorIcon="red"
                    />
                ) : null}
            </div>
        </div>

    );
}