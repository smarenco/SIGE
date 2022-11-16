import React from 'react'

import { Form, Input, Select, DatePicker, Tabs, Modal, Checkbox } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const AbsenteeismCausesForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {

    
    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={16}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item labelAlign='left' span={8} style={{marginTop: 30}}>
                        <Checkbox name='apply_absenteeism' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name}>Aplica ausentismo</Checkbox>
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}