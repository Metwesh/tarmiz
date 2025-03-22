import { Injectable } from '@angular/core';

export interface CookieOptions {
  expires?: Date | number; // Date object or days as number
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  
  /**
   * Set a cookie with the given name and value
   */
  setCookie(name: string, value: string, options: CookieOptions = {}): void {
    let cookieStr = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    
    if (options.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        options.expires = date;
      }
      cookieStr += ';expires=' + options.expires.toUTCString();
    }
    
    if (options.path) {
      cookieStr += ';path=' + options.path;
    } else {
      cookieStr += ';path=/'; // Default to root path
    }
    
    if (options.domain) {
      cookieStr += ';domain=' + options.domain;
    }
    
    if (options.secure) {
      cookieStr += ';secure';
    }
    
    if (options.sameSite) {
      cookieStr += ';SameSite=' + options.sameSite;
    } else {
      cookieStr += ';SameSite=Lax'; // Default to Lax as it's most compatible
    }
    
    document.cookie = cookieStr;
  }
  
  /**
   * Get cookie value by name
   */
  getCookie(name: string): string | null {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      }
    }
    
    return null;
  }
  
  /**
   * Delete a cookie by name
   */
  deleteCookie(name: string, options: CookieOptions = {}): void {
    // To delete a cookie, set its expiration date to past
    const deleteOptions = { 
      ...options,
      expires: new Date(0) // Set to epoch time
    };
    
    this.setCookie(name, '', deleteOptions);
  }
  
  /**
   * Check if a cookie exists
   */
  hasCookie(name: string): boolean {
    return this.getCookie(name) !== null;
  }
  
  /**
   * Get all cookies as an object
   */
  getAllCookies(): {[key: string]: string} {
    const cookies: {[key: string]: string} = {};
    const allCookies = document.cookie.split(';');
    
    for (let i = 0; i < allCookies.length; i++) {
      const cookie = allCookies[i].trim();
      if (cookie) {
        const cookieParts = cookie.split('=');
        if (cookieParts.length >= 2) {
          const name = decodeURIComponent(cookieParts[0]);
          const value = decodeURIComponent(cookieParts.slice(1).join('='));
          cookies[name] = value;
        }
      }
    }
    
    return cookies;
  }
}