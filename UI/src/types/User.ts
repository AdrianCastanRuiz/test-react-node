export interface User {
    id: number;
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
    emailVerified: boolean;
    dob: string;
    company: {
        name: string,
        department: string
    };
    skills: string[];
}