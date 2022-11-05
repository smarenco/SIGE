import { Button, Checkbox, Input, Layout, Table, Tag } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import React from 'react'

const paginationStyle = {
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 0,
    position: 'absolute',
    bottom: 11,
    right: 0,
};

export const CourseTable = ({ data, onReload, onRowSelectedChange, setFilters, selectedRowKeys, loading, onPageChange, pagination, onEditClick: onEdit }) => {

    const onPageChangeLocal = (page, pageSize) => {
        onPageChange(page, pageSize);
    }
    
    const onEditClick = (id) => {
        onEdit(id);
    }
    
    const columns = () => {
        return [
            {
                title: 'Identificador',
                dataIndex: 'identifier',
                key: 'Identificador',
                width: 150,
                ellipsis: true,
                className: 'ant-table-cell-link',
            }, {
                title: 'Instituto',
                dataIndex: 'name_institut',
                key: 'Instituto',
                width: 150,
                ellipsis: true,
            }, {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'Nombre',
                width: 150,
                ellipsis: true,
            }, {
                title: 'Cuotas',
                dataIndex: 'amount_quota',
                key: 'Cuotas',
                width: 100,
                ellipsis: true,
            }, {
                title: 'Valor Couta',
                dataIndex: 'value_quota',
                key: 'ValorCouta',
                render: (t, r) => <span>${t}</span>,
                width: 100,
                ellipsis: true,
            }, {
                title: 'Baja',
                key: 'Baja',
                render: (record) => <Tag color={!record.Baja ? 'green' : 'red'}>{!record.Baja ? 'Vigente' : 'Anulado'}</Tag>,
                width: 150,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 100,
                render: record => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Button key='see' icon='edit' onClick={e => onEditClick(record.id)} title='Editar'></Button>
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
                    <Input style={{width: '20%'}} placeholder='Buscar...' className='search-form' onChange={e => setFilters({ Busqueda: e.target.value })} /> 
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


