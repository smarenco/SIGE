import { Button, Card, Dropdown, Menu, Modal } from 'antd'

import { useEffect, useState } from 'react';
import { alertError, renderError } from '../../common/functions';
import { PaymentMethodsModal } from '../../modals/PaymentMethodsModal';
import PaymentMethods from '../../models/PaymentMethods';
import { AuthService } from '../../services/AuthService';
import { FileExcelOutlined, FilePdfOutlined, FileTextOutlined } from '@ant-design/icons';
import { PaymentMethodsTable } from '../../tables/PaymentMethodsTable';

import { paymentMethodsCreate, paymentMethodsDelete, paymentMethodsIndex, paymentMethodsShow, paymentMethodsUpdate } from '../../services/PaymentMethodsService';

export const PaymentMethodsPage = ({ app }) => {

    const [item, setItem] = useState(new PaymentMethods());
    const [filters, setFilters] = useState({});
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
            onClick: () => paymentMethodsIndex(filters, 'xls')
        },
        {
            label: 'PDF',
            key: '2',
            icon: <FilePdfOutlined />,
            onClick: () => paymentMethodsIndex(filters, 'pdf')
        },
        {
            label: 'CSV',
            key: '3',
            icon: <FileTextOutlined />,
            onClick: () => paymentMethodsIndex(filters, 'csv')
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
                    <Button key="new" onClick={e => {setOpenModal(true); setItem(new PaymentMethods); }} disabled={loading}>Nuevo</Button>
                    <Button key="edit" onClick={() => onExtraTableClick('edit')} disabled={loading || selectedRowKeys.length !== 1}>Editar</Button>
                </Button.Group>
                <Button style={{ marginLeft: 15 }} key="delete" onClick={() => onExtraTableClick('delete')} disabled={loading || selectedRowKeys.length === 0} danger ghost>Eliminar</Button>
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
                        await paymentMethodsDelete(selectedRowKeys)
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
            const { data, total } = await paymentMethodsIndex({ page, pageSize, ...filters });
            setData(data); setTotal(total); setLoading(false); setRowSelected({selectedRowKeys: [], selectedRows: []});
        }catch(err){
            setLoading(false);
        }    
    }

    const loadData = () => onPageChange(1);

    const loadItem = async(id) => {
        setLoading(true);
        try {
            const item = await paymentMethodsShow(id)
            setItem(item); setOpenModal(true); setLoading(false);
        } catch(err) {
            setLoading(false);
            renderError(err);
        }
    }

    const onModalOk = async(obj) => {
        setConfirmLoading(true);
        try {
            if (item.id) {
                await paymentMethodsUpdate(obj.id, obj);
            } else {
                await paymentMethodsCreate(obj);
            }

            setOpenModal(false); loadData();
        } catch(err) {
            renderError(err);
        }

        setConfirmLoading(false)        
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Card
                title={(<strong>Causas de ausentismos</strong>)}
                className='ant-section'
                extra={renderExtraTable()}
            >
                <PaymentMethodsTable
                    data={data}
                    onReload={loadData}
                    onRowSelectedChange={(selectedRowKeys, selectedRows) => setRowSelected({ selectedRowKeys, selectedRows })}
                    setFilters={onFilterTable}
                    selectedRowKeys={selectedRowKeys}
                    loading={loading}
                    onPageChange={onPageChange}
                    pagination={{
                        pageSize: pageSize,
                        page: page,
                        total: total,
                    }}
                    onEditClick={loadItem}
                />
            </Card>
            <PaymentMethodsModal
                app={app}
                open={openModal}
                item={item}
                onOk={onModalOk}
                confirmLoading={confirmLoading}
                loading={loading}
                onCancel={() => { setLoading(false); setOpenModal(false); setItem(new PaymentMethods); }}
            />
        </>
    )
}
