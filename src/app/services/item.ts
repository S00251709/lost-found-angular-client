import { inject ,Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, CreatedItem } from '../models/item';
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/v1/items';

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItemById(id: string): Observable<Item> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Item>(url);
  }

  addItem(item: CreatedItem): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }
}
