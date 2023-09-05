import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InscriptionRoutingModule } from './inscription-routing.module';
import { InscriptionComponent } from './inscription.component';
import { InscriptionDialogComponent } from './components/inscription-dialog/inscription-dialog.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { inscriptionFeature } from './store/inscription.reducer';



@NgModule({
  declarations: [InscriptionComponent, InscriptionDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    InscriptionRoutingModule,
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forFeature([InscriptionEffects])
  ],
  exports: [
    InscriptionComponent
  ]
})
export class IncriptionModule { }
