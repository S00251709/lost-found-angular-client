import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ItemDetails } from './item-details';
import { ItemService } from '../../../../services/item';
import { Item } from '../../../../models/item';

describe('ItemDetails', () => {
  let component: ItemDetails;
  let fixture: ComponentFixture<ItemDetails>;

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
      imports: [ItemDetails],
      providers: [
        provideRouter([]),
        {
          provide: ItemService,
          useValue: {
            getItemById: () => of(item),
            deleteItem: () => of(undefined)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDetails);
    fixture.componentRef.setInput('id', item._id);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});