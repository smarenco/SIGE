import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { renderError, validatorInputsRequired } from '../common/functions';
import { TurnForm } from '../forms/TurnForm';
import { useForm } from '../hooks/useForm';

export const TurnModal = (props) => {

    const [ready, setReady] = useState(false)

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;

    const { formState, onInputChange, onInputChangeByName } = useForm(item);    

    const onOk = () => {
        
        const inputs = [
            { name: 'name', text: 'Debe ingresar el nombre'},
            { name: 'start_time', text: 'Debe ingresar la hora inicial'},
            { name: 'finish_time', text: 'Debe ingresar la hora final'},
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
            width={600}
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

            <TurnForm
                app={app}
                view={view}
                loading={loading}
                formState={formState}
                onInputChange={onInputChange}
                onInputChangeByName={onInputChangeByName}
                onCancel={onCancel}
            />
        </Modal>
    );
}
