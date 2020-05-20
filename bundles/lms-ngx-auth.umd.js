(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common/http'), require('rxjs/operators'), require('@auth0/angular-jwt')) :
    typeof define === 'function' && define.amd ? define('lms-ngx-auth', ['exports', '@angular/core', 'rxjs', '@angular/common/http', 'rxjs/operators', '@auth0/angular-jwt'], factory) :
    (global = global || self, factory(global['lms-ngx-auth'] = {}, global.ng.core, global.rxjs, global.ng.common.http, global.rxjs.operators, global.angularJwt));
}(this, (function (exports, core, rxjs, http, operators, angularJwt) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var AUTH_CONFIG = new core.InjectionToken('AuthenticationConfig');
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
            this.jwtHelperService = new angularJwt.JwtHelperService();
            /** @type {?} */
            var session = new Session({});
            if (localStorage.getItem(this.tokenName)) {
                /** @type {?} */
                var token = localStorage.getItem(this.tokenName);
                /** @type {?} */
                var decodedToken = this.jwtHelperService.decodeToken(JSON.parse(token)['accessToken']);
                session = new Session(decodedToken);
            }
            this.currentUserSubject = new rxjs.BehaviorSubject(session);
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
                return this.currentUserSubject.asObservable().pipe(operators.map((/**
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
            var headers = new http.HttpHeaders({
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
                .pipe(operators.map((/**
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
            })), operators.share());
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
            return rxjs.of(true);
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
            { type: core.Injectable, args: [{
                        providedIn: 'root',
                    },] }
        ];
        /** @nocollapse */
        LmsNgxAuthService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [AUTH_CONFIG,] }] },
            { type: http.HttpClient }
        ]; };
        /** @nocollapse */ LmsNgxAuthService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function LmsNgxAuthService_Factory() { return new LmsNgxAuthService(core.ɵɵinject(AUTH_CONFIG), core.ɵɵinject(http.HttpClient)); }, token: LmsNgxAuthService, providedIn: "root" });
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
            { type: core.NgModule }
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

    exports.AUTH_CONFIG = AUTH_CONFIG;
    exports.LmsNgxAuthModule = LmsNgxAuthModule;
    exports.LmsNgxAuthService = LmsNgxAuthService;
    exports.RoleEntity = RoleEntity;
    exports.Session = Session;
    exports.SignUpRequest = SignUpRequest;
    exports.UserEntity = UserEntity;
    exports.UserEntityProperty = UserEntityProperty;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lms-ngx-auth.umd.js.map
