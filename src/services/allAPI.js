import { commonAPI } from "./commonAPI";

const apiUrl = import.meta.env.VITE_API_URL;

export const register = async (reqBody) => {
    return await commonAPI('POST', `${apiUrl}/api/user/register`, reqBody)
}

export const login = async (reqBody) => {
    return await commonAPI('POST', `${apiUrl}/api/user/login`, reqBody)
}

export const verifySignupOtp = async (reqBody) => {
    return await commonAPI('POST', `${apiUrl}/api/user/verify-signup-otp`, reqBody)
}

export const verifyOtp = async (reqBody) => {
    return await commonAPI('POST', `${apiUrl}/api/user/verify-otp`, reqBody)
}

export const getUsers = async (page, search, reqHeader) => {
    return await commonAPI('GET', `${apiUrl}/api/admin/users?page=${page}&search=${search}`, "", reqHeader)
}

export const getBlockedUsers = async (page, search, reqHeader) => {
    return await commonAPI('GET', `${apiUrl}/api/admin/users?page=${page}&search=${search}&blocked=true`, "", reqHeader)
}

export const blockUser = async (userId, reqHeader) => {
    return await commonAPI('PUT', `${apiUrl}/api/admin/users/${userId}/block`, {}, reqHeader)
}

export const unblockUser = async (userId, reqHeader) => {
    return await commonAPI('PUT', `${apiUrl}/api/admin/users/${userId}/unblock`, {}, reqHeader)
}

export const deleteUser = async (userId, reqHeader) => {
    return await commonAPI('DELETE', `${apiUrl}/api/admin/users/${userId}`, {}, reqHeader)
}

export const getAdminDashboardStats = async (reqHeader) => {
    return await commonAPI('GET', `${apiUrl}/api/admin/dashboard`, "", reqHeader)
}

export const getAllScans = async (page = 1, reqHeader) => {
    return await commonAPI('GET', `${apiUrl}/api/admin/searches?page=${page}`, "", reqHeader)
}

export const predictURL = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${apiUrl}/api/prediction/predict`, reqBody, reqHeader)
}

export const getUserHistory = async (page = 1, reqHeader) => {
    return await commonAPI('GET', `${apiUrl}/api/user/searches?page=${page}`, "", reqHeader)
}

export const getUserStats = async (reqHeader) => {
    return await commonAPI('GET', `${apiUrl}/api/user/searches/stats`, "", reqHeader)
}