import { Injectable }                   from '@angular/core';
import { Http }                         from '@angular/http';
import { Observable }                   from 'rxjs/Observable';
import * as map                         from 'rxjs/add/operator/map';

// Variable is taken from application config and passed to the view
// It is set as as global variable in template index.phtml
declare var GOOGLE_API_KEY: string;

@Injectable()
export class GeoService {

    constructor(private http: Http) { }

    public getAddressFromCoordinates(lat: number, lng: number): Observable<any> {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat.toString() + ',' + lng.toString() + '&key=' + GOOGLE_API_KEY)
            .map(result => result.json());
    }
    public getCoordinatesFromAddress(address: string): Observable<any> {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + GOOGLE_API_KEY)
            .map(result => result.json());
    }
}
