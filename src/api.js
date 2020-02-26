import axios from 'axios'
import keystore from '../keystore.json'

const ajax = axios.create({
  baseURL: "https://api.mixin.one"
})


ajax.interceptors.request.use(config => {
  let vm = window._vm
  let token = window.localStorage.getItem("token")
  if (!token) {
    setTimeout(() => {
      vm.to_auth();
    }, 100)
  }
  config.headers.Authorization = "Bearer " + token
  return config
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