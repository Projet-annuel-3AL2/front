import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Conversation} from "../../shared/models/conversation.model";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";
import {User} from "../../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getById(userId: string) {
    return this.http.get<User>(`${environment.baseUrl}/user/${userId}`);
  }

  getConversations(): Observable<Conversation[]> {
    return this.http.get<Conversation[]>(`${environment.baseUrl}/user/${this.authService.getCurrentUserId()}/conversations`);
  }
}
