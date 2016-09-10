import { Component, OnInit }            from '@angular/core';
import { FormGroup,
         FormControl,
         Validators }                   from '@angular/forms';
import { ApplicationService }           from '../../shared/services/application.service';
import { AuthService }                  from '../../shared/services/auth.service';

@Component({
    selector: 'login-page',
    templateUrl: 'login.template.html',
    styleUrls: ['login.styles.scss']
})

export class LoginPageComponent implements OnInit {
    private loginForm:   FormGroup;
    private isLoggingIn: boolean = false;

    constructor(private authService: AuthService, private applicationService: ApplicationService) {}

    ngOnInit() {
        this.createLoginForm();
    }
    createLoginForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$')
            ]),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl(true)
        });
    }
    login() {
        this.applicationService.clearApplicationInfo();
        this.isLoggingIn = true;
        this.authService.authentificate(this.loginForm.get('email').value, this.loginForm.get('password').value)
            .subscribe(
                result => {
                    if (result.success) {
                        this.authService.setJWT(result.token);
                        this.applicationService.disaplyApplicationInfo('LOGIN_SUCCESS', 'success');
                    } else {
                        this.applicationService.disaplyApplicationInfo(result.error ? result.error : 'LOGIN_FAILED', 'danger');
                    }
                    this.isLoggingIn = false;
                },
                err => {
                    this.applicationService.disaplyApplicationInfo('LOGIN_FAILED_INTERNAL_ERROR', 'danger');
                    this.isLoggingIn = false;
                }
            )
    }

}
