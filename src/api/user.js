import request from "@/utils/request";

export const regesterUserService = ({ username, password, repassword }) => {
  return request({
    url: "api/reg",
    method: "post",
    data: {
      username,
      password,
      repassword
    }
  })
}
export const LoginUserService = (({ username, password }) => {
  return request({
    url: 'api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
})
export const getBasic = () => {
  return request.get("/my/userinfo")
}

export const updateUserInfo = (data) => {
  return request.put("/my/userinfo", data)
}
export const updateAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}
export const updateAvatarPassword =(data)=>{
  return request.patch("/my/updatepwd",data)
}
