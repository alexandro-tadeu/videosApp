import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { core } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  senha: string;

  constructor(public toastController: ToastController, private route: Router) {}

  ngOnInit() {}

  login() {
    if (this.email === 'admin@admin.com.br' && this.senha === 'admin') {
      this.route.navigateByUrl('/tabs/tab1');
      this.presentToast('Seja bem vindo', 'success');
    } else {
      this.presentToast('Erro, usuário e/ou senha invalidos ', 'danger');
    }
  }

  async presentToast(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      color: cor,

      duration: 2000,
    });
    toast.present();
  }
}
