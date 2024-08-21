import { Component } from '@angular/core';
import { TokenStorageService } from './shared/services/token-storage.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly tokenStorageService: TokenStorageService,
    private readonly router: Router,
    private readonly snack: MatSnackBar,
  ) { }

  logout() {
    this.tokenStorageService.logout();
    this.router.navigate(['']);
    this.snack.open("Até mais!", 'X', { 
      duration: 5000, 
      horizontalPosition: 'right', verticalPosition: 'top' 
    })
  }
}
