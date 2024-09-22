import {Component} from '@angular/core';
import {BaseListComponentImpl} from "../../../core/base-interfaces/component/base-list/base-list.component";
import {User} from "../../../models/users/User.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent extends BaseListComponentImpl<User>{


  override displayedColumns: string[] = ['userName', 'email', 'profileCreated', 'userType'];
  constructor(private userService: UserService) {
    super();
  }

  getData(params: any) {
    return this.userService.getAll(params);
  }

}
