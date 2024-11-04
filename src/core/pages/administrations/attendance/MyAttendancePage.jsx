import { useState } from 'react';
import { Button, Card, DatePicker, Dropdown, Modal, Row, Select } from 'antd'
import { alertError, renderError } from '../../../common/functions';
import { user } from '../../../services/AuthService';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { attendanceIndex, attendanceUpdate } from '../../../services/AttendanceService';
import { MyAttendanceTable } from '../../../tables/MyAttendanceTable';
import { groupCombo } from '../../../services/GroupService';

export const MyAttendancePage = ({ app, isMobile }) => {
    const [attendance, setAttendance] = useState([]);
    const [dataPage, setDataPage] = useState({ page: 1, pageSize: 50 });
    const [groups, setGroups] = useState([]);
    const [group, setGroup] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [attendanceMonth, setAttendanceMonth] = useState(dayjs());

    const renderExtraTable = () => {
        return (
            <Row>
                <span style={{ margin: '15px 15px 15px 0px' }} span={24}>Mes de asistencia</span>
                <DatePicker
                    allowClear={false}
                    placeholder='Seleccione un mes'
                    style={{ marginRight: 10, width: isMobile ? '150px' : '200px', marginBottom: 10, marginTop: 10 }}
                    disabled={loading}
                    picker="month"
                    format='MM/YYYY'
                    value={attendanceMonth}
                    onChange={setAttendanceMonth}
                />
                <Select
                    allowClear
                    value={group}
                    disabled={loading}
                    onChange={setGroup}
                    style={{ marginRight: 10, width: isMobile ? '150px' : '200px', marginBottom: 10, marginTop: 10 }}
                    placeholder='Elija grupo'
                >
                    {groups.map(group =>
                        <Select.Option value={group.id} key={group.id}>{group.name}</Select.Option>
                    )}
                </Select>
                <Button type='primary' disabled={group == undefined} style={{ margin: 10 }} onClick={loadData}>Buscar</Button>
            </Row>
        );
    }

    const uploadJustification = async ({ justification, day }) => {
        setLoading(true);
        let student = user()
        try {
            await attendanceUpdate({ attendanceMonth, group_id: group, student_id: student.id }, {
                day,
                group_id: group,
                justification,
                student_id: student.id,
                observation: "Justificacion cargada por estudiante"
            });
            loadData();
        } catch (err) {
            setLoading(false)
            renderError(err);
        }
    }

    const onPageChange = async (page, pageSize) => {
        pageSize = pageSize === undefined ? pageSize : pageSize;
        setDataPage({ ...dataPage, pageSize, page });
        setLoading(true);

        try {
            const { data } = await attendanceIndex({ attendanceMonth, group_id: group, student_id: user().id });
            setAttendance(data);
            setLoading(false);
        } catch (err) {
            alertError(err);
            setLoading(false);
        }
    }

    const loadGroups = async () => {
        setLoading(true)
        let student = user()
        const respGroups = await groupCombo({ user_type: student.type, user_id: student.id });
        setLoading(false)
        setGroups(respGroups)
    }

    const loadData = () => {
        onPageChange(1);
    }

    useEffect(() => {
        loadGroups();
    }, []);

    return (
        <>
            <Card
                title={(<strong>Mi asistencia</strong>)}
                className='ant-section'
                extra={renderExtraTable()}
            >
                <MyAttendanceTable
                    loading={loading}
                    data={attendance}
                    uploadJustification={uploadJustification}
                />
            </Card>
        </>
    )
}
