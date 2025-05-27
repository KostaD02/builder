import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemSettingsComponent } from './item-settings.component';

describe('ItemSettingsComponent', () => {
  let component: ItemSettingsComponent;
  let fixture: ComponentFixture<ItemSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
