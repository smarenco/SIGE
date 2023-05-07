import { CloseCircleOutlined, CloudUploadOutlined, CopyFilled, FileExcelOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Collapse, List, Modal, Tooltip } from 'antd'
import Dragger from 'antd/es/upload/Dragger';
import React, { useEffect, useState } from 'react'
import { colors } from '../common/consts';
const { Panel } = Collapse;
// import { useForm } from '../hooks/useForm';

export const ImportGroupsModal = (props) => {
    const { importState: propImportState, view, open, file: fileProp, onOk: onOkProp, loading, confirmLoading, onCancel: onCancelProp } = props;
    // const { formState, onInputChange, onInputChangeByName } = useForm(item);
    const [file, setFile] = useState(fileProp);
    const [importState, setImportState] = useState(propImportState);

    const onOk = () => {
        onOkProp(file)
    }

    const onCancel = () => {
        setFile(undefined);
        setImportState(undefined);
        onCancelProp();
    }

    const handleOnclickClearFile = () => {
        setFile(undefined)
    }

    const copyImportState = () => {
        let parsedErrors = 'Error:\n'
        let parsedSuccess = 'Success:\n'
        importState.error.map(error => parsedErrors += '-' + error + '\n')
        importState.success.map(success => parsedSuccess += '-' + `(Documento: ${success.Documento}) ${success.Nombres} ${success.Apellidos} fue importada con exito` + '\n')
        navigator.clipboard.writeText(parsedErrors + '\n' + parsedSuccess);
    }

    useEffect(() => {
        setImportState(propImportState)
    }, [propImportState])


    return (
        <Modal
            bodyStyle={importState !== undefined ? { height: 300, overflow: 'auto' } : { height: 300, overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            title={'Importar Cursos'}
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
                importState === undefined ?
                    (file === undefined ?
                        <Dragger
                            showUploadList={false}
                            beforeUpload={readyToUpload => setFile(readyToUpload)}
                            multiple={false}
                            style={{ width: 650, padding: '80px 0px' }}
                            accept='.xlsx,.xls,.csv'
                        >
                            <CloudUploadOutlined style={{ fontSize: 80, color: colors.urusigeSkyblue }} />
                            <br />
                            <span>Haga click para explorar o suelte aqui el archivo para importar</span>
                        </Dragger>
                        :
                        <span style={{ fontSize: 20 }}><FileExcelOutlined />{file?.name}<Button type='text' onClick={handleOnclickClearFile} style={{ margin: 10 }} icon={<CloseCircleOutlined />}></Button></span>
                    )
                    :
                    (
                        <>
                            <Button
                                type="default"
                                onClick={() => {
                                    setFile(undefined)
                                    setImportState(undefined)
                                }}
                                style={{ marginBottom: 10 }}
                            >
                                <LeftOutlined />
                                Reintentar
                            </Button>
                            <p>
                                Hubieron algunos errores al importar, revise la descripción de los mismos y pruebe resubir el archivo
                                <Tooltip title="Copiar estado importación">
                                    <Button style={{ float: 'right', margin: '20px 10px' }} onClick={copyImportState} type='text'><CopyFilled />Copiar</Button>
                                </Tooltip>
                            </p>
                            <Collapse
                                defaultActiveKey={['import-error']}
                                bordered={false}
                                loading={true}
                            >
                                <Panel
                                    header={`Importaciones exitosas (${importState?.success?.length})`}
                                    key='import-success'
                                >
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={importState?.success}
                                        renderItem={scs =>
                                        (<List.Item>
                                            <List.Item.Meta
                                                description={scs}
                                            />
                                        </List.Item>
                                        )
                                        }
                                    />
                                </Panel>
                                <Panel
                                    header={`Error al importar (${importState?.error?.length})`}
                                    key='import-error'
                                >
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={importState?.error}
                                        renderItem={error =>
                                        (<List.Item>
                                            <List.Item.Meta
                                                description={error}
                                            />
                                        </List.Item>
                                        )
                                        }
                                    />
                                </Panel>
                            </Collapse>
                        </>
                    )
            }
        </Modal>
    );
}
