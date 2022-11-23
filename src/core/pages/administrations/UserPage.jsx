import { Button, Card, Dropdown, Menu, Modal } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { alertError, loadTypes, renderError } from '../../common/functions';
import { UserModal } from '../../modals/UserModal';
import User from '../../models/User';
import { AuthService } from '../../services/AuthService';
import { userCreate, userDelete, userIndex, userShow, userToggle, userUpdate } from '../../services/UserService';
import { UserTable } from '../../tables/UserTable';

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
            const types = await loadTypes(gender);
            setTypesUsers(types);
        } catch(err) { renderError(err); }
    };

    const dropdownExport = () => (<Menu>
        <Menu.Item onClick={() => userIndex(filters, 'xls')}>Excel</Menu.Item>
        <Menu.Item onClick={() => userIndex(filters, 'pdf')}>PDF</Menu.Item>
        <Menu.Item onClick={() => userIndex(filters, 'csv')}>CSV</Menu.Item>
    </Menu>);

    const renderExtraTable = () => {

        return (
            <>
                <Dropdown overlay={dropdownExport()} placement="bottomLeft" disabled={loading}>
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
                <Button style={{ marginLeft: 15 }} key="delete" onClick={() => onExtraTableClick('delete')} disabled={loading || selectedRowKeys.length === 0} type='danger' ghost>Eliminar</Button>
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

        const { data, total } = await userIndex({ page, pageSize, ...filters });
        setData(data); setTotal(total); setLoading(false); setRowSelected({selectedRowKeys: [], selectedRows: []});
    }

    const loadData = () => onPageChange(1);

    const loadItem = async(id) => {
        setLoading(true);
        try {
            const item = await userShow(id)
            setItem(item); setOpenModal(true);
        } catch(err) {
            renderError(err);
        }
    }

    const onModalOk = async(obj) => {
        console.log('guardar')
        setConfirmLoading(true);
        try {
            if (item.id) {
                await userUpdate(obj.id, obj);
            } else {
                await userCreate(obj);
            }

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
                title={(<strong>Funcionarios</strong>)}
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
                onCancel={() => { setOpenModal(false); setItem(new User); }}
            />
        </>
    )
}
