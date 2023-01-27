import { configureStore } from '@reduxjs/toolkit'
import  allDataSlice  from './slice-Products'
import  cardSlice  from './slice-cards'


export const store = configureStore({

    reducer: {
        data: allDataSlice,
        cards: cardSlice,
    },

})
