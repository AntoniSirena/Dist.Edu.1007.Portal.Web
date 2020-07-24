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


export class VariableResponse {
    Id: number;
    RequestId: number;
    Variable: string;
    StausId: number;
    StatusDescription: string;
    StatusColour: string;
    VariableDescription: string;
    VariableTitle: string;
    AreaIdA: number;
    AreaIdB: number;
    AreaIdC: number;
    VariableDetails: Array<VariableDetail>;

    EfficiencyValueA: string;
    EfficiencyColourA: string;

    EfficiencyValueB: string;
    EfficiencyColourB: string;

    EfficiencyValueC: string;
    EfficiencyColourC: string;

    EfficiencyTotalValue: string;
    EfficiencyTotalColour: string;

    EfficiencyEvaluateFactor: string;

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


export class CommentsRevisedDocument {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription
    StatusColour: string;
    AreaIdA: number;
    DateA: string;
    AreaIdB: number;
    DateB: string;
    AreaIdC: number;
    DateC: string;
    CommentsRevisedDocumenDetails: Array<string>;
}

export class CommentsRevisedDocumenDetails {
    Id: number;
    Description: string;
    AreaIdA: number;
    DateA: string;
    CommentA: string;
    AreaIdB: number;
    DateB: string;
    CommentB: string;
    AreaIdC: number;
    DateC: string;
    CommentC: string;
}

export class DescriptionObservationSupportProvided {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription
    StatusColour: string;
    AreaIdA: number;
    DateA: string;
    CommentA: string;
    AreaIdB: number;
    DateB: string;
    CommentB: string;
    AreaIdC: number;
    DateC: string;
    CommentC: string;
}


export class SuggestionsAgreement {
    Id: number;
    RequestId: number;
    StausId: number;
    StatusDescription
    StatusColour: string;

    AreaIdA: number;
    DateA: string;
    CommentA: string;
    TeacherSignatureA: string;
    CompanionSignatureA: string;
    DistrictTechnicianSignatureA: string;

    AreaIdB: number;
    DateB: string;
    CommentB: string;
    TeacherSignatureB: string;
    CompanionSignatureB: string;
    DistrictTechnicianSignatureB: string;

    AreaIdC: number;
    DateC: string;
    CommentC: string;
    TeacherSignatureC: string;
    CompanionSignatureC: string;
    DistrictTechnicianSignatureC: string;
}