/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class Session {
    /**
     * @param {?} token
     */
    constructor(token) {
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xtcy1uZ3gtYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9zZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxNQUFNLE9BQU8sT0FBTzs7OztJQUVoQixZQUFZLEtBQWE7UUF1QnpCLGdCQUFXLEdBQXFDLEVBQUUsQ0FBQztRQXRCL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBYUo7OztJQVhHLHFCQUFXOztJQUNYLDJCQUFpQjs7SUFDakIsNEJBQWtCOztJQUNsQiw0QkFBa0I7O0lBQ2xCLDZCQUFtQjs7SUFDbkIsd0JBQVc7O0lBQ1gsMEJBQWE7O0lBQ2Isd0JBQVc7O0lBQ1gsd0JBQWM7O0lBQ2QsZ0NBQXVCOztJQUN2Qiw4QkFBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2Vzc2lvbiB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0b2tlbjogT2JqZWN0KSB7XG4gICAgICAgIHRoaXMuZW1haWwgPSB0b2tlblsnZW1haWwnXTtcbiAgICAgICAgdGhpcy5lbWFpbFZlcmlmaWVkID0gdG9rZW5bJ2VtYWlsX3ZlcmlmaWVkJ107XG4gICAgICAgIHRoaXMuZXhwaXJlc0F0ID0gdG9rZW5bJ2V4cCddO1xuICAgICAgICB0aGlzLmdpdmVuTmFtZSA9IHRva2VuWydnaXZlbl9uYW1lJ107XG4gICAgICAgIHRoaXMuZmFtaWx5TmFtZSA9IHRva2VuWydmYW1pbHlfbmFtZSddO1xuICAgICAgICB0aGlzLnBob25lID0gdG9rZW5bJ3Bob25lX251bWJlciddO1xuICAgICAgICB0aGlzLnBpY3R1cmUgPSB0b2tlblsncGljdHVyZSddO1xuICAgICAgICB0aGlzLnNjb3BlID0gdG9rZW5bJ3Njb3BlJ107XG4gICAgICAgIHRoaXMuaWQgPSB0b2tlblsnc3ViJ107XG4gICAgICAgIHRoaXMuYXV0aG9yaXRpZXMgPSB0b2tlblsncm9sZXMnXTtcbiAgICB9XG5cbiAgICBpZDogbnVtYmVyO1xuICAgIHVzZXJuYW1lOiBzdHJpbmc7XG4gICAgZXhwaXJlc0F0OiBudW1iZXI7XG4gICAgZ2l2ZW5OYW1lOiBzdHJpbmc7XG4gICAgZmFtaWx5TmFtZTogc3RyaW5nO1xuICAgIHBob25lOiBhbnk7XG4gICAgcGljdHVyZTogYW55O1xuICAgIHNjb3BlOiBhbnk7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBlbWFpbFZlcmlmaWVkOiBib29sZWFuO1xuICAgIGF1dGhvcml0aWVzOiB7cm9sZTogc3RyaW5nLCBjbGllbnQ6IHN0cmluZ31bXSA9IFtdO1xufVxuIl19