import {Injectable} from '@angular/core';
import {Me} from "../../models/users/Me.model";
import {UserType} from "../../enum/UserType.enum";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private tokenKey = 'authToken';  // Key for storing the token
  private meKey = 'meData';        // Key for storing user data
  private static meKey: string;
  private static tokenKey: string;

  constructor() {}


  clean(): void {
    window.sessionStorage.clear();
  }

  saveToken(token: string) {

    window.localStorage.removeItem(this.tokenKey);
    window.localStorage.setItem(this.tokenKey, token);
    // window.location.reload();
  }

  saveMeData(meData: Me) {
    window.localStorage.removeItem(this.meKey);
    localStorage.setItem(this.meKey, JSON.stringify(meData));  // Save user data
  }

  static fetchMeData(): Me | null {
    const savedData = localStorage.getItem(this.meKey);
    if (savedData) {
      try {
        return JSON.parse(savedData) as Me;
      } catch (error) {
        console.error('Error parsing saved data:', error);
        return null;
      }
    }
    return null;
  }

  getProfileId(): string | undefined | null {
    const savedData = localStorage.getItem(this.meKey);
    if (savedData) {
      try {
        let parse = JSON.parse(savedData) as Me;
        return parse?.profileDto?.id;
      } catch (error) {
        console.error('Error parsing saved data:', error);
        return null;
      }
    }
    return null;
  }


  clearMeData(): void {
    localStorage.removeItem(this.meKey); // Clear the stored data
  }


  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.meKey);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.tokenKey);
  }

  static logOut() {
    window.localStorage.clear();
  }

  isAdmin(): boolean {
    const item = localStorage.getItem(this.meKey);
    if (item) {
      const userData = JSON.parse(item);
      return userData.userType === UserType.ADMIN;
    }
    return false;
  }

}
