import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { renderError } from '../common/functions';
import { PaymentForm } from '../forms/PaymentForm';
import { useForm } from '../hooks/useForm';

export const PaymentModal = (props) => {

    const [ready, setReady] = useState(false)

    const { app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName, onInputChangeByObject } = useForm(item);    

    const onOk = () => {
        
        if(!formState.student_id || formState.student_id.length === 0){
            renderError('Debe ingresar el estudiante');
            return;
        }

        if(!formState.course_id || formState.course_id.length === 0){
            renderError('Debe ingresar el curso');
            return;
        }

        if(!formState.method_payment_id || formState.method_payment_id.length === 0){
            renderError('Debe ingresar el metodo de pago');
            return;
        }

        onOkProp(formState);
    }

    const onCancel = () => {
        onCancelProp();
    }

    return (
        <Modal
            title={`${item.getId() ? 'Detalle' : 'Nuevo registro'}`}
            open={open}
            width={700}
            destroyOnClose={true}
            okText='Guardar'
            cancelText={!!item.getId() ? 'Cerrar' : 'Cancelar'}
            cancelButtonProps={{ disabled: confirmLoading }}
            loading={loading}
            onOk={onOk}
            maskClosable={false}
            closable={!confirmLoading}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            okButtonProps={{disabled: !!item.getId()}}>

            <PaymentForm
                app={app}
                view={!!item.getId()}
                formState={formState}
                onInputChange={onInputChange}
                onInputChangeByName={onInputChangeByName}
                onInputChangeByObject={onInputChangeByObject}
                onCancel={onCancel}
            />
        </Modal>
    );
}
