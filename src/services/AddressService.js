import ApiStore from '@/services/Api'

export default {
 
  getCounties(){
    return  ApiStore().get('/county');
  },

  getRegions(id){
    return  ApiStore().get('/region');
  },

}
