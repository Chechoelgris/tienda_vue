<template>
    <v-container>
        <div class="text-center">
            

            <v-card>
                 
                <v-card-text class="mt-2">
                <v-template>
                    <v-row>
                    <v-col cols="6">
                        <v-img
                        height="500"
                        width="500"
                        class="mt-5"
                        :src="product.photo"
                        ></v-img>
                    </v-col>

                    <v-col cols="6">
                         
                        <h4 class="ma-1 text-h2">{{nameFormated}}</h4>

                        <p class="mt-3 text-button">{{product.code}} </p>

                        <h4 class="mb-3 text-h2">{{priceFormated}} </h4>

                        <p class="ma-3">Disponibles: <strong>{{product.stock}} </strong>Unidades</p>
                        <v-divider
                        ></v-divider>
                        <br>
                        <div class="text-center">
                            <v-btn
                                :disabled="product.stock<=0"
                                color="primary"
                                class="mx-auto text--white"
                                @click="addToCart(product)"
                                >
                                Añadir al carrito
                                <v-icon large
                                    class="text--white ml-3"
                                >
                                    mdi-cart
                                </v-icon>
                            </v-btn>
                        </div>

                        <v-row class="mt-5 text-center">
                            <v-col>
                                <p class="ma-3 text-h2">Descripción </p>

                                <div class="mt-5">
                                    {{product.description}}
                                </div>
                            </v-col>

                            

                        </v-row>
                        
                    </v-col>
                    
                    </v-row>
                    <v-divider
                    ></v-divider>
                    
                    
                    </v-template>
                    
                </v-card-text>

            </v-card>
        </div>

    </v-container>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            product:[],
        }
    },
    created(){
        this.$watch(
        () => this.$route.params,
            (toParams, previousParams) => {
                this.product = this.$route.params.product;
            }
        )
    },
    mounted(){
        
        this.product=this.$route.params.product;
    },
    computed:{
        nameFormated(){
            return this.product.name.substring(0,25);
        },
        priceFormated(){
            return this.product.price.toLocaleString('es-CL', {style: 'currency',currency: 'CLP', minimumFractionDigits: 0}) 
        },
    },
    methods: {
        ...mapActions({
            SET_PRODUCT_TO_CART: 'cart/SET_PRODUCT_TO_CART'
        }),
        addToCart(){
            
            this.SET_PRODUCT_TO_CART([this.product, 1]);
            alert("done");
        }

         
    },
}
</script>