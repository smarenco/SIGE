import { DatePicker, Input, Modal, Upload } from 'antd'
import {
    InboxOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { DDMMYYYY } from '../common/consts';
import { renderError } from '../common/functions';
import { useForm } from '../hooks/useForm';

const { Dragger } = Upload;

export const DocumentsUserModal = (props) => {

    const { visible, item, onOkProp, loading, onCancel: onCancelProp } = props;

    const { formState, onInputChange, onInputChangeByName } = useForm(item ? item : {});    

    const onOk = () => {

        if(formState.expiration_control && (formState.expiration === null || formState.expiration === undefined)){
            renderError('Debe agregar una fecha de vencimiento');
            return;
        }
        if((formState.file === null || formState.file === undefined)){
            renderError('Debe adjuntar un documento');
            return;
        }
        console.log(formState)

        //onOkProp(formState);
    }

    return (
        <Modal
            bodyStyle={{ paddingTop: 10}}
            title={`Documento: ${formState.name}`}
            open={visible}
            width={600}
            destroyOnClose={true}
            okText='Guardar'
            cancelText='Cancelar'
            cancelButtonProps={{ disabled: loading }}
            onOk={onOk}
            maskClosable={false}
            closable={!loading}
            confirmLoading={loading}
            onCancel={onCancelProp}
        >
            <div>
                <div style={{ marginTop: 10 }}>
                    <label>Descripción</label>
                    <Input disabled value={formState.name} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Fecha de vencimento {formState.expiration_control && '*'}</label>
                    <DatePicker
                        placeholder='Seleccionar fecha'
                        format={DDMMYYYY}
                        style={{ width: '100%', display: 'block' }}
                        value={formState.expiration ? dayjs(formState.expiration) : undefined}
                        onChange={date => onInputChangeByName('expiration', date)} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Observaciones</label>
                    <Input
                        name='observation'
                        value={formState.observation}
                        onChange={onInputChange} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Documento</label>
                    <Dragger
                        multiple={false}
                        //fileList={formState.file ? [formState.file] : formState.file_name ? [{ uid: -1, name: formState.file_name, fileName: formState.file_name, status: 'done' }] : undefined}
                        beforeUpload={ReadyToUpload => {
                            onInputChangeByName('file', ReadyToUpload );
                            return false;
                        }}
                    >
                        <p className='ant-upload-drag-icon'>
                            <InboxOutlined />
                        </p>
                        <p className='ant-upload-text'>Haga clic aquí o arrastre el file</p>
                        <p className='ant-upload-hint'></p>
                    </Dragger>
                </div>
            </div>
        </Modal>
    );
}
