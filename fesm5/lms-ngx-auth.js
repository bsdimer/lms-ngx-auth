import { __values } from 'tslib';
import { InjectionToken, Injectable, Inject, ɵɵdefineInjectable, ɵɵinject, NgModule } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var AUTH_CONFIG = new InjectionToken('AuthenticationConfig');
/**
 * @record
 */
function ClientConfig() { }
if (false) {
    /** @type {?} */
    ClientConfig.prototype.name;
    /** @type {?} */
    ClientConfig.prototype.password;
}
/**
 * @record
 */
function AuthenticationConfig() { }
if (false) {
    /** @type {?} */
    AuthenticationConfig.prototype.client;
    /** @type {?} */
    AuthenticationConfig.prototype.loginUrl;
    /** @type {?} */
    AuthenticationConfig.prototype.signUpUrl;
    /** @type {?} */
    AuthenticationConfig.prototype.userInfoUrl;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Session = /** @class */ (function () {
    function Session(token) {
        this.authorities = [];
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
    return Session;
}());
if (false) {
    /** @type {?} */
    Session.prototype.id;
    /** @type {?} */
    Session.prototype.username;
    /** @type {?} */
    Session.prototype.expiresAt;
    /** @type {?} */
    Session.prototype.givenName;
    /** @type {?} */
    Session.prototype.familyName;
    /** @type {?} */
    Session.prototype.phone;
    /** @type {?} */
    Session.prototype.picture;
    /** @type {?} */
    Session.prototype.scope;
    /** @type {?} */
    Session.prototype.email;
    /** @type {?} */
    Session.prototype.emailVerified;
    /** @type {?} */
    Session.prototype.authorities;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LmsNgxAuthService = /** @class */ (function () {
    function LmsNgxAuthService(config, httpClient) {
        this.config = config;
        this.httpClient = httpClient;
        this.tokenName = '@lms/authToken';
        this.jwtHelperService = new JwtHelperService();
        /** @type {?} */
        var session = new Session({});
        if (localStorage.getItem(this.tokenName)) {
            /** @type {?} */
            var token = localStorage.getItem(this.tokenName);
            /** @type {?} */
            var decodedToken = this.jwtHelperService.decodeToken(JSON.parse(token)['accessToken']);
            session = new Session(decodedToken);
        }
        this.currentUserSubject = new BehaviorSubject(session);
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserSubject.next(session);
    }
    Object.defineProperty(LmsNgxAuthService.prototype, "authenticationChange$", {
        get: /**
         * @return {?}
         */
        function () {
            return this.currentUserSubject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LmsNgxAuthService.prototype, "authenticationChangeSimple$", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            return this.currentUserSubject.asObservable().pipe(map((/**
             * @return {?}
             */
            function () { return _this.isAuthenticated(); })));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.getAuthorizationHeader = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = localStorage.getItem(this.tokenName);
        if (token) {
            /** @type {?} */
            var accessToken = JSON.parse(token)['accessToken'];
            return "Bearer " + accessToken;
        }
        return '';
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.isAuthenticated = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = JSON.parse(localStorage.getItem(this.tokenName));
        return token !== null && token !== undefined && !this.jwtHelperService.isTokenExpired(token.accessToken);
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.getSession = /**
     * @return {?}
     */
    function () {
        return this.currentUserSubject.value;
    };
    /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    LmsNgxAuthService.prototype.login = /**
     * @param {?} username
     * @param {?} password
     * @return {?}
     */
    function (username, password) {
        var _this = this;
        localStorage.removeItem(this.tokenName);
        /** @type {?} */
        var headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(this.config.client.name + ":" + this.config.client.password),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        /** @type {?} */
        var credentials = {
            username: username,
            password: password,
            grant_type: 'password',
        };
        return this.httpClient.post(this.config.loginUrl, credentials, { headers: headers })
            .pipe(map((/**
         * @param {?} token
         * @return {?}
         */
        function (token) {
            /** @type {?} */
            var decodedToken = _this.jwtHelperService.decodeToken(token['accessToken']);
            /** @type {?} */
            var session = new Session(decodedToken);
            if (token) {
                localStorage.setItem(_this.tokenName, JSON.stringify(token));
                _this.currentUserSubject.next(session);
            }
            return session;
        })), share());
    };
    /**
     * @param {?} request
     * @return {?}
     */
    LmsNgxAuthService.prototype.signUp = /**
     * @param {?} request
     * @return {?}
     */
    function (request) {
        return this.httpClient.post(this.config.signUpUrl, request);
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.logout = /**
     * @return {?}
     */
    function () {
        localStorage.removeItem(this.tokenName);
        this.currentUserSubject.next(null);
        return of(true);
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.prepareHttpClientAuthHeader = /**
     * @return {?}
     */
    function () {
        return { headers: { 'Authorization': this.getAuthorizationHeader() } };
    };
    /**
     * @return {?}
     */
    LmsNgxAuthService.prototype.whoami = /**
     * @return {?}
     */
    function () {
        return this.httpClient.get('/user/me', this.prepareHttpClientAuthHeader());
    };
    /**
     * @param {?} role
     * @return {?}
     */
    LmsNgxAuthService.prototype.hasRole = /**
     * @param {?} role
     * @return {?}
     */
    function (role) {
        var e_1, _a;
        try {
            for (var _b = __values(this.getSession().authorities), _c = _b.next(); !_c.done; _c = _b.next()) {
                var ra = _c.value;
                if (ra.role === role && ra.client === this.config.client.name) {
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    LmsNgxAuthService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    LmsNgxAuthService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [AUTH_CONFIG,] }] },
        { type: HttpClient }
    ]; };
    /** @nocollapse */ LmsNgxAuthService.ngInjectableDef = ɵɵdefineInjectable({ factory: function LmsNgxAuthService_Factory() { return new LmsNgxAuthService(ɵɵinject(AUTH_CONFIG), ɵɵinject(HttpClient)); }, token: LmsNgxAuthService, providedIn: "root" });
    return LmsNgxAuthService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    LmsNgxAuthService.prototype.currentUserSubject;
    /** @type {?} */
    LmsNgxAuthService.prototype.currentUser;
    /**
     * @type {?}
     * @private
     */
    LmsNgxAuthService.prototype.tokenName;
    /**
     * @type {?}
     * @private
     */
    LmsNgxAuthService.prototype.jwtHelperService;
    /** @type {?} */
    LmsNgxAuthService.prototype.config;
    /** @type {?} */
    LmsNgxAuthService.prototype.httpClient;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LmsNgxAuthModule = /** @class */ (function () {
    function LmsNgxAuthModule() {
    }
    /*constructor(@Optional() @SkipSelf() parentModule: LmsNgxAuthModule) {
        throw new Error(`LmsNgxAuthModule has already been loaded. Import LmsNgxAuthModule modules in the AppModule only.`);
    }*/
    /*constructor(@Optional() @SkipSelf() parentModule: LmsNgxAuthModule) {
            throw new Error(`LmsNgxAuthModule has already been loaded. Import LmsNgxAuthModule modules in the AppModule only.`);
        }*/
    /**
     * @param {?} config
     * @return {?}
     */
    LmsNgxAuthModule.forRoot = /*constructor(@Optional() @SkipSelf() parentModule: LmsNgxAuthModule) {
            throw new Error(`LmsNgxAuthModule has already been loaded. Import LmsNgxAuthModule modules in the AppModule only.`);
        }*/
    /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return (/** @type {?} */ ({
            ngModule: LmsNgxAuthModule,
            providers: [
                LmsNgxAuthService,
                {
                    provide: AUTH_CONFIG,
                    useValue: config,
                },
            ],
        }));
    };
    LmsNgxAuthModule.decorators = [
        { type: NgModule }
    ];
    return LmsNgxAuthModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UserEntityProperty = /** @class */ (function () {
    function UserEntityProperty() {
    }
    return UserEntityProperty;
}());
if (false) {
    /** @type {?} */
    UserEntityProperty.prototype.id;
    /** @type {?} */
    UserEntityProperty.prototype.key;
    /** @type {?} */
    UserEntityProperty.prototype.value;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SignUpRequest = /** @class */ (function () {
    function SignUpRequest() {
        this.properties = {};
    }
    return SignUpRequest;
}());
if (false) {
    /** @type {?} */
    SignUpRequest.prototype.firstName;
    /** @type {?} */
    SignUpRequest.prototype.lastName;
    /** @type {?} */
    SignUpRequest.prototype.email;
    /** @type {?} */
    SignUpRequest.prototype.phone;
    /** @type {?} */
    SignUpRequest.prototype.username;
    /** @type {?} */
    SignUpRequest.prototype.password;
    /** @type {?} */
    SignUpRequest.prototype.properties;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    return UserEntity;
}());
if (false) {
    /** @type {?} */
    UserEntity.prototype.authorities;
    /** @type {?} */
    UserEntity.prototype.email;
    /** @type {?} */
    UserEntity.prototype.emailVerified;
    /** @type {?} */
    UserEntity.prototype.enabled;
    /** @type {?} */
    UserEntity.prototype.firstName;
    /** @type {?} */
    UserEntity.prototype.password;
    /** @type {?} */
    UserEntity.prototype.id;
    /** @type {?} */
    UserEntity.prototype.imageUrl;
    /** @type {?} */
    UserEntity.prototype.lastName;
    /** @type {?} */
    UserEntity.prototype.phone;
    /** @type {?} */
    UserEntity.prototype.properties;
    /** @type {?} */
    UserEntity.prototype.provider;
    /** @type {?} */
    UserEntity.prototype.providerId;
    /** @type {?} */
    UserEntity.prototype.username;
    /** @type {?} */
    UserEntity.prototype.acknowledged;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RoleEntity = /** @class */ (function () {
    function RoleEntity() {
    }
    return RoleEntity;
}());
if (false) {
    /** @type {?} */
    RoleEntity.prototype.id;
    /** @type {?} */
    RoleEntity.prototype.authority;
    /** @type {?} */
    RoleEntity.prototype.client;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AUTH_CONFIG, LmsNgxAuthModule, LmsNgxAuthService, RoleEntity, Session, SignUpRequest, UserEntity, UserEntityProperty };
//# sourceMappingURL=lms-ngx-auth.js.map
