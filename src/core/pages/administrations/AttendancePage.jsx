import React, { useEffect, useState } from 'react'
import { Form, Select, DatePicker, Button, Table, Divider, Modal, Upload, message } from 'antd'
import { Header } from 'antd/es/layout/layout';
import { LeftCircleOutlined, PlusCircleOutlined, RightCircleOutlined, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';


const AttendancePage = ({ students, onInputChangeByName, view, confirmLoading, loadingCourses }) => {
    const [modalAttendanceList, setModalAttendanceList] = useState(false);
    const [showModalAttendanceObservation, setShowModalAttendanceObservation] = useState(false);
    const [modalAttendanceObservationItem, setModalAttendanceObservationItem] = useState(undefined);
    const [modalAttendanceObservationAuxItem, setModalAttendanceObservationAuxItem] = useState(undefined);
    const [fileList, setFileList] = useState([]);

    const onChangeAttendanceData = (id, attribute, value) => {
        const updatedStudents = students.map(student => {
            if (student.id === id) {
                const updatedStudent = {
                    ...student,
                    [attribute]: value
                };
                console.log(updatedStudent, attribute, value)
                return updatedStudent
            }
            return student
        });
        // console.log(updatedStudents)
        onInputChangeByName('students', updatedStudents);
        if (attribute !== 'state') setModalAttendanceObservationItem({ ...modalAttendanceObservationItem, [attribute]: value })
    }

    const restoreAttendanceObservationData = (restore) => {
        console.log(modalAttendanceObservationItem)
        const updatedStudents = students.map(student => {
            if (student.id === modalAttendanceObservationItem.id && restore) {
                // console.log('restore', modalAttendanceObservationAuxItem)
                return modalAttendanceObservationAuxItem
            }
            if (student.id === modalAttendanceObservationItem.id && !restore) {
                // console.log('no restore', modalAttendanceObservationItem)
                return modalAttendanceObservationItem
            }
            return student
        });
        // console.log(updatedStudents)
        onInputChangeByName('students', updatedStudents);
        setModalAttendanceObservationItem(undefined)
        setModalAttendanceObservationAuxItem(undefined)
    }

    const showModalAttendanceList = () => {
        setModalAttendanceList(true)
    }
    const columns = [
        {
            title: 'Estudiante',
            key: 'name',
            ellipsis: true,
            render: (_, record) => `${record.names} ${record.lastnames}`
        },
        {
            title: `Estado`,
            key: 'estado',
            width: 150,
            render: (_, record) => (
                <Form.Item
                    style={{ margin: 0, padding: 0, height: 'auto' }}
                    name={`attendance_state_${record.id}`}
                    rules={[
                        {
                            required: true,
                            message: `Please enter attendance for ${record.name}`,
                        },
                    ]}
                >
                    <Select
                        name={`attendance_state_${record.id}`}
                        disabled={view || confirmLoading || loadingCourses}
                        onChange={(e) => onChangeAttendanceData(record.id, 'state', e)}
                        value={record.state}
                    >
                        <Select.Option value={true} key={`${record.id}_asistio`}>Asisitió</Select.Option>
                        <Select.Option value={false} key={`${record.id}_no_asistio`}>No asisitió</Select.Option>
                    </Select>
                </Form.Item>
            ),
        },
        {
            title: '',
            key: 'attendance_observation',
            width: 50,
            render: (_, record) => <Button onClick={() => {
                setModalAttendanceObservationItem({ ...record, justification: [] })
                setModalAttendanceObservationAuxItem({ ...record, justification: [] })
            }} icon={<PlusCircleOutlined />} />
        }
    ];

    const attendanceColumns = () => {
        let cols = [{
            title: 'Estudiante',
            key: 'stundent',
            width: 100,
            ellipsis: true,
        }]

        for (let i = 1; i < 32; i++) {
            cols.push({
                title: `${i}`,
                key: `${i}`,
                width: 20,
                ellipsis: true,
            })
        }
        // console.log(cols)
        return cols
    }

    useEffect(() => {
        // console.log(modalAttendanceObservationItem)
        if (modalAttendanceObservationItem === undefined) setShowModalAttendanceObservation(false)
        // console.log(modalAttendanceObservationItem)
        setShowModalAttendanceObservation(true)
    }, [modalAttendanceObservationItem])

    return (
        <>
            <Header>
                Mes de asistencia
                <DatePicker
                    placeholder='Seleccione un mes'
                    style={{ marginLeft: 10, width: '200px' }}
                    picker="month"
                    format='MM/YYYY'
                />
                <Button onClick={() => console.log('buscando')} type='primary' style={{ marginLeft: 10 }}>Buscar</Button>
                <Button icon={<PlusCircleOutlined />} type='primary' onClick={showModalAttendanceList} style={{ float: 'right' }}>Pasar lista</Button>
                <Divider />
                <Button icon={<LeftCircleOutlined />} style={{ float: 'left' }}>Mes anterior</Button>
                <Button icon={<RightCircleOutlined />} style={{ float: 'right' }}>Mes siguiente</Button>
            </Header>
            <Table size='small' style={{ height: '100%' }} columns={attendanceColumns()} />
            <Modal
                open={modalAttendanceList}
                onCancel={() => setModalAttendanceList(false)}
                onOk={() => setModalAttendanceList(false)}
                title='Lista Asistencia'
                style={{ paddingTop: 10 }}
            >
                <Form>
                    <Table
                        dataSource={students}
                        key={'id'}
                        columns={columns}
                        pagination={false}
                        bordered
                        size='small'
                    />
                    {modalAttendanceObservationItem && <Modal
                        open={showModalAttendanceObservation}
                        onCancel={() => restoreAttendanceObservationData(true)}
                        onOk={() => restoreAttendanceObservationData(false)}
                        title='Datos Extra'
                        style={{ paddingTop: 10 }}
                    >
                        <Form>
                            <Form.Item
                                style={{ margin: 0, padding: 0, height: 'auto' }}
                                name={`attendance_observation`}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please enter attendance for ${modalAttendanceObservationItem.name}`,
                                    },
                                ]}
                            >
                                {modalAttendanceObservationItem && <Upload
                                    onRemove={(file) => {
                                        onChangeAttendanceData(modalAttendanceObservationItem.id, 'jutification', undefined)
                                    }}
                                    beforeUpload={(file) => {
                                        onChangeAttendanceData(modalAttendanceObservationItem.id, 'jutification', [file])
                                        message.success(`Archivo ${file.name} cargado correctamente`)
                                        return false;
                                    }
                                    }
                                    fileList={modalAttendanceObservationItem.justification}
                                    multilpe={false}
                                >
                                    <Button icon={<UploadOutlined />}>Agregar Justificación</Button>
                                </Upload>}
                                <TextArea
                                    style={{ marginTop: 10 }}
                                    rows={4}
                                    name={`attendance_observation`}
                                    placeholder={'Observación'}
                                    value={modalAttendanceObservationItem.attendance_observation}
                                    onChange={(e) => onChangeAttendanceData(modalAttendanceObservationItem.id, 'attendance_observation', e.target.value)}
                                />
                            </Form.Item>
                        </Form>
                    </Modal>}
                </Form>
            </Modal>

        </>
    )
}

export default AttendancePage