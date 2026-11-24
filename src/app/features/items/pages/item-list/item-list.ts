import { Component, inject } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import { ItemService } from '../../../../services/item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-list',
  imports: [RouterLink],
  templateUrl: './item-list.html',
  styleUrl: './item-list.scss',
})
export class ItemList {
  private readonly itemService = inject(ItemService);

  readonly items = toSignal(this.itemService.getItems(),{
    initialValue: []
  });
}
