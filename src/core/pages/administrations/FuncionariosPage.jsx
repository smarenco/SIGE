import { Card } from 'antd'
import React from 'react'

export const FuncionariosPage = ({ app }) => {

  dropdownExport = () => (<Menu>
    <Menu.Item onClick={() => this.props.app.services.funcionario.index(this.state.filters, 'xls')}><Icon type="file-excel" /> {i18n.t('global.export-xls')}</Menu.Item>
    <Menu.Item onClick={() => this.props.app.services.funcionario.index(this.state.filters, 'pdf')}><Icon type="file-pdf" /> {i18n.t('global.export-pdf')}</Menu.Item>
    <Menu.Item onClick={() => this.props.app.services.funcionario.index(this.state.filters, 'csv')}><Icon type="file-text" /> {i18n.t('global.export-csv')}</Menu.Item>
  </Menu>);

  renderExtraTable = () => {
      const { loading, selectedRowKeys } = this.state;
      return (
          <>
              <Dropdown overlay={this.dropdownExport()} placement="bottomLeft" disabled={!user().Empresa.ExportarPersVisit || loading}>
                  <Button style={{ marginRight: 15 }} icon="export" disabled={loading}>{i18n.t('global.export')}</Button>
              </Dropdown>
              <Button.Group>
                  <Button key="new" onClick={e => this.setState({ modal: true, item: new Funcionario })} disabled={loading}>{i18n.t('global.new')}</Button>
                  <Button key="edit" onClick={this.onExtraTableClick.bind(this, 'edit')} disabled={loading || selectedRowKeys.length !== 1}>{i18n.t('global.edit')}</Button>
              </Button.Group>
              <Button.Group style={{ marginLeft: 15 }}>
                  <Button key="activate" onClick={this.onExtraTableClick.bind(this, 'activate')} disabled={loading || selectedRowKeys.length === 0}>{i18n.t('global.activate')}</Button>
                  <Button key="desactivate" onClick={this.onExtraTableClick.bind(this, 'desactivate')} disabled={loading || selectedRowKeys.length === 0}>{i18n.t('global.desactivate')}</Button>
              </Button.Group>
              <Button style={{ marginLeft: 15 }} key="delete" onClick={this.onExtraTableClick.bind(this, 'delete')} disabled={loading || selectedRowKeys.length === 0} type='danger' ghost>{i18n.t('global.delete')}</Button>
          </>
      );
  }


  return (
      <>
          <Card
              title={(<strong>Funcionarios</strong>)}
              className='ant-section'
              extra={this.renderExtraTable()}
          >
              <TableEntity
                  data={data}
                  onReload={this.loadData}
                  onRowSelectedChange={(selectedRowKeys, selectedRows) => this.setState({ selectedRowKeys, selectedRows })}
                  setFilters={this.onFilterTable}
                  downloadQr={this.downloadQr}
                  sendQr={this.sendQr}
                  sendQrApp={this.sendQrApp}
                  selectedRowKeys={selectedRowKeys}
                  loading={loading}
                  onPageChange={this.onPageChange}
                  pagination={{
                      pageSize: this.state.pageSize,
                      page: this.state.page,
                      total: this.state.total,
                  }}
                  onEditClick={this.loadItem}
              />
          </Card>
          <ModalEntity
              app={app}
              visible={this.state.modal}
              item={this.state.item}
              onOk={this.onModalOk}
              confirmLoading={this.state.confirmLoading}
              onCancel={() => this.setState({ modal: false, item: new Funcionario })}
          />
      </>
  )
}
