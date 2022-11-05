import React from 'react'

import { Form, Input } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const UserForm = ({ view, loading, formState, onInputChange }) => {

    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={16}>
                        <Input name='Nombre' disabled={view} onChange={onInputChange} value={formState?.Nombre} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Apellido`} labelAlign='left' span={4}>
                        <Input name='Apellido' disabled={view} onChange={onInputChange} value={formState?.Apellido} />
                    </Form.Item>                    
                </LayoutH>
            </Loading>
        </Form>
    )
}