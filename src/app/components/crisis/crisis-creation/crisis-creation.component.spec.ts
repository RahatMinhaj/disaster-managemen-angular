import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CrisisCreationComponent} from './crisis-creation.component';

describe('CrisisCreationComponent', () => {
  let component: CrisisCreationComponent;
  let fixture: ComponentFixture<CrisisCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrisisCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrisisCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
