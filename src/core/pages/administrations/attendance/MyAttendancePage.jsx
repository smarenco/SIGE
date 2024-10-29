import { useState } from 'react';
import { Button, Card, DatePicker, Dropdown, Modal, Row } from 'antd'
import { alertError, renderError } from '../../../common/functions';
import { user } from '../../../services/AuthService';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { attendanceIndex } from '../../../services/AttendanceService';
import { MyAttendanceTable } from '../../../tables/MyAttendanceTable';

export const MyAttendancePage = ({ app, isMobile }) => {
    const [attendance, setAttendance] = useState([]);
    const [dataPage, setDataPage] = useState({ page: 1, pageSize: 50 });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [attendanceMonth, setAttendanceMonth] = useState(dayjs());

    const renderExtraTable = () => {

        return (
            <Row>
                <span style={{margin: '15px 15px 15px 0px'}} span={24}>Mes de asistencia</span>
                <DatePicker
                    allowClear={false}
                    placeholder='Seleccione un mes'
                    style={{ marginRight: 10, width: isMobile ? '150px':'200px', marginBottom: 10, marginTop: 10 }}
                    disabled={loading}
                    picker="month"
                    format='MM/YYYY'
                    value={attendanceMonth}
                    onChange={setAttendanceMonth}
                />
                <Button type='primary' style={{margin:10}} onClick={loadData}>Buscar</Button>
            </Row>
        );
    }

    const onPageChange = async (page, pageSize) => {
        pageSize = pageSize === undefined ? pageSize : pageSize;
        setDataPage({ ...dataPage, pageSize, page });
        setLoading(true);        

        try {
            const { data } = await attendanceIndex({ attendanceMonth, student_id: user().id });
            setAttendance(data);
            setLoading(false);
        } catch (err) {
            alertError(err);
            setLoading(false);
        }
    }

    const loadData = () => onPageChange(1);

    useEffect(() => {
        loadData();
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
                />
            </Card>
        </>
    )
}
