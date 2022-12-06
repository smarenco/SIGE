

import { Checkbox, Form, Input, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const DocumentForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {
        
    const typesUsers = [
        {id: 'PRI', name: 'Administrativo/a'},
        {id: 'SEC', name: 'Profesor/a'},
        {id: 'TER', name: 'Director/a'},
        {id: 'POS', name: 'Estudiante'},
    ];

    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={10}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item labelAlign='left' span={8}>
                        <Checkbox name='control_expiration' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.control_expiration}>Controla vencimiento</Checkbox>
                    </Form.Item>
                    <Form.Item labelAlign='left' span={4}>
                        <Checkbox name='required' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.required}>Obligatorio</Checkbox>
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}