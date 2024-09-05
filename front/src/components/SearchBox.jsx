import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { isEmpty } from "../lib"

export const SearchBox = () => {
    const [term, setTerm] = useState('')

    const navigate = useNavigate()
    
    useEffect(() => {
        if(!isEmpty(term)){
            navigate(`/search?term=${term}`)
        }

    }, [term])

    return <form action="#">
    <div className="form-group">
        <div className="input-group">
            <input type="search" className="form-control border-dark" 
            placeholder="Search..." value={term} onChange={ev => setTerm(ev.target.
            value)} required />
            <button disabled className="btn btn-outline-dark"><i className="fas fa-search"></i></button>
        </div>
    </div>
</form>
}
