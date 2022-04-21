import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const getAllEntries = () => {
    console.log('getting all entries')
    const request = axios.get(`${baseUrl}`)
    return request.then((response) => response.data)
}

const addEntry = (entry) => {
    console.log('adding entry', entry)
    const request = axios.post(`${baseUrl}`, entry)
    return request.then((response) => response.data)
}

const updateEntry = (entry) => {
    console.log(`updating entry ${entry.id} with`, entry)
    const request = axios.put(`${baseUrl}/${entry.id}`, entry)
    return request.then((response) => response.data)
}

const deleteEntry = (id) => {
    console.log(`deleting entry ${id}`)
    const request = axios.delete(`${baseUrl}/${id}`, id)
    return request.then(response => response.data)
}

export default { getAllEntries, addEntry, updateEntry, deleteEntry }