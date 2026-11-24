import { Component, inject } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import { ItemService } from '../../../../services/item';

@Component({
  selector: 'app-item-list',
  imports: [],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})
export class ItemList {
  private readonly itemService = inject(ItemService);

  readonly items = toSignal(this.itemService.getItems(),{
    initialValue: []
  });
}
