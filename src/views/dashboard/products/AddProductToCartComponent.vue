<template>
    <v-container>
        <template>
                <div class="text-center">
                  <v-dialog
                    width="500"
                    v-model="dialog"
                  >
                  <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                         
                        v-bind:disabled="!inStock"
                        v-on="on"
                        absolute
                        color="primary"
                        class="white--text"
                        
                        fab
                        large
                        right
                        top
                      >
                        <v-icon>mdi-cart-plus</v-icon>
                      </v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5 primary white--text pb-3">
                        <h2>Añadir al Carrito</h2>
                      </v-card-title>

                      <v-card-text>
                        <v-template>
                          <v-row>
                            <v-col cols="6">
                              <v-img
                                height="250"
                                max-width="200"
                                :src="product.photo"
                              ></v-img>
                            </v-col>

                            <v-col cols="6">
                              <h4>{{nameFormated}}</h4>
                              <p>{{product.code}} </p>
                              <h4>{{product.price.toLocaleString('es-CL', {style: 'currency',currency: 'CLP', minimumFractionDigits: 0})}} </h4>
                              <p><strong>Cantidad:</strong> {{selection}}</p>
                              <v-divider
                              ></v-divider>
                              <h4>Total {{total}}</h4>
                              <br>
                              <div class="text-center">
                                <v-btn
                                :disabled="selection==0"
                                color="primary"
                                class="mx-auto"
                                @click="addToCart()"
                              >
                                Añadir al carrito
                              </v-btn>
                              </div>
                               
                            </v-col>
                          </v-row>
                        </v-template>
                        <div class="mt-5">
                          {{product.description}}
                        </div>
                         
                      </v-card-text>

                 

                      <v-divider></v-divider>
                    </v-card>
                  </v-dialog>
                </div>
              </template>
    </v-container>
</template>
<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            dialog:false,
        }
    },
    props:{
        product:Object,
        selection: Number,

    },
    computed: {
        inStock(){
            return (this.product.stock>0) ? true : false;
        },
        nameFormated(){
            return this.product.name.substring(0,30);
        },
        total(){
            let total = this.product.price*this.selection;
            return total.toLocaleString('es-CL', {style: 'currency',currency: 'CLP', minimumFractionDigits: 0})
        },
    },
    methods: {
        ...mapActions({
            SET_PRODUCT_TO_CART: 'cart/SET_PRODUCT_TO_CART'
        }),
        addToCart(){
            
            this.SET_PRODUCT_TO_CART([this.product, this.selection]);
            alert("done");
            this.dialog=false;
        },
         
        
        
    },
}
</script>