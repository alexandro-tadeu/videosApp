import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { IListaSeries } from '../models/ISerie.model';

@Injectable({
  providedIn: 'root',
})
export class SerieService {
  lingua = 'pt-BR';
  regiao = 'BR';

  private apiURL = 'https://api.themoviedb.org/3/';
  private key = '?api_key=d3262ed52d43f39de29cabe509fa99f6';

  constructor(
    private http: HttpClient,
    public toastController: ToastController
  ) {}

  buscarSeries(busca: string): Observable<IListaSeries> {
    const url = `${this.apiURL}search/tv${this.key}&language=${this.lingua}$region=${this.regiao}&query=${busca}`;

    return this.http.get<IListaSeries>(url).pipe(
      map((retorno) => retorno),
      catchError((erro) => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API!',
      duration: 2000,
      color: 'danger',
      position: 'middle',
    });
    toast.present();
    return null;
  }
}
