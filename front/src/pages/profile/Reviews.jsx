import { useEffect, useState } from "react"
import http from "../../http"
import { DataTable, Loading } from "../../components"
import { dtFormat } from "../../lib"

export const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        http.get('profile/reviews')
            .then(({data}) => setReviews(data))
            .catch((err) => {console.log(err)})
            .finally(() => setLoading(false))
    }, [])

    return loading ? <Loading /> : <DataTable searchable={['Product',
    'Rating', 'Reviewed At']} sortable={['Product','Rating','Rating', 'Reviewed At']} data={reviews.map(review => {
       return {
            'Product': review.product[0].name,
            'Review': review.comment,
            'Rating': review.rating,
            'Reviewed At': dtFormat(review.createdAt)
        }
    })} />
}