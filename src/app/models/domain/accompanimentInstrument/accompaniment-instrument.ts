import { Audit } from '../../base/audit/audit';

export class AccompanimentInstrument {
}


export class IdentificationData extends Audit {
    Id: number;
    RequestId: number;
    RegionalId: number;
    DistritId: number;
    CenterId: number;
    TandaId: number;
    GradeId: number;
    DocentId: number;
    CompanionId: number;

    VisitIdA?: number;
    VisitDateA?: string;
    QuantityChildrenA?: number;
    QuantityGirlsA?: number;
    ExpectedTimeA?: number;
    RealTimeA?: number;

    VisitIdB?: number;
    VisitDateB?: string;
    QuantityChildrenB?: number;
    QuantityGirlsB?: number;
    ExpectedTimeB?: number;
    RealTimeB?: number;

    VisitIdC?: number;
    VisitDateC?: string;
    QuantityChildrenC?: number;
    QuantityGirlsC?: number;
    ExpectedTimeC?: number;
    RealTimeC?: number;
}

export class AccompInstRequest {
    Id: number;
    RequestId: number;
    DocentFullName: string;
    DocumentNumber: string;
    Status: string;
    StatusColour: string;
    OpeningDate: string;
    ClosingDate: string;
    AllowEdit: string;
}


export class VariableRequest {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription: string;
    StatusColour: string;
    VariableDescription: string;
    VariableTitle: string;
    VariableDetails: Array<VariableDetail>;
}

export class VariableDetail {
    Id: number;
    Number: string;
    Description: string;
    AreaIdA: number;
    IndicadorIdA: number;
    AreaIdB: number;
    IndicadorIdB: number;
    AreaIdC: number;
    IndicadorIdC: number;
}