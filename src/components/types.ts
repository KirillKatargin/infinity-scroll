/**
 * users object to be used as a blueprint to extract user details
 */
export interface IPerson {
    name?: {
        first?: string,
        last?: string
    },
    email?: string,
    phone?: string,
    picture?: {
        large?: string
        medium?: string
    },
    location?: {
        city?: string
    }
}