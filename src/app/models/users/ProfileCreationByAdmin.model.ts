import {GenderType} from "../../enum/GenderType.enum";

export interface ProfileCreationByAdmin {
  name?: string;
  mobileNo?: string;
  address?: string;
  genderType?: GenderType;
  dateOfBirth?: Date;

  userName?: string;
  email?: string;
  password?: string;

}
