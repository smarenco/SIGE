import { Modal } from 'antd'
import React from 'react'
import { PaymentForm } from '../forms/PaymentForm';
import { useForm } from '../hooks/useForm';

export const PaymentModal = (props) => {

    const { app, open, item, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName, onInputChangeByObject } = useForm(item);    

    const onCancel = () => {
        onCancelProp();
    }

    return (
        <Modal
            bodyStyle={{ paddingTop: 10}}
            title={`${item.getId() ? 'Detalle' : 'Nuevo registro'}`}
            open={open}
            width={700}
            destroyOnClose={true}
            okText='Guardar'
            cancelText={!!item.getId() ? 'Cerrar' : 'Cancelar'}
            cancelButtonProps={{ disabled: confirmLoading }}
            loading={loading}
            maskClosable={false}
            closable={!confirmLoading}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            okButtonProps={{disabled: true}}>

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
