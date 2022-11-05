import { Button, Card, Dropdown, Menu, Modal } from 'antd'
import React from 'react'
import { useState } from 'react';
import { alertError, renderError } from '../../common/functions';
import { MedicalCoverageModal } from '../../modals/MedicalCoverageModal';
import MedicalCoverage from '../../models/MedicalCoverage';
import { AuthService } from '../../services/AuthService';
import { MedicalCoverageTable } from '../../tables/MedicalCoverageTable';

import { medicalCoverageCreate, medicalCoverageDelete, medicalCoverageIndex, medicalCoverageShow, medicalCoverageUpdate } from '../../services/MedicalCoverageService';

export const MedicalCoveragePage = ({ app }) => {

    const [item, setItem] = useState(new MedicalCoverage);
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
    
    const dropdownExport = () => (<Menu>
        <Menu.Item onClick={() => medicalCoverageIndex(filters, 'xls')}>Excel</Menu.Item>
        <Menu.Item onClick={() => medicalCoverageIndex(filters, 'pdf')}>PDF</Menu.Item>
        <Menu.Item onClick={() => medicalCoverageIndex(filters, 'csv')}>CSV</Menu.Item>
    </Menu>);

    const renderExtraTable = () => {

        return (
            <>
                <Dropdown overlay={dropdownExport()} placement="bottomLeft" disabled={loading}>
                    <Button style={{ marginRight: 15 }} type="export" disabled={loading}>Exportar</Button>
                </Dropdown>
                <Button.Group>
                    <Button key="new" onClick={e => {setOpenModal(true); setItem(new MedicalCoverage); }} disabled={loading}>Nuevo</Button>
                    <Button key="edit" onClick={() => onExtraTableClick('edit')} disabled={loading || selectedRowKeys.length !== 1}>Editar</Button>
                </Button.Group>
                {/* <Button.Group style={{ marginLeft: 15 }}>
                    <Button key="activate" onClick={() => onExtraTableClick('activate')} disabled={loading || selectedRowKeys.length === 0}>Activar</Button>
                    <Button key="desactivate" onClick={() => onExtraTableClick('desactivate')} disabled={loading || selectedRowKeys.length === 0}>Desactivar</Button>
                </Button.Group> */}
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
                        await medicalCoverageDelete(selectedRowKeys)
                    } catch(err) {
                        renderError(err);
                    }                        
                    loadData();
                    },
            }); break;
            /*case 'activate': Modal.confirm({
                title: 'Activar registro',
                okText: 'Activar',
                cancelText: 'Cancelar',
                content: `¿Seguro que desea activar ${selectedRowKeys.length} ${selectedRowKeys.length !== 1 ? 'registros' : 'registro'}?`,
                onOk: async() => {
                    setLoading(true);
                    try {
                        await medicalCoverageToggle(true, selectedRowKeys)
                    } catch(err) {
                        renderError(err);
                    }                        
                    loadData();
                },
            }); break;*/
            /*case 'desactivate': Modal.confirm({
                title: 'Desactivar registro',
                okText: 'Desactivar',
                cancelText: 'Cancelar',
                content: `¿Seguro que desea desactivar ${selectedRowKeys.length} ${selectedRowKeys.length !== 1 ? 'registros' : 'registro'}?`,
                onOk: async() => {
                    setLoading(true);
                    try {
                       await medicalCoverageToggle(false, selectedRowKeys)
                    } catch(err) {
                        renderError(err);
                    }                        
                    loadData();
                },
            }); break;*/
        }
    }

    const onFilterTable = (filter) => {
        setFilters({ ...filters, ...filter });
    }

    const onPageChange = async (page, pageSize) => {
        pageSize = pageSize === undefined ? pageSize : pageSize;
        setDataPage({ ...dataPage, pageSize});
        setLoading(true);

        const { data, total } = await medicalCoverageIndex({ page, pageSize, ...filters });
        setData(data); setTotal(total); setLoading(false); setRowSelected({});
    }

    const loadData = () => onPageChange(1);

    const loadItem = async(id) => {
        setLoading(true);
        try {
            const item = await medicalCoverageShow(id)
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
                await medicalCoverageUpdate(obj.id, obj);
            } else {
                await medicalCoverageCreate(obj);
            }

            setOpenModal(false); loadData();
        } catch(err) {
            renderError(err);
        }

        setConfirmLoading(false)        
    }


    return (
        <>
            <Card
                title={(<strong>Coberturas Medicas</strong>)}
                className='ant-section'
                extra={renderExtraTable()}
            >
              <MedicalCoverageTable
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
            <MedicalCoverageModal
                app={app}
                open={openModal}
                item={item}
                onOk={onModalOk}
                confirmLoading={confirmLoading}
                loading={loading}
                onCancel={() => { setOpenModal(false); setItem(new MedicalCoverage); }}
            />
        </>
    )
}
