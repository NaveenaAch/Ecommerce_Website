import { Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Loading, SubmitButton } from "../../components"
import { empty, setInState } from "../../lib"
import { useEffect, useState } from "react"
import http from "../../http"
import slugify from "slugify"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export const create = () => {

    const [form, setForm] = useState({status: 'true', featured:'false'})
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [loadingPage, setLoadingPage] = useState(false)
    const [previews, setPreviews] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const LoadData = async () => {
            setLoadingPage(true)
        
        try{
            let catId, brandId
            let catList = await http.get('cms/categories')
            setCategories(catList.data)
            if(catList.data.length){
                catId = catList.data[0]._id
            }

            let brandList = await http.get('cms/brands')
            setBrands(brandList.data)
            if(brandList.data.length){
                brandId = brandList.data[0]._id
            }

            setForm({
                ...form,
                category_id: catId,
                brand_id: brandId
            })

        }catch(error) { }
            
        setLoadingPage(false)

        }

        LoadData()
    
    }, [])

    useEffect(() => {
        if(form && form.name && form.name.length){
            const slug = slugify(form.name, {lower: true, remove: /[*+~.()'"!:@]/g })
            setForm({
                ...form,
                slug
            })
        }
    }, [form.name])

    useEffect(() => {
        if(!empty(form.files)){
            let list = []

            for(let file of form.files){
                list.push(URL.createObjectURL(file))
            }

            setPreviews(list)

        } 
    }, [form.files])


    const handleFileChange = ev => {
        setForm({
            ...form,
            files: ev.target.files,
        })
    }

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        let fd = new FormData()
        for(let k in form){
            if(k == 'files'){
                for(let file of form.files){
                    fd.append(`files`, file)
                }
            }else{
                fd.append(k, form[k])
            }
            
        }

        http.post('cms/products', fd, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(() => {
                navigate('/products')
            })
            .catch(() =>{})
            .finally(() => setLoading(false))

    }


    const handleQuill = (data, name) => {
        setForm({
            ...form,
            [name]:data
        })
    }


    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }
 
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'color', 'background',
        'font',
        'align',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]



    return <Container className="bg-white my-3 py-3 rounded-2 shadow-sm">
    <Row>
        <Col xs="12">
            <Row>
                <Col sm="9" className="mx-auto">
                    <h1>Add Product</h1>
                </Col>
            </Row>
            <Row>
                <Col sm="9" className="mx-auto">
                {loadingPage ? <Loading /> :<Form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control name="name" id="name" 
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="summary">Summary</Form.Label>
                            <ReactQuill theme="snow" modules={modules} formats={formats} 
                            name="summary" id="summary" onChange={data => 
                            handleQuill(data, 'summary')} required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="description">Description</Form.Label>
                            <ReactQuill theme="snow" modules={modules} formats={formats} 
                            name="description" id="description" onChange={data => 
                            handleQuill(data, 'description')} required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="price">Price</Form.Label>
                            <Form.Control type="number" step="0.01" name="price" 
                            id="price" onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="discounted_price">Discounted Price</Form.Label>
                            <Form.Control type="number" step="0.01" name="discounted_price" 
                            id="discounted_price" onChange={ev => setInState(ev, form, setForm)} />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="files">Images</Form.Label>
                            <Form.Control type="file" accept="image/*" name="files" id="files" 
                            onChange={handleFileChange} required multiple/>
                            <Row>
                                {previews.map((preview, i) => <Col key={i} sm="3"
                                className="mt-3">
                                    <img src={preview} className="img-fluid" id="product-create" />
                                </Col>)}
                            </Row>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="slug">Slug</Form.Label>
                            <Form.Control name="slug" id="slug" value={form?.slug}
                            onChange={ev => setInState(ev, form, setForm)}
                            required />
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="category_id">Category</Form.Label>
                            <Form.Select name="category_id" id="category_id" 
                            onChange={ev => setInState(ev, form, setForm)} value={form.category_id}
                            required>
                                {categories.map(category => <option value={category._id}
                                key={category._id}>{category.name}</option>)}

                            </Form.Select>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="brand_id">Brand</Form.Label>
                            <Form.Select name="brand_id" id="brand_id" 
                            onChange={ev => setInState(ev, form, setForm)} value={form.brand_id}
                            required>
                                {brands.map(brand => <option value={brand._id}
                                key={brand._id}>{brand.name}</option>)}

                            </Form.Select>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="status">Status</Form.Label>
                            <Form.Select name="status" id="status" 
                            onChange={ev => setInState(ev, form, setForm)} value={form.status} required>
                                <option value="true" >Active</option>
                                <option value="false" >Inactive</option>
                            </Form.Select>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="featured">Featured</Form.Label>
                            <Form.Select name="featured" id="featured" 
                            onChange={ev => setInState(ev, form, setForm)} value={form.featured} required>
                                <option value="true" >Yes</option>
                                <option value="false" >No</option>
                            </Form.Select>
                        </div>
  
                        <div className="mb-3">
                            <SubmitButton loading={loading} icon="fa-save" 
                            label="Save" />  
                        </div>


                    </Form>}
                </Col>
            </Row>
        </Col>
    </Row>
</Container>
}