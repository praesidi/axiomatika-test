import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { TuiDropdownModule } from '@taiga-ui/core';
import { TuiPaginationModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule, TuiLinkModule } from '@taiga-ui/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Country {
	code: string;
	currencyCodes: string[];
	name: string;
	wikiDataId: string;
}

@Component({
	selector: 'app-countries',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		TuiDropdownModule,
		TuiPaginationModule,
		TuiInputModule,
		TuiTextfieldControllerModule,
		TuiLinkModule,
	],
	templateUrl: './countries.component.html',
	styleUrl: './countries.component.scss',
})
export class CountriesComponent implements OnInit {
	data: Country[] = [];
	httpClient = inject(HttpClient);

	totalPages = 1;
	currentPageIndex = 0;
	limit = 5;

	form = new FormGroup({
		value: new FormControl(''),
	});

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
