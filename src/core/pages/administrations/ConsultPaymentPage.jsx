import { Button, Card, Checkbox, DatePicker, Dropdown, Input, Menu, Modal } from 'antd'

import { useState } from 'react';
import { alertError, renderError } from '../../common/functions';
import { PaymentModal } from '../../modals/PaymentModal';
import Payment from '../../models/Payment';
import { AuthService } from '../../services/AuthService';
import { FileExcelOutlined, FilePdfOutlined, FileTextOutlined, ReloadOutlined } from '@ant-design/icons';
import { PaymentTable } from '../../tables/PaymentTable';

import { paymentCreate, paymentDelete, paymentIndex, paymentShow, paymentUpdate } from '../../services/PaymentService';
import { useEffect } from 'react';
import moment from 'moment';
import { DDMMYYYY } from '../../common/consts';

export const ConsultPaymentPage = ({ app }) => {

    const [item, setItem] = useState(new Payment);
    const [filters, setFilters] = useState({StartDate: moment().startOf('month').format(DDMMYYYY), EndDate: moment().endOf('month').format(DDMMYYYY)});
    const [data, setData] = useState([]);
    const [dataPage, setDataPage] = useState({ page: 1, pageSize: 50});
    const [total, setTotal] = useState(0);
    const [rowSelected, setRowSelected] = useState({selectedRowKeys: [], selectedRows: []});
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { user } = AuthService();

    const { page, pageSize } = dataPage;
    const { selectedRowKeys, selectedRows } = rowSelected;
    
    const items = [
        {
            label: 'Excel',
            key: '1',
            icon: <FileExcelOutlined />,
            onClick: () => paymentIndex(filters, 'xls')
        },
        {
            label: 'PDF',
            key: '2',
            icon: <FilePdfOutlined />,
            onClick: () => paymentIndex(filters, 'pdf')
        },
        {
            label: 'CSV',
            key: '3',
            icon: <FileTextOutlined />,
            onClick: () => paymentIndex(filters, 'csv')
        }
    ];

    const menuProps = {
        items
    };

    const renderExtraTable = () => {

        return (
            <>
                <Dropdown menu={menuProps} placement="bottomLeft" disabled={loading}>
                    <Button style={{ marginRight: 15 }} type="export" disabled={loading}>Exportar</Button>
                </Dropdown>
                <Button.Group>
                    <Button key="edit" onClick={() => onExtraTableClick('edit')} disabled={loading || selectedRowKeys.length !== 1}>Ver</Button>
                </Button.Group>
            </>
        );
    }

    const onExtraTableClick = (action) => {
        switch (action) {
            case 'edit': loadItem(selectedRowKeys[0]); break;
            case 'delete': Modal.confirm({
                title: 'Eliminar registro',
                okType: 'danger',
                okText: 'Eliminar',
                cancelText: 'Cancelar',
                content: `¿Seguro que desea eliminar ${selectedRowKeys.length} ${selectedRowKeys.length !== 1 ? 'registros' : 'registro'}?`,
                onOk: async() => {
                    setLoading(true);
                    try {
                        await paymentDelete(selectedRowKeys)
                    } catch(err) {
                        renderError(err);
                    }                        
                    loadData();
                    },
            }); break;
        }
    }

    const onFilterTable = (filter) => {
        setFilters({ ...filters, ...filter });
    }

    const onPageChange = async (page, pageSize) => {
        pageSize = pageSize === undefined ? pageSize : pageSize;
        setDataPage({ ...dataPage, pageSize});
        setLoading(true);

        try{
            const { data, total } = await paymentIndex({ page, pageSize, ...filters });
            setData(data); setTotal(total); setLoading(false); setRowSelected({selectedRowKeys: [], selectedRows: []});
        }catch(err){
            alertError(err);
            setLoading(false);
        }
    }

    const loadData = () => onPageChange(1);

    const loadItem = async(id) => {
        setLoading(true);
        try {
            const item = await paymentShow(id)
            setItem(item); setOpenModal(true); setLoading(false);
        } catch(err) {
            setLoading(false);
            renderError(err);
        }
    }

    const onCancelPayment = async(id) => {
        setConfirmLoading(true);
        try {
            if (id) {
                await paymentDelete(id);
            }

            setOpenModal(false); loadData();
        } catch(err) {
            renderError(err);
        }

        setConfirmLoading(false)        
    }

    useEffect(()=>{
        loadData();
    },[]);


    return (
        <>
            <Card
                title={(<strong>Consulta Pagos</strong>)}
                className='ant-section'
                extra={renderExtraTable()}
            >
              <PaymentTable
                    data={data}
                    onRowSelectedChange={(selectedRowKeys, selectedRows) => setRowSelected({ selectedRowKeys, selectedRows })}
                    setFilters={onFilterTable}
                    filters={filters}
                    onReload={loadData}
                    selectedRowKeys={selectedRowKeys}
                    loading={loading}
                    onPageChange={onPageChange}
                    paginationProps={{
                        pageSize: pageSize,
                        page: page,
                        total: total,
                    }}
                    onViewClick={loadItem}
                    onCancelPaymentClick={onCancelPayment}
              />
            </Card>
            <PaymentModal
                app={app}
                view={true}
                open={openModal}
                item={item}
                confirmLoading={confirmLoading}
                loading={loading}
                onCancel={() => { setLoading(false); setOpenModal(false); setItem(new Payment); }}
            />
        </>
    )
}
