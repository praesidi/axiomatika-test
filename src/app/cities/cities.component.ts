import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {
	TuiDropdownModule,
	TuiTextfieldControllerModule,
	TuiDataListModule,
	TuiButtonModule,
} from '@taiga-ui/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
	TuiPaginationModule,
	TuiInputModule,
	TuiDataListWrapperModule,
	TuiSelectModule,
} from '@taiga-ui/kit';
import countriesList from '../../assets/countries_list.json';
import { CitiesService } from '../services/cities/cities.service';
import { City } from '../services/cities/cities.interface';

@Component({
	selector: 'app-cities',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		TuiDropdownModule,
		TuiPaginationModule,
		TuiInputModule,
		TuiTextfieldControllerModule,
		TuiSelectModule,
		TuiDataListModule,
		TuiDataListWrapperModule,
		TuiButtonModule,
	],
	templateUrl: './cities.component.html',
	styleUrl: './cities.component.scss',
})
export class CitiesComponent implements OnInit {
	data: City[] = [];

	totalPages = 1;
	currentPageIndex = 0;
	limit = 5;

	constructor(private dataService: CitiesService) {}

	ngOnInit(): void {
		this.dataService.fetchData().subscribe((res: any) => {
			this.data = res.data;
			this.totalPages = Math.ceil(res.metadata.totalCount / this.limit);
		});
	}

	items = [...countriesList.map(a => a.name)];

	form = new FormGroup({
		country: new FormControl(''),
		city: new FormControl(''),
	});

	goToPage(index: number): void {
		this.currentPageIndex = index;
		console.info('New page:', index);
	}

	formatPopulationNumber(population: number) {
		if (population >= 1000000) {
			const mils = Math.floor(population / 1000000);
			const thousands = Math.floor((population % 1000000) / 1000);

			return `${mils}.${thousands} млн.`;
		} else if (population >= 1000) {
			return `${Math.floor(population / 1000)} тыс.`;
		} else {
			return population;
		}
	}
}
