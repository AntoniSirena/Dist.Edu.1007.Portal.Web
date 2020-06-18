import { Audit } from '../../base/audit/audit';

export class Docent extends Audit{
    Id: number;
    FirstName: string;
    SecondName: string;
    Surname: string;
    SecondSurname: string;
    FullName: string;
    BirthDate: Date;
    DocumentTypeID: number
    DocumentNumber: string;
    Phone: string;
    Address: string;
    AreaId: number;
}
