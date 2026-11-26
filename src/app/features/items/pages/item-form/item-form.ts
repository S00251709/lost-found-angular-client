import { Component, inject, signal, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreatedItem, UpdatedItem } from '../../../../models/item';
import { RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ItemService } from '../../../../services/item';
@Component({
  selector: 'app-item-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    RouterLink],
  templateUrl: './item-form.html',
  styleUrl: './item-form.scss',
})
export class ItemForm implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly itemService = inject(ItemService);
  private readonly router = inject(Router);

  readonly id = input<string>();

  readonly saving = signal(false);
  readonly saveError = signal<string | null>(null);

  readonly itemForm = this.formBuilder.nonNullable.group({
    name: ['',  [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]],
    description: ['',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500)
    ]],
    category: this.formBuilder.nonNullable.control<CreatedItem['category']>(
      'other', 
      Validators.required
    ),
    type: this.formBuilder.nonNullable.control<CreatedItem['type']>(
      'lost',
      Validators.required
    ),
    location: ['',[
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
    ]],
    status: this.formBuilder.nonNullable.control<UpdatedItem['status']>(
      'open',
      Validators.required
    )
  });
  ngOnInit(): void {
  const id = this.id();

  if (!id) {
    return;
  }

  this.itemService.getItemById(id).subscribe({
    next: (item) => {
      this.itemForm.patchValue({
        name: item.name,
        description: item.description,
        category: item.category,
        type: item.type,
        location: item.location,
        status: item.status
      });
    },
    error: () => {
      this.saveError.set('The item could not be loaded.');
    }
  });
}

  onSubmit(): void {
    if (this.itemForm.invalid){
      this.itemForm.markAllAsTouched();
      return;
    }

    const id = this.id();
    const formValue = this.itemForm.getRawValue();

    const createdItem: CreatedItem = {
      name: formValue.name,
      description: formValue.description,
      category: formValue.category,
      type: formValue.type,
      location: formValue.location
    };

    const updatedItem: UpdatedItem = formValue;

    const request = id 
    ? this.itemService.updateItem(id, updatedItem) 
    : this.itemService.addItem(createdItem);
    
    this.saving.set(true);
    this.saveError.set(null);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/items']);
      },
      error: () => {
        this.saveError.set(
          id 
            ?'The item couldnt be updated. please try again '
            : 'The item couldnt be reported. Please try again '
        );

        this.saving.set(false);
      }
    });
  }
}

