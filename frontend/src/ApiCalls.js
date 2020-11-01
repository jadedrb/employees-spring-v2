import axios from 'axios';

export const createData = (route, data) => axios.post(route, data).then(res => res.data).catch(() => false)
export const readData = (route) => axios.get(route).then(res => res.data).catch(() => false)
export const updateData = (route, id, employee) => axios.put(route + id, employee).then(res => res.data).catch(() => false)
export const deleteData = (route, id) => axios.delete(route + id).then(res => res.data).catch(() => false)

export const readDataOfId = (route, id) => axios.get(route + id).then(res => res.data).catch(() => false)