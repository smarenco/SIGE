import { Button, Table } from 'antd';
import dayjs from 'dayjs';
import { DDMMYYYY, DDMMYYYYHHmm } from '../common/consts';

const paginationStyle = {
    marginRight: 24,
    marginLeft: 24,
    marginBottom: 0,
    position: 'absolute',
    bottom: 10,
    right: 0,
};

export const ExpiredDocumentTable = ({ data, notifyLoading, loading, onPageChange, paginationProps, onNotifyExpiredDocumentClick : onNotifyExpiredDocument }) => {

    const onPageChangeLocal = (page, pageSize) => {
        onPageChange(page, pageSize);
    }

    const onNotifyExpiredDocumentClick = (id) => {
        onNotifyExpiredDocument(id);
    }
    
    const columns = () => {
        return [
            {
                title: 'Documento',
                key: 'Documento',
                width: 120,
                ellipsis: true,
                className: 'ant-table-cell-link',
                render: (record) => record.document.name
            }, {
                title: 'Nombre',
                key: 'Nombre',
                width: 150,
                ellipsis: true,
                render: (record) => record.user.names + ' ' + record.user.lastnames
            }, {
                title: 'Nro Documento',
                key: 'NroDocumento',
                width: 150,
                ellipsis: true,
                render: (record) => record.user.document
             }, {
                title: 'Tipo usuario',
                key: 'Tipo',
                width: 110,
                ellipsis: true,
                render: (record) => record.user.type
            }, {
                title: 'Vencimiento',
                key: 'Vencimiento',
                width: 120,
                ellipsis: true,
                render: (record) => dayjs(record.expiration).format(DDMMYYYY)
            }, {
                title: 'Observacion',
                key: 'Observacion',
                render: (record) => record.observation,
                width: 180,
                ellipsis: true,
            }, {
                title: 'Notificado',
                key: 'Notificado',
                render: (record) => dayjs(record.notification_expiration_date).format(DDMMYYYYHHmm),
                width: 140,
                ellipsis: true,
            }, {
                title: '',
                key: 'actions',
                width: 90,
                render: record => (<Button type='primary' size='small' disabled={notifyLoading} onClick={e => onNotifyExpiredDocumentClick(record.id)}>Notificar</Button>),
            }
        ];
    }

    return (
        <Table
            loading={loading}
            columns={columns()}
            dataSource={data}
            footer={data => <div style={{ padding: 10 }}></div>}
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
            scroll={{ x: columns().map(a => a.width).reduce((b, c) => b + c), y: 'calc(100vh - 280px)' }}
            rowKey={record => record.id}
            
        />
    )
}


