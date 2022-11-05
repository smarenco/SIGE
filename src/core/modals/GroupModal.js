import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { renderError } from '../common/functions';
import { GroupForm } from '../foms/GroupForm';
import { useForm } from '../hooks/useForm';

export const GroupModal = (props) => {

    const [ready, setReady] = useState(false)

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName } = useForm(item);    

    const onOk = () => {
        
        if(!formState.name || formState.name.trim().length === 0){
            renderError('Debe ingresar el nombre');
            return;
        }
        if(!formState.from_date || formState.from_date.length === 0){
            renderError('Debe ingresar la fecha inicial');
            return;
        }
        if(!formState.to_date || formState.to_date.length === 0){
            renderError('Debe ingresar la fecha final');
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
            width={800}
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

            <GroupForm
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
