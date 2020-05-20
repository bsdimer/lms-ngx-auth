export declare class Session {
    constructor(token: Object);
    id: number;
    username: string;
    expiresAt: number;
    givenName: string;
    familyName: string;
    phone: any;
    picture: any;
    scope: any;
    email: string;
    emailVerified: boolean;
    authorities: {
        role: string;
        client: string;
    }[];
}
