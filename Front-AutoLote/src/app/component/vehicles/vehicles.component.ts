import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.loadVehicles();
  }

   // Cargar vehículos desde la API
   loadVehicles() {
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        console.log('Respuesta de la API:', data); // Verifica la estructura de los datos
        if (data && data.vehiculos) {
          this.vehicles = data.vehiculos;
        } else {
          this.vehicles = []; // Si no hay 'vehiculos', inicializa con un array vacío
        }
      },
      error: (error) => {
        this.errorMessage = 'Ocurrió un error al cargar los vehículos.';
        console.error('Error al cargar vehículos', error);
      }
    });
  }

  // Agregar un vehículo (mock)
  addVehicle() {
    this.successMessage = '';
    this.errorMessage = '';

    // Aquí se simula la acción de agregar un vehículo
    this.successMessage = 'Vehículo agregado con éxito!';
    // Aquí iría la lógica de la API para agregar un vehículo
  }

  // Editar un vehículo (mock)
  editVehicle() {
    this.successMessage = '';
    this.errorMessage = '';

    // Aquí se simula la acción de editar un vehículo
    this.successMessage = 'Vehículo editado con éxito!';
    // Aquí iría la lógica de la API para editar un vehículo
  }

  // Eliminar un vehículo (mock)
  deleteVehicle() {
    this.successMessage = '';
    this.errorMessage = '';

    // Aquí se simula la acción de eliminar un vehículo
    this.successMessage = 'Vehículo eliminado con éxito!';
    // Aquí iría la lógica de la API para eliminar un vehículo
  }
}
