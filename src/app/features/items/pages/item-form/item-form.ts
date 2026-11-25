import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreatedItem } from '../../../../models/item';
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
export class ItemForm {
  private readonly formBuilder = inject(FormBuilder);
  private readonly itemService = inject(ItemService);
  private readonly router = inject(Router);

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
    ]]
  });

  onSubmit(): void {
    if (this.itemForm.invalid){
      this.itemForm.markAllAsTouched();
      return;
    }

    const newItem: CreatedItem = this.itemForm.getRawValue();
    this.saving.set(true);
    this.saveError.set(null);

    this.itemService.addItem(newItem).subscribe({
      next: (item) => {
        this.saving.set(false);
        this.router.navigate(['/items']);
      },
      error: () => {
        this.saveError.set('The item could not be reported. please try again.');
        this.saving.set(false);
      }
    });

    console.log('Submitted item:', newItem);
  }
}
