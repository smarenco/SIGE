import { Button, Card, Dropdown, Menu, Modal } from 'antd'

import { useState } from 'react';
import { alertError, renderError } from '../../common/functions';
import { AbsenteeismCausesModal } from '../../modals/AbsenteeismCausesModal';
import AbsenteeismCauses from '../../models/AbsenteeismCauses';
import { AuthService } from '../../services/AuthService';
import { AbsenteeismCausesTable } from '../../tables/AbsenteeismCausesTable';

import { absenteeismCausesCreate, absenteeismCausesDelete, absenteeismCausesIndex, absenteeismCausesShow, absenteeismCausesUpdate } from '../../services/AbsenteeismCausesService';

export const AbsenteeismCausesPage = ({ app }) => {

    const [item, setItem] = useState(new AbsenteeismCauses);
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
        <Menu.Item onClick={() => absenteeismCausesIndex(filters, 'xls')}>Excel</Menu.Item>
        <Menu.Item onClick={() => absenteeismCausesIndex(filters, 'pdf')}>PDF</Menu.Item>
        <Menu.Item onClick={() => absenteeismCausesIndex(filters, 'csv')}>CSV</Menu.Item>
    </Menu>);

    const renderExtraTable = () => {

        return (
            <>
                <Dropdown overlay={dropdownExport()} placement="bottomLeft" disabled={loading}>
                    <Button style={{ marginRight: 15 }} type="export" disabled={loading}>Exportar</Button>
                </Dropdown>
                <Button.Group>
                    <Button key="new" onClick={e => {setOpenModal(true); setItem(new AbsenteeismCauses); }} disabled={loading}>Nuevo</Button>
                    <Button key="edit" onClick={() => onExtraTableClick('edit')} disabled={loading || selectedRowKeys.length !== 1}>Editar</Button>
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
                        await absenteeismCausesDelete(selectedRowKeys)
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
            const { data, total } = await absenteeismCausesIndex({ page, pageSize, ...filters });
            setData(data); setTotal(total); setLoading(false); setRowSelected({selectedRowKeys: [], selectedRows: []});
        }catch(err){
            setLoading(false);
        }        
    }

    const loadData = () => onPageChange(1);

    const loadItem = async(id) => {
        setLoading(true);
        try {
            const item = await absenteeismCausesShow(id)
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
                await absenteeismCausesUpdate(obj.id, obj);
            } else {
                await absenteeismCausesCreate(obj);
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
                title={(<strong>Causas de ausentismos</strong>)}
                className='ant-section'
                extra={renderExtraTable()}
            >
                <AbsenteeismCausesTable
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
            <AbsenteeismCausesModal
                app={app}
                open={openModal}
                item={item}
                onOk={onModalOk}
                confirmLoading={confirmLoading}
                loading={loading}
                onCancel={() => { setLoading(false); setOpenModal(false); setItem(new AbsenteeismCauses); }}
            />
        </>
    )
}
