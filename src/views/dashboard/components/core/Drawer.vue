<template>
  <v-navigation-drawer
    id="core-navigation-drawer" 
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>


    <v-divider class="mb-2" />


    <v-list
      expand
      nav
    >
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="item in filtered" v-bind:key="item.id"
          @click="goToRoute(item)"

        >
        

          <v-list-item-icon>
            <v-icon >
              mdi-shape
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.name">

            </v-list-item-title>
          </v-list-item-content>
      

        </v-list-item>
      </v-list-item-group>
    </v-list>


  </v-navigation-drawer>
</template>

<script>
import CategoryService from '@/services/CategoryService'

  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
        user: Object,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Principal',
          to: '/',
        },
        {
          icon: 'mdi-tools',
          title: 'Inventario',
          to: '/inventario',
        },
        {
          icon: 'mdi-tools',
          title: 'Instrumentos',
          to: '/instrumentos',
        },
        {
          icon: 'mdi-toolbox',
          title: 'Cajas',
          to: '/cajas',
        },
        {
          icon: 'mdi-account',
          title: 'Usuarios',
          to: '/usuarios',
        },
        {
          icon: 'mdi-cube-send',
          title: 'Configuracion',
          to: '/configuracion',
        },
      ],
      filtered:[],

      model: 1,
       

    }),
    beforeMount(){

    },
    mounted(){
      this.getCategories(); 

    },
    computed: {
      

      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.filtered.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
      
    },
    methods: {
      async getCategories(){
        var items = await CategoryService.getProductCategories();
        this.filtered= items.data;
      },
      mapItem (item) {
        return {
          ...item,
          title: this.$t(item.title),
        }
      },

      reorderItems(){
        const array = Array.from(this.items);

         
        return array;
      },
      goToRoute(item){
         
        this.$router.replace({ name: 'Categoria', params: { 'id':item.id  } })
      }
      
       
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
