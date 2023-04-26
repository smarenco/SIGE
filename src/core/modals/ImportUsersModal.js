import { CloseCircleOutlined, CloudUploadOutlined, FileExcelOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd'
import Dragger from 'antd/es/upload/Dragger';
import React, { useState } from 'react'
import { colors } from '../common/consts';
// import { useForm } from '../hooks/useForm';

export const ImportUsersModal = (props) => {
    const { view, open, file: fileProp, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
    // const { formState, onInputChange, onInputChangeByName } = useForm(item);
    const [file, setFile] = useState(fileProp);

    const onOk = () => {
        onOkProp(file)
    }

    const onCancel = () => {
        onCancelProp();
    }

    const handleOnclickClearFile = () => {
        setFile(undefined)
    }

    return (
        <Modal
            bodyStyle={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            title='Importar'
            open={open}
            width={700}
            destroyOnClose={true}
            okText='Importar'
            cancelText='Cancelar'
            cancelButtonProps={{ disabled: confirmLoading }}
            loading={loading}
            onOk={onOk}
            maskClosable={false}
            closable={!confirmLoading}
            confirmLoading={confirmLoading}
            onCancel={onCancel}
            okButtonProps={{ disabled: view }}>
            {
                file === undefined ?
                    <Dragger
                        showUploadList={false}
                        beforeUpload={readyToUpload => setFile(readyToUpload)}
                        multiple={false}
                        style={{width: 650, padding: '80px 0px'}}
                        accept='.xlsx,.xls,.csv'
                    >
                        <CloudUploadOutlined style={{ fontSize: 80, color: colors.urusigeSkyblue }} />
                        <br />
                        <span>Haga click para explorar o suelte aqui el archivo para importar</span>
                    </Dragger>
                    :
                    <span style={{ fontSize: 20 }}><FileExcelOutlined />{ file?.name}<Button type='text' onClick={handleOnclickClearFile} style={{ margin: 10 }} icon={<CloseCircleOutlined />}></Button></span>
            }
        </Modal>
    );
}
