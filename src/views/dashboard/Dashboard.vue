<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
  <!-- Buscador -->
      <template>
        
        <!-- Aqui va el componente que mostrará contenido principal -->


      </template>
  </v-container>
</template>

<script>
import StoreService from '@/services/StoreService'

export default {
    name: 'index',
    data() {
      return {
       


      }
    },
    beforeMount(){
    },

    mounted(){
    },
    methods: {
       
    },
    components:{
      //PrincipalStageList: () => import('@/views/TRAG/ComponentesTrag/StagesListComponent'),
    },
    computed: {
      // userLogged() {
      //   return JSON.parse(TRAGService.getUserLogged());
      // }
    }

}
</script>
