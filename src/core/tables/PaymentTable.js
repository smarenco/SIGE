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

export const PaymentTable = ({ data, onReload, onRowSelectedChange, setFilters, selectedRowKeys, loading, onPageChange, pagination, onEditClick: onEdit }) => {

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
                key: 'Documento',
                width: 130,
                ellipsis: true,
                className: 'ant-table-cell-link',
                render: (record) => record.user.document
            }, {
                title: 'Nombre',
                key: 'Nombre',
                width: 200,
                ellipsis: true,
                render: (record) => record.user.name
            }, {
                title: 'Coutas',
                dataIndex: 'amount_coute',
                key: 'Coutas',
                width: 100,
                ellipsis: true,
            }, {
                title: 'Valor Couta',
                dataIndex: 'value_coute',
                key: 'Coutas',
                width: 120,
                ellipsis: true,
            }, {
                title: 'Descuento',
                dataIndex: 'discount',
                key: 'Descuento',
                width: 100,
                ellipsis: true,
            }, {
                title: 'Recargo',
                dataIndex: 'surcharge',
                key: 'Recargo',
                width: 100,
                ellipsis: true,
            }, {
                title: 'Total',
                key: 'Total',
                width: 100,
                ellipsis: true,
                render: (record) => (record.amount_coute * record.value_coute) + record.surcharge - record.discount,
            }, {
                title: 'Cancelado',
                key: 'canceled',
                render: (record) => <Tag color={!record.canceled ? 'green' : 'red'}>{!record.canceled ? 'Vigente' : 'Anulado'}</Tag>,
                width: 100,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 100,
                render: record => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
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
            rowSelection={{ onChange: onRowSelectedChange, selectedRowKeys }}
            dataSource={data}
            footer={data => 
                <div>
                    <Button icon={<ReloadOutlined />} onClick={onReload} />
                    &nbsp;
                    <Input style={{width: '20%'}} placeholder='Buscar...' className='search-form' onChange={e => setFilters({ Search: e.target.value })} /> 
                    &nbsp;
                    <Checkbox onChange={e => setFilters({ ShowDeleted: e.target.checked }, onReload)}>Ver solo cancelados</Checkbox>
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
            onRow={r => ({ onDoubleClick: () => onEditClick(r.id) })}
            
        />
    )
}


