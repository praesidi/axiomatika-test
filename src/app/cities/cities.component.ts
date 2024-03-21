import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
	TuiDropdownModule,
	TuiTextfieldControllerModule,
	TuiDataListModule,
	TuiButtonModule,
	TuiDialogService,
	TuiDialogSize,
	TuiDialogContext,
} from '@taiga-ui/core';
import {
	TuiPaginationModule,
	TuiInputModule,
	TuiDataListWrapperModule,
	TuiSelectModule,
	TuiRoutableDialogModule,
} from '@taiga-ui/kit';
import countriesList from '../../assets/countries.json';
import { CitiesService } from '../services/cities/cities.service';
import { City } from '../services/cities/cities.interface';
import { ActivatedRoute } from '@angular/router';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

interface CountryCodes {
	[key: string]: string;
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
		TuiButtonModule,
		TuiRoutableDialogModule,
		RouterLink,
	],
	templateUrl: './cities.component.html',
	styleUrl: './cities.component.scss',
})
export class CitiesComponent implements OnInit {
	data: City[] = [];

	totalPages = 1;
	currentPageIndex = 0;
	limit = 5;
	offset = 0;

	selectedCity: City | undefined;

	countryCodes: CountryCodes = countriesList;
	countriesName = Object.keys(this.countryCodes);

	constructor(
		private dataService: CitiesService,
		private route: ActivatedRoute,
		private router: Router,
		@Inject(TuiDialogService) private readonly dialogs: TuiDialogService
	) {
		// route.params.subscribe(val => {
		// 	this.form.controls.country.setValue(val);
		// 	this.fetchData();
		// });
	}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			const id = params['countryName'];

			this.form.controls.country.setValue(id);

			this.fetchData();
		});
	}

	fetchData() {
		const code = this.countryCodes[`${this.form.value.country}`];

		this.dataService
			.fetchData(this.offset, this.limit, this.form.value.city, code)
			.subscribe((res: any) => {
				this.data = res.data;
				this.totalPages = Math.ceil(
					(res.metadata.totalCount - 50) / this.limit // апи возвращает неправильное кол-во элементов
				);
			});
	}

	form = new FormGroup({
		country: new FormControl(''),
		city: new FormControl(''),
	});

	onSearch() {
		this.fetchData();
		this.currentPageIndex = 0;
		this.offset = 0;
	}

	onSelect() {
		if (this.form.value.country) {
			this.router.navigate([`cities/${this.form.value.country}`]);
		}
	}

	showDialog(
		content: PolymorpheusContent<TuiDialogContext>,
		size: TuiDialogSize,
		item: City
	): void {
		this.selectedCity = item;
		this.dialogs
			.open(content, {
				label: item.name,
				size: size,
			})
			.subscribe();
	}

	editForm = new FormGroup({
		region: new FormControl(''),
		population: new FormControl(),
		countryCode: new FormControl(''),
		longitude: new FormControl(),
		latitude: new FormControl(),
	});

	showEditDialog(
		content: PolymorpheusContent<TuiDialogContext>,
		size: TuiDialogSize,
		item: City
	): void {
		this.editForm.controls['region'].setValue(item.region);
		this.editForm.controls['countryCode'].setValue(item.countryCode);
		this.editForm.controls['population'].setValue(item.population);
		this.editForm.controls['latitude'].setValue(item.latitude);
		this.editForm.controls['longitude'].setValue(item.longitude);

		this.dialogs
			.open(content, {
				label: item.name,
				size: size,
			})
			.subscribe();
	}

	goToPage(index: number): void {
		this.currentPageIndex = index;
		this.offset = this.currentPageIndex * this.limit;
		this.fetchData();
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
