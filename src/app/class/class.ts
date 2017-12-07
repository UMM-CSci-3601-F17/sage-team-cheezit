export interface Class {
    name: string,
    users: {
        [index: string]: {
            nickname: string,
            teacher: boolean
        }
    },
    joincode?: string
}

export interface ClassId extends Class {
    id: string;
}
