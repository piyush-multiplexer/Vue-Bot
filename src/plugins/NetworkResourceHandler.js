import axios from 'axios'

function NetworkCommunicator (method, url, loading, postData, headers) {
  if (method === 'GET') {
    return axios.get(url).then(response => {
      return response.data
    })
  } else if (method === 'POST') {
    return axios.post(url, postData).then(response => {
      return response.data
    })
  } else if (method === 'PUT') {
    return axios.put(url, postData).then(response => {
      return response.data
    })
  }
}

export default NetworkCommunicator
