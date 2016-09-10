import { Injectable }                   from '@angular/core';
import { AuthHttp }                     from 'angular2-jwt';
import { Observable }                   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User }                         from '../shared/interfaces/user-management.interface';

@Injectable()
export class PhotostationService {
  currentUser: User;

  constructor(private authHttp: AuthHttp) { }

  public getCurrentUser() : User {
      return this.currentUser;
  }

  public loadCurrentUser() : Observable<User | void> {
      return this.authHttp.get('/api/users/me')
          .map(result => result.json())
          .map(user => {
              this.currentUser = user;
          }).share();
  }

}
