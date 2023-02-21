import { Button, Checkbox, DatePicker, Input, Table, Tag } from 'antd';
import { EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DDMMYYYY } from '../common/consts';


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
                render: (record) => record.student.document
            }, {
                title: 'Nombre',
                key: 'Nombre',
                width: 200,
                ellipsis: true,
                render: (record) => record.student.names
            }, {
                title: 'Fecha pago',
                key: 'Date',
                width: 115,
                ellipsis: true,
                render: (record) => moment(record.date).format(DDMMYYYY)
            }, {
                title: 'Curso',
                key: 'Curso',
                width: 170,
                ellipsis: true,
                render: (record) => record.course.name
            }, {
                title: 'Coutas',
                dataIndex: 'amount_coute',
                key: 'Coutas',
                width: 80,
                ellipsis: true,
            }/*, {
                title: 'Valor Couta',
                dataIndex: 'quota_value',
                key: 'Coutas',
                width: 110,
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
                width: 90,
                ellipsis: true,
            }*/, {
                title: 'Total',
                key: 'Total',
                dataIndex: 'total',
                width: 80,
                ellipsis: true,
            }, {
                title: 'Estado',
                key: 'canceled',
                render: (record) => <Tag color={!record.canceled ? 'green' : 'red'}>{!record.canceled ? 'Vigente' : 'Anulado'}</Tag>,
                width: 90,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 60,
                render: record => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <EyeOutlined onClick={e => onEditClick(record.id)} />
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
                    <DatePicker placeholder='Desde' onChange={StartDate => setFilters({ StartDate })} />
                    &nbsp;
                    <DatePicker placeholder='Hasta' onChange={EndtDate => setFilters({ EndtDate })} />
                    &nbsp;
                    <Checkbox onChange={e => setFilters({ ShowDeleted: e.target.checked })}>Ver solo cancelados</Checkbox>
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


