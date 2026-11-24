import { Routes } from '@angular/router';
import { ItemList } from './features/items/pages/item-list/item-list';
import { ItemDetails } from './features/items/pages/item-details/item-details';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'items',
        pathMatch: 'full'
    },
    {
        path: 'items',
        component: ItemList
    },
    {
        path: 'items/:id',
        component: ItemDetails
    }
];
