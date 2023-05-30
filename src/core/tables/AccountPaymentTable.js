import { Button, Checkbox, Input, Table, Tag } from 'antd';
import { DownloadOutlined, EditOutlined, ReloadOutlined } from '@ant-design/icons';
import { DDMMYYYY, methods_payments, MMYYYY } from '../common/consts';
import moment from 'moment';
import { downloadDocument } from '../services/AccountPaymentService';


const paginationStyle = {
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 0,
    position: 'absolute',
    bottom: 11,
    right: 0,
};

export const AccountPaymentTable = ({ data, onReload, onRowSelectedChange, setFilters, selectedRowKeys, loading, onPageChange, pagination, onEditClick: onEdit }) => {

    const onPageChangeLocal = (page, pageSize) => {
        onPageChange(page, pageSize);
    }
    
    const onEditClick = (id) => {
        onEdit(id);
    }
    
    const columns = () => {
        return [
            {
                title: 'Pago',
                dataIndex: 'payment_day',
                render:(r,i) => i ? moment(i).format(DDMMYYYY) : undefined,
                key: 'Pago',
                width: 150,
                ellipsis: true,
                className: 'ant-table-cell-link',
            },{
                title: 'Pago corresponde a',
                dataIndex: 'date_pay',
                render:(r,i) => i ? moment(i).format(MMYYYY) : undefined,
                key: 'Pagoday',
                width: 150,
                ellipsis: true,
                className: 'ant-table-cell-link',
            }, {
                title: 'Referencia',
                dataIndex: 'reference',
                key: 'Referencia',
                width: 150,
                ellipsis: true,
                className: 'ant-table-cell-link',
            }, {
                title: 'Monto',
                dataIndex: 'amount',
                key: 'Monto',
                width: 100,
                ellipsis: true,
                className: 'ant-table-cell-link',
            }, {
                title: 'Metodo de pago',
                key: 'MetodoPago',
                render:(record) => methods_payments.filter(i => i.id === record.payment_method)[0]?.name,
                width: 150,
                ellipsis: true,
                className: 'ant-table-cell-link',
            }, {
                title: 'Estado',
                key: 'Estado',
                render: (record) => <Tag color={record.state === 'P' ? 'grey' : record.state === 'C' ? 'green' : 'red'}>{record.state === 'P' ? 'Pendiente' : record.state === 'C' ? 'Confirmado' : 'Rechazado'}</Tag>,
                width: 150,
                ellipsis: true,
            }, {
                title: 'Eliminado',
                key: 'eliminado',
                render: (record) => <Tag color={record.deleted_at ? 'red' : 'green'}>{record.deleted_at ? 'Si' : 'No'}</Tag>,
                width: 150,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 100,
                render: record => (
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        {record.document_name && <DownloadOutlined onClick={e => downloadDocument(record.document_name)} style={{ fontSize:18, marginRight: 10 }} title='Descargar documento' />}&nbsp;<EditOutlined onClick={e => onEditClick(record.id)} />
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


