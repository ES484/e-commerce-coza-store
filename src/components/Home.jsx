import React, {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import {useGetAllProductsQuery} from '../features/productsApi';
import {useDispatch} from 'react-redux';
import {addToCart} from '../features/cartSlice';
import {useNavigate} from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(products);
  const btnFun = [
    {btnFunction: "men's clothing", btnName: "Men's Clothing"}, 
    {btnFunction: "women's clothing", btnName: "Women's Clothing"},
    {btnFunction: "jewelery", btnName: "Jwelery"},
    {btnFunction: "electronics", btnName: "Electric"},
  ]

  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{if(data!=null){setProducts(data); setFilter(data)}},[data])
  const Loading = ()=>{ return <div className="col-md-3">
      <Skeleton count={10} height={30} />
    </div>
  } 
  const getFilteredProducts = (cat) =>{
    const filteredProduct = products.filter(product=> product.category === cat);
    setFilter(filteredProduct)
  }

  return (
    <React.Fragment>
      <div className="container py-5">
        <div className="row gy-3">
          <h2 className="text-center">All Products</h2>
        {isLoading? 
        <>
          <Loading/> 
          <Loading/> 
          <Loading/>
          <Loading/>
        </> 
        : error? "error" 
        :
        <>
        <div className="d-flex justify-content-center">
          <div className='m-2'>
            <button onClick={()=>{setFilter(products)}}>All</button>
          </div>
          <div>
            {btnFun.map((btn, idx)=><button className='m-2' key={idx} onClick={()=>{getFilteredProducts(btn.btnFunction)}}>{btn.btnName}</button>)}
          </div>
        </div>
        {filter.map((product)=>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div className="card border-0 shadow">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h4 className="card-title">{product.title.substring(0,12)} ...</h4>
                <p className="card-text">$ {product.price}</p>
                <button onClick={()=>{dispatch(addToCart(product)); navigate('/cart')}}>Shop Now</button>
              </div>
            </div>
        </div>
        )}
        </>
        }
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home