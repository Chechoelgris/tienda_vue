<template>
    <v-container fluid
        >
        <div >

            <v-row>
                <v-col
                    v-for="product in filtered" v-bind:key="product.id"
                >
                            <product-card-component :product="product"/>
                </v-col>
                
            </v-row>
            <v-row v-if="filtered.length>0">
                <v-col>
                    
                    <div class="text-center">
                        <v-pagination
                        v-model="page"
                        :length="this.paginationLength"
                        :total-visible="this.total"
                        ></v-pagination>
                    </div>

                    
                </v-col>
                    
                </v-row>

        </div>
         
        
        
    </v-container>
     
</template>

<script>
import ProductService from '@/services/ProductService'

export default {
    data() {
        return {
            products:[],
            filtered:[],
            page: 1,
            total:4,
            pages:[],
        }
    },
    created() {
        this.$watch(
        () => this.$route.params,
            (toParams, previousParams) => {
                this.filtered=[];
 
                this.getProducts();

            }
        )
  
        
    },
    mounted() {
        this.filtered=[];
        this.getProducts();
        
    },
    methods: {
        async getProducts(){
            try {
                
            
                const response = await ProductService.getProducts();
                this.products=response.data;
            
                this.products.forEach(element => {

                    //si es 1 (alimentos, solo debemos filtrar la categoria alimentos)
                    //si es 2 (juguetes, solo debemos filtrar la categoria juguetes)
                    //si es 3 (gatos, solo debemos filtrar el ATRIBUTO gato (2))
                    //si es 4 (perros, solo debemos filtrar el ATRIBUTO gato(3))
                    //si es 5 (medicamentos, solo debemos filtrar la categoria medicamentos)
                            
                    console.log("id por params en ruta: {"+this.$route.params.id + "}");
                    switch (this.$route.params.id) {
                        case 3:

                            var match = false;

                            element.attributes.forEach(attribute => {
                                if (attribute.id==2) { //gatos
                                    match=true;
                                }
                            });
                            if (match) {
                                this.filtered.push(element);
                                match=false;
                            }
                            
                            break;
                        case 4:
                            var match = false;

                            element.attributes.forEach(attribute => {
                                if (attribute.id==3) { //perros
                                    match=true;
                                }
                            });
                            if (match) {
                                this.filtered.push(element);
                                match=false;
                            }
                            break;
                    
                        default:
                            if (element.category.id==this.$route.params.id) {
                                this.filtered.push(element);
                            }

                            break;
                    }
                });

            } catch (error) {
                
            }
        },
        paginate(products){
            let page = this.page;
            let perPage = this.total;
            let from = (page *perPage)-perPage
            let to = (page*perPage);
            return products.slice(from, to); 
        }
    },
    components: {
      ProductCardComponent: () => import('@/views/dashboard/products/ProductComponent'),
    },
    computed:{
        paginationLength(){
            return Math.ceil(this.filtered.length / this.total);
        },
        displayedProducts(){
            return this.paginate(this.filtered);
        },
        haveItems(){
            return this.filtered.length>0
        }
    }
}
</script>