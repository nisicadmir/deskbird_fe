import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpsertDialog } from './user-upsert-dialog';

describe('UserUpsertDialog', () => {
  let component: UserUpsertDialog;
  let fixture: ComponentFixture<UserUpsertDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpsertDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpsertDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
