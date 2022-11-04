import React, { useState } from 'react'

import { Form, Input, Select } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';

export const CityForm = ({ countries = [{Name: 'Uruguay', IdCountry: 1}], view, loading, formState, onInputChange }) => {

    const onChangeInput = (e) => { 
        const { value, name} = e.target;

        onInputChange({ ...formState, [name]: value });
    }
    

    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={16}>
                        <Input name='Name' disabled={view} onChange={onChangeInput} value={formState?.Name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Pais`} labelAlign='left' span={16}>
                        <Select 
                            allowClear
                            showSearch
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={IdCountry => onChangeInput({target: {value: IdCountry, name: IdCountry}})}
                            > 
                                {countries.map(country => 
                                    <Select.Option value={country.IdCountry} key={country.IdCountry}>{country.Name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                </LayoutH>
            </Loading>
        </Form>
    )
}