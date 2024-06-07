import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantService } from '../../services/plant.service';
import { Plant } from '../../models/plant';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-plant-cards',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './plant-cards.component.html',
  styleUrls: ['./plant-cards.component.css'],
})
export class PlantCardsComponent implements OnInit {
  plants: Plant[] = [];

  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.plantService.getAllPlants().subscribe(
      (plants) => (this.plants = plants),
      (error) => console.error('Failed to fetch plants', error)
    );
    // this.plants = [
    //   {
    //     id: '1',
    //     name: 'Aloe Vera',
    //     minHumidity: 30,
    //     maxHumidity: 50,
    //     currentHumidity: 40,
    //   },
    //   {
    //     id: '2',
    //     name: 'Spider Plant',
    //     minHumidity: 40,
    //     maxHumidity: 60,
    //     currentHumidity: 45,
    //   },
    // ];
  }

  refreshHumidity(id: string): void {
    this.plantService.getPlantHumidity(id).subscribe(
      (humidity) => {
        const plantIndex = this.plants.findIndex((p) => p.id === id);
        if (plantIndex !== -1) {
          this.plants[plantIndex].currentHumidity = humidity;
        }
      },
      (error) =>
        console.error(`Failed to refresh humidity for plant ${id}`, error)
    );
  }
}
