import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { renderError } from '../common/functions';
import { CourseForm } from '../forms/CourseForm';
import { useForm } from '../hooks/useForm';

export const CourseModal = (props) => {

    const [ready, setReady] = useState(false)

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName, onInputChangeByObject } = useForm(item);    

    const onOk = () => {

        if(!formState.name || formState.name.trim().length === 0){
            renderError('Debe ingresar el nombre');
            return;
        }

        if(!formState.identifier || formState.identifier.trim().length === 0){
            renderError('Debe ingresar el identifiador');
            return;
        }

        if(!formState.quotas || formState.quotas.length === 0){
            renderError('Debe ingresar la cantidad de cuotas');
            return;
        }

        if(!formState.quota_value || formState.quota_value.length === 0){
            renderError('Debe ingresar el valor de la cuota');
            return;
        }

        if(formState.tuition && (!formState.tuition_value || formState.tuition_value.length === 0)){
            renderError('Debe ingresar el valor de la matricula');
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
            width={700}
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

            <CourseForm
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
