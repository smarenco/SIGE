import React, { useEffect, useState } from 'react'

import { Form, Input, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { countryCombo } from '../services/CountryService';
import { renderError } from '../common/functions';
import { cityCombo } from '../services/CityService';

export const InstituteForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {    

    let [countries, setCountries ] = useState([{country_id: 1, name: 'Uruguay'}]);
    let [cities, setCities ] = useState([{city_id: 1, name: 'Montevideo'}]);

    const fetchCountries = async () => {
        try {
            const countries = await countryCombo();
            setCountries(countries);
        } catch(err) {
            renderError(err);
        }
    };

    const fetchCities = async () => {
        try {
            const cities = await cityCombo();
            setCities(cities);
        } catch(err) {
            renderError(err);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        fetchCities();
    }, [formState.country_id]);
    
    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={10}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Descripcion`} labelAlign='left' span={14}>
                        <Input name='description' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.description} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Pais`} labelAlign='left' span={8}>
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
                    <Form.Item label={`${!view ? '*' : ''} Ciudad`} labelAlign='left' span={8}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={city_id => onInputChangeByName('city_id', city_id)}
                            > 
                                {cities.map(city => 
                                    <Select.Option value={city.city_id} key={city.city_id}>{city.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}