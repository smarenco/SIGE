import moment from "moment";
import { Button, Modal, Table } from 'antd';
import {
    DeleteTwoTone,
    EditTwoTone,
    ExclamationCircleTwoTone,
    PlusCircleTwoTone,
  } from '@ant-design/icons';

import { DDMMYYYY } from "../common/consts";
import { downloadDocument } from "../services/DocumentService";

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
                render: r => r.expiration ? moment(r.expiration).format(DDMMYYYY) : undefined,
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
                width: 50,
                render: (_, record, i) => {
                    let alerts = [];
                    if (record.required && !record.expiration && !record.loaded) {
                        alerts.push(<ExclamationCircleTwoTone twoToneColor="red" style={{marginRight: 10}} title="Este documento es requerido y no está cargado" />);
                    } else if (!record.required && record.expiration && !record.loaded) {
                        alerts.push(<ExclamationCircleTwoTone twoToneColor="red" style={{marginRight: 10}} title="Este documento exige vencimiento y no está cargado" />);
                    } else if (!record.required && !record.expiration && !record.loaded) {
                        alerts.push(<ExclamationCircleTwoTone twoToneColor="red" style={{marginRight: 10}} title="Este documento es requerido, exige vencimiento y no está cargado" />);
                    } else if (record.loaded && moment(record.expiration, DDMMYYYY).isValid() && moment(record.expiration, DDMMYYYY).diff(new Date) < 0) {
                        alerts.push(<ExclamationCircleTwoTone twoToneColor="orange" style={{marginRight: 10}} title="Este documento ha vencido" />);
                    }
                    return (
                        <div style={{ width: '100%', textAlign: 'right' }}>
                            {alerts.length > 0 && alerts[0]}
                            {record.file_name && <Button key='download' onClick={e => downloadDocument(record.file_name)} style={{ marginRight: 10 }} title='Descargar documento' ></Button>}
                            {record.loaded ? <EditTwoTone twoToneColor="green" onClick={e => loadRequisitoFuncionario(record.id)} title='Editar documento' /> : <PlusCircleTwoTone twoToneColor="green" onClick={e => loadRequisitoFuncionario(record.id)} title='Agregar documento' />}
                            {record.loaded && <DeleteTwoTone twoToneColor="red" disabled={!record.loaded} onClick={e => onDeleteDocument(record)} title='Eliminar documento'/>}
                        </div>
                )}
            }
        ];
    }

    console.log(dataSource);
    return (
        <Table
            loading={loading}
            columns={columns()}
            dataSource={[ ...dataSource]}
            scroll={{ x: columns().map(a => a.width).reduce((b, c) => b + c), y: 'calc(100vh - 260px)' }}
            rowKey={record => record.getId()}            
        />
    )
}


