import { createSlice } from "@reduxjs/toolkit";




export const cardSlice = createSlice({

    initialState : localStorage.getItem("cards") ? JSON.parse(localStorage.getItem("cards")) : [],
    name : "cardSlice",
    reducers: {

        addToCards : (state, action) => {

            const quantityProducts = state.find((product) => product.id === action.payload.id)
        
            if(quantityProducts) {

            quantityProducts.quantity = 1 

            }else {

                const clone = {...action.payload, quantity: 1}

                state.push(clone)

            }

        },

        CardsIncriments : (state, action) => {

            const quantityProducts = state.find((product) => product.id === action.payload.id)

            if(quantityProducts) {

            quantityProducts.quantity += 1 

            }else {

                const clone = {...action.payload, quantity: 1}

                state.push(clone)

            }

        },


        minesToCards : (state, action) => {

            const quantityProducts = state.find((product) => product.id === action.payload.id)

            if(quantityProducts) {

            quantityProducts.quantity -= 1 

            }else {

                const cloneMines = {...action.payload, quantity: 1}

                state.push(cloneMines)

            }

        },


        deletes : (state, action) => {

        return state.filter((product) => product.id !== action.payload.id)

        },


        cleareAll : (state, action) => {

            return [];

        },

        saveTolocaleStorage : (state, action) => {

            window.localStorage.setItem("cards", JSON.stringify(state, action.payload))

        },



    }

})

export const {addToCards, minesToCards, deletes, cleareAll, saveTolocaleStorage, CardsIncriments} = cardSlice.actions;

export default cardSlice.reducer;
