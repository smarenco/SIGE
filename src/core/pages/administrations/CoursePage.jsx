import { Button, Card, Dropdown, Menu, Modal, Space, message } from 'antd'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { alertError, renderError } from '../../common/functions';
import { CourseModal } from '../../modals/CourseModal';
import Course from '../../models/Course';
import { user } from '../../services/AuthService';
import { DownOutlined, FileExcelOutlined, FilePdfOutlined, FileTextOutlined, ImportOutlined } from '@ant-design/icons';
import { CourseTable } from '../../tables/CourseTable';

import { courseCreate, courseDelete, courseIndex, courseShow, courseUpdate, importCourses } from '../../services/CourseService';
import { ImportCoursesModal } from '../../modals/ImportCoursesModal';

export const CoursePage = ({ app }) => {

    const [item, setItem] = useState(new Course);
    const [filters, setFilters] = useState({});
    const [data, setData] = useState([]);
    const [dataPage, setDataPage] = useState({ page: 1, pageSize: 50 });
    const [total, setTotal] = useState(0);
    const [rowSelected, setRowSelected] = useState({ selectedRowKeys: [], selectedRows: [] });
    const [openModal, setOpenModal] = useState(false);
    const [openImportModal, setOpenImportModal] = useState(false);
    const [importState, setImportState] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    //const { user } = AuthService();

    const { page, pageSize } = dataPage;
    const { selectedRowKeys, selectedRows } = rowSelected;

    const items = [
        {
            label: 'Excel',
            key: '1',
            icon: <FileExcelOutlined />,
            onClick: () => courseIndex(filters, 'xls')
        },
        {
            label: 'PDF',
            key: '2',
            icon: <FilePdfOutlined />,
            onClick: () => courseIndex(filters, 'pdf')
        },
        {
            label: 'CSV',
            key: '3',
            icon: <FileTextOutlined />,
            onClick: () => courseIndex(filters, 'csv')
        }
    ];

    const menuProps = {
        items
    };

    const renderExtraTable = () => {

        return (
            <>
                <Dropdown menu={menuProps} placement="bottomLeft" disabled={loading}>
                    <a onClick={(e) => e.preventDefault()}><Space> Exportar <DownOutlined /> </Space></a>
                </Dropdown>
                <Button icon={<ImportOutlined />} style={{ marginRight: 15 }} type="default" disabled={loading} onClick={() => setOpenImportModal(true)}>Importar</Button>
                <Button.Group>
                    <Button key="new" onClick={e => { setOpenModal(true); setItem(new Course); }} disabled={loading}>Nuevo</Button>
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
                onOk: async () => {
                    setLoading(true);
                    try {
                        await courseDelete(selectedRowKeys)
                    } catch (err) {
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
        setDataPage({ ...dataPage, pageSize, page});
        setLoading(true);

        try {
            const { data, total } = await courseIndex({ page, pageSize, ...filters });
            setData(data); setTotal(total); setLoading(false); setRowSelected({ selectedRowKeys: [], selectedRows: [] });
        } catch (err) {
            alertError(err);
            setLoading(false);
        }
    }

    const loadData = () => onPageChange(page);

    const loadItem = async (id) => {
        setLoading(true);
        try {
            const item = await courseShow(id)
            setItem(item); setOpenModal(true); setLoading(false);
        } catch (err) {
            setLoading(false);
            renderError(err);
        }
    }

    const onModalOk = async (obj) => {
        setConfirmLoading(true);
        try {
            if (item.id) {
                await courseUpdate(obj.id, obj);
            } else {
                await courseCreate(obj);
            }

            setOpenModal(false); loadData();
        } catch (err) {
            renderError(err);
        }

        setConfirmLoading(false)
    }

    const onImportModalOk = async (obj) => {
        setConfirmLoading(true);
        try {
            const { response } = await importCourses(obj);

            if (response?.data?.error?.length > 0) {
                setImportState(response?.data)
            } else {
                setOpenImportModal(false);
                message.success('Cursos importados correctamente');
                loadData();
            }
        } catch (err) {
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
                title={(<strong>Cursos</strong>)}
                className='ant-section'
                extra={renderExtraTable()}
            >
                <CourseTable
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
            <CourseModal
                app={app}
                open={openModal}
                item={item}
                onOk={onModalOk}
                confirmLoading={confirmLoading}
                loading={loading}
                onCancel={() => { setLoading(false); setOpenModal(false); setItem(new Course); }}
            />
            <ImportCoursesModal
                app={app}
                importState={importState}
                open={openImportModal}
                file={undefined}
                onOk={onImportModalOk}
                confirmLoading={confirmLoading}
                loading={loading}
                onCancel={() => { setLoading(false); setOpenImportModal(false); setItem(new Course); }}
            />
        </>
    )
}
