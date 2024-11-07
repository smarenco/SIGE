import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { renderError, validatorInputsRequired } from '../common/functions';
import { InstituteForm } from '../forms/InstituteForm';
import { useForm } from '../hooks/useForm';

export const InstituteModal = (props) => {

    const [ready, setReady] = useState(false)

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName, onInputChangeByObject } = useForm(item);    

    const onOk = () => {
        
        const inputs = [
            { name: 'name', text: 'Debe ingresar el nombre'},
            { name: 'country_id', text: 'Debe seleccionar un pais'},
            { name: 'city_id', text: 'Debe seleccionar una ciudad'},
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

            <InstituteForm
                app={app}
                view={view}
                formState={formState}
                onInputChange={onInputChange}
                onInputChangeByName={onInputChangeByName}
                onInputChangeByObject={onInputChangeByObject}
                onCancel={onCancel}
            />
        </Modal>
    );
}
