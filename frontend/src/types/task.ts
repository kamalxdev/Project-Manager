


export interface itask {
    id:string
    title: string,
    description: string,
    status : 'PENDING'| 'COMPLETED',
    createdAt:Date,
    completedAt:Date
}