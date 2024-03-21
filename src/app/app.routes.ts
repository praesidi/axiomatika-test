import { Routes, RouterModule } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
	{ path: 'cities', component: CitiesComponent },
	{ path: 'cities/:countryName', component: CitiesComponent },
	{ path: 'countries', component: CountriesComponent },
	{ path: '**', redirectTo: 'countries', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	declarations: [],
})
export class AppRoutingModule {}
