import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
const initialState = {
    cartItems: localStorage.getItem("cartItemsStorage")? JSON.parse(localStorage.getItem("cartItemsStorage")): [],
    cartTotalQuantity: localStorage.getItem("cartQTyStorage")? JSON.parse(localStorage.getItem("cartQTyStorage")): 0,
    cartTotalAmount: 0
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart:(state,action)=>{
            const itemIndex = state.cartItems.findIndex((item)=>item.id === action.payload.id);
            if(itemIndex>=0){
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`increased ${state.cartItems[itemIndex].title} cart quantity`, {position: "bottom-left"});
            }
            else {
                const tempProduct ={...action.payload, cartQuantity:1}
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.title} added to cart`, {position: "bottom-left"});
            }
            localStorage.setItem("cartItemsStorage", JSON.stringify(state.cartItems));
        },
        removeCart: (state, action)=>{
            const nextCartItems = state.cartItems.filter((item)=>item.id!==action.payload.id);
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItemsStorage", JSON.stringify(state.cartItems));
            toast.error(`${action.payload.title}  removed from cart`, {position: "bottom-left"});
        },
        decrease: (state, action)=>{
            const itemIndex = state.cartItems.findIndex((item)=>item.id === action.payload.id);
            if(state.cartItems[itemIndex].cartQuantity>1){
                state.cartItems[itemIndex].cartQuantity -= 1;
                localStorage.setItem("cartItemsStorage", JSON.stringify(state.cartItems));
                toast.info(`decreased ${state.cartItems[itemIndex].title} cart quantity`, {position: "bottom-left"});
            }
            else if(state.cartItems[itemIndex].cartQuantity===1){
                const nextCartItems = state.cartItems.filter((item)=>item.id!==action.payload.id);
                state.cartItems = nextCartItems;
                localStorage.setItem("cartItemsStorage", JSON.stringify(state.cartItems));
                toast.error(`${action.payload.title}  removed from cart`, {position: "bottom-left"});
            }
        },
        clearCart: (state, action)=>{
            state.cartItems = [];
            localStorage.setItem("cartItemsStorage", JSON.stringify(state.cartItems));
            toast.error(`no items in the cart`, {position: "bottom-left"});
        },
        getTotal: (state, action)=>{
            let {total, quantity} = state.cartItems.reduce(
                (cartTotal, cartItem)=>{
                    const {price, cartQuantity} = cartItem;
                    const itemTotal = price * cartQuantity;
                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;
                    return cartTotal;
                },
                {total:0, quantity:0}
            );
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
            localStorage.setItem("cartQTyStorage", JSON.stringify(state.cartTotalQuantity));
        }
    }
});

export const {addToCart, removeCart, decrease, clearCart, getTotal} = cartSlice.actions;
export default cartSlice.reducer;