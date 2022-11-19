import React, { useEffect, useState } from 'react'

import { Form, Input, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { countryCombo } from '../services/CountryService';
import { renderError } from '../common/functions';

export const CityForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {    

    let [countries, setCountries ] = useState([{country_id: 1, name: 'Uruguay'}]);

    const fetchCountries = async () => {
        try {
            const countries = await countryCombo();
            setCountries(countries);
        } catch(err) {
            renderError(err);
        }
        
    };

    useEffect(() => {
        fetchCountries();
      }, []);
    
    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={12}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Pais`} labelAlign='left' span={12}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={country_id => onInputChangeByName('country_id', country_id)}
                            > 
                                {countries.map(country => 
                                    <Select.Option value={country.id} key={country.id}>{country.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}