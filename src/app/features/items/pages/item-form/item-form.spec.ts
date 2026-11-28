import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ItemForm } from './item-form';
import { ItemService } from '../../../../services/item';
import { Item } from '../../../../models/item';

describe('ItemForm', () => {
  let component: ItemForm;
  let fixture: ComponentFixture<ItemForm>;

  const item: Item = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Item',
    description: 'A valid test item description',
    category: 'other',
    type: 'lost',
    location: 'Library',
    status: 'open',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemForm],
      providers: [
        provideRouter([]),
        {
          provide: ItemService,
          useValue: {
            getItemById: () => of(item),
            addItem: () => of(item),
            updateItem: () => of(item)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reject an empty form', () => {
    component.itemForm.controls.name.setValue('');
    component.itemForm.controls.description.setValue('');
    component.itemForm.controls.location.setValue('');

    expect(component.itemForm.invalid).toBe(true);
  });
});