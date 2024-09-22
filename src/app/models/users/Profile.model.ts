import {GenderType} from "../../enum/GenderType.enum";
import {Status} from "../../enum/Status.enum";

export interface Profile{
    id?:string;
    name?:string;
    mobileNo?:string;
    email?:string;
    address?:string;
    genderType?:GenderType;
    dateOfBirth?:Date;
    profileIds?:string[];
    userId?:string;
    status?:Status;

}
