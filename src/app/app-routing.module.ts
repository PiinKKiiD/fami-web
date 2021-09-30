import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { PhimMoiComponent } from './phim-moi/phim-moi.component';
import { PhimBoComponent} from "./phim-bo/phim-bo.component";
import { PhimLeComponent} from "./phim-le/phim-le.component";
import {PhimHoatHinhComponent} from "./phim-hoat-hinh/phim-hoat-hinh.component";
import {AuthGuard} from "./auth/auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: '/phim-moi', pathMatch: 'full'},
  { path: 'phim-moi', component: PhimMoiComponent, canActivate: [AuthGuard] },
  { path: 'phim-le', component: PhimLeComponent, canActivate: [AuthGuard]},
  { path: 'phim-bo', component: PhimBoComponent, canActivate: [AuthGuard]},
  { path: 'phim-hoat-hinh', component: PhimHoatHinhComponent, canActivate: [AuthGuard]},
  { path: 'quan-ly',
    loadChildren: () => import('./quan-ly/quan-ly.module').then(m=>m.QuanLyModule), canActivate: [AuthGuard]},
  {path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m=>m.AuthModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
