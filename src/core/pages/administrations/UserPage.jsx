import { Button, Card, Dropdown, Menu, Modal, Icon } from 'antd'
import React from 'react'
import { useState } from 'react';
import { alertError, renderError } from '../../common/functions';
import { AuthService } from '../../services/AuthService';
import { UserTable } from '../../tables/UserTable';

export const UserPage = ({ app }) => {

    const [item, setItem] = useState({});
    const [filters, setFilters] = useState({});
    const [data, setData] = useState([]);
    const [dataPage, setDataPage] = useState({ page: 1, pageSize: 50});
    const [total, setTotal] = useState(0);
    const [rowSelected, setRowSelected] = useState({selectedRowKeys, selectedRows});
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const { user } = AuthService();

    const { page, pageSize } = dataPage;
    const { selectedRowKeys, selectedRows } = rowSelected;
    
    const dropdownExport = () => (<Menu>
        <Menu.Item onClick={() => this.props.app.services.funcionario.index(filters, 'xls')}>Excel</Menu.Item>
        <Menu.Item onClick={() => this.props.app.services.funcionario.index(filters, 'pdf')}>PDF</Menu.Item>
        <Menu.Item onClick={() => this.props.app.services.funcionario.index(filters, 'csv')}>CSV</Menu.Item>
    </Menu>);

    const renderExtraTable = () => {

        return (
            <>
                <Dropdown overlay={dropdownExport()} placement="bottomLeft" disabled={!user().Empresa.ExportarPersVisit || loading}>
                    <Button style={{ marginRight: 15 }} icon="export" disabled={loading}>Exportar</Button>
                </Dropdown>
                <Button.Group>
                    {/* <Button key="new" onClick={e => {setShowModal(true); setItem(new Funcionario); }} disabled={loading}>Nuevo</Button> */}
                    <Button key="new" onClick={e => {setShowModal(true); setItem({}); }} disabled={loading}>Nuevo</Button>
                    <Button key="edit" onClick={onExtraTableClick('edit')} disabled={loading || selectedRowKeys.length !== 1}>Editar</Button>
                </Button.Group>
                <Button.Group style={{ marginLeft: 15 }}>
                    <Button key="activate" onClick={onExtraTableClick('activate')} disabled={loading || selectedRowKeys.length === 0}>Activar</Button>
                    <Button key="desactivate" onClick={onExtraTableClick('desactivate')} disabled={loading || selectedRowKeys.length === 0}>Desactivar</Button>
                </Button.Group>
                <Button style={{ marginLeft: 15 }} key="delete" onClick={onExtraTableClick('delete')} disabled={loading || selectedRowKeys.length === 0} type='danger' ghost>Eliminar</Button>
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
                onOk: () => {
                    setLoading(true);
                    this.service.delete(selectedRowKeys)
                        .then(loadData)
                        .catch(renderError)
                    },
            }); break;
            case 'activate': Modal.confirm({
                title: 'Activar registro',
                okText: 'Activar',
                cancelText: 'Cancelar',
                content: `¿Seguro que desea activar ${selectedRowKeys.length} ${selectedRowKeys.length !== 1 ? 'registros' : 'registro'}?`,
                onOk: () => {
                    setLoading(true);
                    this.service.toggle(true, selectedRowKeys)
                        .then()
                        .catch(renderError)
                        .then(loadData);
                },
            }); break;
            case 'desactivate': Modal.confirm({
                title: 'Desactivar registro',
                okText: 'Desactivar',
                cancelText: 'Cancelar',
                content: `¿Seguro que desea desactivar ${selectedRowKeys.length} ${selectedRowKeys.length !== 1 ? 'registros' : 'registro'}?`,
                onOk: () => {
                    setLoading(true);
                    this.service.toggle(false, selectedRowKeys)
                        .then()
                        .catch(renderError)
                        .then(loadData);
                },
            }); break;
        }
    }

    const onFilterTable = (filter) => {
        setFilters({ ...filters, ...filter });
    }

    const onPageChange = (page, pageSize) => {
        pageSize = pageSize === undefined ? pageSize : pageSize;
        setDataPage({ ...dataPage, pageSize});
        setLoading(true);

        this.service.index({ page, pageSize, ...filters })
            .then(({ data, total }) => { setData(data); setTotal(total); setLoading(false); setRowSelected({}); })
            .catch(renderError);
    }

    const loadData = () => onPageChange(1);

    const loadItem = (id) => {
        setLoading(true);
        this.service.getById(id)
            .then(item => this.setState({ item, modal: true }))
            .catch(renderError)
            .then(() => setLoading(false) );
    }

    const onModalOk = (obj) => {
        setConfirmLoading(true);
        if (item.IdFuncionario) {
            this.service.update(obj.IdFuncionario, obj)
                .then(() => { setShowModal(false); loadData(); })
                .catch(alertError)
                .then(() => setConfirmLoading(false));
        } else {
            this.service.create(obj)
                .then(() => this.setState({ modal: false }, this.loadData))
                .catch(alertError)
                .then(() => setConfirmLoading(false));
        }
    }


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
                  pagination={{
                      pageSize: pageSize,
                      page: page,
                      total: total,
                  }}
                  onEditClick={loadItem}
              />
          </Card>
          {/* <ModalEntity
              app={app}
              visible={showModal}
              item={item}
              onOk={onModalOk}
              confirmLoading={confirmLoading}
              onCancel={() => { setShowModal(false); setItem(new Funcionario); }}
          /> */}
      </>
  )
}
