import axios from 'axios'

export function get (url) {
  const headers = { 'Authorization': 'whatever-you-want' }
  return axios({
    method: 'get',
    url,
    headers
  })
}

export function post (url, data) {
  const headers = { 'Authorization': 'whatever-you-want' }
  return axios({
    method: 'post',
    url,
    data,
    headers
  })
}

export function put (url, data) {
  const headers = { 'Authorization': 'whatever-you-want' }
  return axios({
    method: 'put',
    url,
    data,
    headers
  })
}

export function deleteData (url, data) {
  const headers = { 'Authorization': 'whatever-you-want' }
  return axios({
    method: 'delete',
    url,
    ...data,
    headers
  })
}

