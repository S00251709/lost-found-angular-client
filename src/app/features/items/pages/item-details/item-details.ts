import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Item } from '../../../../models/item';
import { ItemService } from '../../../../services/item';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item-details',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './item-details.html',
  styleUrl: './item-details.scss',
})
export class ItemDetails implements OnInit {
  private readonly itemService = inject(ItemService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly item = signal<Item | null>(null);
  
  ngOnInit(): void {
    this.itemService.getItemById(this.id()).subscribe((item) => {
      this.item.set(item);
    });
  }

  deleteItem(item : Item): void {
    if(!confirm(`Delete ${item.name}?`)) {
      return;
    }
    this.itemService.deleteItem(item._id).subscribe({
      next: () => {
        this.router.navigate(['/items'])
      }
    })

  }
}
