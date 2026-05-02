import { defineStore } from "pinia";
import { ref } from "vue";

export const useCountStore = defineStore("countStore",()=>{
  const count = ref(100)
  const add = (value)=>{
    count.value+=value
  }
  return {count,add}
})