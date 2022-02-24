<template>
          <v-hover v-slot="{ hover }">
            <v-card
              class="mx-auto "
              color="grey lighten-4 dark"
              max-width="250"
              :elevation="20"
              :loading="loading"
            >
            <template slot="progress">
              <v-progress-linear
                color="secondary"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

              <v-img height="250" :src="product.photo">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out  darken-2 v-card--reveal  white--text"
                    v-bind:class="{ primary: inStock, red: !inStock}"
                    style="height: 100%;"
                  >
                    <strong v-if="inStock">{{product.price.toLocaleString('es-CL', {style: 'currency',currency: 'CLP', minimumFractionDigits: 0})}}</strong>
                    <strong v-else>Agotado</strong>
                  </div>
                </v-expand-transition>
              </v-img>
              <v-card-text class="pt-6" style="position: relative;">
                              
                              
                              
                              
                <add-to-cart-component :product="product"  :selection="selection"></add-to-cart-component>




              
                <h1 class="text-h4 font-light primary--text mb-2 mt-3">
                  <strong>{{nameFormated}}</strong>
                </h1>
                <h1 class="text-h4 font-weight-light primary--text  ">
                  <strong>{{priceFormated}}</strong>
                </h1>
                <p>{{product.stock}} en stock</p>
              </v-card-text>

              <v-card-actions>
                  <v-row class="d-flex ma-0">
                    <v-col class="justify-center" cols="4">
                      <v-btn fab tile color="teal lighten-4" class="text--primary rounded-l-xl" v-bind:disabled="!canReduce"
                        @click="reducir();"
                      >
                        <v-icon >
                          mdi-minus
                        </v-icon>
                      </v-btn>
                    </v-col>

                    <v-col class="justify-center" cols="4">
                      <v-btn elevation="8" fab tile color="primary" :ripple="false">
                        <strong>{{selection}}</strong>
                      </v-btn>
                    </v-col>

                    <v-col class="justify-center" cols="4">
                      <v-btn fab tile color="teal lighten-4" class="text--primary rounded-r-xl" v-bind:disabled="!canAdd"
                        @click="aumentar();"
                      >
                        <v-icon >
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
              </v-card-actions>
            </v-card>
          </v-hover>
          
</template>

<script>
  export default {
    name:'ProductComponent',
    data: () => ({
      loading: false,
      dialog: false,
      selection: 0,

    }),
    mounted(){
        
    },
    methods: {
      reserve () {
        this.loading = true;
        this.dialog=true;
        setTimeout(() => (this.loading = false), 2000)
        if (this.selection==0) {
          this.aumentar();
        }
         
      },
      aumentar(e){
        
         if (this.canAdd) {
           this.selection++;
         }
         

      },
      reducir(){
        if (this.canReduce) {
           this.selection--;
         }

      },
      addToCart(){
        alert("añadiendo: "+this.selection+" elementos al carrito");
      }
    },
    computed: {
      total(){
        let total = this.product.price*this.selection;
        return total.toLocaleString('es-CL', {style: 'currency',currency: 'CLP', minimumFractionDigits: 0})
      },
      inStock(){
        return (this.product.stock>0) ? true : false;
      },
      nameFormated(){
        return this.product.name.substring(0,25);
      },
      priceFormated(){
        return this.product.price.toLocaleString('es-CL', {style: 'currency',currency: 'CLP', minimumFractionDigits: 0}) 
      },
      canReduce(){
        if (this.selection<=0) {
          return false;
        }

        if (this.selection>0) {
          return true;
        }
      },
      canAdd(){
         

        if (this.selection < this.product.stock) {
          return true;
        }else {
          return false;
        }
      },
    },
    props:{
        product:Object,
    },
    components:{
      AddToCartComponent: () => import('@/views/dashboard/products/AddProductToCartComponent')
        

    }
  }
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>
