<template>
    <v-container fluid>
        <v-row >
            <v-col md="6">
                <v-card>
                    <v-card-title>
                        <v-row class="ma-2">
                                
                                    <h1 class="text-h4">TU CARRITO DE COMPRAS</h1>
                                
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                            <template>
                                <v-simple-table>
                                    <template >
                                    <thead>
                                        <tr>
                                            <th class="text-left font-weight-black">
                                                PRODUCTO
                                            </th>
                                            <th class="text-left font-weight-black">
                                                
                                            </th>
                                            <th class="text-left font-weight-black">
                                                PRECIO UNITARIO
                                            </th>
                                            <th class="text-left font-weight-black">
                                                CANTIDAD
                                            </th>
                                            <th class="text-left font-weight-black">
                                                PRECIO FINAL
                                            </th>
                                            <th></th>
                                                
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                        v-for="product in products"
                                        :key="product[0].name"
                                        >
                                            <td>
                                                <img :src="product[0].photo" alt=""
                                                    width="50"
                                                    height="60"
                                                >
                                            </td>
                                            <td>{{ formatName(product[0].name) }}</td>
                                            <td>{{ formatPrice(product[0].price) }}</td>
                                            <td>{{ product[1] }}</td>
                                            <td>{{ formatPrice(product[0].price*product[1]) }}</td>
                                            <td>
                                                <v-btn
                                                    icon
                                                >
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                            </template>
                            

                    </v-card-text>
                </v-card>

                <v-card  >
                    <v-card-title>
                        <v-row class="ma-2">
                                    <h1 class="text-h4">DATOS DE COMPRA</h1>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                        <v-col cols="12" >
                             
                            <template>
                                <form>
                                    <v-select
                                    label="Seleccione su Región"
                                    v-model="regionSelected"
                                    :items="regions"
                                    :error-messages="regionSelectErrors"
                                    item-text="name"
                                    item-value="id"
                                    required
                                    @change="getCounties()"
                                    @blur="$v.regionSelected.$touch()"
                                    ></v-select>

                                    <v-select
                                    v-show="counties!=[]"
                                    label="Seleccione su Localidad"
                                    v-model="countySelected"
                                    :items="counties"
                                    :error-messages="countySelectErrors"
                                    item-text="name"
                                    item-value="id"
                                    required
                                    @change="$v.countySelected.$touch()"
                                    @blur="$v.countySelected.$touch()"
                                    ></v-select>
                                    
                                </form>
                            </template>
                        </v-col>
                    </v-row>
                    </v-card-text>
                </v-card>
            </v-col>


            <v-col md="6" >
                <v-card  >
                    <v-card-title>
                        <v-row class="ma-2">
                                    <h1 class="text-h4">DATOS PERSONALES</h1>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" >
                                
                                <template>
                                    <form>
                                        <v-col cols="12" class="pa-0">
                                            <v-text-field
                                                v-model="inputName"
                                                :error-messages="inputNameErrors"
                                                :counter="45"
                                                label="Nombre"
                                                required
                                                @input="$v.inputName.$touch()"
                                                @blur="$v.inputName.$touch()"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" class="pa-0">
                                            <v-text-field
                                                v-model="inputCardNumber"
                                                :error-messages="inputCardNumberErrors"
                                                :counter="16"
                                                label="Número de Tarjeta"
                                                required
                                                @input="$v.inputCardNumber.$touch()"
                                                @blur="$v.inputCardNumber.$touch()"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" class="pa-0">
                                            <v-row>
                                                <v-col cols="6"><v-text-field                                         
                                                    v-model="inputCVC"
                                                    :error-messages="inputCVCErrors"
                                                    :counter="3"
                                                    label="CVC"
                                                    required
                                                    @input="$v.inputCVC.$touch()"
                                                    @blur="$v.inputCVC.$touch()"
                                                ></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="inputExp"
                                                        :error-messages="inputExpErrors"
                                                        :counter="5"
                                                        label="MM/AA"
                                                        required
                                                        @input="$v.inputExp.$touch()"
                                                        @blur="$v.inputExp.$touch()"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </form>
                                </template>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card >
                    <v-card-title>
                        <v-row class="ma-2 mb-3">
                                    <h1 class="text-h4">RESUMEN DEL PEDIDO  </h1>
                        </v-row>
                    </v-card-title>
                    <v-card-text >
                        
                            <template >
                                <v-row class="mr-3 ml-3">
                                    <v-col cols="6">
                                        <p class="text-h5 ma-0"
                                        >Subtotal
                                        </p>
                                    </v-col>

                                    <v-col cols="6">
                                        <p class="text-h5 ma-0"
                                        >
                                            {{formatPrice(total)}}
                                        </p>
                                    </v-col>
                                    
                                </v-row>
                                <v-row class="mr-3 ml-3">
                                    <v-col cols="6">
                                        <p class="text-h5 ma-0" 
                                        >
                                            Envío
                                        </p>
                                    </v-col>

                                    <v-col cols="6">
                                        <p
                                        >
                                            0
                                        </p>
                                    </v-col>
                                </v-row>


                                <v-row class="mr-3 ml-3">
                                    <v-col cols="6">
                                        <p class="text-h5 ma-0"
                                        >
                                            Descuentos
                                        </p>
                                    </v-col>

                                    <v-col cols="6">
                                        <p
                                        >
                                            0
                                        </p>
                                    </v-col>
                                </v-row>


                                <v-row class="mr-3 ml-3">
                                    <v-col cols="6">
                                        <p class="text-h5 ma-0"
                                        >
                                            Total
                                        </p>
                                    </v-col>

                                    <v-col cols="6">
                                        <p
                                        >
                                            {{formatPrice(total)}}
                                        </p>
                                    </v-col>
                                </v-row>
                                <v-btn
                                    block
                                    color="primary"
                                    elevation="2"
                                    @click="finish()"
                                    >
                                    Confirmar y Pagar</v-btn>
                            </template>
                        
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AddressService from '@/services/AddressService';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minLength, numeric} from 'vuelidate/lib/validators';

import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
    mixins: [validationMixin],

    validations: {
      regionSelected: { required },
      countySelected: { required },

      inputName: { required, maxLength: maxLength(45) },
      inputCardNumber: { required, maxLength: maxLength(16), minLength: minLength(16), numeric  },
      inputCVC: { required, maxLength: maxLength(3), minLength: minLength(3), numeric  },
      inputExp: { required, maxLength: maxLength(5), minLength: minLength(5)  },
    },
    data: () => ({
        regionSelected:[],
        countySelected:[],

        inputName:'',
        inputCardNumber:'',
        inputCVC:'',
        inputExp:'',


        counties:[],
        regions:[],
       
    }),
    mounted(){
        this.getRegions();
    },
    computed: {
        ...mapGetters({
            products: 'cart/GET_PRODUCTS',
            total: 'cart/GET_TOTAL',
        }),
         
        
        regionSelectErrors () {
            const errors = []
            if (!this.$v.regionSelected.$dirty) return errors
            !this.$v.regionSelected.required && errors.push('Seleccione su Región')
            return errors
        },
        countySelectErrors () {
            const errors = []
            if (!this.$v.countySelected.$dirty) return errors
            !this.$v.countySelected.required && errors.push('Seleccione su Localidad')
            return errors
        },

        inputNameErrors () {
            const errors = []
            if (!this.$v.inputName.$dirty) return errors
            !this.$v.inputName.maxLength && errors.push('El nombre no debe superar los 45 caracteres')
            !this.$v.inputName.required && errors.push('Ingresa tu nombre')
            return errors
        },inputCardNumberErrors () {
            const errors = []
            if (!this.$v.inputCardNumber.$dirty) return errors
            !this.$v.inputCardNumber.numeric && errors.push('Solo acepta números')
            !this.$v.inputCardNumber.minLength && errors.push('El número de tu tarjeta no debe tener menos de 16 caracteres')
            !this.$v.inputCardNumber.maxLength && errors.push('El número de tu tarjeta no debe superar los 16 caracteres')
            !this.$v.inputCardNumber.required && errors.push('Ingresa el número de tu tarjeta')
            return errors
        },inputCVCErrors () {
            const errors = []
            if (!this.$v.inputCVC.$dirty) return errors
            !this.$v.inputCVC.numeric && errors.push('Solo acepta números')
            !this.$v.inputCVC.minLength && errors.push('El dígito CVC no debe tener menos de 3 caracteres')
            !this.$v.inputCVC.maxLength && errors.push('El dígito CVC  debe ser de 3 caracteres')
            !this.$v.inputCVC.required && errors.push('Ingresa los dígitos CVC')
            return errors
        },inputExpErrors () {
            const errors = []
            if (!this.$v.inputExp.$dirty) return errors
            !this.$v.inputExp.minLength && errors.push('La fecha de expiracion no debe tener menos de 5 caracteres incluyendo "/"')
            !this.$v.inputExp.maxLength && errors.push('La fecha de expiracion debe contener 5 caracteres incluyendo "/"')
            !this.$v.inputExp.required && errors.push('Ingresa la fecha de expiracion')
            return errors
        },
        
    },
    methods:{
        formatPrice(value){
            return value.toLocaleString('es-CL', {style: 'currency',currency: 'CLP', minimumFractionDigits: 0}) 
        },
        formatName(value){
            return value.substring(0,25);
        },
        async getRegions(){
            var response = await AddressService.getRegions();
            this.regions=response.data;

        },
        async getCounties(){
            var response = await AddressService.getCounties();
            this.counties = response.data.filter(county => county.region.id==this.regionSelected);
        },
        finish(){
            alert("Su compra ha sido procesada exitosamente!");
            this.$router.replace({ name: 'Principal'})

        }
    }
}
</script>