import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GenderType} from '../GenderType.enum';
import {Severity} from "../Severity.enum"; // Adjust the import path

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class EnumDeclarationModule {
  static getGenderTypes(): string[] {
    return Object.values(GenderType);
  }
  static getSeverityType(): string[] {
    return Object.values(Severity);
  }
}
