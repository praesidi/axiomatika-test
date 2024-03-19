import { ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TuiDropdownModule } from '@taiga-ui/core';
import { TuiPaginationModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule, TuiLinkModule } from '@taiga-ui/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Country } from '../services/countries/countries.interface';
import { CountriesService } from '../services/countries/countries.service';

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
		RouterLink,
	],
	templateUrl: './countries.component.html',
	styleUrl: './countries.component.scss',
})
export class CountriesComponent implements OnInit {
	data: Country[] = [];

	totalPages = 1;
	currentPageIndex = 0;
	limit = 5;
	offset = 0;

	constructor(private dataService: CountriesService) {}

	ngOnInit(): void {
		this.dataService.fetchData().subscribe((res: any) => {
			this.data = res.data;
			this.totalPages = Math.ceil(res.metadata.totalCount / this.limit);
		});
	}

	form = new FormGroup({
		value: new FormControl(''),
	});

	goToPage(index: number): void {
		this.currentPageIndex = index;
		this.offset = this.currentPageIndex * this.limit;
		console.info('New page:', this.currentPageIndex, 'Offset: ', this.offset);
	}
}
