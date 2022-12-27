import { Button, Checkbox, Input, Select, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';

export const CourseDocumentTable = ({ data, onDeleteTeacher }) => {

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
                title: '',
                key: 'actions',
                width: 100,
                render: record => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <DeleteOutlined onClick={e => onDeleteTeacher(record.id)} />
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


