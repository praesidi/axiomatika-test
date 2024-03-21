import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class CitiesService {
	constructor(private http: HttpClient) {}

	fetchData(
		offset: number,
		limit: number,
		query: string | null | undefined,
		selectedCountryId: string
	) {
		let url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities/?offset=${offset}&limit=${limit}`;

		if (query) {
			url += `&namePrefix=${query}`;
		}

		if (selectedCountryId) {
			url += `&countryIds=${selectedCountryId}`;
		}

		return this.http.get(url);
	}
}
