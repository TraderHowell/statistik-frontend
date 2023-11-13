import { useNavigate, useLocation  } from 'react-router-dom';
import Cookies from 'js-cookie';

const TableBody = ({ tableData, columns }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleRowClick = (clientId, date, clientname) => {

    if (location.pathname === '/client-streams') {
        Cookies.set('date', date);
        navigate('/stream-editor');
    }
    if (location.pathname === '/') {
        Cookies.set('id', clientId);
        Cookies.set('name', clientname);
        navigate('/client-dashboard');
    }
    };

    return (
        <tbody>
            {tableData.map((data) => {
                return (
                    <tr
                    key={data.clientid}
                    onClick={() => handleRowClick(data.clientid, data.date, data.clientname)}
                    style={{ cursor: 'pointer' }}
                    >
                    {columns.map(({ accessor }) => {
                        const tData = data[accessor] ? data[accessor] : "——";
                        return <td key={accessor}>{tData}</td>;
                    })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;
