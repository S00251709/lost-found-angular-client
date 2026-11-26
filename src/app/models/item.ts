export interface Item {
    _id?: string;
    name: string;
    description: string;
    category: 'electronics' | 'clothing' | 'books' | 'bags' | 'toys' | 'other';
    type: 'lost' | 'found';
    location: string;
    status: 'open' | 'resolved' ;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatedItem {
    name: string;
    description: string;
    category: 'electronics' | 'clothing' | 'books' | 'bags' | 'toys' | 'other';
    type: 'lost' | 'found';
    location: string;
}

export interface UpdatedItem 
{
    name: string;
    description: string;
    category: 'electronics' | 'clothing' | 'books' | 'bags' | 'toys' | 'other';
    type: 'lost' | 'found';
    location: string;
    status: 'open' | 'resolved' ;
}