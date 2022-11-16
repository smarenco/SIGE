import React, { useEffect, useState } from 'react'

import { Form, Input, Select, DatePicker, Tabs, Modal } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { StudentsGroupTable } from '../tables/StudentsGroupTable';
import { userCombo } from '../services/UserService';
import { renderError } from '../common/functions';
import { institutCombo } from '../services/InstitutService';
import { courseCombo } from '../services/CourseService';
import { turnCombo } from '../services/TurnService';

export const GroupForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {
    
    const format = 'DD/MM/YYYY';

    const [ students, setStudents ] = useState([]);
    const [ instituts, setInstituts ] = useState([]);
    const [ courses, setCourses ] = useState([]);
    const [ teachers, setTeachers ] = useState([]);
    const [ turns, setTurns ] = useState([]);

    const fetchStudents = async () => {
        try {
            const students = await userCombo({ type: 'EST'});
            setStudents(students);
        } catch(err) {
            renderError(err);
        }
    };
    
    const fetchInstituts = async () => {
        try {
            const instituts = await institutCombo();
            setInstituts(instituts);
        } catch(err) {
            renderError(err);
        }
    };

    const fetchCourses = async (institut_id) => {
        try {
            const courses = await courseCombo({ institut_id });
            setCourses(courses);
        } catch(err) {
            renderError(err);
        }
    };

    const fetchTeachers = async () => {
        try {
            const teachers = await userCombo({ type: 'PRO' });
            setTeachers(teachers);
        } catch(err) {
            renderError(err);
        }
    };

    const fetchTurns = async () => {
        try {
            const turns = await turnCombo();
            setTurns(turns);
        } catch(err) {
            renderError(err);
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchInstituts();
        fetchTeachers();
        fetchTurns();
    }, []);
    
    useEffect(() => {
        fetchCourses(formState.institut_id);
    }, [formState.institut_id]);
    
    const studentToGroup = async(student_id, remove = false) => {
        if (student_id && !remove) {
            const studentAddedBefore = formState.students.filter((student) => student.id === student_id);
            if(studentAddedBefore){
                Modal.info({
                    content: 'El estudiante ya fue agregado anteriormente',
                    okText: 'Aceptar',
                });
            }else{
                const student = students.filter((student) => student.id === student_id)
                onInputChangeByName('students', [ ...formState.students, { ...student }]);
            }
        }else if(student_id && remove){
            const students = formState.students.filter((student) => student.id !== student_id);
            onInputChangeByName('students', students);
        }
    }

    const items = [
        { 
            label: 'Datos Basicos', 
            key: 'info_basic', 
            children: 
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={10}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
                    </Form.Item>
                    <Form.Item label='Instituto' labelAlign='left' span={6}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='institut_id'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading} 
                            onChange={(institut_id) => onInputChangeByName('institut_id', institut_id)}
                            value={formState?.institut_id}
                        >
                            {instituts.map(institut => 
                                <Select.Option value={institut.id} key={institut.id}>{institut.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Curso' labelAlign='left' span={8}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='course_id'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading} 
                            onChange={(course_id) => onInputChangeByName('course_id', course_id)}
                            value={formState?.course_id}
                        >
                            {courses.map(course => 
                                <Select.Option value={course.id} key={course.id}>{course.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label='Profesor/a' labelAlign='left' span={8}>
                        <Select 
                            allowClear 
                            showSearch 
                            name='teacher_id'
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            disabled={view || confirmLoading} 
                            onChange={(teacher_id) => onInputChangeByName('teacher_id', teacher_id)}
                            value={formState?.teacher_id}
                        >
                            {teachers.map(teacher => 
                                <Select.Option value={teacher.id} key={teacher.id}>{teacher.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Desde`} labelAlign='left' span={5}>
                        <DatePicker name='from_date' onChange={(from_date) => onInputChangeByName('from_date', from_date)} format={format} value={formState?.from_hour ? moment(formState?.from_hour, format)  : undefined}/>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Hasta`} labelAlign='left' span={5}>
                        <DatePicker name='to_date' onChange={(to_date) => onInputChangeByName('to_date', to_date)} format={format} value={formState?.to_hour ? moment(formState?.to_hour, format)  : undefined}/>
                    </Form.Item>
                    <Form.Item label={`${!view ? '*' : ''} Descripcion`} labelAlign='left' span={24}>
                        <TextArea name='description' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.description} />
                    </Form.Item>
                </LayoutH> 
        },        
        { 
            label: 'Estudiantes', 
            key: 'students', 
            children: 
            <>
                <LayoutH>
                    <Form.Item label={`${!view ? '*' : ''} Agregar estudiante`} labelAlign='left' span={24}>
                        <Select 
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
                </LayoutH>
                <StudentsGroupTable
                    data={formState.students}
                    studentToGroup={studentToGroup}
                />
            </>
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