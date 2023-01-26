import React, { useEffect, useState } from 'react'

import { Form, Input, Select, DatePicker, Tabs, Modal, Button, InputNumber } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { userCombo } from '../services/UserService';
import { alertError, renderError } from '../common/functions';
import { courseCombo } from '../services/CourseService';
import { turnCombo } from '../services/TurnService';
import { GroupStudentTable } from '../tables/GroupStudentTable';
import { GroupTeacherTable } from '../tables/GroupTeacherTable';
import { CourseDocumentTable } from '../tables/CourseDocumentTable';
import { DDMMYYYY } from '../common/consts';
import { instituteCombo } from '../services/InstituteService';

export const GroupForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {
    
    let [institutes, setInstitutes ] = useState([]);
    let [loadingInstitutes, setLoadingInstitutes ] = useState(false);

    const [courses, setCourses] = useState([]);
    let [loadingCourses, setLoadingCourses ] = useState(false);

    const [turns, setTurns] = useState([]);
    let [loadingTurns, setLoadingTurns ] = useState(false);

    let [students, setStudents ] = useState([]);
    let [loadingStudents, setLoadingStudents ] = useState(false);
    let [userStudentSelected, setUserStudentSelected ] = useState(undefined);

    let [teachers, setTeachers ] = useState([]);
    let [loadingTeachers, setLoadingTeachers ] = useState(false);
    let [userTeacherSelected, setUserTeacherSelected ] = useState(undefined);

    let [documents, setDocuments ] = useState([]);
    let [loadingDocuments, setLoadingDocuments ] = useState(false);
    let [documentSelected, setDocumentSelected ] = useState(undefined);

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

    const fetchCourses = async () => {
        setLoadingCourses(true);
        try {
            const courses = await courseCombo();
            setCourses(courses); setLoadingCourses(false);
        } catch(err) {
            setLoadingCourses(false);
            renderError(err);
        }
    };

    const fetchTurns = async () => {
        setLoadingTurns(true);
        try {
            const turns = await turnCombo();
            setTurns(turns); setLoadingTurns(false);
        } catch(err) {
            setLoadingTurns(false);
            renderError(err);
        }
    };

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

    const addStudent = () =>{
        if(!userStudentSelected){
            alertError('Debe seleccionar un estudiante');
            return;
        }
        
        let formStateStudents = formState.students;
        const studentExists = formStateStudents.filter(student => student.id === userStudentSelected);

        if(studentExists.length > 0){
            alertError('Estudiante ya agregado');
            return false;
        }

        if(formState.students.length === parseInt(formState.number_students)){
            alertError('Se alcanzó el límite de cupos de estudiante');
            return false;
        }

        formStateStudents.push(students.filter(student => student.id === userStudentSelected)[0]);
        onInputChangeByName('students', formStateStudents);
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

    useEffect(() => {
        fetchStudents();
        fetchTeachers();
        fetchTurns();
        fetchCourses();
        fetchInstitutes();
    }, []);

    const items = [
        { 
            label: 'Datos Basicos', 
            key: 'info_basic', 
            children: 
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={10}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Turno`} labelAlign='left' span={6}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='turn_id'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading || loadingTurns}
                            loading={loadingTurns} 
                            onChange={(turn_id) => onInputChangeByName('turn_id', turn_id)}
                            value={formState?.turn_id}
                        >
                            {turns.map(turn => 
                                <Select.Option value={turn.id} key={turn.id}>{turn.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Curso`} labelAlign='left' span={8}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='course_id'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading || loadingCourses}
                            loading={loadingCourses} 
                            onChange={(course_id) => onInputChangeByName('course_id', course_id)}
                            value={formState?.course_id}
                        >
                            {courses.map(course => 
                                <Select.Option value={course.id} key={course.id}>{course.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Instituto`} labelAlign='left' span={6}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='institute_id'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading || loadingCourses}
                            loading={loadingCourses} 
                            onChange={(institute_id) => onInputChangeByName('institute_id', institute_id)}
                            value={formState?.institute_id}
                        >
                            {institutes.map(institute => 
                                <Select.Option value={institute.id} key={institute.id}>{institute.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Cupos`} labelAlign='left' span={5}>
                        <InputNumber name='number_students' min={formState.students.length} onChange={(number_students) => onInputChangeByName('number_students', number_students)} value={formState?.number_students}/>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Desde`} labelAlign='left' span={5}>
                        <DatePicker name='start_date' onChange={(start_date) => onInputChangeByName('start_date', start_date)} format={DDMMYYYY} value={formState?.start_date ? moment(formState?.start_date)  : undefined}/>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Hasta`} labelAlign='left' span={5}>
                        <DatePicker name='finish_date' onChange={(finish_date) => onInputChangeByName('finish_date', finish_date)} format={DDMMYYYY} value={formState?.finish_date ? moment(formState?.finish_date)  : undefined}/>
                    </Form.Item>
                    <Form.Item label={`Descripcion`} labelAlign='left' span={24}>
                        <TextArea name='description' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.description} />
                    </Form.Item>
                </LayoutH>
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
                    <GroupStudentTable
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
                        <Form.Item label={`Profesor`} labelAlign='left' span={12}>
                            <Select 
                                allowClear
                                showSearch
                                disabled={view || confirmLoading || loadingTeachers}
                                loading={loadingTeachers}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={userTeacherSelected => setUserTeacherSelected(userTeacherSelected)}
                                > 
                                    {teachers.map(teacher => 
                                        <Select.Option key={teacher.id} value={teacher.id}>{teacher.names} {teacher.lastnames}</Select.Option>
                                    )}
                                </Select>
                        </Form.Item>
                        <Button style={{marginTop: 30}} type='Primary' onClick={addTeacher}>Agregar Profesor</Button>
                    </LayoutH>
                    <GroupTeacherTable
                        data={formState.teachers}
                        onDeleteTeacher={deleteTeacher}
                    />
                </>
        }, {
            label: 'Documentos', 
            key: 'info_documents', 
            children: 
                <CourseDocumentTable
                    data={formState.documents}
                    //onDeleteDocument={deleteDocument}
                />
        }
    ];
    
    return (
        <Form layout='vertical'>
            <Loading loading={loading || loadingDocuments}>
                <Tabs
                    style={{ marginTop: -15 }}
                    size='small'
                    items={items}
                />
            </Loading>
        </Form>
    )
}