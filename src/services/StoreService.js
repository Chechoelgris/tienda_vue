import ApiStore from '@/services/Api'

export default {
 
  getProducts(){
    return ApiStore().get('/product');
  },

  getProductCategories(){
    return  ApiStore().get('/product-category');
  },

  getProductCategoryById(id){
    return  ApiStore().get('/product-category/'+id);
  },

  getRegions(){
    return ApiStore().get('/region');
  },

  getCounty(){
    return ApiStore().get('/county');
  },

  getPurchase(){
    return ApiStore().get('/purchase');
  },

  getPayment(){
    return ApiStore().get('/payment');
  },

   

  
}
