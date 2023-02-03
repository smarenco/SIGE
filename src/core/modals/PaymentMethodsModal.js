import { Modal } from 'antd'
import React, { useState } from 'react'
import { renderError } from '../common/functions';
import { PaymentMethodsForm } from '../forms/PaymentMethodsForm';
import { useForm } from '../hooks/useForm';

export const PaymentMethodsModal = (props) => {

    const [ready, setReady] = useState(false)

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName } = useForm(item);    

    const onOk = () => {
        
        if(!formState.name || formState.name.trim().length === 0){
            renderError('Debe ingresar el nombre');
            return;
        }

        onOkProp(formState);
    }

    const onCancel = () => {
        onCancelProp();
    }

    return (
        <Modal
            title={`${view ? 'Detalle' : item.getId() ? 'Editar' : 'Nuevo registro'}`}
            open={open}
            width={550}
            destroyOnClose={true}
            okText='Guardar'
            cancelText='Cancelar'
            cancelButtonProps={{ disabled: confirmLoading }}
            loading={loading}
            onOk={onOk}
            maskClosable={false}
            closable={!confirmLoading}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            okButtonProps={{disabled: view}}>

            <PaymentMethodsForm
                app={app}
                view={view}
                formState={formState}
                loading={loading}
                confirmLoading={confirmLoading}
                onInputChange={onInputChange}
                onInputChangeByName={onInputChangeByName}
                onCancel={onCancel}
            />
        </Modal>
    );
}
