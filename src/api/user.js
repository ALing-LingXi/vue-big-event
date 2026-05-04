import request from "@/utils/request";

 export const regesterUserService = ({username,password,repassword})=>{
 return  request({
  url:"api/reg",
  method:"post",
  data:{
    username,
    password,
    repassword
  }
})
}
export const LoginUserService=(({username,password})=>{
   return request({
    url:'api/login',
    method:'post',
    data:{
      username,
      password
    }
  })
})
