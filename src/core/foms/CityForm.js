import React from 'react'

import { Form, Input } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const CityForm = ({ view, loading, formState, onInputChange }) => {

    const onChangeInput = (e) => { 
        const { value, name} = e.target;

        onInputChange({ ...formState, [name]: value });
    }

    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={16}>
                        <Input name='Nombre' disabled={view} onChange={onChangeInput} value={formState?.Nombre} />
                    </Form.Item>                    
                </LayoutH>
            </Loading>
        </Form>
    )
}