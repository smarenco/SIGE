import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { renderError } from '../common/functions';
import { UserForm } from '../foms/UserForm';
import { useForm } from '../hooks/useForm';

export const UserModal = (props) => {

    const [ready, setReady] = useState(false)

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName } = useForm(item); 

    const onOk = () => {
        
        if(!formState.Nombre || formState.Nombre.trim().length === 0){
            //renderError(i18n.t('zone-marcation.error.name'));
            return;
        }

        documents.forEach(document => {
            const documentSelected = formState.document.find((req) => req.id === document.id);
            if(!documentSelected && document.required){
                message.error('Hay documentos obligatorios que no se cargaron');
                error = true;
                return false;
            }
        });

        onOkProp(formState);
    }

    const onCancel = () => {
        onCancelProp();
    }

    return (
        <Modal
            title={`${view ? 'Detalle' : item.getId() ? 'Editar' : 'Nuevo registro'}`}
            open={open}
            width={1100}
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

            <UserForm
                app={app}
                view={view}
                formState={formState}
                onInputChange={onInputChange}
                onInputChangeByName={onInputChangeByName}
                onCancel={onCancel}
            />
        </Modal>
    );
}
