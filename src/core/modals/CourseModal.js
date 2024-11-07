import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { renderError, validatorInputsRequired } from '../common/functions';
import { CourseForm } from '../forms/CourseForm';
import { useForm } from '../hooks/useForm';

export const CourseModal = (props) => {

    const [ready, setReady] = useState(false)

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName, onInputChangeByObject } = useForm(item);    

    const onOk = () => {

        const inputs = [
            { name: 'name', text: 'Debe seleccionar un nombre'},
            { name: 'identifier', text: 'Debe ingresar un identificador'},
            { name: 'quotas', text: 'Debe ingresar la cantidad de cuotas'},
            { name: 'quota_value', text: 'Debe ingresar el valor de la cuota'},
        ];

        if(formState.tuition && (!formState.tuition_value || formState.tuition_value.length === 0)){
            renderError('Debe ingresar el valor de la matricula');
            return;
        }

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
