    import React, { useEffect, useState } from 'react'
    import { useParams } from 'react-router-dom';
    import "./ProductsDetails-style.css";

    function ProductsDetails() {

        const [detailsProducts, setDetailsProducts] = useState([]);

        const params = useParams();

        const productsDetails = "https://fakestoreapi.com/products";

        const fetchDetails = () => {

            fetch(`${productsDetails}/${params.productId}`)
            .then((respense) => respense.json())
            .then((respenseData) => {
                console.log(respenseData)
                setDetailsProducts(respenseData);
            })

        }

        useEffect(() => {

            fetchDetails();
        }, [])

    return (
        <>
            { <div className="col" key={detailsProducts.id}>
                            <div className="card details">
                            <img src={detailsProducts.image} className="card-img-top img-details" alt= {detailsProducts.title}/>
                            <div className="card-body">
                            <h3 className="card-title">{detailsProducts.title}</h3>
                            <h4 className="card-title">{detailsProducts.description}</h4>
                            <h5 className="card-text">{detailsProducts.price}$</h5>
                    </div>
                </div>
            </div>         }
        </>
    )
    }

    export default ProductsDetails;