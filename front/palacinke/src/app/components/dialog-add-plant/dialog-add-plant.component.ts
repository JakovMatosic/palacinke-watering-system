import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { PlantRequestBody } from '../../models/plantRequestBody'; // Adjust the path as needed

@Component({
  selector: 'app-dialog-add-plant',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './dialog-add-plant.component.html',
  styleUrls: ['./dialog-add-plant.component.css'],
})
export class DialogAddPlantComponent {
  plantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddPlantComponent>
  ) {
    this.plantForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      minHumidity: [0, [Validators.required, Validators.min(0)]],
      maxHumidity: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.plantForm.valid) {
      const plantRequest: PlantRequestBody = this.plantForm.value;
      this.dialogRef.close(plantRequest);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
