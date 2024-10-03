import React, { useEffect, useState } from 'react'
import { DatePicker, Button, Table, Divider } from 'antd'
import { Header } from 'antd/es/layout/layout';
import { LeftCircleOutlined, PlusCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import { AttendanceListModal } from '../../modals/AttendanceListModal';
import { renderError } from '../../common/functions';
import { attendanceCreate, attendanceIndex, attendanceUpdate } from '../../services/AttendanceService';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import './AttendancePage.css'
import { AttendanceItemModal } from '../../modals/AttendanceItemModal';
import { DDMMYYYYHHmmss } from '../../common/consts';

dayjs.locale('es');

export const AttendancePage = ({ students, view, confirmLoading, loadingCourses, group }) => {
    const [modalAttendanceList, setModalAttendanceList] = useState(false);
    const [modalAttendanceItem, setModalAttendanceItem] = useState(false);
    const [loadingAttendance, setLoadingAttendance] = useState(false);
    const [attendance, setAttendance] = useState([]);
    const [attendanceMonth, setAttendanceMonth] = useState(dayjs());
    const [attendanceItem, setAttendanceItem] = useState({});
    const [isButtonClick, setIsButtonClick] = useState(false);

    const fetchAttendance = async ({ attendanceMonth, group_id }) => {
        try {
            setLoadingAttendance(true);
            const { data } = await attendanceIndex({ attendanceMonth, group_id });
            // console.log('page',data);

            setAttendance(data);
        } catch (err) {
            setLoadingAttendance(false);
            renderError(err);
        } finally {
            setLoadingAttendance(false)
        }
    };

    const attendanceColumns = () => {
        let cols = [{
            title: 'Estudiante',
            key: 'student_name',
            dataIndex: 'student_name',
            width: 100,
            ellipsis: true,
        }]

        for (let i = 1; i < 32; i++) {
            cols.push({
                title: i < 10 ? `0${i}` : i,
                key: `${i}`,  // Aseguramos que la llave sea un string
                dataIndex: `${i}`,  // Aseguramos que el dataIndex sea un string
                width: 20,
                ellipsis: true,
                className: 'attendance-state',
                render: (r, t) => t[i] && renderAttendanceState({ ...t[i], day: i, id: t.student_id })
            })
        }
        // console.log(cols)
        return cols
    }

    const showAttendanceItem = ({ state, observation, justification_id, student_id, day }) => {
        setAttendanceItem({ state, observation, justification_id, student_id, day })
        setModalAttendanceItem(true)
    }

    const renderAttendanceState = (data) => {
        const { state, observation, justification_id, id: student_id, day } = data
        const text = state ? 'Asistió' : 'No Asistió'
        const type = state ? 'true' : 'false'

        if (state !== undefined) {
            return <div onClick={() => showAttendanceItem({ state, observation, justification_id, student_id, day })} className={`attendance-state attendance-state-${type}`}>{text}</div>
        }
        return ''
    }

    const onCancelModalAttendanceList = (attendanceList) => {
        setModalAttendanceList(false)
    }

    const onOkModalAttendanceList = async (attendanceList, attendance_date) => {
        setLoadingAttendance(true);
        try {
            if (attendanceList.id) {
                console.log('aca');

                await attendanceUpdate(attendanceList.id, attendanceList);
            } else {
                await attendanceCreate({ attendanceList, group_id: group.id, attendance_date });
            }

            setModalAttendanceList(false);
            fetchAttendance({ attendanceMonth, group_id: group.id });
        } catch (err) {
            setLoadingAttendance(false)
            renderError(err);
        }
        setModalAttendanceList(false)
    }

    const onCancelModalAttendanceItem = (attendanceItem) => {
        setModalAttendanceItem(false)
        setAttendanceItem({})
    }

    const onOkModalAttendanceItem = async (attendanceItem) => {
        setLoadingAttendance(true);
        try {
            await attendanceUpdate({ attendanceMonth, group_id: group.id }, attendanceItem);

            setModalAttendanceItem(false); fetchAttendance({ attendanceMonth, group_id: group.id });
        } catch (err) {
            setLoadingAttendance(false)
            renderError(err);
        }
        setModalAttendanceItem(false)
    }

    const handleMonthChange = (newMonth, fromButton = false) => {
        setIsButtonClick(fromButton); // Indicamos si el cambio fue desde los botones
        setAttendanceMonth(newMonth);
    };

    useEffect(() => {
        fetchAttendance({ attendanceMonth, group_id: group.id })
    }, []);

    useEffect(() => {
        if (isButtonClick) {
            fetchAttendance({ attendanceMonth, group_id: group.id })
            setIsButtonClick(false); // Reiniciamos el estado
        }
    }, [attendanceMonth]);

    return (
        <>
            <Header>
                Mes de asistencia
                <DatePicker
                    allowClear={false}
                    placeholder='Seleccione un mes'
                    style={{ marginLeft: 10, width: '200px' }}
                    disabled={confirmLoading || loadingAttendance}
                    picker="month"
                    format='MM/YYYY'
                    value={attendanceMonth}
                    onChange={setAttendanceMonth}
                />
                <Button disabled={confirmLoading || loadingAttendance} onClick={() => fetchAttendance({ attendanceMonth, group_id: group.id })} type='primary' style={{ marginLeft: 10 }}>Buscar</Button>
                <Button icon={<PlusCircleOutlined />} type='primary' onClick={() => setModalAttendanceList(true)} style={{ float: 'right' }}>Pasar lista</Button>
                <Divider style={{ margin: 15 }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button onClick={() => handleMonthChange(attendanceMonth.subtract(1, 'month'), true)} disabled={confirmLoading || loadingAttendance} icon={<LeftCircleOutlined />} style={{ float: 'left' }}>Mes anterior</Button>
                    <h2 style={{ textAlign: 'center', flexGrow: 1, margin: 0, textAlign: 'center' }}>{attendanceMonth.format('MMMM').charAt(0).toUpperCase() + attendanceMonth.format('MMMM').slice(1)}</h2>
                    <Button onClick={() => handleMonthChange(attendanceMonth.add(1, 'month'), true)} disabled={confirmLoading || loadingAttendance} icon={<RightCircleOutlined />} style={{ float: 'right' }}>Mes siguiente</Button>
                </div>
            </Header>
            <Table
                key='student_id'
                size='small'
                style={{ height: '100%', paddingTop: 15 }}
                columns={attendanceColumns()}
                dataSource={attendance}
                loading={confirmLoading || loadingAttendance}
            />
            <AttendanceListModal
                open={modalAttendanceList}
                loading={confirmLoading || loadingAttendance}
                students={students}
                onOk={onOkModalAttendanceList}
                onCancel={onCancelModalAttendanceList}
            />
            <AttendanceItemModal
                open={modalAttendanceItem}
                loading={confirmLoading || loadingAttendance}
                item={attendanceItem}
                onOk={onOkModalAttendanceItem}
                onCancel={onCancelModalAttendanceItem}
            />
        </>
    )
}