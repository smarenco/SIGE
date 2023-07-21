import dayjs from "dayjs";
import { Button, Modal, Table } from 'antd';
import {
    DeleteTwoTone,
    DownloadOutlined,
    EditTwoTone,
    ExclamationCircleTwoTone,
    PlusCircleTwoTone,
  } from '@ant-design/icons';

import { DDMMYYYY } from "../common/consts";
import { downloadDocument } from "../services/UserService";

export const DocumentsUserTable = ({ dataSource, loading, loadRequisitoFuncionario, documentToUser }) => {
    
    const onDeleteDocument = (document) => {
        Modal.confirm({
            closable:true,
            title: 'Eliminar',
            content: 'Confirma la eliminacion de ' + document.file_name + '?',
            okText: 'Eliminar',
            okCancel: 'Cancelar',
            onOk: () => documentToUser(document, true)
        });
    }
    
    const columns = () => {
        return [
            {
                title: 'Documento',
                dataIndex: 'name_desc',
                key: 'Documento',
                width: 200,
                ellipsis: true,
            }, {
                title: 'Vencimiento',
                key: 'expiration',
                render: r => r.expiration ? dayjs(r.expiration).format(DDMMYYYY) : undefined,
                width: 100,
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
                width: 90,
                render: (_, record, i) => {
                    let alerts = [];
                    if (record.required && !record.expiration && !record.loaded) {
                        alerts.push(<ExclamationCircleTwoTone twoToneColor="red" style={{marginRight: 10}} title="Este documento es requerido y no está cargado" />);
                    } else if (!record.required && record.expiration && !record.loaded) {
                        alerts.push(<ExclamationCircleTwoTone twoToneColor="red" style={{marginRight: 10}} title="Este documento exige vencimiento y no está cargado" />);
                    } else if (!record.required && !record.expiration && !record.loaded) {
                        alerts.push(<ExclamationCircleTwoTone twoToneColor="red" style={{marginRight: 10}} title="Este documento es requerido, exige vencimiento y no está cargado" />);
                    } else if (record.loaded && dayjs(record.expiration).isValid() && dayjs(record.expiration).diff(new Date) < 0) {
                        alerts.push(<ExclamationCircleTwoTone twoToneColor="orange" style={{marginRight: 10}} title="Este documento ha vencido" />);
                    }
                    return (
                        <div style={{ width: '100%', textAlign: 'right' }}>
                            {alerts.length > 0 && alerts[0]}
                            {record.file_name && <DownloadOutlined onClick={e => downloadDocument(record.file_name)} style={{ fontSize:18, marginRight: 10 }} title='Descargar documento' />}
                            {record.loaded ? <EditTwoTone twoToneColor="green" onClick={e => loadRequisitoFuncionario(record.id)} style={{ fontSize:18, marginRight: 10 }} title='Editar documento' /> : <PlusCircleTwoTone twoToneColor="green" onClick={e => loadRequisitoFuncionario(record.id)} title='Agregar documento' style={{ fontSize:18, marginRight: 10 }}/>}
                            {record.loaded && <DeleteTwoTone twoToneColor="red" disabled={!record.loaded} style={{ fontSize:18 }} onClick={e => onDeleteDocument(record)} title='Eliminar documento'/>}
                        </div>
                )}
            }
        ];
    }

    return (
        <Table
            loading={loading}
            columns={columns()}
            dataSource={[ ...dataSource]}
            scroll={{ x: columns().map(a => a.width).reduce((b, c) => b + c), y: 'calc(100vh - 280px)' }}
            rowKey={record => record.getId()}            
        />
    )
}


