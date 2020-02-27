import axios from 'axios'
import keystore from '../keystore.json'

const ajax = axios.create({
  baseURL: "https://api.mixin.one"
})


ajax.interceptors.request.use(config => {
  let { _vm } = window
  let token = window.localStorage.getItem("token")
  if (!token) {
    setTimeout(() => {
      _vm.to_auth();
    }, 100)
  }
  config.headers.Authorization = "Bearer " + token
  return config
})

ajax.interceptors.response.use(res => {
  let { data } = res
  let { _vm } = window
  if (data.error) return _vm.to_auth()
  return data.data
})

async function authenticate(code) {
  let { client_id, client_secret } = keystore
  let { data } = await axios({
    method: 'post',
    url: 'https://api.mixin.one/oauth/token',
    data: { code, client_id, client_secret }
  })
  return data
}
export { ajax, authenticate }