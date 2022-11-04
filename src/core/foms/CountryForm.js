import React from 'react'

import { Form, Input } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const CountryForm = ({ view, loading, formState, onInputChange }) => {

    const onChangeInput = (e) => { 
        const { value, name} = e.target;

        onInputChange({ ...formState, [name]: value });
    }

    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={16}>
                        <Input name='Name' disabled={view} onChange={onChangeInput} value={formState?.Name} />
                    </Form.Item>                    
                </LayoutH>
            </Loading>
        </Form>
    )
}