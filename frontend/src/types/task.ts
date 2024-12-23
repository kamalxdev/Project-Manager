


export interface itask {
    id:string
    title: string,
    description: string,
    status : 'PENDING'| 'COMPLETED',
    createdAt:string,
    completedAt:string
}