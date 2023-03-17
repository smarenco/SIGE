import { Button, Checkbox, DatePicker, Input, Table, Tag } from 'antd';
import { EyeOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DDMMYYYY } from '../common/consts';
import { DEFAULT_ROWS_PER_PAGE } from '../../env';
import { startTransition } from 'react';


const paginationStyle = {
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 0,
    position: 'absolute',
    bottom: 11,
    right: 0,
};

export const PaymentTable = ({ data, onReload, onRowSelectedChange, filters, setFilters, selectedRowKeys, loading, onPageChange, paginationProps, onViewClick: onView, onCancelPaymentClick : onCancelPayment }) => {

    const onPageChangeLocal = (page, pageSize) => {
        onPageChange(page, pageSize);
    }
    
    const onViewClick = (id) => {
        onView(id);
    }

    const onCancelPaymentClick = (id) => {
        onCancelPayment(id);
    }
    
    const columns = () => {
        return [
            {
                title: 'Documento',
                key: 'Documento',
                width: 100,
                ellipsis: true,
                className: 'ant-table-cell-link',
                render: (record) => record.student.document
            }, {
                title: 'Nombre',
                key: 'Nombre',
                width: 150,
                ellipsis: true,
                render: (record) => record.student.names
            }, {
                title: 'Fecha pago',
                key: 'Date',
                width: 80,
                ellipsis: true,
                render: (record) => moment(record.date).format(DDMMYYYY)
            }, {
                title: 'Curso',
                key: 'Curso',
                width: 170,
                ellipsis: true,
                render: (record) => record.course.name
            }, {
                title: 'Coutas pagas',
                key: 'Coutas',
                width: 150,
                ellipsis: true,
                render: (record) => record.cuotes.length > 1 ? moment(record.cuotes[0].cuote).format(DDMMYYYY) + ' - ' + moment(record.cuotes[record.cuotes.length - 1].cuote).format(DDMMYYYY) : undefined
            }, {
                title: 'Total',
                key: 'Total',
                dataIndex: 'total',
                width: 60,
                ellipsis: true,
            }, {
                title: 'Estado',
                key: 'canceled',
                render: (record) => <Tag color={!record.canceled ? 'green' : 'red'}>{!record.canceled ? 'Vigente' : 'Anulado'}</Tag>,
                width: 60,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 60,
                render: record => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <EyeOutlined onClick={e => onViewClick(record.id)} />
                        {record.cancelable && <Button onClick={e => onCancelPaymentClick(record.id)}>Anular</Button>}
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
                    <Input style={{width: '20%'}} value={filters?.Search} placeholder='Buscar...' className='search-form' onChange={e => setFilters({ Search: e.target.value })} /> 
                    &nbsp;
                    <DatePicker placeholder='Desde' format={DDMMYYYY} value={filters?.StartDate ? moment(filters.StartDate, DDMMYYYY) : undefined} onChange={StartDate => setFilters({ StartDate })} />
                    &nbsp;
                    <DatePicker placeholder='Hasta' format={DDMMYYYY} value={filters?.EndDate ? moment(filters.EndDate, DDMMYYYY) : undefined} onChange={EndDate => setFilters({ EndDate })} />
                    &nbsp;
                    <Checkbox checked={filters?.ShowDeleted} onChange={e => setFilters({ ShowDeleted: e.target.checked })}>Ver solo cancelados</Checkbox>
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
                ...paginationProps,
            }}
            scroll={{ x: columns().map(a => a.width).reduce((b, c) => b + c), y: 'calc(100vh - 260px)' }}
            rowKey={record => record.getId()}
            onRow={r => ({ onDoubleClick: () => onViewClick(r.id) })}
            
        />
    )
}


