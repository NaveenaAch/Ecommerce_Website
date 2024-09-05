import { useEffect, useState } from "react"
import http from "../../http"
import { DataTable, Loading } from "../../components"
import { dtFormat } from "../../lib"

export const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('profile/orders')
            .then(({data}) => setOrders(data))
            .catch((err) => {console.error(err)})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <DataTable searchable={['Details',
    'Status', 'Ordered At']} sortable={['Status', 'Ordered At']} data={orders.map(order => {
       return {
            'Details': <ul>
                {order.details.map(detail => <li key={detail._id}>
                    {detail.qty} x {detail.product[0].name} @ Rs. {detail.
                    price} = Rs. {detail.total}
                </li>)}
            </ul>,
            'Status': order.status,
            'Ordered At': dtFormat(order.createdAt)
        }
    })} />
}