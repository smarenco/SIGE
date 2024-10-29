import React, { useEffect } from 'react'
import { useState } from 'react';
import { user } from '../../services/AuthService';
import { uploadDocument, userShow, userUpdate } from '../../services/UserService';
import { Form, Input, Select, DatePicker, Tabs, Divider, InputNumber, Button } from 'antd'
import LayoutH from '../../components/layout/LayoutH';
import dayjs from 'dayjs';
import { alertError, loadTypes, renderError } from '../../common/functions';
import { medicalCoverageCombo } from '../../services/MedicalCoverageService';
import { cityCombo } from '../../services/CityService';
import { countryCombo } from '../../services/CountryService';
import { groupCombo } from '../../services/GroupService';
import { DocumentsUserTable } from '../../tables/DocumentsUserTable';
import { DocumentsUserModal } from '../../modals/DocumentsUserModal';
import { GroupTable } from '../../tables/GroupTable';
import { DDMMYYYY, genders } from '../../common/consts';
import Loading from '../../components/common/Loading';
import { documentCombo } from '../../services/DocumentService';
import User from '../../models/User';
import { documentCategoryCombo } from '../../services/DocumentCategoryService';

export const UserProfilePage = ({ isMobile }) => {

    const view = false;

    const [formState, setFormState] = useState(new User);
    const [medicalCoverages, setMedicalCoverage] = useState([]);
    const [countries, setCountry] = useState([]);
    const [cities, setCities] = useState([]);
    const [userTypes, setUserTypes] = useState([]);
    const [groups, setGroups] = useState([]);
    const [courseSelected, setCourseSelected] = useState(undefined);
    const [documents, setDocuments] = useState([]);
    const [documentToSee, setDocumentToSee] = useState({});
    const [loadingDocument, setLoadingDocument] = useState(false);
    const [openModalDocument, setOpenModalDocument] = useState(false);
    const [documentCategory, setDocumentCategory] = useState([]);
    const [documentCategorySelected, setDocumentCategorySelected] = useState(undefined);

    const [loadingDocumentCategory, setLoadingDocumentCategory] = useState(undefined);
    const [loadingMedicalCoverages, setLoadingMedicalCoverages] = useState(undefined);
    const [loadingGroups, setLoadingGroups] = useState(undefined);
    const [loadingCountries, setLoadingCountries] = useState(undefined);
    const [loadingCities, setLoadingCities] = useState(undefined);
    const [loadingDocuments, setLoadingDocuments] = useState(undefined);
    const [loadingTypes, setLoadingTypes] = useState(undefined);

    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    //const { user } = AuthService();

    useEffect(() => {
        if (formState.type && formState.type?.toLowerCase() !== 'student') {
            fetchDocumentCategory(formState.type);
        }
    }, [formState.type]);

    useEffect(() => {
        if (documentCategorySelected) {
            fetchDocuments({ document_category_id: documentCategorySelected });
        } else {
            setDocuments([]);
        }
    }, [documentCategorySelected]);

    const fetchDocumentCategory = async (Type) => {
        if (Type) {
            setLoadingDocumentCategory(true);
            try {
                const documentCategory = await documentCategoryCombo({ Type });
                setDocumentCategory(documentCategory);
                setLoadingDocumentCategory(false);
            } catch (err) { renderError(err); setLoadingDocumentCategory(false); }
        } else {
            setDocumentCategory([]);
        }
    };

    const loadItem = async () => {
        setLoading(true);
        try {
            const item = await userShow(user().id)
            setFormState(item); setLoading(false);
        } catch (err) {
            setLoading(false);
            renderError(err);
        }
    }

    const onOk = async () => {
        if (!formState.document || formState.document.trim().length === 0) {
            alertError('Debe indicar un documento')
            return false;
        }
        if (!formState.names || formState.names.trim().length === 0) {
            alertError('Debe indicar un nombre')
            return false;
        }
        if (!formState.lastnames || formState.lastnames.trim().length === 0) {
            alertError('Debe indicar un apellido')
            return false;
        }
        if (!formState.birth_day) {
            alertError('Debe indicar una fecha de nacimiento')
            return false;
        }
        if (!formState.email || formState.email.trim().length === 0) {
            alertError('Debe indicar un email')
            return false;
        }
        if (!formState.type || formState.type.trim().length === 0) {
            alertError('Debe indicar un tipo de usuario')
            return false;
        }

        setConfirmLoading(true);
        try {
            let documents = [];
            let i = 0;

            formState.documents.forEach(document => {
                if (document['file']) {
                    const arr_name = document['file'].name.split('.');
                    const ext = arr_name[arr_name.length - 1];
                    let file_name = 'documento-' + document['document_id'] + '-usuario-' + formState.id + '-' + formState.document + '.' + ext;
                    documents.push({ ...document, file_name });
                    formState.documents[i].file_name = file_name;
                }
                i++;
            });

            await userUpdate(formState.id, formState);

            documents.forEach(document => uploadDocument(document.file, document.file_name));

            loadItem();
        } catch (err) {
            renderError(err);
        }

        setConfirmLoading(false)
    }

    const fetchMedicalCoverages = async () => {
        setLoadingMedicalCoverages(true);
        try {
            const medicalCoverage = await medicalCoverageCombo();
            setMedicalCoverage(medicalCoverage);
            setLoadingMedicalCoverages(false);
        } catch (err) { renderError(err); setLoadingMedicalCoverages(false); }
    };

    const fetchGroups = async () => {
        setLoadingGroups(true);
        try {
            if (user().id) {
                const groups = await groupCombo({ user_type: user().type, user_id: user().id });
                setGroups(groups);
                setLoadingGroups(false);
            }
        } catch (err) { renderError(err); setLoadingGroups(false); }
    };

    const fetchCountries = async () => {
        setLoadingCountries(true);
        try {
            const country = await countryCombo();
            setCountry(country);
            setLoadingCountries(false);
        } catch (err) { renderError(err); setLoadingCountries(false); }
    };

    const fetchCities = async (country_id) => {
        if (country_id) {
            setLoadingCities(true);
            try {
                const cities = await cityCombo({ country_id });
                setCities(cities);
                setLoadingCities(false);
            } catch (err) { renderError(err); setLoadingCities(false); }
        } else {
            setCities([]);
        }
    };

    const fetchDocuments = async (filter) => {
        setLoadingDocuments(true);
        try {
            if (formState.id) {
                filter.user_id = formState.id;
            }
            const documents = await documentCombo(filter);
            setDocuments(documents);
            setLoadingDocuments(false);
        } catch (err) { renderError(err); setLoadingDocuments(false); }
    };

    const fetchTypes = async (gender) => {
        setLoadingTypes(true);
        try {
            const types = loadTypes(gender);
            setUserTypes(types);
            setLoadingTypes(false);
        } catch (err) { renderError(err); setLoadingTypes(false); }
    };

    useEffect(() => {
        loadItem();
        fetchTypes();
        fetchMedicalCoverages();
        fetchCountries();
        fetchGroups();

        if (formState.type && formState.type?.toLowerCase() !== 'student' && formState.document_category_id) {
            fetchDocuments({ document_category_id: formState.document_category_id });
        } else {
            setDocuments([]);
        }

    }, []);

    useEffect(() => {
        fetchCities(formState.country_id);
    }, [formState.country_id]);

    useEffect(() => {
        if (courseSelected) {
            fetchDocuments({ course_id: courseSelected });
        } else {
            setDocuments([]);
        }
    }, [courseSelected]);

    useEffect(() => {
        fetchTypes(formState.gender);
    }, [formState.gender]);

    const mergeDataSchema = (data, schema) => {
        //console.log('schema',schema)
        //console.log('data',data)
        let schema2 = [...schema];
        return schema2.map(item => {
            item.loaded = false;
            item.observation = '';
            item.expiration = null;
            item.file_name = null;
            item.document_id = item.id;
            item.file = null;
            item.name_desc = item.name + (item.required ? ' (*)' : '');

            for (let i in data) {
                if (data[i]?.document_id === item.document_id) {
                    let doc = data[i];
                    item.loaded = true;
                    item.expiration = doc.expiration;
                    item.file = doc.file;
                    item.file_name = doc.file_name;
                    item.observation = doc.observation;
                }
            }
            return item;
        });
    }

    const loadRequisitoFuncionario = (id) => {
        const schema = documents.filter((document) => document.id === id);
        const documentToSee = formState.documents.filter((document) => document.id === id);

        setOpenModalDocument(true);
        setDocumentToSee(mergeDataSchema(documentToSee || [], schema)[0]);
    }

    const documentToUser = (documentSee, remove = false) => {
        const documents = formState.documents.filter((document) => document.document_id !== documentSee.document_id);
        if (documentSee.document_id && !remove) {
            setFormState({ ...formState, documents: [...documents, { ...document }] });
        } else if (documentSee.document_id && remove) {
            setFormState({ ...formState, documents });
        }

    }

    const items = [
        {
            label: 'Datos Basicos',
            key: 'info_basic',
            children:
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Documento`} labelAlign='left' span={isMobile ? 24 : 4}>
                        <Input name='document' disabled={view || confirmLoading} onChange={e => setFormState({ ...formState, document: e.target.value })} value={formState?.document} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Nombres`} labelAlign='left' span={isMobile ? 12 : 6}>
                        <Input name='names' disabled={view || confirmLoading} onChange={e => setFormState({ ...formState, names: e.target.value })} value={formState?.names} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Apellidos`} labelAlign='left' span={isMobile ? 12 : 6}>
                        <Input name='lastnames' disabled={view || confirmLoading} onChange={e => setFormState({ ...formState, lastnames: e.target.value })} value={formState?.lastnames} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Fecha nacimiento`} labelAlign='left' span={isMobile ? 12 : 4}>
                        <DatePicker name='birth_day' onChange={(birth_day) => setFormState({ ...formState, birth_day })} format={DDMMYYYY} value={formState?.birth_day ? dayjs(formState?.birth_day) : undefined} />
                    </Form.Item>
                    <Form.Item label='Genero' labelAlign='left' span={isMobile ? 12 : 4}>
                        <Select
                            allowClear
                            showSearch
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            name='gender'
                            disabled={view || confirmLoading}
                            onChange={(gender) => setFormState({ ...formState, gender })}
                            value={formState?.gender}
                        >
                            {genders.map(gender =>
                                <Select.Option value={gender.id} key={gender.id}>{gender.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Direccion' labelAlign='left' span={isMobile ? 24 : 9}>
                        <Input name='direction' disabled={view || confirmLoading} onChange={e => setFormState({ ...formState, direction: e.target.value })} value={formState?.direction} />
                    </Form.Item>
                    <Form.Item label='Telefono' labelAlign='left' span={isMobile ? 24 : 5}>
                        <Input name='cell_phone' disabled={view || confirmLoading} onChange={e => setFormState({ ...formState, cell_phone: e.target.value })} value={formState?.cell_phone} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Email`} labelAlign='left' span={isMobile ? 24 : 6}>
                        <Input type="email" name='email' disabled={view || confirmLoading} onChange={e => setFormState({ ...formState, email: e.target.value })} value={formState?.email} />
                    </Form.Item>
                    <Form.Item label='Contraseña' labelAlign='left' span={isMobile ? 24 : 4}>
                        <Input placeholder='Solo si desea cambiarla' type="password" name='password' disabled={view || confirmLoading} onChange={e => setFormState({ ...formState, password: e.target.value })} value={formState?.password} />
                    </Form.Item>
                    <Form.Item label='Pais' labelAlign='left' span={isMobile ? 12 :5}>
                        <Select
                            allowClear
                            showSearch
                            name='country_id'
                            loading={loadingCountries}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading || loadingCountries}
                            onChange={(country_id) => setFormState({ ...formState, country_id })}
                            value={formState?.country_id}
                        >
                            {countries.map(country =>
                                <Select.Option value={country.id} key={country.id}>{country.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Ciudad' labelAlign='left' span={isMobile ? 12 :5}>
                        <Select
                            allowClear
                            showSearch
                            name='city_id'
                            loading={loadingCities}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading || loadingCities}
                            onChange={(city_id) => setFormState({ ...formState, city_id })}
                            value={formState?.city_id}
                        >
                            {cities.map(city =>
                                <Select.Option value={city.id} key={city.id}>{city.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Localidad' labelAlign='left' span={isMobile ? 24 :8}>
                        <Input name='location' disabled={view || confirmLoading} onChange={e => setFormState({ ...formState, location: e.target.value })} value={formState?.location} />
                    </Form.Item>
                    <Form.Item label='Cobertura medica' labelAlign='left' span={isMobile ? 12 :6}>
                        <Select
                            allowClear
                            showSearch
                            name='medical_coverage_id'
                            loading={loadingMedicalCoverages}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading || loadingMedicalCoverages}
                            onChange={(medical_coverage_id) => setFormState({ ...formState, medical_coverage_id })}
                            value={formState?.medical_coverage_id}
                        >
                            {medicalCoverages.map(medicalCoverage =>
                                <Select.Option value={medicalCoverage.id} key={medicalCoverage.id}>{medicalCoverage.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label={`Tipo usuario`} labelAlign='left' span={isMobile ? 12 :5}>
                        <Select
                            allowClear
                            showSearch
                            name='type'
                            loading={loadingTypes}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={(type) => setFormState({ ...formState, type })}
                            disabled
                            value={formState?.type?.toLowerCase()}
                        >
                            {userTypes.map(type =>
                                <Select.Option value={type.id} key={type.id}>{type.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                </LayoutH>
        },
        {
            label: 'Documentos',
            key: 'documents',
            children:
                <>
                    <LayoutH>
                        {formState.type?.toLowerCase() === 'student' && <Form.Item label='Cursos' labelAlign='left' span={12}>
                            <Select
                                allowClear
                                showSearch
                                disabled={view || confirmLoading}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={course_id => setCourseSelected(course_id)}
                            >
                                {groups.map(group =>
                                    <Select.Option value={group.course_id} key={group.course_id}>{group.course_name} ({group.name})</Select.Option>
                                )}
                            </Select>
                        </Form.Item>}
                        {formState.type?.toLowerCase() !== 'student' && <Form.Item label='Categoria' labelAlign='left' span={12}>
                            <Select
                                allowClear
                                showSearch
                                disabled={view || confirmLoading || loadingDocumentCategory}
                                loading={loadingDocumentCategory}
                                value={formState?.document_category_id}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={document_category_id => { setFormState({ ...formState, document_category_id }); setDocumentCategorySelected(document_category_id); }}
                            >
                                {documentCategory.map(category =>
                                    <Select.Option value={category.id} key={category.id}>{category.name}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>}
                    </LayoutH>
                    <DocumentsUserTable
                        dataSource={mergeDataSchema(formState.documents, [...documents])}
                        loading={loadingDocuments}
                        loadRequisitoFuncionario={loadRequisitoFuncionario}
                        documentToUser={documentToUser}
                    />
                    <DocumentsUserModal
                        visible={openModalDocument}
                        loading={loadingDocument}
                        item={documentToSee}
                        onOkProp={document => {

                            //console.log('document', document)
                            //console.log('formState',formState.documents)

                            setLoadingDocument(true);
                            const documents = formState.documents.filter(FSdocument => FSdocument.document_id !== document.document_id);
                            //console.log('documents',documents)
                            const docs = [...documents, document];
                            //console.log('docs',docs)
                            //setFormState({ ...formState, documents: docs});
                            setLoadingDocument(false);
                            setOpenModalDocument(false);
                            setDocumentToSee({});

                        }}
                        onCancel={() => { setOpenModalDocument(false); setDocumentToSee({}); }}
                    />
                </>
        },
        {
            label: 'Cursos',
            key: 'courses',
            disabled: formState.type?.toLowerCase() !== 'student' && formState.type?.toLowerCase() !== 'teacher',
            children:
                <>
                    <GroupTable
                        data={groups}
                        loading={loadingGroups}
                        //data={[new Group({name: 'grupo re piola', course_name: 'curso re piola', teacher_name: 'Santaigo', tourn_name: 'matutino', from_date: '20/12/2022', to_date: '22/12/2022'})]}
                        comeUserForm={true}
                    />
                </>
        },
    ];

    return (
        loading ? <Loading /> : <>
            <Form layout='vertical' style={{overflowY: 'auto', height: '80vh'}}>
                <Tabs
                    style={{
                        marginTop: -5
                    }}
                    size='small'
                    items={items}
                />
                <Form.Item>
                    <Button type='primary' onClick={onOk}>Guardar</Button>
                </Form.Item>
            </Form>
        </>
    )
}
