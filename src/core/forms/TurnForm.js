

import { Form, Input, Select, TimePicker } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import dayjs from 'dayjs';
import { HHmm, HHmmss } from '../common/consts';

export const TurnForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {
    
    return (
        loading ? <Loading /> : <Form layout='vertical'>
            <LayoutH>
                <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={14}>
                    <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                </Form.Item>
                <Form.Item label={`${!view ? '*' : ''} Desde`} labelAlign='left' span={5}>
                    <TimePicker name='start_time' 
                        onSelect={(start_time) => onInputChangeByName('start_time', start_time)} 
                        format={HHmm} 
                        value={formState?.start_time ? dayjs(formState?.start_time, HHmmss) : undefined}
                        allowClear={false}
                    />
                </Form.Item>
                <Form.Item label={`${!view ? '*' : ''} Hasta`} labelAlign='left' span={5}>
                    <TimePicker name='finish_time'
                        onSelect={(finish_time) => onInputChangeByName('finish_time', finish_time)}
                        format={HHmm} 
                        value={formState?.finish_time ? dayjs(formState?.finish_time, HHmmss) : undefined}
                        allowClear={false}
                    />
                </Form.Item>
            </LayoutH>
        </Form>
    )
}