import {Severity} from "../../enum/Severity.enum";
import {DistrictDto} from "../utilities/district.model";
import {Status} from "../../enum/Status.enum";
import {Profile} from "../users/Profile.model";

export interface Crisis {
  id?: string;
  name?: string;
  title?: string;
  image?: string;
  description?: string;
  requiredHelp?: boolean;
  severity?: Severity;
  location?: string;
  address?: string;
  divisionId?: string;
  district?: DistrictDto;
  policeStationId?: string;
  status?:Status;
  profileDtos?:Profile[];
  entryTime?:Date;
}
