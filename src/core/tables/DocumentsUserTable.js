import moment from "moment";
import { Button, Modal, Table } from 'antd';
import {
    ExclamationCircleOutlined,
  } from '@ant-design/icons';
import React from 'react'
import ButtonGroup from 'antd/lib/button/button-group';
import { DDMMYYYY } from "../common/consts";
import { downloadDocument } from "../services/DocumentService";

export const DocumentsUserTable = ({ data, loading, loadRequisitoFuncionario, documentToUser }) => {
    
    const onDeleteDocument = (document) => {
        Modal.confirm({
            closable:true,
            title: 'Eliminar',
            content: 'Confirma la eliminacion de ' + document.file_name + '?',
            okText: 'Eliminar',
            okCancel: 'Cancelar',
            onOk: documentToUser(document.id, true)
        });
    }
    
    const columns = () => {
        return [
            {
                title: 'Documento',
                dataIndex: 'name',
                key: 'Documento',
                width: 250,
                ellipsis: true,
            }, {
                title: 'Nombre Archivo',
                dataIndex: 'file_name',
                key: 'file_name',
                width: 200,
                ellipsis: true,
            }, {
                title: 'Vencimiento',
                dataIndex: 'expiration',
                key: 'expiration',
                width: 150,
                ellipsis: true,
            }, {
                title: 'Observaciones',
                dataIndex: 'observation',
                key: 'observation',
                width: 250,
                ellipsis: true,
            }, {
                title: '',
                key: 'Actions',
                width: 30,
                render: (_, record, i) => {
                    let alerts = [];
                    if (record.required && !record.expiration) {
                        alerts.push(<ExclamationCircleOutlined twoToneColor="orange" title="Este documento exige vencimiento y no está cargado" style={{ marginRight: 10 }} />);
                    } else if (moment(record.expiration, DDMMYYYY).isValid() && moment(record.expiration, DDMMYYYY).diff(new Date) < 0) {
                        alerts.push(<ExclamationCircleOutlined theme="twoTone" twoToneColor="orange" title="Este documento ha vencido" style={{ marginRight: 10 }} />);
                    }
                    return (
                        <div style={{ width: '100%', textAlign: 'right' }}>
                            {alerts.length > 0 && alerts[0]}
                            {record.NombreArchivo && <Button key='download' icon="download" size='small' onClick={e => downloadDocument(record.file_name)} style={{ marginRight: 10 }}></Button>}
                            <ButtonGroup size='small'>
                                <Button key='see' icon={record.Loaded ? 'edit' : 'plus'} onClick={e => loadRequisitoFuncionario(record.id)} title={`${record.Loaded ? 'editar' : 'agregar'} documento`}></Button>
                                <Button key='delete' icon='delete' disabled={!record.Loaded} onClick={e => onDeleteDocument(record)} type={record.Loaded ? 'danger' : undefined} title='Eliminar documento'></Button>
                                
                            </ButtonGroup>
                        </div>
                )}
            }
        ];
    }

    return (
        <Table
            loading={loading}
            columns={columns()}
            dataSource={data}
            scroll={{ x: columns().map(a => a.width).reduce((b, c) => b + c), y: 'calc(100vh - 260px)' }}
            rowKey={record => record.getId()}            
        />
    )
}


