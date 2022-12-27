import React, { useEffect, useState } from 'react'

import { Button, Checkbox, Form, Input, InputNumber, Select, Tabs } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import { alertError, renderError } from '../common/functions';
import { instituteCombo } from '../services/InstituteService';
import { documentCategoryCombo } from '../services/DocumentCategoryService';
import { CourseStudentTable } from '../tables/CourseStudentTable';
import { userCombo } from '../services/UserService';
import { CourseTeacherTable } from '../tables/CourseTeacherTable';
import { documentCombo } from '../services/DocumentService';

export const CourseForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName, onInputChangeByObject }) => {    

    let [institutes, setInstitutes ] = useState([]);
    let [loadingInstitutes, setLoadingInstitutes ] = useState(false);
    
    let [documental_categories, setDocumental_categories ] = useState([]);
    let [loadingDocumentCategories, setLoadingDocumentCategories ] = useState(false);

    let [students, setStudents ] = useState([]);
    let [loadingStudents, setLoadingStudents ] = useState(false);
    let [userStudentSelected, setUserStudentSelected ] = useState(undefined);

    let [teachers, setTeachers ] = useState([]);
    let [loadingTeachers, setLoadingTeachers ] = useState(false);
    let [userTeacherSelected, setUserTeacherSelected ] = useState(undefined);

    let [documents, setDocuments ] = useState([]);
    let [loadingDocuments, setLoadingDocuments ] = useState(false);
    let [documentSelected, setDocumentSelected ] = useState(undefined);

    let [disabledTuition_value, setDisabledTuition_value ] = useState(true);

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
        setLoadingDocumentCategories(true);
        try {
            const documental_categories = await documentCategoryCombo();
            setDocumental_categories(documental_categories);
            setLoadingDocumentCategories(false);
        } catch(err) {
            setLoadingDocumentCategories(false);
            renderError(err);
        }
    };

    const fetchStudents = async () => {
        setLoadingStudents(true);
        try {
            const students = await userCombo({Type: 'student'});
            setStudents(students);
            setLoadingStudents(false);
        } catch(err) {
            setLoadingStudents(false);
            renderError(err);
        }
    };

    const fetchTeachers = async () => {
        setLoadingTeachers(true);
        try {
            const teachers = await userCombo({Type: 'teacher'});
            setTeachers(teachers);
            setLoadingTeachers(false);
        } catch(err) {
            setLoadingTeachers(false);
            renderError(err);
        }
    };

    const fetchDocuments = async (Documental_category_id) => {
        setLoadingDocuments(true);
        try {
            if(Documental_category_id){
                const documents = await documentCombo({ Documental_category_id });
                setDocuments(documents);
            }else{
                setDocuments([]);
            }
            
            setLoadingDocuments(false);
        } catch(err) {
            setLoadingDocuments(false);
            renderError(err);
        }
    };

    useEffect(() => {
        fetchInstitutes();
        fetchDocumental_categories();
        fetchStudents();
        fetchTeachers();

        if(formState?.tuition){
            setDisabledTuition_value(false);
        }

        if(formState?.documental_category_id){
            fetchDocuments(formState?.documental_category_id);
        }

      }, []);

    const onChangeTuition = (tuition) => {
        setDisabledTuition_value(!tuition)
        onInputChangeByObject({ tuition, tuition_value: undefined });
    };

    const addStudent = () =>{
        if(!userStudentSelected){
            alertError('Debe seleccionar un estudiante');
            return;
        }
        
        let formStatestudents = formState.students;
        const studentExists = formStatestudents.filter(student => student.id === userStudentSelected);

        if(studentExists.length > 0){
            alertError('Estudiante ya agregado');
            return false;
        }

        formStatestudents.push(students.filter(student => student.id === userStudentSelected)[0]);
        onInputChangeByName('students', formStatestudents);
    }

    const deleteStudent = (idStudent) =>{
        let formStateStudents = formState.students.filter(student => student.id !== idStudent);
        onInputChangeByName('students', formStateStudents);
    }
    
    const addTeacher = () =>{
        if(!userTeacherSelected){
            alertError('Debe seleccionar un profesor');
            return;
        }

        let formStateTeachers = formState.teachers;
        const teacherExists = formStateTeachers.filter(teacher => teacher.id === userTeacherSelected);

        if(teacherExists.length > 0){
            alertError('Profesor ya agregado');
            return false;
        }

        formStateTeachers.push(teachers.filter(teacher => teacher.id === userTeacherSelected)[0]);
        onInputChangeByName('teachers', formStateTeachers);
    }

    const deleteTeacher = (idTeacher) =>{
        let formStateTeachers = formState.teachers.filter(teacher => teacher.id !== idTeacher);
        onInputChangeByName('teachers', formStateTeachers);
    }

    const onChangeDocumentalCategoryId = (documental_category_id) => {
        onInputChangeByObject({ documental_category_id });
        fetchDocuments(documental_category_id)
    };

    const items = [
        { 
            label: 'Datos Basicos', 
            key: 'info_basic', 
            children:      
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
                    <Form.Item label={`Categoria documentos`} labelAlign='left' span={8}>
                        <Select 
                            allowClear
                            showSearch
                            disabled={view || confirmLoading || loadingDocumentCategories}
                            loading={loadingDocumentCategories}
                            value={formState?.documental_category_id}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={onChangeDocumentalCategoryId}
                            > 
                                {documental_categories.map(documental_category => 
                                    <Select.Option value={documental_category.id} key={documental_category.id}>{documental_category.name}</Select.Option>
                                    )}
                            </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Cantidad Coutas`} labelAlign='left' span={4}>
                        <InputNumber min={0} name='quotas' disabled={view || confirmLoading} onChange={quotas => onInputChangeByName('quotas', quotas)} value={formState?.quotas} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Valor Couta`} labelAlign='left' span={4}>
                        <InputNumber min={0} name='quota_value' disabled={view || confirmLoading} onChange={quota_value => onInputChangeByName('quota_value', quota_value)} value={formState?.quota_value} />
                    </Form.Item>
                    <Form.Item labelAlign='left' span={4}>
                        <Checkbox style={{marginTop: 33}} name='tuition' disabled={view || confirmLoading} onChange={e => onChangeTuition(e.target.checked)} checked={formState?.tuition}>Matricula</Checkbox>
                    </Form.Item>
                    <Form.Item label={`Valor matricula`} labelAlign='left' span={4}>
                        <InputNumber min={0} name='tuition_value' disabled={view || confirmLoading || disabledTuition_value} onChange={tuition_value => onInputChangeByName('tuition_value', tuition_value)} value={formState?.tuition_value} />
                    </Form.Item>
                    <Form.Item label={`Costo Certificado`} labelAlign='left' span={6}>
                        <InputNumber min={0} name='certificate_cost' disabled={view || confirmLoading} onChange={certificate_cost => onInputChangeByName('certificate_cost', certificate_cost)} value={formState?.certificate_cost} />
                    </Form.Item>
                </LayoutH>,
        }, {
            label: 'Alumnos', 
            key: 'info_students', 
            children: 
                <>
                    <LayoutH>
                        <Form.Item label={`Alumno`} labelAlign='left' span={12}>
                            <Select 
                                allowClear
                                showSearch
                                disabled={view || confirmLoading || loadingStudents}
                                loading={loadingStudents}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={userStudentSelected => setUserStudentSelected(userStudentSelected)}
                                > 
                                    {students.map(student => 
                                        <Select.Option key={student.id} value={student.id}>{student.names} {student.lastnames} ({student.document})</Select.Option>
                                    )}
                                </Select>
                        </Form.Item>
                        <Button style={{marginTop: 30}} type='Primary' onClick={addStudent}>Agregar Estudiante</Button>
                    </LayoutH>
                    <CourseStudentTable
                        data={formState.students}
                        onDeleteStudent={deleteStudent}
                    />
                </>
        }, {
            label: 'Profesores', 
            key: 'info_teachers', 
            children: 
                <>
                    <LayoutH>
                        <Form.Item label={`Profesor`} labelAlign='left' span={8}>
                            <Select 
                                allowClear
                                showSearch
                                disabled={view || confirmLoading || loadingTeachers}
                                loading={loadingTeachers}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={userTeacherSelected => setUserTeacherSelected(userTeacherSelected)}
                                > 
                                    {teachers.map(teacher => 
                                        <Select.Option key={teacher.id} value={teacher.id}>{teacher.id} {teacher.lastnames}</Select.Option>
                                    )}
                                </Select>
                        </Form.Item>
                        <Button style={{marginTop: 30}} type='Primary' onClick={addTeacher}>Agregar Profesor</Button>
                    </LayoutH>
                    <CourseTeacherTable
                        data={formState.teachers}
                        onDeleteTeacher={deleteTeacher}
                    />
                </>
        }, {
            label: 'Documentos', 
            key: 'info_documents', 
            children: 
                <CourseTeacherTable
                    data={formState.documents}
                    //onDeleteDocument={deleteDocument}
                />
        }
    ];
    
    return (
        <Form layout='vertical'>
            <Loading loading={loading || loadingDocumentCategories || loadingDocuments || loadingInstitutes}>
                <Tabs
                    style={{ marginTop: -15 }}
                    size='small'
                    items={items}
                />
            </Loading>
        </Form>
    )
}