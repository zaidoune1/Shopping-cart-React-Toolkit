import { useSelector, useDispatch} from "react-redux"
import { deletes } from "./rtk/slice-cards"
import { cleareAll } from "./rtk/slice-cards"
import { CardsIncriments } from "./rtk/slice-cards"
import { minesToCards } from "./rtk/slice-cards"
import { saveTolocaleStorage } from "./rtk/slice-cards"
import {useNavigate} from "react-router-dom"
import "../src/compounents/Cards.css"
import Swal from 'sweetalert2'


    function Cards() {

        let count = 1;

        const navigate = useNavigate();

        const dispatch = useDispatch()

        const stateCards = useSelector((stateCards) => stateCards.cards)

        const globalQuntity = stateCards.reduce((acc, curr) => {

            acc =+ curr.price * curr.quantity + acc;

            return acc;

        }, 0) 

        const navigateHome =  stateCards.length === 0 && navigate("/")


    
    return (

        <main>
        <div className="delete-total-price">
        <p className="total-price">Total price : {globalQuntity.toFixed(2) }$</p>
        {navigateHome}

        <button onClick={() => {

        Swal.fire({
            title: "Are you sure you want delete all product ?",
            showCancelButton: true,
            showConfirmButton: true,
        }).then((resultsAllDelete) => {
            if(resultsAllDelete.isConfirmed) {
                dispatch(cleareAll())
                localStorage.clear()
                navigate("/")
            }
        })
    }} type="button" className="btn btn-primary cleareAll">Delete all products</button>
    </div>


                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Images</th>
                            <th scope="col">Descriptino</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Action</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Achat</th>
                        </tr>
                        </thead>
        
        {
        
            stateCards.map((productsInCard) => {

                return(

                        
                        <tbody key={productsInCard.id}>
                        <tr>
                            <th scope="row"> {count++} </th>
                            <td>{productsInCard.title}</td>
                            <td>{<img src= {productsInCard.image} className="card-img-top img-cards" alt= {productsInCard.title}/>}</td>
                            <td className="description">{productsInCard.description}</td>
                            <td className="card-text">${productsInCard.price * productsInCard.quantity}</td>
                            <td className="list-group-item quantity">Quantity {productsInCard.quantity}</td>
                            <td className="action">
                                {productsInCard.quantity < 8 ? <button onClick={() => {
                                dispatch(CardsIncriments(productsInCard))
                                dispatch(saveTolocaleStorage(JSON.stringify(productsInCard)))
                            }} type="button" className="btn-more">+</button> :

                            <button type="button" className="btn-more">+</button>}

                            {
                            productsInCard.quantity > 1 ? <button onClick={() => {
                                dispatch(minesToCards(productsInCard))
                                dispatch(saveTolocaleStorage(JSON.stringify(productsInCard)))
                            }} type="button" className="btn-more">-</button> :

                            <button type="button" className="btn-more">-</button>
                            }
                            </td>
                            <td> 
                            <button onClick={() => {
                                
                                Swal.fire({
                                    title: "Are you sure you want delete this product ?",
                                    showCancelButton: true,
                                    showConfirmButton: true,
                                }).then((resultIs) => {
                                    if(resultIs.isConfirmed) {
                                        dispatch(deletes(productsInCard))
                                        stateCards.filter((productsInCard) => stateCards.id !== productsInCard.id)
                                        dispatch(saveTolocaleStorage(JSON.stringify(stateCards)))
                                    }
                                })
                            }} type="button" className="btn btn-danger">Delete</button>
                            </td>
                            <td>
                            <button onClick={() => {

                                Swal.fire({
                                    title: "you want to confirm this order ?",
                                    showCancelButton: true,
                                    showConfirmButton: true,
                                }).then((resultsAllDelete) => {
                                    if(resultsAllDelete.isConfirmed) {
                                        dispatch(deletes(productsInCard))
                                        stateCards.filter((productsInCard) => stateCards.id !== productsInCard.id)
                                        dispatch(saveTolocaleStorage(JSON.stringify(stateCards)))
                                    }
                                })

                            }} type="button" className="btn btn-success">Buy</button>
                            </td>
                        </tr>
                        </tbody>
                    







            
                //     <div className="container" key={productsInCard.id}>
                //     <div className="card">
                //     <img src={productsInCard.image} className="card-img-top" alt= {productsInCard.title} />
                //     <div className="card-body">
                //         <h5 className="card-title">{productsInCard.title}</h5>
                //         <p className="card-text">{productsInCard.discription}</p>
                //         <p className="card-text">{productsInCard.price * productsInCard.quantity}$</p>

                //     </div>
                //     <ul className="list-group list-group-flush">

                //     {

                //     productsInCard.quantity < 8 ? <button onClick={() => {
                //         dispatch(CardsIncriments(productsInCard))
                //         dispatch(saveTolocaleStorage(JSON.stringify(productsInCard)))
                //     }} type="button" className="btn btn-info">+</button> :

                //     <button type="button" className="btn btn-info">+</button>
                    
                //     }

                //     <p className="list-group-item">Quantity {productsInCard.quantity} </p>

                //     {
                //         productsInCard.quantity > 1 ? <button onClick={() => {
                //             dispatch(minesToCards(productsInCard))
                //             dispatch(saveTolocaleStorage(JSON.stringify(productsInCard)))
                //         }} type="button" className="btn btn-info">-</button> :

                //         <button type="button" className="btn btn-info">-</button>
                //     }
                //         <button onClick={() => {
                //             dispatch(deletes(productsInCard))
                //             stateCards.filter((productsInCard) => stateCards.id !== productsInCard.id)
                //             dispatch(saveTolocaleStorage(JSON.stringify(stateCards)))


                //         }} type="button" className="btn btn-danger">Delete</button>
                //     </ul>
                // </div>
                // </div>

                )
            })

        }

        </table>

        </main>
    )

    }

    export default Cards;