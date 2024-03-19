import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import {
	TuiDropdownModule,
	TuiTextfieldControllerModule,
	TuiDataListModule,
} from '@taiga-ui/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
	TuiPaginationModule,
	TuiInputModule,
	TuiDataListWrapperModule,
	TuiSelectModule,
} from '@taiga-ui/kit';

interface City {
	id: number;
	wikiDataId: string;
	type: string;
	name: string;
	country: string;
	countryCode: string;
	region: string;
	regionCode: number;
	latitude: number;
	longitude: number;
	population: number;
}

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
	],
	templateUrl: './cities.component.html',
	styleUrl: './cities.component.scss',
})
export class CitiesComponent implements OnInit {
	data: City[] = [];
	httpClient = inject(HttpClient);

	totalPages = 1;
	currentPageIndex = 0;
	limit = 5;

	items = ['first', 'second'];

	form = new FormGroup({
		value: new FormControl(''),
	});

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData() {
		this.httpClient
			.get(
				`http://geodb-free-service.wirefreethought.com/v1/geo/cities/?limit=${this.limit}`
			)
			.subscribe((res: any) => {
				this.data = res.data;
				console.log(res);
				this.totalPages = Math.ceil(res.metadata.totalCount / this.limit);
			});
	}

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
