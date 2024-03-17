import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TuiDropdownModule } from '@taiga-ui/core';
import { TuiPaginationModule } from '@taiga-ui/kit';

interface Country {
	code: string;
	currencyCodes: string[];
	name: string;
	wikiDataId: string;
}

@Component({
	selector: 'app-countries',
	standalone: true,
	imports: [TuiDropdownModule, TuiPaginationModule, NgFor],
	templateUrl: './countries.component.html',
	styleUrl: './countries.component.scss',
})
export class CountriesComponent {
	data: Country[] = [];
	httpClient = inject(HttpClient);

	totalPages = 1;
	currentPageIndex = 0;
	limit = 5;

	constructor() {}

	ngOnInit(): void {
		this.fetchData();
	}

	fetchData() {
		this.httpClient
			.get(
				`http://geodb-free-service.wirefreethought.com/v1/geo/countries/?limit=${this.limit}`
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
}
