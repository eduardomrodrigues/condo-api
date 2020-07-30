export interface User {

    _id: {
        $oid: string;
    };
    name: string;
    email: string;
    torre: string;
    ap: number;
    isAdmin: boolean;
    isComplete: boolean;
    aniversario?: Date;
    vagasGaragem?: number[];
    inquilinos?: User[];
    hasPet?: boolean;



}