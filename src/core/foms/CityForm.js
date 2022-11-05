import React, { useEffect, useState } from 'react'

import { Form, Input, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { countryCombo } from '../services/CountryService';
import { renderError } from '../common/functions';

export const CityForm = ({ view, loading, formState, onInputChange, onInputChangeByName }) => {    

    let [countries, setCountries ] = useState([]);

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
    
    //countries = [{country_id: 1, name: 'Uruguay'}];
    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={12}>
                        <Input name='Name' disabled={view} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Pais`} labelAlign='left' span={12}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={IdCountry => onInputChangeByName('IdCountry', IdCountry)}
                            > 
                                {countries.map(country => 
                                    <Select.Option value={country.country_id} key={country.country_id}>{country.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}