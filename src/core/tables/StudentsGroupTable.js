import { Button, Modal, Table } from 'antd';
import React from 'react'

export const StudentsGroupTable = ({ data, loading, studentToGroup }) => {
    
    const onDeleteStudent = (student) => {
        Modal.confirm({
            closable:true,
            title: 'Eliminar',
            content: 'Confirma la eliminacion de ' + student.name + ' del curso?',
            okText: 'Eliminar',
            okCancel: 'Cancelar',
            onOk: studentToGroup(student.id, true)
        });
    }
    
    const columns = () => {
        return [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'Nombre',
                width: 250,
                ellipsis: true,
            }, {
                title: 'Documento',
                dataIndex: 'document',
                key: 'Documento',
                width: 200,
                ellipsis: true,
            }, {
                title: 'Telefono',
                dataIndex: 'phone',
                key: 'Telefono',
                width: 200,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 100,
                render: record => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Button key='delete' icon='delete' onClick={e => onDeleteStudent(record)} title='Eliminar'></Button>
                    </div>
                ),
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


