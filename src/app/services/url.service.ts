import { Injectable } from '@angular/core';
import { Url } from '../interface/url';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor() {}

  getUrl(url: Url): string {
    const domain = url.domain === 'localhost' ? '127.0.0.1' : url.domain;
    let urlString = `${url.protocal ?? 'http'}://${domain}`;
    if (url.port) urlString += `:${url.port}`;
    if (url.path) urlString += `${url.path}`;
    if (url.query) {
      const searchParams = new URLSearchParams(url.query);
      const queryStr = searchParams.toString();
      urlString += `?${queryStr}`;
    }
    if (url.segment) urlString += `#${url.segment}`;
    return urlString;
  }

  decomposeString(str: string): Url {
    const urlObj: Url = {
      domain: '',
    };

    const url = new URL(str);

    urlObj.domain = url.hostname;
    urlObj.protocal = url.protocol.replace(':', '');
    urlObj.port = Number(url.port) || undefined;
    urlObj.path = url.pathname.slice(1) || undefined;
    urlObj.segment = url.hash.slice(1) || undefined;

    const searchParams = url.searchParams.toString();
    urlObj.query = searchParams ? searchParams : undefined;

    return urlObj;
  }
}
