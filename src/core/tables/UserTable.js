import { Button, Checkbox, Input, Select, Table, Tag } from 'antd';
import { EditOutlined, ReloadOutlined } from '@ant-design/icons';
import React from 'react'

const paginationStyle = {
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 0,
    position: 'absolute',
    bottom: 11,
    right: 0,
};

export const UserTable = ({ data, onReload, onRowSelectedChange, setFilters, selectedRowKeys, loading, onPageChange, pagination, onEditClick: onEdit, typesUsers }) => {

    const onPageChangeLocal = (page, pageSize) => {
        onPageChange(page, pageSize);
    }
    
    const onEditClick = (id) => {
        onEdit(id);
    }
    
    const columns = () => {
        return [
            {
                title: 'Documento',
                dataIndex: 'document',
                key: 'Documento',
                width: 250,
                ellipsis: true,
                className: 'ant-table-cell-link',
            }, {
                title: 'Nombre',
                render: (record) => record.name + ' ' + record.last_name ,
                key: 'Nombre',
                width: 250,
                ellipsis: true,
            }, {
                title: 'Telefono',
                dataIndex: 'phone',
                key: 'Telefono',
                width: 150,
                ellipsis: true,
            }, {
                title: 'Pais',
                key: 'Pais',
                width: 150,
                ellipsis: true,
                render: (record) => record.country.name,
            }, {
                title: 'Ciudad',
                key: 'Ciudad',
                width: 150,
                ellipsis: true,
                render: (record) => record.city.name ,
            }, {
                title: 'Tipo',
                key: 'Tipo',
                width: 150,
                ellipsis: true,
                render: (record) => record.type,
            }, {
                title: 'Baja',
                key: 'Baja',
                render: (record) => <Tag color={!record.deleted ? 'green' : 'red'}>{!record.deleted ? 'Vigente' : 'Anulado'}</Tag>,
                width: 150,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 100,
                render: record => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <EditOutlined onClick={e => onEditClick(record.IdUser)} />
                    </div>
                ),
            }
        ];
    }

    return (
        <Table
            loading={loading}
            columns={columns()}
            rowSelection={{ onChange: onRowSelectedChange, selectedRowKeys }}
            dataSource={data}
            footer={data => 
                <div>
                    <Button icon={<ReloadOutlined />} onClick={onReload} />
                    &nbsp;
                    <Input style={{width: '20%'}} placeholder='Buscar...' className='search-form' onChange={e => setFilters({ Search: e.target.value })} /> 
                    &nbsp;
                    <Select style={{width: '20%'}} placeholder='Tipos de usuario...' onChange={User_type => setFilters({ User_type })}>
                        {typesUsers.map(type => <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>)}
                    </Select>
                    &nbsp; 
                    <Checkbox onChange={e => setFilters({ ShowDeleted: e.target.checked }, onReload)}>Ver eliminados</Checkbox>
                </div>}
            pagination={{
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
            onRow={r => ({ onDoubleClick: () => onEditClick(r.Id) })}
            
        />
    )
}


