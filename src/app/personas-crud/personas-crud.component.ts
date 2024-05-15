import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Persona } from './personas.entity';

@Component({
  selector: 'app-personas-crud',
  templateUrl: './personas-crud.component.html',
  styleUrls: ['./personas-crud.component.css']
})
export class PersonasCrudComponent implements OnInit {
  constructor(
    private apiService: ApiService) {
    setInterval(() => {
      this.printRows();
    }, 6000);
  }
  ngOnInit(): void {
    const con = this.apiService.getPersonas()
    con.subscribe((data: Persona[]) => {
      this.rows = data
    }, error => {
      console.error(error);
      // Maneja el error de alguna manera
    })
  }
  printRows() {
    console.log(this.rows);
  }

  backupRowData: null | Persona = null
  cancel(row: Persona) {
    console.log(this.rows.indexOf(row) == this.rows.length - 1)
    if (this.rows.indexOf(row) == this.rows.length - 1) {
      this.rows.pop()
    } else {
      if (this.backupRowData) {
        Object.assign(row, this.backupRowData);
        this.backupRowData = null; // limpiar la copia de seguridad
      }
      row.isEditing = false; // deshabilitar la edición
    }

  }

  rows: Persona[] = [];

  addNewRow(): void {

    this.rows.push({ id: '', nombre: '', direccion: '', telefono: '', isEditing: true });
  }

  addRow(row: Persona): void {
    const { id, isEditing, ...data } = row
    if (row.nombre && row.direccion && row.telefono) {
      console.log("--->", row.id, row.id === "")
      if (row.id === "") {
        const con = this.apiService.postPersona({
          ...data
        })
        con.subscribe((data: Persona) => {
          this.rows.pop()
          this.rows.push(data)
        }, error => {
          console.error(error);
          // Maneja el error de alguna manera
        })
      } else {
        this.apiService.putPersonas({
          id: id,
          ...data
        }).subscribe()
      }
      row.isEditing = false;
    }
  }
  startEdit(row: Persona) {
    this.backupRowData = { ...row };
    row.isEditing = true; // habilitar la edición
  }

  deleteRow(index: number): void {
    const pos = this.rows.splice(index, 1);
    this.apiService.deletePersonas(pos[0].id).subscribe((data: any) => {
    }, error => {
      console.error(error);
      // Maneja el error de alguna manera
    }
    )


  }
}
