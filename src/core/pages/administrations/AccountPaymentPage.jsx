import { Button, Card, Dropdown, Modal } from 'antd'

import { useState } from 'react';
import { alertError, renderError } from '../../common/functions';
import { AccountPaymentModal } from '../../modals/AccountPaymentModal';
import AccountPayment from '../../models/AccountPayment';
import { AuthService } from '../../services/AuthService';
import { FileExcelOutlined, FilePdfOutlined, FileTextOutlined } from '@ant-design/icons';
import { AccountPaymentTable } from '../../tables/AccountPaymentTable';

import { accountPaymentCreate, accountPaymentDelete, accountPaymentIndex, accountPaymentShow, accountPaymentUpdate, uploadDocument } from '../../services/AccountPaymentService';
import { useEffect } from 'react';
import { DDMMYYYY } from '../../common/consts';
import moment from 'moment';

export const AccountPaymentPage = ({ app }) => {

    const [item, setItem] = useState(new AccountPayment);
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
            onClick: () => accountPaymentIndex(filters, 'xls')
        },
        {
            label: 'PDF',
            key: '2',
            icon: <FilePdfOutlined />,
            onClick: () => accountPaymentIndex(filters, 'pdf')
        },
        {
            label: 'CSV',
            key: '3',
            icon: <FileTextOutlined />,
            onClick: () => accountPaymentIndex(filters, 'csv')
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
                    <Button key="new" onClick={e => {setOpenModal(true); setItem(new AccountPayment); }} disabled={loading}>Nuevo</Button>
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
                        await accountPaymentDelete(selectedRowKeys)
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
            const { data, total } = await accountPaymentIndex({ page, pageSize, ...filters });
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
            const item = await accountPaymentShow(id)
            setItem(item); setOpenModal(true); setLoading(false);
        } catch(err) {
            setLoading(false);
            renderError(err);
        }
    }

    const onModalOk = async(obj) => {
        setConfirmLoading(true);
        try {
            
            if (obj.id) {
                await accountPaymentUpdate(obj.id, obj);
            } else {
                let document = {};
                console.log(obj)
                if(obj.file){
                    const arr_name = obj.file.name.split('.');
                    const ext = arr_name[arr_name.length - 1];
                    const date = new Date;
                    let document_name = 'pago-cuenta-' + user().account_id + '-' + date.getTime() + '.' + ext;
                    document = { file: obj.file, document_name };
                    obj.document_name = document_name;
                }

                await accountPaymentCreate(obj);

                if(document){
                    await uploadDocument(document.file, document.document_name);
                }
            }

            setOpenModal(false); loadData();
            setConfirmLoading(false)
        } catch(err) {
            setConfirmLoading(false)
            renderError(err);
        }
    }

    useEffect(()=>{
        loadData();
    },[]);


    return (
        <>
            <Card
                title={(<strong>Pagos de la cuenta</strong>)}
                className='ant-section'
                extra={renderExtraTable()}
            >
              <AccountPaymentTable
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
            <AccountPaymentModal
                view={item.id}
                app={app}
                open={openModal}
                item={item}
                onOk={onModalOk}
                confirmLoading={confirmLoading}
                loading={loading}
                onCancel={() => { setLoading(false); setOpenModal(false); setItem(new AccountPayment); }}
            />
        </>
    )
}
