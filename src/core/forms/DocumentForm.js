

import { Checkbox, Form, Input, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const DocumentForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {

    return (
        loading ? <Loading /> : <Form layout='vertical'>
            <LayoutH>
                <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={10}>
                    <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                </Form.Item>
                <Form.Item labelAlign='left' span={8}>
                    <Checkbox style={{marginTop: 33}} name='expiration_control' disabled={view || confirmLoading} onChange={e => onInputChangeByName('expiration_control', e.target.checked)} checked={formState?.expiration_control}>Controla vencimiento</Checkbox>
                </Form.Item>
                <Form.Item labelAlign='left' span={4}>
                    <Checkbox style={{marginTop: 33}} name='required' disabled={view || confirmLoading} onChange={e => onInputChangeByName('required', e.target.checked)} checked={formState?.required}>Obligatorio</Checkbox>
                </Form.Item>
            </LayoutH>
        </Form>
    )
}