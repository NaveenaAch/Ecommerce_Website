import { useEffect, useState } from "react";
import http from "../http";
import { Link, useParams } from "react-router-dom";
import { CartBtn, Loading, ProductCard } from "../components";
import { imgUrl, isEmpty } from "../lib";
import { useSelector } from "react-redux";
import moment from "moment";

export const Product = () => {
  const [product, setProduct] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imgLarge, setImgLarge] = useState('')
  const [similars, setSimilars] = useState([])
  const [form, setForm] = useState({})
  const [avgRating, setAvgRating] = useState(0)
  const [ratings, setRatings] = useState({'5': 0, '4': 0, '3': 0, '2': 0, '1': 0})  
  const [qty, setQty] = useState(1)

  const user = useSelector(st => st.user.value)

  const params = useParams();

  useEffect(() => {
    loadData()
  }, [params.id])

  useEffect(() => {
    if(Object.keys(product).length) {
      http.get(`category/${product.category_id}/products`)
          .then(({data}) => {
            let list = data.filter(pro => pro._id != product._id)
            setSimilars(list)
          })
          .catch(err => {})

          if(product.reviews.length) {
            let avg = 0
            let newRatings = ratings
            for(let i = 1; i<=5; i++){
                let len = product.reviews.filter
                (review => review.rating == i).length 
                
                newRatings[`${i}`] = len / product.reviews.length * 100
              
                avg += i*len
            
              }

              avg /= product.reviews.length
            
            setRatings(newRatings)
            setAvgRating(avg)
          }
    }
  }, [product])

  const loadData = () => {
    setLoadingPage(true);

    http.get(`product/${params.id}`)
        .then(({ data }) => {
          setProduct(data)
          setImgLarge(data.images[0].replace(/\\/g, '/'))
        })
        .finally(() => setLoadingPage(false));
  }

  const handleSubmit = ev => {
    ev.preventDefault()
    setLoading(true)

    http.post(`product/${product._id}/review`, form)
      .then(() => {
        loadData()
        ev.target.reset()
        setForm({})
      })
      .catch(err => {})
      .finally(() => setLoading(false))
  } 


  return loadingPage ? 
    <Loading /> : 
    <div className="col-12">
      <main className="row">
        <div className="col-12 bg-white py-3 my-3">
          <div className="row">

            <div className="col-lg-5 col-md-12 mb-3">
              <div className="col-12 mb-3">
                <div className="img-large border" style=
                {{backgroundImage: `url('${imgUrl(imgLarge)}')`}}></div>
              </div>
              <div className="col-12">
                <div className="row">
                    {product.images.map((image, i) => <div
                    className="col-sm-2 col-3" key={i}>
                        <div className="img-small border"
                          style={{backgroundImage: `url('${imgUrl
                            (image)}')`.replace(/\\/g, '/') }} onMouseEnter=
                          {() => setImgLarge(image.replace(/\\/g, '/'))} onClick=
                          {() => setImgLarge(image.replace(/\\/g, '/'))}></div>
                        </div>)}
                  </div>
              </div>
            </div>


            <div className="col-lg-5 col-md-9">
              <div className="col-12 product-name large">
                {product.name}
                <small>By <Link to={`/brand/${product.
                  brand_id}`}>{product.brand[0].name}</Link>
                </small>
              </div>
              <div className="col-12 px-0">
                <hr />
              </div>
              <div className="col-12" dangerouslySetInnerHTML=
              {{ __html: product.summary }}>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 text-center">
              <div className="col-12 sidebar h-100">
                <div className="row">
                  <div className="col-12">
                  {isEmpty(product.discounted_price) ? 
                <span className="product-price-old">
                    Rs. {product.price}
                </span> :
                <>
                <span className="product-price">
                    Rs. {product.discounted_price}
                </span>
                <br />
                <span className="product-price-old">
                    Rs. {product.price}
                </span>
                
                </>}
                  </div>
                  <div className="col-xl-5 col-md-9 col-sm-3 col-5 mx-auto mt-3">
                    <div className="mb-3">
                      <label htmlFor="qty">Quantity</label>
                      <input
                        type="number"
                        id="qty"
                        min="1"
                        value={qty} onChange={ev => setQty(ev.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                   <CartBtn product={product} qty={qty}/>
                  </div>
                  <div className="col-12 mt-3">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                    >
                      <i className="fas fa-heart me-2"></i>Add to wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mb-3 py-3 bg-white text-justify">
          <div className="row">
            <div className="col-md-7">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 text-uppercase">
                    <h2>
                      <u>Details</u>
                    </h2>
                  </div>
                  <div className="col-12" id="details"
                  dangerouslySetInnerHTML={{__html:
                  product.description}}></div>
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <div className="col-12 px-md-4 sidebar h-100">
                <div className="row">
                  <div className="col-12 mt-md-0 mt-3 text-uppercase">
                    <h2>
                      <u>Ratings & Reviews</u>
                    </h2>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-4 text-center">
                        <div className="row">
                          <div className="col-12 average-rating">{avgRating.toFixed(1)}</div>
                          <div className="col-12">of {product.reviews.length} reviews</div>
                        </div>
                      </div>
                      <div className="col">
                        <ul className="rating-list mt-3">
                          <li>
                            <div className="progress" title={ratings[5].toFixed(1)+'%'}>
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width: ratings[5] + '%'}}
                                aria-valuenow={ratings[5]}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {ratings[5].toFixed(1)}%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              5<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                          <li>
                            <div className="progress" title={ratings[4].toFixed(1)+'%'}>
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width: ratings[4] + '%'}}
                                aria-valuenow={ratings[4]}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {ratings[4].toFixed(1)}%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              4<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                          <li>
                            <div className="progress" title={ratings[3].toFixed(1)+'%'}>
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width: ratings[3] + '%'}}
                                aria-valuenow={ratings[3]}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {ratings[3].toFixed(1)}%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              3<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                          <li>
                            <div className="progress" title={ratings[2].toFixed(1)+'%'}>
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width: ratings[2] + '%'}}
                                aria-valuenow={ratings[2]}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {ratings[2].toFixed(1)}%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              2<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                          <li>
                            <div className="progress" title={ratings[1].toFixed(1)+'%'}>
                              <div
                                className="progress-bar bg-dark"
                                role="progressbar"
                                style={{width: ratings[1] + '%'}}
                                aria-valuenow={ratings[1]}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {ratings[1].toFixed(1)}%
                              </div>
                            </div>
                            <div className="rating-progress-label">
                              1<i className="fas fa-star ms-1"></i>
                            </div>
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 px-md-3 px-0">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <h4>Add Review</h4>
                  </div>
                  <div className="col-12">
                    {!isEmpty(user) ? <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Give your review"
                          onChange={ev => setForm({
                            ...form,
                            comment: ev.target.value
                          })}></textarea>
                      </div>
                      <div className="mb-3">
                        <div className="d-flex ratings justify-content-end flex-row-reverse">
                          <input
                            type="radio"
                            value="5" 
                            name="rating"
                            id="rating-5" onChange={ev => { setForm({...form,
                            rating: ev.target.value}) }} checked={form?.rating == 5} 
                          />
                          <label htmlFor="rating-5"></label>
                          <input
                            type="radio"
                            value="4" 
                            name="rating"
                            id="rating-4" onChange={ev => { setForm({...form,
                            rating: ev.target.value})}} checked={form?.rating == 4} 
                          />
                          <label htmlFor="rating-4"></label>
                          <input
                            type="radio"
                            value="3" 
                            name="rating"
                            id="rating-3" onChange={ev => { setForm({...form,
                            rating: ev.target.value})}} checked={form?.rating == 3} 
                          />
                          <label htmlFor="rating-3"></label>
                          <input
                            type="radio"
                            value="2" 
                            name="rating"
                            id="rating-2" onChange={ev => { setForm({...form,
                              rating: ev.target.value})}} checked={form?.rating == 2} 
                          />
                          <label htmlFor="rating-2"></label>
                          <input
                            type="radio"
                            value="1"
                            name="rating"
                            id="rating-1"
                            checked={form?.rating == 1} 
                            onChange={ev => { setForm({...form,
                              rating: ev.target.value})}}
                          />
                          <label htmlFor="rating-1"></label>
                        </div>
                      </div>
                      <div className="mb-3">
                        <button className="btn btn-outline-dark" disabled =
                        {loading}>{loading ? <i
                        className="fa-solid fa-spinner fa-spin me-2"></i> : null}
                          Add Review
                        </button>
                      </div>
                    </form>: <div className="col-12 
                    text-center py-2 px-3 mb-3 bg-gray">
                          <small>Please <Link to="/login">Login
                          </Link> to add your review</small>
                    </div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 px-md-3 px-0">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">

                    {product.reviews.length ?  
                    product.reviews.map(review => <div className="col-12 
                    text-justify py-2 px-3 mb-3 bg-gray" key={review._id}>
                      <div className="row">
                        <div className="col-12">
                          <strong className="me-2">
                            {review.user[0].name}
                          </strong>
                          <small>
                            <i className={`${review.rating >= 1 ? 'fas' : 'far'}
                            fa-star`}></i>
                            <i className={`${review.rating >= 2 ? 'fas' : 'far'}
                            fa-star`}></i>
                            <i className={`${review.rating >= 3 ? 'fas' : 'far'}
                            fa-star`}></i>
                            <i className={`${review.rating >= 4 ? 'fas' : 'far'}
                            fa-star`}></i>
                            <i className={`${review.rating >= 5 ? 'fas' : 'far'}
                            fa-star`}></i>
                          </small>
                        </div>
                        <div className="col-12">
                          {review.comment}
                        </div>
                        <div className="col-12">
                          <small>
                            <i className="fas 
                            fa-clock me-2"></i>
                            {moment(review.createdAt).fromNow()}
                          </small>
                        </div>
                      </div>
                    </div>): <div className="col-12 
                    text-justify py-2 px-3 mb-3 bg-gray">
                      <div className="row">
                          <div className="col-12
                          text-center">
                              No review given on this 
                              product.
                          </div>
                      </div>
                    </div>}

                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {similars.length ? <div className="col-12">
          <div className="row">
            <div className="col-12 py-3">
              <div className="row">
                <div className="col-12 text-center text-uppercase">
                  <h2>Similar Products</h2>
                </div>
              </div>
              <div className="row row-cols-lg-4 row-cols-sm-2">

                {similars.map(similar => <ProductCard 
                product={similar} key={similar._id}/>)}

              </div>
            </div>
          </div>
        </div> : null}
      </main>
    </div>
  
};
