import React from 'react'

import { Form, Input } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const MedicalCoverageForm = ({ view, loading, confirmLoading, formState, onInputChange }) => {

    return (
        loading ? <Loading /> : <Form layout='vertical'>
            <LayoutH>
                <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={16} rules={[{ required: true},]}>
                    <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                </Form.Item>
            </LayoutH>
        </Form>
    )
}