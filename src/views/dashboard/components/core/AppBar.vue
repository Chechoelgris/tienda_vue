<template >

  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="85"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>
    <v-spacer />

    <v-tooltip bottom > 
      <template v-slot:activator="{  attrs }">
        <v-autocomplete
        class="mt-5"
         
          v-bind="attrs"
          label="Buscador de Productos"
          item-text="name"
          :items="products"
          :loading="loading"
          clearable
          filled
          @click="getData()"

        >
          <template v-slot:item="{ item }">
            <v-list-item  @click="goToProduct(item)">
              <v-img :src="item.photo" max-width="50" height="50" class="mr-2"></v-img> 
              <p class="ml-2">{{item.name.substring(0,30)}}</p>
              <v-spacer></v-spacer>
              <p>{{item.price.toLocaleString('es-CL', {style: 'currency',currency: 'CLP', minimumFractionDigits: 0})}}</p>
            </v-list-item>
          </template>


        </v-autocomplete>
        

       
     
      </template>
    </v-tooltip>


    <v-tooltip bottom >
       
      <template v-slot:activator="{  attrs }">
         <v-btn
          text
          @click="openCart()"
         >
            <v-badge
              :content="quantity"
              :value="quantity"
              overlap

              v-bind="attrs"

            >
              <v-icon large
                color="primary"

              >
                mdi-cart
              </v-icon>
            </v-badge>
         </v-btn>
        

      </template>
    </v-tooltip>
    
  </v-app-bar>
</template>

<script>

 

  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations, mapGetters } from 'vuex'

  import ProductService from '@/services/ProductService'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      products:[], //estos productos se cargan cuando se utiliza el buscador
      loading: false,
    }),

    computed: {
      ...mapState(['drawer']),

      ...mapGetters({
        productsInCart: 'cart/GET_PRODUCTS',
        quantity: 'cart/GET_QUANTITY',
        total: 'cart/GET_TOTAL',
      }),

      itemsInCart(){
          return this.products.length;
      },
      loadingIcon(){
        if (this.loading) {
          return "mdi-plus"
        }else{
          return ''
        }
      },
       
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
       

      async search(){
        this.loading=true;
        var response = await ProductService.getProducts();
        this.products=response.data;
        this.loading=false;
      },
      async getData(){
        this.loading=true;
        var response = await ProductService.getProducts();
        this.products=response.data;
        this.loading=false;
      },
      openCart(){
        this.$router.replace({ name: 'Carrito', params:{ products: this.products}})
      },
      goToProduct(product){
        this.$router.replace({ name: 'Producto', params:{ id:product.id, product: product}})

      }
      
    },
  }
</script>
