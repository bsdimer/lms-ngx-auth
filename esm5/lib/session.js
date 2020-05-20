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
export { Session };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2xtcy1uZ3gtYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9zZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtJQUVJLGlCQUFZLEtBQWE7UUF1QnpCLGdCQUFXLEdBQXFDLEVBQUUsQ0FBQztRQXRCL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBYUwsY0FBQztBQUFELENBQUMsQUExQkQsSUEwQkM7Ozs7SUFYRyxxQkFBVzs7SUFDWCwyQkFBaUI7O0lBQ2pCLDRCQUFrQjs7SUFDbEIsNEJBQWtCOztJQUNsQiw2QkFBbUI7O0lBQ25CLHdCQUFXOztJQUNYLDBCQUFhOztJQUNiLHdCQUFXOztJQUNYLHdCQUFjOztJQUNkLGdDQUF1Qjs7SUFDdkIsOEJBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNlc3Npb24ge1xuXG4gICAgY29uc3RydWN0b3IodG9rZW46IE9iamVjdCkge1xuICAgICAgICB0aGlzLmVtYWlsID0gdG9rZW5bJ2VtYWlsJ107XG4gICAgICAgIHRoaXMuZW1haWxWZXJpZmllZCA9IHRva2VuWydlbWFpbF92ZXJpZmllZCddO1xuICAgICAgICB0aGlzLmV4cGlyZXNBdCA9IHRva2VuWydleHAnXTtcbiAgICAgICAgdGhpcy5naXZlbk5hbWUgPSB0b2tlblsnZ2l2ZW5fbmFtZSddO1xuICAgICAgICB0aGlzLmZhbWlseU5hbWUgPSB0b2tlblsnZmFtaWx5X25hbWUnXTtcbiAgICAgICAgdGhpcy5waG9uZSA9IHRva2VuWydwaG9uZV9udW1iZXInXTtcbiAgICAgICAgdGhpcy5waWN0dXJlID0gdG9rZW5bJ3BpY3R1cmUnXTtcbiAgICAgICAgdGhpcy5zY29wZSA9IHRva2VuWydzY29wZSddO1xuICAgICAgICB0aGlzLmlkID0gdG9rZW5bJ3N1YiddO1xuICAgICAgICB0aGlzLmF1dGhvcml0aWVzID0gdG9rZW5bJ3JvbGVzJ107XG4gICAgfVxuXG4gICAgaWQ6IG51bWJlcjtcbiAgICB1c2VybmFtZTogc3RyaW5nO1xuICAgIGV4cGlyZXNBdDogbnVtYmVyO1xuICAgIGdpdmVuTmFtZTogc3RyaW5nO1xuICAgIGZhbWlseU5hbWU6IHN0cmluZztcbiAgICBwaG9uZTogYW55O1xuICAgIHBpY3R1cmU6IGFueTtcbiAgICBzY29wZTogYW55O1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgZW1haWxWZXJpZmllZDogYm9vbGVhbjtcbiAgICBhdXRob3JpdGllczoge3JvbGU6IHN0cmluZywgY2xpZW50OiBzdHJpbmd9W10gPSBbXTtcbn1cbiJdfQ==