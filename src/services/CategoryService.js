import ApiStore from '@/services/Api'

export default {
 
  getProductCategories(){
    return  ApiStore().get('/product-category');
  },

  getProductCategoryById(id){
    return  ApiStore().get('/product-category/'+id);
  },

}
