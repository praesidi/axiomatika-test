import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class CitiesService {
	constructor(private http: HttpClient) {}

	fetchData() {
		return this.http.get(
			`http://geodb-free-service.wirefreethought.com/v1/geo/cities/?limit=`
		);
	}
}
