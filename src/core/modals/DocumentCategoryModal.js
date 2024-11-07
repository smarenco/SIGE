import { Modal } from 'antd'
import React from 'react'
import { renderError, validatorInputsRequired } from '../common/functions';
import { DocumentCategoryForm } from '../forms/DocumentCategoryForm';
import { useForm } from '../hooks/useForm';

export const DocumentCategoryModal = (props) => {

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName } = useForm(item);    

    const onOk = () => {
        
        const inputs = [
            { name: 'name', text: 'Debe ingresar el nombre'},
            { name: 'type', text: 'Debe seleccionar el tipo'},
        ];

        if(validatorInputsRequired(formState, inputs)){
            onOkProp(formState);
        }

    }

    const onCancel = () => {
        onCancelProp();
    }

    return (
        <Modal
            bodyStyle={{ paddingTop: 10}}
            title={`${view ? 'Detalle' : item.getId() ? 'Editar' : 'Nuevo registro'}`}
            open={open}
            width={750}
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

            <DocumentCategoryForm
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
