import { IGenero } from './../models/IGenero.model';
import { IListaFilmes, IFilmeApi } from './../models/IFilmeAPI.model';
import { FilmeService } from './../services/filme.service';
import { DadosService } from './../services/dados.service';
import { IFilme } from '../models/IFilme.model';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GeneroService } from '../services/genero.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  titulo = 'Filmes';

  listaVideos: IFilme[] = [
    {
      nome: 'Mortal Kombat (2021)',
      lancamento: '15/04/2021 (BR)',
      duracao: '1h 50m',
      classificacao: 76,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/w8BVC3qrCWCiTHRz4Rft12dtQF0.jpg',
      generos: ['Ação', 'Fantasia', 'Aventura'],
      pagina: '/mortal-kombat',
    },
    {
      nome: 'Sem Remorso (2021)',
      lancamento: '30/04/2021 (BR)',
      duracao: '1h 50m',
      classificacao: 73,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/uHEZ4ZMziIjlAgCTQAEh9ROvtj0.jpg',
      generos: ['Ação', 'Aventura', 'Thriller', 'Guerra'],
      pagina: '/sem-remorso',
    },

    {
      nome: 'Raya e o Último Dragão (2021)',
      lancamento: '04/03/2021 (BR)',
      duracao: '1h 47m',
      classificacao: 82,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/o2NTWpD6LVf1YyPKTdvcEuHqcJ6.jpg',
      generos: ['Animação', 'Aventura', 'Fantasia', 'Família', 'Ação'],
      pagina: '/raya',
    },
    {
      nome: 'Infiltrado (2021)',
      lancamento: '27/05/2021 (BR)',
      duracao: '1h 59m',
      classificacao: 77,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/dAtAp4IeT6EYGhewfnNNhalobme.jpg',
      generos: ['Ação', 'Crime'],
      pagina: '/infiltrado',
    },

    {
      nome: 'Hotel Transilvânia: Transformonstrão (2021)',
      lancamento: '05/08/2021 (BR)',
      duracao: 'NR',
      classificacao: 0,
      cartaz:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7dZ6sSrJtTfBfGQhcHJWaMdZnfn.jpg',
      generos: ['Animação', 'Família', 'Fantasia', 'Comédia'],
      pagina: '/hotel-trans',
    },
  ];

  listaFilmes: IListaFilmes;
  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosServices: DadosService,
    public filmeService: FilmeService,
    public generoService: GeneroService,
    public route: Router
  ) {}

  buscarFilmes(evento: any) {
    console.log(evento.target.value);
    const busca = evento.target.value;
    if (busca && busca.trim() !== '') {
      this.filmeService.buscarFilmes(busca).subscribe((dados) => {
        console.log(dados);
        this.listaFilmes = dados;
      });
    }
  }
  exibirFilme(filme: IFilmeApi) {
    this.dadosServices.guardarDados('filme', filme);
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
      message: 'Filmes adicionados aos favoritos.',
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
