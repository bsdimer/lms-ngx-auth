export class Session {

    constructor(token: Object) {
        this.email = token['email'];
        this.emailVerified = token['email_verified'];
        this.expiresAt = token['exp'];
        this.givenName = token['given_name'];
        this.familyName = token['family_name'];
        this.phone = token['phone_number'];
        this.picture = token['picture'];
        this.scope = token['scope'];
        this.id = token['sub'];
        this.authorities = token['roles'];
    }

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
    authorities: {role: string, client: string}[] = [];
}
