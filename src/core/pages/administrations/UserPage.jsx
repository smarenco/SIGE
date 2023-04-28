import { Button, Card, Dropdown, Modal } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { alertError, loadTypes, renderError } from '../../common/functions';
import { UserModal } from '../../modals/UserModal';
import User from '../../models/User';
import { AuthService } from '../../services/AuthService';
import { uploadDocument, userCreate, userDelete, userIndex, userShow, userToggle, userUpdate } from '../../services/UserService';
import { UserTable } from '../../tables/UserTable';
import { FileExcelOutlined, FilePdfOutlined, FileTextOutlined } from '@ant-design/icons';

export const UserPage = ({ app }) => {

    const [item, setItem] = useState(new User);
    const [filters, setFilters] = useState({});
    const [data, setData] = useState([]);
    const [dataPage, setDataPage] = useState({ page: 1, pageSize: 50});
    const [total, setTotal] = useState(0);
    const [rowSelected, setRowSelected] = useState({selectedRowKeys: [], selectedRows: []});
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [typesUsers, setTypesUsers] = useState([]);

    const { user } = AuthService();

    const { page, pageSize } = dataPage;
    const { selectedRowKeys, selectedRows } = rowSelected;
    
    const fetchTypes = async (gender) => {
        try {
            const types = loadTypes(gender);
            setTypesUsers(types);
        } catch(err) { renderError(err); }
    };

    const items = [
        {
            label: 'Excel',
            key: '1',
            icon: <FileExcelOutlined />,
            onClick: () => userIndex(filters, 'xls')
        },
        {
            label: 'PDF',
            key: '2',
            icon: <FilePdfOutlined />,
            onClick: () => userIndex(filters, 'pdf')
        },
        {
            label: 'CSV',
            key: '3',
            icon: <FileTextOutlined />,
            onClick: () => userIndex(filters, 'csv')
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
                    <Button key="new" onClick={e => {setOpenModal(true); setItem(new User); }} disabled={loading}>Nuevo</Button>
                    <Button key="edit" onClick={() => onExtraTableClick('edit')} disabled={loading || selectedRowKeys.length !== 1}>Editar</Button>
                </Button.Group>
                <Button.Group style={{ marginLeft: 15 }}>
                    <Button key="activate" onClick={() => onExtraTableClick('activate')} disabled={loading || selectedRowKeys.length === 0}>Activar</Button>
                    <Button key="desactivate" onClick={() => onExtraTableClick('desactivate')} disabled={loading || selectedRowKeys.length === 0}>Desactivar</Button>
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
                        await userDelete(selectedRowKeys)
                    } catch(err) {
                        renderError(err);
                    }                        
                    loadData();
                    },
            }); break;
            case 'activate': Modal.confirm({
                title: 'Activar registro',
                okText: 'Activar',
                cancelText: 'Cancelar',
                content: `¿Seguro que desea activar ${selectedRowKeys.length} ${selectedRowKeys.length !== 1 ? 'registros' : 'registro'}?`,
                onOk: async() => {
                    setLoading(true);
                    try {
                        await userToggle(true, selectedRowKeys)
                    } catch(err) {
                        renderError(err);
                    }                        
                    loadData();
                },
            }); break;
            case 'desactivate': Modal.confirm({
                title: 'Desactivar registro',
                okText: 'Desactivar',
                cancelText: 'Cancelar',
                content: `¿Seguro que desea desactivar ${selectedRowKeys.length} ${selectedRowKeys.length !== 1 ? 'registros' : 'registro'}?`,
                onOk: async() => {
                    setLoading(true);
                    try {
                       await userToggle(false, selectedRowKeys)
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
            const { data, total } = await userIndex({ page, pageSize, ...filters });
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
            const item = await userShow(id)
            setItem(item); setOpenModal(true); setLoading(false);
        } catch(err) {
            setLoading(false);
            renderError(err);
        }
    }

    const onModalOk = async(obj) => {
        setConfirmLoading(true);
        try {
            let documents = [];
            let i = 0;
            
            obj.documents.forEach(document => {
                if(document['file']){
                    const arr_name = document['file'].name.split('.');
                    const ext = arr_name[arr_name.length - 1];
                    let file_name = 'documento-' + document['document_id'] + '-usuario-' + obj.id + '-' + obj.document + '.' + ext;
                    documents.push({...document, file_name});
                    obj.documents[i].file_name = file_name;
                }
                i++;
            });

            if (obj.id) {
                await userUpdate(obj.id, obj);
            } else {
                await userCreate(obj);
            }

            documents.forEach(document => uploadDocument(document.file, document.file_name));

            setOpenModal(false); loadData();
        } catch(err) {
            renderError(err);
        }

        setConfirmLoading(false)        
    }

    useEffect(() => {
        loadData();
        fetchTypes();
    }, []);

    return (
        <>
            <Card
                title={(<strong>Usuarios</strong>)}
                className='ant-section'
                extra={renderExtraTable()}
            >
              <UserTable
                    data={data}
                    onReload={loadData}
                    onRowSelectedChange={(selectedRowKeys, selectedRows) => setRowSelected({ selectedRowKeys, selectedRows })}
                    setFilters={onFilterTable}
                    selectedRowKeys={selectedRowKeys}
                    loading={loading}
                    onPageChange={onPageChange}
                    typesUsers={typesUsers}
                    pagination={{
                        pageSize: pageSize,
                        page: page,
                        total: total,
                    }}
                    onEditClick={loadItem}
              />
            </Card>
            <UserModal
                app={app}
                open={openModal}
                item={item}
                onOk={onModalOk}
                confirmLoading={confirmLoading}
                loading={loading}
                onCancel={() => { setLoading(false); setOpenModal(false); setItem(new User); }}
            />
        </>
    )
}
