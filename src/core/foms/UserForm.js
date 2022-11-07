import React, { useEffect, useState } from 'react'

import { Form, Input, Select, DatePicker, Tabs, Modal, Checkbox, Divider, Card } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { renderError } from '../common/functions';
import { medicalCoverageCombo } from '../services/MedicalCoverageService';
import { cityCombo } from '../services/CityService';
import { countryCombo } from '../services/CountryService';
import { documentCategoryCombo } from '../services/DocumentCategoryService';

export const UserForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {
    
    const format = 'DD/MM/YYYY';

    const levels_educations = [
        {id: 'PRI', name: 'Primaria'},
        {id: 'SEC', name: 'Secundaria'},
        {id: 'TER', name: 'Terciaria'},
        {id: 'POS', name: 'Posgrado'},
    ];

    const genders = [
        {id: 'FEME', name: 'Femenino'},
        {id: 'MASC', name: 'Masculino'},
        {id: 'NOBIN', name: 'No Binario'},
        {id: 'PRND', name: 'Prefiero no decirlo'},
    ];

    const [ medicalCoverages, setMedicalCoverage ] = useState([]);
    const [ countries, setCountry ] = useState([]);
    const [ cities, setCity ] = useState([]);
    const [ typesUsers, setTypesUsers ] = useState([]);

    const fetchMedicalCoverages = async () => {
        try {
            const medicalCoverage = await medicalCoverageCombo();
            setMedicalCoverage(medicalCoverage);
        } catch(err) { renderError(err); }
    };
    
    //hacer algo con estooo
    //hacer algo con estooo
    //hacer algo con estooo
    //hacer algo con estooo
    const fetchDocumentCategory = async () => {
        try {
            const documentCategory = await documentCategoryCombo();
            setMedicalCoverage(documentCategory);
        } catch(err) { renderError(err); }
    };

    const fetchCountries = async () => {
        try {
            const country = await countryCombo();
            setCountry(country);
        } catch(err) { renderError(err); }
    };

    const changeTypes = async () => {
        let typesUsers = [
            {id: 'PRI', name: 'Administrativo/a'},
            {id: 'SEC', name: 'Profesor/a'},
            {id: 'TER', name: 'Director/a'},
            {id: 'POS', name: 'Estudiante'},
        ];

        switch (formState.gender) {
            case 'MASC':
                typesUsers = [
                    {id: 'PRI', name: 'Administrativo'},
                    {id: 'SEC', name: 'Profesor'},
                    {id: 'TER', name: 'Director'},
                    {id: 'POS', name: 'Estudiante'},
                ];
                break;
            case 'FEME':
                typesUsers = [
                    {id: 'PRI', name: 'Administrativa'},
                    {id: 'SEC', name: 'Profesora'},
                    {id: 'TER', name: 'Directora'},
                    {id: 'POS', name: 'Estudiante'},
                ];
                break;
            case 'NOBIN':
            case 'PRND':
                typesUsers = [
                    {id: 'PRI', name: 'Administrative'},
                    {id: 'SEC', name: 'Profesore'},
                    {id: 'TER', name: 'Directore'},
                    {id: 'POS', name: 'Estudiante'},
                ];
                break;
        }

        setTypesUsers(typesUsers);
        
    };

    const fetchCities = async () => {
        try {
            const city = await cityCombo();
            setCity(city);
        } catch(err) { renderError(err); }
    };

    useEffect(() => {
        fetchMedicalCoverages();
        fetchCountries();
    }, []);

    useEffect(() => {
        fetchCities();
    }, [formState.country_id]);

    useEffect(() => {
        changeTypes();
    }, [formState.gender]);

    useEffect(() => {
        fetchDocumentCategory();
    }, [formState.type]);
    
    // const studentToGroup = async(student_id, remove = false) => {
    //     if (student_id && !remove) {
    //         const studentAddedBefore = formState.students.filter((student) => student.id === student_id);
    //         if(studentAddedBefore){
    //             Modal.info({
    //                 content: 'El estudiante ya fue agregado anteriormente',
    //                 okText: 'Aceptar',
    //             });
    //         }else{
    //             const student = students.filter((student) => student.id === student_id)
    //             onInputChangeByName('students', [ ...formState.students, { ...student }]);
    //         }
    //     }else if(student_id && remove){
    //         const students = formState.students.filter((student) => student.id !== student_id);
    //         onInputChangeByName('students', students);
    //     }
    // }

    const items = [
        { 
            label: 'Datos Basicos', 
            key: 'info_basic', 
            children: 
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Documento`} labelAlign='left' span={4}>
                        <Input name='document' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.document} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Nombres`} labelAlign='left' span={6}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Apellidos`} labelAlign='left' span={6}>
                        <Input name='last_name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.last_name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Fecha nacimiento`} labelAlign='left' span={4}>
                        <DatePicker name='birth_day' onChange={(birth_day) => onInputChangeByName('birth_day', birth_day)} format={format} value={formState?.birth_day ? moment(formState?.birth_day, format)  : undefined}/>
                    </Form.Item>
                    <Form.Item label='Genero' labelAlign='left' span={4}>
                        <Select 
                            allowClear 
                            showSearch 
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} 
                            name='gender' 
                            disabled={view || confirmLoading} 
                            onChange={(gender) => onInputChangeByName('gender', gender)} 
                            value={formState?.gender}
                        >
                            {genders.map(gender => 
                                <Select.Option value={gender.id} key={gender.id}>{gender.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Direccion' labelAlign='left' span={9}>
                        <Input name='direction' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.direction} />
                    </Form.Item>
                    <Form.Item label='Telefono' labelAlign='left' span={5}>
                        <Input name='phone' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.phone} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Email`} labelAlign='left' span={6}>
                        <Input type="email" name='email' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.email} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Password`} labelAlign='left' span={4}>
                        <Input type="password" name='password' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.password} />
                    </Form.Item>
                    <Form.Item label='Pais' labelAlign='left' span={5}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='country_id'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading} 
                            onChange={(country_id) => onInputChangeByName('country_id', country_id)} 
                            value={formState?.country_id}
                        >
                            {countries.map(country => 
                                <Select.Option value={country.id} key={country.id}>{country.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Ciudad' labelAlign='left' span={5}>
                        <Select 
                            allowClear 
                            showSearch
                            name='city_id'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading} 
                            onChange={(city_id) => onInputChangeByName('city_id', city_id)} 
                            value={formState?.city_id}
                        >
                            {cities.map(city => 
                                <Select.Option value={city.id} key={city.id}>{city.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Localidad' labelAlign='left' span={8}>
                        <Input name='location' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.location} />
                    </Form.Item>
                    <Form.Item label='Cobertura medica' labelAlign='left' span={6}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='medical_coverage_id'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading} 
                            onChange={(medical_coverage_id) => onInputChangeByName('medical_coverage_id', medical_coverage_id)} 
                            value={formState?.medicalCoverage_id}
                        >
                            {countries.map(medicalCoverage => 
                                <Select.Option value={medicalCoverage.id} key={medicalCoverage.id}>{medicalCoverage.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Tipo usuario' labelAlign='left' span={5}>
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
                    <Divider span={24}/>
                    <Form.Item label='Descripcion' labelAlign='left' span={24}>
                        <TextArea name='description' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.description} />
                    </Form.Item>
                </LayoutH> 
        },
        { 
            label: 'Documentos', 
            key: 'documents', 
            children: 
            <LayoutH>
                {/* <Form.Item label={`${!view ? '*' : ''} Agregar estudiante`} labelAlign='left' span={24}>
                    <Select allowClear showSearch 
                        allowClear
                        showSearch
                        disabled={view || confirmLoading}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        onChange={student_id => studentToGroup(student_id)}
                    > 
                        {students.map(student => 
                            <Select.Option value={student.id} key={student.id}>{student.name} - {student.document}</Select.Option>
                        )}
                    </Select>
                </Form.Item>
                <StudentsGroupTable
                    data={formState.students}
                    studentToGroup={studentToGroup}
                />  */}
            </LayoutH>
        },
        { 
            label: 'Especificos', 
            key: 'specifics', 
            children: 
                <LayoutH>
                    <Form.Item labelAlign='left' span={6}>
                        <Checkbox name='work_in_Area_similar' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.work_in_Area_similar}>Trabaja en area similar</Checkbox>
                    </Form.Item>
                    <Form.Item labelAlign='left' span={8}>
                        <Checkbox name='has_knowledge_in_area' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.has_knowledge_in_area}>Tiene conocimiento en el area</Checkbox>
                    </Form.Item>
                    <Form.Item labelAlign='left' span={4}>
                        <Checkbox name='trained' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.trained}>Entrenado</Checkbox>
                    </Form.Item>
                    <Form.Item label='Expectativas' labelAlign='left' span={18}>
                        <Input name='expectation' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.expectation} />
                    </Form.Item>
                    <Form.Item label='Nivel Educacion' labelAlign='left' span={6}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='level_education'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading} 
                            onChange={onInputChange} 
                            value={formState?.level_education}
                        >
                            {levels_educations.map(level => 
                                <Select.Option value={level.id} key={level.id}>{level.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Divider span={24}/>
                    <Form.Item label='Observaciones' labelAlign='left' span={24}>
                        <TextArea name='observation' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.observation} />
                    </Form.Item>
                </LayoutH> 
        },
    ];
    
    return (
        <Form layout='vertical'>
            <Loading loading={loading}>
                <Tabs
                    style={{ marginTop: -15 }}
                    size='small'
                    items={items} />
            </Loading>
        </Form>
    )
}