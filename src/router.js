import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/Index'),
      children:[
        {
          name: 'Principal',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          path: "/productos",
          name: 'Productos',
          component: () => import('@/views/dashboard/products/IndexProductsComponent'),

          children:[
            {
              path: "/productos/categoria/:id",
              name: 'Categoria',

            },
            
          ]
        },
        {
          
            path: "/productos/:id",
            name: 'Producto',
            component: () => import('@/views/dashboard/products/ShowIndividualProductComponent'),

          
        },
        {
          path: "/carrito",
          name: "Carrito",
          component: () => import('@/views/dashboard/cart/CartComponent'),

        }
         
      ]
    },

    
  ],
})
 