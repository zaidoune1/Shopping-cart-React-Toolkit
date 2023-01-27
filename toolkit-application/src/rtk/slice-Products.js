import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const prosuctsSlice = createAsyncThunk("prosuctsSlice/fetchProducts", async() => {

    const fetchProducts = await fetch('https://fakestoreapi.com/products');

    const fetchProductsJson = await fetchProducts.json();

    return fetchProductsJson;
});

export const allDataSlice = createSlice({

    initialState : [],
    name : "allDataSlice",
    isLoading : false,

    reducers: {},

    extraReducers: (builder) => {

        // [prosuctsSlice.pending] : (state) => {
        //     state.isLoading = true;
        // },

        // [prosuctsSlice.fulfilled] : (state, action) => {

        //     state.isLoading = false
        //     return action.payload;
        // },

        // [prosuctsSlice.rejected] : (state) => {

        //     state.isLoading = false
        // },

        builder.addCase(prosuctsSlice.fulfilled, (state, action) => {

            return action.payload;

        })

    }

})

export default allDataSlice.reducer;
