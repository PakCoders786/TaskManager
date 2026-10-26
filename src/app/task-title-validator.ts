import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface LanguageToolMatch {
  message: string;
  replacements: Array<{ value: string }>;
}

interface LanguageToolResponse {
  matches: LanguageToolMatch[];
}

@Injectable({
  providedIn: 'root',
})
export class TaskTitleValidator {
  private readonly http = inject(HttpClient);

  check(text: string): Observable<LanguageToolMatch | null> {
    const body = new URLSearchParams({
      text,
      language: 'en-US',
    }).toString();

    return this.http
      .post<LanguageToolResponse>(
        'https://api.languagetool.org/v2/check',
        body,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(map((response) => response.matches[0] ?? null));
  }
}