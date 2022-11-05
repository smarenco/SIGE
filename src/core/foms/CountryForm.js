import React from 'react'

import { Form, Input } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const CountryForm = ({ view, loading, formState, onInputChange }) => {

    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={16}>
                        <Input name='Name' disabled={view} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>                    
                </LayoutH>
            </Loading>
        </Form>
    )
}