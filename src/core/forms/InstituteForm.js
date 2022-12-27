import React, { useEffect, useState } from 'react'

import { Form, Input, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { countryCombo } from '../services/CountryService';
import { renderError } from '../common/functions';
import { cityCombo } from '../services/CityService';
import TextArea from 'antd/lib/input/TextArea';

export const InstituteForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName, onInputChangeByObject }) => {    

    let [countries, setCountries ] = useState([]);
    let [cities, setCities ] = useState([]);
    let [loadingCountries, setLoadingCountries ] = useState(false);
    let [loadingCities, setLoadingCities ] = useState(false);

    const fetchCountries = async () => {
        setLoadingCountries(true);
        try {
            const countries = await countryCombo();
            setCountries(countries);
            setLoadingCountries(false);
        } catch(err) {
            setLoadingCountries(false);
            renderError(err);
        }
    };

    const fetchCities = async (country_id, borrarCity_id = true) => {
        setLoadingCities(true);
        if(borrarCity_id){
            onInputChangeByObject({
                city_id: undefined,
                country_id
            })
        }
        try {
            if(country_id){
                const cities = await cityCombo({ country_id });
                setCities(cities);
            }else{
                setCities([]);
            }
            setLoadingCities(false);
        } catch(err) {
            setLoadingCities(false);
            renderError(err);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        fetchCities(formState.country_id, false);
    }, [formState.country_id]);
    
    return (
        <Form layout='vertical'>
            <Loading loading={loading || loadingCountries}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={14}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`Telefono`} labelAlign='left' span={10}>
                        <Input name='phone' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.phone} />
                    </Form.Item>
                    <Form.Item label={`Direccion`} labelAlign='left' span={10}>
                        <Input name='direction' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.direction} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Pais`} labelAlign='left' span={7}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading || loadingCountries}
                            name='country_id'
                            loading={loadingCountries}
                            value={formState?.country_id}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={country_id => { onInputChangeByName('country_id', country_id); fetchCities(country_id); }}
                            > 
                                {countries.map(country => 
                                    <Select.Option value={country.id} key={country.id}>{country.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Ciudad`} labelAlign='left' span={7}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading || loadingCities}
                            value={formState?.city_id}
                            loading={loadingCities}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={city_id => onInputChangeByName('city_id', city_id)}
                            > 
                                {cities.map(city => 
                                    <Select.Option value={city.id} key={city.id}>{city.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`Descripcion`} labelAlign='left' span={24}>
                        <TextArea name='description' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.description} />
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}