import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/register/login/login.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'movie',
    loadChildren: () =>
      import('./pages/movieList/moveList.module').then((m) => m.MovieModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  { path: '**', redirectTo: '/main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
