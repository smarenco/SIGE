import { Button, Checkbox, Input, Table, Tag } from 'antd';
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';


const paginationStyle = {
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 0,
    position: 'absolute',
    bottom: 11,
    right: 0,
};

export const GroupTable = ({ data, onReload, onRowSelectedChange, setFilters, selectedRowKeys, loading, onPageChange, pagination, onEditClick: onEdit, comeUserForm = false }) => {

    const onPageChangeLocal = (page, pageSize) => {
        onPageChange(page, pageSize);
    }
    
    const onEditClick = (id) => {
        onEdit(id);
    }
    
    const columns = () => {
        return [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'Nombre',
                width: 200,
                ellipsis: true,
                className: 'ant-table-cell-link',
            }, {
                title: 'Curso',
                dataIndex: 'course_name',
                key: 'Curso',
                width: 250,
                ellipsis: true,
            }, {
                title: 'Profesor/a',
                dataIndex: 'teacher_name',
                key: 'Profesor',
                width: 200,
                ellipsis: true,
            }, {
                title: 'Turno',
                dataIndex: 'tourn_name',
                key: 'Turno',
                width: 200,
                ellipsis: true,
            }, {
                title: 'Desde',
                dataIndex: 'from_date',
                key: 'Desde',
                width: 200,
                ellipsis: true,
            }, {
                title: 'Hasta',
                dataIndex: 'to_date',
                key: 'Hasta',
                width: 200,
                ellipsis: true,
            }, {
                title: 'Baja',
                key: 'Baja',
                render: (record) => <Tag color={!record.deleted_at ? 'green' : 'red'}>{!record.deleted_at ? 'Vigente' : 'Anulado'}</Tag>,
                width: 150,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 100,
                render: record => (
                    !comeUserForm && <div style={{ width: '100%', textAlign: 'right' }}>
                        <EditOutlined onClick={e => onEditClick(record.id)} />
                    </div>
                ),
            }
        ];
    }

    return (
        <Table
            loading={loading}
            columns={columns()}
            rowSelection={!comeUserForm && { onChange: onRowSelectedChange, selectedRowKeys }}
            dataSource={data}
            footer={data => 
                !comeUserForm && <div>
                    <Button icon={<ReloadOutlined />} onClick={onReload} />
                    &nbsp;
                    <Input style={{width: '20%'}} placeholder='Buscar...' className='search-form' onChange={e => setFilters({ Search: e.target.value })} /> 
                    &nbsp;
                    <Checkbox onChange={e => setFilters({ ShowDeleted: e.target.checked }, onReload)}>Ver eliminados</Checkbox>
                </div>}
            pagination={!comeUserForm && {
                style: paginationStyle,
                onChange: onPageChangeLocal,
                onShowSizeChange: onPageChangeLocal,
                pageSizeOptions: ['10', '50', '100'],
                showSizeChanger: true,
                showQuickJumper: false,
                hideOnSinglePage: false,
                size: 'normal',
                showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
                ...pagination,
            }}
            scroll={{ x: columns().map(a => a.width).reduce((b, c) => b + c), y: 'calc(100vh - 260px)' }}
            rowKey={record => record.getId()}
            onRow={r => !comeUserForm && ({ onDoubleClick: () => onEditClick(r.Id) })}
            
        />
    )
}


