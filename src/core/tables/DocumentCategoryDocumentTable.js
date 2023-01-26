import { Table, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

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
                key: 'Requerido',
                render: (record) => <Tag color={!record.required ? 'green' : 'red'}>{!record.required ? 'Si' : 'No'}</Tag>,
                width: 100,
                ellipsis: true,
            }, {
                title: 'Controla vencimiento',
                key: 'expiration_control',
                render: (record) => <Tag color={!record.expiration_control ? 'green' : 'red'}>{!record.expiration_control ? 'Si' : 'No'}</Tag>,
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

    return (
        <Table
            columns={columns()}
            dataSource={[ ...data ]}
            scroll={{ x: columns().map(a => a.width).reduce((b, c) => b + c), y: 'calc(100vh - 260px)' }}
            rowKey={record => record.id}
        />
    )
}


