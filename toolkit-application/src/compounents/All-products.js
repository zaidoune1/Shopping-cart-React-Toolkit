import { useDispatch, useSelector } from "react-redux";
import { prosuctsSlice } from "../rtk/slice-Products";
import { addToCards } from "../rtk/slice-cards"; 
import { saveTolocaleStorage } from "../rtk/slice-cards";
import { createContext, useContext, useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import ProductsDetails from "./Products-details";

    function AllProducts() {

        const stateOfCard = useSelector((stateOfCard) => stateOfCard.cards)

        // const  state = useSelector((state) => state.data)
        const  [inputSearchValue, setInputSearchValue] = useState([]);
        const [getCategories, setAllCategories] = useState([]);
        const [allProduct, setAllProdut] = useState(null);
        const dispatch = useDispatch();
        const getProducts = 'https://fakestoreapi.com/products'
        const fetchCategories = 'https://fakestoreapi.com/products/categories'

        const productsFetch = () => {

            fetch(getProducts).then((resCat) => resCat.json())
            .then((getAllProducts) => {
                console.log(getAllProducts)
                setAllProdut(getAllProducts);
                
            })

        }


        const catFetch = () => {

            fetch(fetchCategories).then((res) => res.json())
            .then((allCategories) => {
                console.log(allCategories)
                setAllCategories(allCategories);
            })
        }

        const categoriesSpecificFetch = (categorys) => {

            fetch(`${getProducts}/category/${categorys}`).then((res) => res.json())
            .then((spesCategories) => {
                console.log(spesCategories)
                setAllProdut(spesCategories);
            })
        }

        useEffect(() => {
            catFetch();
            productsFetch();
        }, [])

    return (
<>
                <div className="btn-specific-cat">

                    {
                        allProduct &&  <button onClick={() => {
                            productsFetch();
                        }} className="btn btn-info cat"> All products </button>
                    }
                {
                    
                    
                    getCategories.map((cats) => {
                    return(
                        <button onClick={() => {
                            categoriesSpecificFetch(cats)
                        }} key={cats} className="btn btn-info cat"> {cats} </button>
                    
                    )
                }) 
                
                }
                </div>

                { allProduct && <form className="d-flex inp-search" role="search">
                <input className="form-control me-2" type="text" placeholder="Search By Product Name" aria-label="Search" onChange={(e) => {
                setInputSearchValue(e.target.value)
            }}/>

    </form>}

        <div className="container">
        <div className="row">

        {

    allProduct ? allProduct.filter((pro) => {

                if(!inputSearchValue) {
                    return pro
                }else if(pro.title.includes(inputSearchValue)) {
                    return pro
                }
            }).map((pro) => {
                    return(
                        
                        <div className="col" key={pro.id}>
                        <div className="card allProducts">
                            <img src={pro.image} className="card-img-top imgHome" alt= {pro.title}/>
                            <div className="card-body">
                                <h5 className="card-title title-allProducts">{pro.title}</h5>
                                <p className="card-text">{pro.price}$</p>
                                <button onClick={(e) => {
                                    dispatch(addToCards(pro));
                                    dispatch(saveTolocaleStorage(JSON.stringify(pro)))
                                }} className="btn btn-primary btn-card"> {stateOfCard.find((cardId) => cardId.id === pro.id) ? <span style={{opacity: "0.5"}}>In Your Card</span> : "Add To Card"} </button>
                                <Link to={`/product-details/${pro.id}`} className="btn btn-primary btn-card m-1 ">More Details</Link>
                            </div>
                        </div>
                        </div>
                    )
            }) : <div className="not-found"> 
                    <h1 className="Loading"> Loading... </h1>
                </div>
        }
    </div>
    </div>
    </>
        
    )
    }

    export default AllProducts