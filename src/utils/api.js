import axios from 'axios'

import { API_URL, API_PORT } from '../config'

export function get (action) {
  const url = `http://${API_URL}:${API_PORT}/${action}`
  const headers = { 'Authorization': 'whatever-you-want' }
  return axios({
    url,
    method: 'get',
    headers
  })
}

export function post (action, data) {
  const headers = { 'Authorization': 'whatever-you-want' }
  const url = `http://${API_URL}:${API_PORT}/${action}`
  return axios({
    method: 'post',
    url,
    data,
    headers
  })
}

export function put (action, data) {
  const headers = { 'Authorization': 'whatever-you-want' }
  const url = `http://${API_URL}:${API_PORT}${action}`
  return axios({
    method: 'put',
    url,
    data,
    headers
  })
}

export function deleteData (action, data) {
  const headers = { 'Authorization': 'whatever-you-want' }
  const url = `http://${API_URL}:${API_PORT}/${action}`
  return axios({
    method: 'delete',
    url,
    ...data,
    headers
  })
}

