import { Modal } from 'antd'
import React from 'react'
import { renderError, validatorInputsRequired } from '../common/functions';
import { MedicalCoverageForm } from '../forms/MedicalCoverageForm';
import { useForm } from '../hooks/useForm';

export const MedicalCoverageModal = (props) => {

    const { view, app, open, item, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
  
    const { formState, onInputChange, onInputChangeByName } = useForm(item);

    const onOk = () => {
        
        const inputs = [
            { name: 'name', text: 'Debe ingresar el nombre'},
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

            <MedicalCoverageForm
                app={app}
                view={view}
                formState={formState}
                onInputChange={onInputChange}
                onCancel={onCancel}
            />
        </Modal>
    );
}
