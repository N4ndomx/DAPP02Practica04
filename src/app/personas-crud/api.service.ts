import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Empleado } from './personas.entity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';
  constructor() { }

  // Método para realizar una solicitud GET con Axios
  getPersonas(): Observable<any> {
    let urlgetpersonas = "/empleados"
    return new Observable(observer => {
      axios.get(`${this.apiUrl}${urlgetpersonas}`, {
        auth: {
          password: "contrasena",
          username: "adsoft"
        }
      })
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Método para realizar una solicitud POST con Axios
  postPersona(data: any): Observable<Empleado> {
    let urlpostpersonas = "/empleados"

    return new Observable(observer => {
      axios.post(`${this.apiUrl}${urlpostpersonas}`, data, {
        auth: {
          password: "contrasena",
          username: "adsoft"
        }
      })
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          console.log(error)
        });
    });
  }

  // Método para realizar una solicitud PUT con Axios
  putPersonas(data: any): Observable<any> {

    let url = "/empleados/" + data.id
    console.log(`${this.apiUrl}${url}`)

    return new Observable(observer => {
      axios.put(`${this.apiUrl}${url}`, data)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Método para realizar una solicitud DELETE con Axios
  deletePersonas(id_persona: string): Observable<any> {
    let url = "/empleados/" + id_persona
    console.log(`${this.apiUrl}${url}`)
    return new Observable(observer => {
      axios.delete(`${this.apiUrl}${url}`)
        .then((response: AxiosResponse) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
