import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class CountriesService {
	constructor(private http: HttpClient) {}

	fetchData(offset: number, limit: number, query: string | null | undefined) {
		let url = `http://geodb-free-service.wirefreethought.com/v1/geo/countries/?offset=${offset}&limit=${limit}`;

		if (query) {
			url += `&namePrefix=${query}`;
		}

		return this.http.get(url);
	}
}
