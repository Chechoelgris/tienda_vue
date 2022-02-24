'use strict'
export  default  {
    namespaced:true,
    state:{
        products:[],
        quantity:0,
        total:0,
    },
    actions:{
        SET_PRODUCT_TO_CART(state, payload){

            var productsInCar = state.getters.GET_PRODUCTS;
            var foundIndex = state.getters.GET_PRODUCTS.findIndex(x => x[0].id == payload[0].id)
            if (payload[0].stock>0) {
                
                if (foundIndex<0) {
                    state.commit('SET_PRODUCTS', payload)
                }else{
                    var filteredProduct = productsInCar[foundIndex];

                    console.log("filtrado: ");
                    console.log(filteredProduct);

                    filteredProduct[1] = filteredProduct[1] + payload[1];

                    console.log("actualizado: ");
                    console.log(filteredProduct);

                    productsInCar[foundIndex] = filteredProduct;

                    console.log("nuevo carrito: ");
                    console.log(productsInCar);
                    state.commit('UPDATE_PRODUCTS', productsInCar);
                }
                
                state.commit('SET_QUANTITY', payload[1])
            }

            var acu = 0;
            productsInCar = state.getters.GET_PRODUCTS;
            productsInCar.forEach(element => {
                var total= element[0].price*element[1];
                acu=acu+total;
            });

            state.commit('SET_TOTAL', acu);

        },
         
    },
    mutations:{
        SET_QUANTITY (state, payload) {
            state.quantity = state.quantity+payload
        },
        
        SET_TOTAL (state, payload) {
            state.total = payload
        },
        SET_PRODUCTS (state, payload) {
            state.products.push(payload);
        },
        UPDATE_PRODUCTS(state, payload){
            state.products = payload
        },
        DELETE_PRODUCTS(state, payload){
            state.products = payload
        },
        

    },
    getters:{
        GET_QUANTITY: state => state.quantity,
        GET_PRODUCTS: state => state.products,
        GET_TOTAL: state=> state.total,
    }
}