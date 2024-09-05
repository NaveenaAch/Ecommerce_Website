import moment from "moment"
import { useEffect, useState } from "react"
import { Col, Form, PageItem, Pagination, Row, Table } from "react-bootstrap"

export const DataTable = ({data, searchable = [], sortable = []}) => {

    const [list, setList] = useState([])
    const [items, setItems] = useState([])
    const [term, setTerm] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [direction, setDirection] = useState('desc')
    const [perPage, setPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [offset, setOffset] = useState(0)
    const [pageLinks, setPageLinks] = useState([])

    useEffect(() => {
        setList(data)
    }, [data])

    useEffect(() => {
        if(term.length) {
            let filtered = data.filter(item => {
                for(let k of searchable) {
                    if (`${item[k]}`.toLowerCase().includes(term.toLowerCase())) {
                        return true
                    }
                }

                return false
            })

            setList(filtered)
        } else {
            setList(data)
        }

        setSortBy('')
        setDirection('desc')
        setCurrentPage(1)
    }, [term])

    useEffect(() => {
        if(sortBy.length) {
            let sorted = [...list].sort((a, b) => {
                let x, y
                
                if(moment(a[sortBy]).isValid() && moment(b[sortBy]).isValid()) {
                    x = Date.parse(a[sortBy])
                    y = Date.parse(b[sortBy])
                } else {
                    x = a[sortBy].toLowerCase();
                    y = b[sortBy].toLowerCase();
                }

                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            })

            if(direction == 'desc') {
                sorted.reverse()
            }

            setList(sorted)
            setCurrentPage(1)
        }
    }, [sortBy, direction])

    useEffect(() => {
        let paginated = [...list].splice(offset, perPage)

        setItems(paginated)
    }, [list, offset])

    useEffect(() => {
        setCurrentPage(1)

        let paginated = [...list].splice(offset, perPage)

        let total = Math.ceil(list.length / perPage)

        setItems(paginated)
        setTotalPages(total)
    }, [perPage, list])

    useEffect(() => {
        let start = (currentPage - 1) * perPage

        setOffset(start)
    }, [currentPage])

    useEffect(() => {
        let links = [<Pagination.Prev disabled={currentPage == 1} onClick={() => setCurrentPage(currentPage - 1)} />]

        for(let i = 1; i <= totalPages; i++) {
            links.push(<PageItem active={i == currentPage} onClick={ev => {
                ev.preventDefault()
                setCurrentPage(i)
            }}>{i}</PageItem>)
        }

        links.push(<Pagination.Next disabled={currentPage == totalPages} onClick={() => setCurrentPage(currentPage + 1)} />)

        setPageLinks(links)
    }, [totalPages, currentPage])

    return <Row className="align-items-end">
        <Col sm="auto" className="mb-3">
            <Form.Label htmlFor="perPage">Per Page:</Form.Label>
            <Form.Select value={perPage} onChange={ev => setPerPage(parseInt(ev.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </Form.Select>
        </Col>
        {searchable.length ? <Col sm="4" className="ms-auto mb-3">
            <Form.Control type="search" placeholder="Search" onChange={ev => setTerm(ev.target.value)} />
        </Col> : null}
        <Col xs="12">
            {items.length ?
                <>
                    <Table bordered striped hover size="sm">
                        <thead className="table-dark">
                            <tr>
                                {Object.keys(items[0]).map((k, i) => {
                                    if (sortable.includes(k)) {
                                        return <th key={i} className="sortable" onClick={() => {
                                            if (sortBy == k) {
                                                if (direction == 'asc') {
                                                    setDirection('desc')
                                                } else {
                                                    setDirection('asc')
                                                }
                                            } else {
                                                setDirection('desc')
                                            }

                                            setSortBy(k)
                                        }}>{k}{sortBy == k ? <i className={`fa-solid fa-${direction == 'asc' ? 'chevron-up' : 'chevron-down'} ms-3`}></i> : null}</th>
                                    } else {
                                        return <th key={i}>{k}</th>
                                    }
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, n) => <tr key={n}>
                                {Object.values(item).map((v, i) => <td key={i}>{v}</td>)}
                            </tr>)}
                        </tbody>
                    </Table>
                    {totalPages > 1 ? <Pagination>
                        {pageLinks}
                    </Pagination> : null}
                </> : 
                <div className="text-center text-muted fst-italic">
                    No data found
                </div>}
        </Col>
    </Row>
}