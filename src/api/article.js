import request from "@/utils/request";

export const getArticle = ()=>{
 return request({
  url:"/my/cate/list"
})
}

export const addArticle = (data)=>{
  return request.post("/my/cate/add",data)
}

export const putArticle = (data)=>{
  return request.put("/my/cate/info",data)
}

export const delteArticle = (id)=>{
  return request.delete('/my/cate/del',{
    params:{
      id
    }
  })
}

// 文章管理接口
export const getBook =(params)=>{
  return request.get('/my/article/list',{
    params
  })
}
