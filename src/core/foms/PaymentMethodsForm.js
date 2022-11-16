import React from 'react'

import { Form, Input, Checkbox } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const PaymentMethodsForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {

    
    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={16}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item labelAlign='left' span={8} style={{marginTop: 30}}>
                        <Checkbox name='online' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name}>Online</Checkbox>
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}