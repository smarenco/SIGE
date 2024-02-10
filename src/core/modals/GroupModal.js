import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { renderError } from '../common/functions';
import { GroupForm } from '../forms/GroupForm';
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
        if(!formState.turn_id || formState.turn_id.length === 0){
            renderError('Debe ingresar un turno');
            return;
        }
        if(!formState.course_id || formState.course_id.length === 0){
            renderError('Debe ingresar un curso');
            return;
        }
        if(!formState.institute_id || formState.institute_id.length === 0){
            renderError('Debe ingresar un instituto');
            return;
        }
        if(!formState.number_students || formState.number_students.length === 0){
            renderError('Debe ingresar la cantidad de cupos');
            return;
        }
        if(!formState.start_date || formState.start_date.length === 0){
            renderError('Debe ingresar la fecha inicial');
            return;
        }
        if(!formState.finish_date || formState.finish_date.length === 0){
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
            bodyStyle={{ paddingTop: 10, height: '75vh'}}
            title={`${view ? 'Detalle' : item.getId() ? 'Editar' : 'Nuevo registro'}`}
            open={open}
            style={{top: 10}}
            width='100vw'
            // height='10vh'
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
