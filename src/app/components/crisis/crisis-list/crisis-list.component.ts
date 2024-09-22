import {Component, inject} from '@angular/core';
import {BaseListComponentImpl} from "../../../core/base-interfaces/component/base-list/base-list.component";
import {Crisis} from "../../../models/disaster/Crisis.model";
import {CrisisService} from "../../../services/crisis/crisis.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {CrisisDetailComponent} from "../crisis-detail/crisis-detail.component";

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrl: './crisis-list.component.css'
})
export class CrisisListComponent extends BaseListComponentImpl<Crisis>{


  override displayedColumns: string[] = ['name', 'title', 'requiredHelp','severity', 'description', 'action'];
  constructor(
    private crisisService: CrisisService,
    private router: Router
  ) {
    super();
  }

  getData(params: any) {
    return this.crisisService.getAll(params);
  }


  readonly dialog = inject(MatDialog);
  openDialog(crisisId:string) {
    const dialogRef = this.dialog.open(CrisisDetailComponent, {
      width: '300vh',
      maxHeight: '130vh', // Set max height to 80% of the viewport height
      data: { crisisId: crisisId } // Replace with your actual crisis ID or other data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
