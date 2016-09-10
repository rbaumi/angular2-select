import { LatLngLiteral }            from 'angular2-google-maps/core';

export interface Gender {
    value: string;
    text: string;
}

export interface Address {
    street: string;
    cityZip: string;
    stateProvince: string;
    country: string;
    map: LatLngLiteral;
}

export interface User {
    id: number;
    name: string;
    email: string;
    birthday: Date;
    age: number;
    isActive: boolean;
    gender: Gender,
    avatar: string;
    animShow: string;
    address: Address;
}

export interface Role {
    id: number;
    presentedName: string;
    aclName: string;
}
