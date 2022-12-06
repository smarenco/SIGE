

import { Checkbox, Form, Input, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import moment from 'moment';

export const DocumentCategoryForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {
        
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
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={14}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label='Tipo categoria' labelAlign='left' span={5}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='type'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading} 
                            onChange={(type) => onInputChangeByName('type', type)} value={formState?.type}
                        >
                            {typesUsers.map(type => 
                                <Select.Option value={type.id} key={type.id}>{type.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}