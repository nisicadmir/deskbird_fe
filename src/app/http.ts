import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth } from "./services/auth";

@Injectable({
  providedIn: "root",
})
export class Http {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private auth: Auth) {}

  get<T>(url: string, useAuth: boolean = false): Observable<T> {
    const headers = useAuth
      ? { Authorization: `Bearer ${this.auth.getAccessToken()}` }
      : ({} as HttpHeaders);
    return this.http.get<T>(`${this.baseUrl}${url}`, { headers });
  }

  post<T>(url: string, data: any, useAuth: boolean = false): Observable<T> {
    const headers = useAuth
      ? { Authorization: `Bearer ${this.auth.getAccessToken()}` }
      : ({} as HttpHeaders);
    return this.http.post<T>(`${this.baseUrl}${url}`, data, { headers });
  }

  put<T>(url: string, data: any, useAuth: boolean = false): Observable<T> {
    const headers = useAuth
      ? { Authorization: `Bearer ${this.auth.getAccessToken()}` }
      : ({} as HttpHeaders);
    return this.http.put<T>(`${this.baseUrl}${url}`, data, { headers });
  }

  delete<T>(url: string, useAuth: boolean = false): Observable<T> {
    const headers = useAuth
      ? { Authorization: `Bearer ${this.auth.getAccessToken()}` }
      : ({} as HttpHeaders);
    return this.http.delete<T>(`${this.baseUrl}${url}`, { headers });
  }
}
