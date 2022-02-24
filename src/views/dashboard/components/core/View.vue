<template>
  <v-content>
     
    <v-breadcrumbs
  divider=">"
></v-breadcrumbs>
    <router-view />


  </v-content>
</template>

<script>
  export default {
    name: 'DashboardCoreView',
    data: () => ({
     

    }),
   
    created(){
    },
    methods: {
       
    },
     
  }
</script>
