import React from 'react'

import { Form, Input, Select, TimePicker } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import moment from 'moment';

export const TurnForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {
    
    const format = 'HH:mm';

    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={14}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Desde`} labelAlign='left' span={5}>
                        <TimePicker name='from_hour' onChange={(from_hour) => onInputChangeByName('from_hour', from_hour)} format={format} value={formState?.from_hour ? moment(formState?.from_hour, format)  : undefined}/>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Hasta`} labelAlign='left' span={5}>
                        <TimePicker name='to_hour' onChange={(to_hour) => onInputChangeByName('to_hour', to_hour)} format={format} value={formState?.to_hour ? moment(formState?.to_hour, format)  : undefined}/>
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}