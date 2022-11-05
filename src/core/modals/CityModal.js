import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { renderError } from '../common/functions';
import { CityForm } from '../foms/CityForm';
import { useForm } from '../hooks/useForm';

export const CityModal = (props) => {

    const [ready, setReady] = useState(false)

    const { view, app, open, item, onOk: onOkProp, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName } = useForm(item);    

    const onOk = () => {
        
        if(!formState.Name || formState.Name.trim().length === 0){
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
            width={600}
            destroyOnClose={true}
            okText='Guardar'
            cancelText='Cancelar'
            cancelButtonProps={{ disabled: confirmLoading }}
            loading={confirmLoading}
            onOk={onOk}
            maskClosable={false}
            closable={!confirmLoading}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            okButtonProps={{disabled: view}}>

            <CityForm
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
