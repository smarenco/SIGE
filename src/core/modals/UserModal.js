import { Modal } from 'antd'
import React from 'react'
import { alertError } from '../common/functions';
import { UserForm } from '../forms/UserForm';
import { useForm } from '../hooks/useForm';

export const UserModal = (props) => {

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName } = useForm(item); 

    const onOk = () => {
        
        if(!formState.document || formState.document.trim().length === 0){
            alertError('Debe indicar un documento')
            return false;
        }
        if(!formState.names || formState.names.trim().length === 0){
            alertError('Debe indicar un nombre')
            return false;
        }
        if(!formState.lastnames || formState.lastnames.trim().length === 0){
            alertError('Debe indicar un apellido')
            return false;
        }
        if(!formState.birth_day){
            alertError('Debe indicar una fecha de nacimiento')
            return false;
        }
        if(!formState.email || formState.email.trim().length === 0){
            alertError('Debe indicar un email')
            return false;
        }
        if(!formState.type || formState.type.trim().length === 0){
            alertError('Debe indicar un tipo de usuario')
            return false;
        }

        let error = false;
        /*documents.forEach(document => {
            const documentSelected = formState.document.find((req) => req.id === document.id);
            if(!documentSelected && document.required){
                message.error('Hay documentos obligatorios que no se cargaron');
                error = true;
                return false;
            }
        });*/

        
        if(!error){ onOkProp(formState); }
    }

    const onCancel = () => {
        onCancelProp();
    }

    return (
        <Modal
            bodyStyle={{ paddingTop: 10}}
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
