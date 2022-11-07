import React, { useEffect, useState } from 'react'

import { Form, Input, Select, DatePicker, Tabs, Modal } from 'antd'
import Loading from '../components/common/Loading'
import LayoutH from '../components/layout/LayoutH';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import { StudentsGroupTable } from '../tables/StudentsGroupTable';
import { userCombo } from '../services/UserService';
import { renderError } from '../common/functions';

export const GroupForm = ({ view, loading, confirmLoading, formState, onInputChange, onInputChangeByName }) => {
    
    const format = 'DD/MM/YYYY';

    const [ students, setStudents ] = useState([]);

    const fetchStudents = async () => {
        try {
            const students = await userCombo({ type: 'Student'});
            setStudents(students);
        } catch(err) {
            renderError(err);
        }
        
    };

    useEffect(() => {
        fetchStudents();
    }, []);
    
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
                    <Form.Item label={`${!view ? '*' : ''} Nombre`} labelAlign='left' span={14}>
                        <Input name='name' disabled={view || confirmLoading} onChange={onInputChange} value={formState?.name} />
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
                <StudentsGroupTable
                    data={formState.students}
                    studentToGroup={studentToGroup}
                /> 
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