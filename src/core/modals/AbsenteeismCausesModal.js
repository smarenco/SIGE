import { Modal } from 'antd'
import React from 'react'
import { renderError } from '../common/functions';
import { AbsenteeismCausesForm } from '../forms/AbsenteeismCausesForm';
import { useForm } from '../hooks/useForm';

export const AbsenteeismCausesModal = (props) => {

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
            bodyStyle={{ paddingTop: 10}}
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

            <AbsenteeismCausesForm
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
