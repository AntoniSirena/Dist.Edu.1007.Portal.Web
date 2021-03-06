import { Iaudit } from '../base/Iaudit/iaudit';

export interface Iuser extends Iaudit{
    Id: number;
    UserName: string;
    Password: string;
    Name: string;
    SurName: string;
    EmailAddress: string;
    StatusId: number;
    PersonId: number;
    Image: string;
    LastLoginTime: string;
    LastLoginTimeEnd: string;
    IsOnline: boolean;
    DiviceIP: string;
    Code: string;
}

export interface IuserStatuses{
    Id: number;
    Description: string;
    ShortName: string;
    Colour: string;
}

