import { Routes } from '@angular/router';
import { ItemList } from './features/items/pages/item-list/item-list';
import { ItemDetails } from './features/items/pages/item-details/item-details';
import { ItemForm } from './features/items/pages/item-form/item-form';

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
        path: 'items/new',
        component: ItemForm
    },
    {
        path: 'items/:id/edit',
        component: ItemForm
    },
    {
        path: 'items/:id',
        component: ItemDetails
    },
    {
        path: 'items/:id',
        component: ItemDetails
    }
];
