import React, { useEffect, useState } from 'react'

import { DatePicker, Form, Input, InputNumber, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { DDMMYYYY, methods_payments } from '../common/consts';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export const AccountPaymentForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {

    return (
        loading ?
            <Loading/>
            :
            <Form layout='vertical'>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Referencia`} labelAlign='left' span={6}>
                        <Input name='reference' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.reference} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Monto`} labelAlign='left' span={6}>
                        <InputNumber style={{width: '100%'}} name='amount' disabled={view || confirmLoading} onChange={amount => onInputChangeByName('amount', amount)} value={formState?.amount} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Dia de Pago`} labelAlign='left' span={6}>
                        <DatePicker name='payment_day' disabled={view || confirmLoading} onChange={(payment_day) => {onInputChangeByName('payment_day', payment_day)}} format={DDMMYYYY} value={formState?.payment_day ? dayjs(formState?.payment_day)  : undefined}/>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Metodo de pago`} labelAlign='left' span={6}>
                        <Select
                            allowClear
                            showSearch
                            value={formState?.payment_method}
                            disabled={view || confirmLoading}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={payment_method => onInputChangeByName('payment_method', payment_method)}
                        >
                            {methods_payments.map(method =>
                                <Select.Option value={method.id} key={method.id}>{method.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </LayoutH>
                <LayoutH>
                    <div style={{width: '100%', textAlign: 'center'}}>
                        <Form.Item label='Documento' labelAlign='left' span={8}>
                            <Dragger
                                multiple={false}
                                disabled={view || confirmLoading}
                                //fileList={formState.file ? [formState.file] : formState.file_name ? [{ uid: -1, name: formState.file_name, fileName: formState.file_name, status: 'done' }] : undefined}
                                beforeUpload={ReadyToUpload => {
                                    onInputChangeByName('file', ReadyToUpload );
                                    return false;
                                }}
                            >
                                <p className='ant-upload-drag-icon'>
                                    <InboxOutlined />
                                </p>
                                <p className='ant-upload-text'>Haga clic aquí o arrastre el file</p>
                                <p className='ant-upload-hint'></p>
                            </Dragger>
                        </Form.Item>
                    </div>
                </LayoutH>
                <LayoutH>
                    <Form.Item label='Observacion' labelAlign='left' span={24}>
                        <TextArea name='observation' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.observation} />
                    </Form.Item>
                </LayoutH>
            </Form>
    )
}