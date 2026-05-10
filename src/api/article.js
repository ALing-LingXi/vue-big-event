import request from "@/utils/request";

export const getArticle = () => {
  return request({
    url: "/my/cate/list"
  })
}

export const addArticle = (data) => {
  return request.post("/my/cate/add", data)
}

export const putArticle = (data) => {
  return request.put("/my/cate/info", data)
}

export const delteArticle = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
export const articleManage = () => {
  return request.get('/my/cate/list')
}
// 文章管理接口
export const getBook = (params) => {
  return request.get('/my/article/list', {
    params
  })
}
export const postArticle = (data) => {
  return request.post("/my/article/add", data)
}

export const getInfo = (id) => {
  return request.get("/my/article/info", {
    params: {
      id
    }
  })
}
export const deleteArticle = (id) => {
  return request.delete("/my/article/info", {
    params: {
      id
    }
  })
}
