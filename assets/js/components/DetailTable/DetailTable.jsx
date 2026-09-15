import * as React from 'react';
import DetailDataTable from './DetailDataTable';
import { getDailySpends } from '../../api/daily_spend_api.js';


export default function DetailTable() {
    const [dailySpend, setDailySpend] = React.useState([]);
    const [loading, setLoading] = React.useState(true);


    const fetchDatas = async () => {
        getDailySpends({})
            .then(function (data) {
                if (!data) { return };

                setLoading(false);
                setDailySpend(data["member"]);
            })
    }

    React.useEffect(() => {

        fetchDatas();
    }, []);


    return (
        <DetailDataTable
            items={dailySpend}
            loading={loading}
        />
    );

}