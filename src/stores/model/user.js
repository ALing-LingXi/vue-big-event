import { defineStore } from "pinia";
import { ref } from "vue";
import { getBasic } from "@/api/user";
export const useUserStore = defineStore("userStore",()=>{
  const token = ref("")
  const setToken = (newValue)=>{
    token.value = newValue
  }
  const removeToken = ()=>{
    token.value = ""
  }
  const basicMessage = ref({})
  const Basic = async ()=>{
   const message = await getBasic()
   basicMessage.value = message.data
  }
  const setBasic = (value)=>{
    basicMessage.value=value
  }
  return {token,setToken,removeToken,basicMessage,Basic,setBasic}
},{
  persist:true
})
