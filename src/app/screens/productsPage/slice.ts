import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../lib/types/screen";



const initialState: ProductPageState = {
    chosenProduct: null,
    products: [],
};

const productPageSlice = createSlice ({
    name:"productsPage"
,
initialState,
reducers: {
    setChosenProduct: (state, action) => {
        state.chosenProduct =action.payload;
    },
    setProducts: (state, action) => {
        state.products = action.payload;
    }
},
});


export const {setChosenProduct, setProducts} =
productPageSlice.actions;


const  ProductsPageReducer = productPageSlice.reducer;
export default ProductsPageReducer;