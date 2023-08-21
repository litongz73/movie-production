import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiscoveryComponent } from './discovery/discovery.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MovieDetailResolver } from 'src/app/resolver/movie-detail.resolver';
import { MovieItemComponent } from 'src/app/components/movie-item/movie-item.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { VideoModalComponent } from 'src/app/components/video-modal/video-modal.component';

@NgModule({
  declarations: [
    DiscoveryComponent,
    MovieDetailComponent,
    MovieItemComponent,
    VideoModalComponent,
    MovieItemComponent,
  ],
  imports: [
    CommonModule,
    YouTubePlayerModule,
    InfiniteScrollModule,
    RouterModule.forChild([
      {
        path: '',
        component: DiscoveryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'list/:id',
        component: MovieDetailComponent,
        resolve: {
          detailResolver: MovieDetailResolver,
        },
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class MovieModule {}
