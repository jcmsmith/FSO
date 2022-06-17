import { useState, useEffect } from "react"
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
        axios
            .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            .then((res) => {
                setCountry(res.data[0])
            })
            .catch((err) => {
                console.log('error', err)
                setCountry(null)
            })
    }, [name])
  
    return country
}