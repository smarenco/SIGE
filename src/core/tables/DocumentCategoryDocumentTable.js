import { Button, Checkbox, Input, Select, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';

export const DocumentCategoryDocumentTable = ({ data, onDeleteDocument }) => {

    const columns = () => {
        return [
            {
                title: 'Descripcion',
                dataIndex: 'name',
                key: 'Descripcion',
                width: 250,
                ellipsis: true,
                className: 'ant-table-cell-link',
            }, {
                title: 'Requerido',
                dataIndex: 'required',
                key: 'Requerido',
                width: 250,
                ellipsis: true,
            }, {
                title: 'Controla vencimiento',
                dataIndex: 'control_expiration',
                key: 'control_expiration',
                width: 150,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 100,
                render: record => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <DeleteOutlined onClick={e => onDeleteDocument(record.id)} />
                    </div>
                ),
            }
        ];
    }

    console.log(data);
    return (
        <Table
            columns={columns()}
            dataSource={data}
            scroll={{ x: columns().map(a => a.width).reduce((b, c) => b + c), y: 'calc(100vh - 260px)' }}
            rowKey={record => record.id}
        />
    )
}


