import React from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';

const CartMessage = ({ titulo, mensaje, tituloBoton, classIcon, url, colorIcon }) => {
    const router = useRouter();
    return (
        <div className="alert-cart-container">
            <div className="text-center">
                <i className={classIcon} style={{ fontSize: '60px', color: colorIcon }}></i>
            </div>

            <div className="text-center mt-4">
                <h2 className='mb-3'>{titulo}</h2>
                <div>{mensaje}</div>
            </div>

            <div className="mt-4">
                <Button type="button" label={tituloBoton} onClick={() => router.push(url)} />
            </div>
        </div>
    );
};

export default CartMessage;
