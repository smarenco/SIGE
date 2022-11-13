import React, { useEffect, useState } from 'react'

import { Form, Input, InputNumber, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { renderError } from '../common/functions';
import { instituteCombo } from '../services/InstituteService';

export const CourseForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {    

    let [institutes, setinstitutes ] = useState([]);

    const fetchinstitutes = async () => {
        try {
            const institutes = await instituteCombo();
            setinstitutes(institutes);
        } catch(err) {
            renderError(err);
        }
        
    };

    useEffect(() => {
        fetchinstitutes();
      }, []);
    
    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={12}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Identificador`} labelAlign='left' span={12}>
                        <Input name='identifier' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Instituto`} labelAlign='left' span={12}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={institut_id => onInputChangeByName('institut_id', institut_id)}
                            > 
                                {institutes.map(institute => 
                                    <Select.Option value={institute.id} key={institute.id}>{institute.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Cantidad Coutas`} labelAlign='left' span={6}>
                        <InputNumber name='amount_quote' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.amount_quote} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Valor Couta`} labelAlign='left' span={6}>
                        <InputNumber name='value_quote' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.value_quote} />
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}