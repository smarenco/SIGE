import React, { useEffect, useState } from 'react'

import { Checkbox, Form, Input, InputNumber, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { renderError } from '../common/functions';
import { instituteCombo } from '../services/InstituteService';
import { documentCategoryCombo } from '../services/DocumentCategoryService';

export const CourseForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {    

    let [institutes, setInstitutes ] = useState([]);
    let [loadingInstitutes, setLoadingInstitutes ] = useState(false);
    let [documental_categories, setDocumental_categories ] = useState([]);
    let [loadingDocuments, setLoadingDocuments ] = useState(false);

    const fetchInstitutes = async () => {
        setLoadingInstitutes(true);
        try {
            const institutes = await instituteCombo();
            setInstitutes(institutes);
            setLoadingInstitutes(false);
        } catch(err) {
            setLoadingInstitutes(false);
            renderError(err);
        }
    };

    const fetchDocumental_categories = async () => {
        setLoadingDocuments(true);
        try {
            const documental_categories = await documentCategoryCombo({type: 'CUR'});
            setDocumental_categories(documental_categories);
            setLoadingDocuments(false);
        } catch(err) {
            setLoadingDocuments(false);
            renderError(err);
        }
    };

    useEffect(() => {
        fetchInstitutes();
        fetchDocumental_categories();
      }, []);
    
    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={12}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Identificador`} labelAlign='left' span={12}>
                        <Input name='identifier' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.identifier} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Instituto`} labelAlign='left' span={8}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading || loadingInstitutes}
                            loading={loadingInstitutes}
                            value={formState?.institute_id}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={institute_id => onInputChangeByName('institute_id', institute_id)}
                            > 
                                {institutes.map(institute => 
                                    <Select.Option value={institute.id} key={institute.id}>{institute.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Categoria documentos`} labelAlign='left' span={8}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading || loadingDocuments}
                            loading={loadingDocuments}
                            value={formState?.documental_category_id}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={documental_category_id => onInputChangeByName('documental_category_id', documental_category_id)}
                            > 
                                {documental_categories.map(documental_category => 
                                    <Select.Option value={documental_category.id} key={documental_category.id}>{documental_category.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Cantidad Coutas`} labelAlign='left' span={4}>
                        <InputNumber name='quotas' disabled={view || confirmLoading} onChange={quotas => onInputChangeByName('quotas', quotas)} value={formState?.quotas} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Valor Couta`} labelAlign='left' span={4}>
                        <InputNumber name='quota_value' disabled={view || confirmLoading} onChange={quota_value => onInputChangeByName('quota_value', quota_value)} value={formState?.quota_value} />
                    </Form.Item>
                    <Form.Item labelAlign='left' span={4}>
                        <Checkbox name='tuition' disabled={view || confirmLoading} onChange={e => onInputChangeByName('tuition', e.target.checked)} value={formState?.tuition}>Matricula</Checkbox>
                    </Form.Item>
                    <Form.Item label={`Valor matricula`} labelAlign='left' span={4}>
                        <InputNumber name='tuition_value' disabled={view || confirmLoading} onChange={tuition_value => onInputChangeByName('tuition_value', tuition_value)} value={formState?.tuition_value} />
                    </Form.Item>
                    <Form.Item label={`Costo Certificado`} labelAlign='left' span={6}>
                        <InputNumber name='certificate_cost' disabled={view || confirmLoading} onChange={certificate_cost => onInputChangeByName('certificate_cost', certificate_cost)} value={formState?.certificate_cost} />
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}