За да използвате този модул в проекта a-care направете следните стъпки:

№1 в основната директория на проекта напишете 

    "ng build lms-ngx-auth"

№2 ако всико се билдне коректно стартирайте dev версията с 

    "npm start"

№3 В app.module-a инжектирайте LmsNgxAuthModule
    
    LmsNgxAuthModule.forRoot({
            client: {
                name: 'lmsweb',
                password: 'lmsweb123**',
            },
            loginUrl: '/oauth2/login',
            userInfoUrl: '/user/me',
        }),
        ...
където name и password са клиентските настройки за това приложение.

№4 Конфигурирайте app.component.ts

    private _destroyed$: Subject<void> = new Subject();

    constructor(private router: Router,
                private authService: LmsNgxAuthService) {
    }

    ngOnInit(): void {
        this.authService.authenticationChange.pipe(
            takeUntil(this._destroyed$),
        ).subscribe(token => {
            const route = this.authService.isAuthenticated() ? environment.defaultUrl : '/auth/login';
            this.router.navigate([route]);
        });
    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

№5 има и разработени гардове
        
