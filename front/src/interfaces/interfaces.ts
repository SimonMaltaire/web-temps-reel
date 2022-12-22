export interface Request {
    user: User
    status: string
    id: string
    createdAt: string
    updatedAt: string
}

export interface User {
    id: string
    username: string
    email: string
    createdAt: string
    updatedAt: string
    isAdmin: boolean
    isAvailable: boolean
}