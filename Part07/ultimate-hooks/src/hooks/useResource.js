import { useState } from "react"
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const getAll = () => {
        axios
            .get(baseUrl)
            .then((response) => {
                setResources(response.data)
            })
    }
  
    const create = (resource) => {
        axios
            .post(baseUrl, resource)
            .then((response) => {
                setResources(resources.concat(response.data))
            })
            .catch((error) => console.log('error', error))
    }
  
    const service = {
      create,
      getAll
    }
  
    return [
      resources, service
    ]
  }