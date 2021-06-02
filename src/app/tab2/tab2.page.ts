import { ISeries, IListaSeries } from './../models/ISerie.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DadosService } from '../services/dados.service';
import { GeneroService } from '../services/genero.service';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  titulo = 'Séries';

  listaSeries: IListaSeries;
  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosServices: DadosService,
    public serieServices: SerieService,
    public generoService: GeneroService,
    public route: Router
  ) {}

  buscarSeries(evento: any) {
    console.log(evento.target.value);
    const busca = evento.target.value;
    if (busca && busca.trim() !== '') {
      this.serieServices.buscarSeries(busca).subscribe((dados) => {
        console.log(dados);
        this.listaSeries = dados;
      });
    }
  }
  exibirSeries(serie: ISeries) {
    this.dadosServices.guardarDados('filme', serie);
    this.route.navigateByUrl('/dados-filme');
  }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Deseja realmente favoritar o filme',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Sim, favoritar',
          handler: () => {
            this.apresentarToast();
          },
        },
      ],
    });

    await alert.present();
  }
  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Series adicionads aos favoritos.',
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
  ngOnInit() {
    this.generoService.buscarGenero().subscribe((dados) => {
      console.log('Generos: ', dados.genres);
      dados.genres.forEach((genero) => {
        this.generos[genero.id] = genero.name;
      });
      this.dadosServices.guardarDados('generos', this.generos);
    });
  }
}
