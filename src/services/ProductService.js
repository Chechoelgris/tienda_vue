import ApiStore from '@/services/Api'

export default {
 
  getProducts(){
    return ApiStore().get('/product');
  },

}
