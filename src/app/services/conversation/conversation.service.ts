import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Message} from "../../shared/models/message.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Conversation} from "../../shared/models/conversation.model";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getConversations(): Observable<Conversation[]>{
    return this.http.get<Conversation[]>(`${environment.baseUrl}/user/${this.authService.getUser().id}/conversations`);
  }

  getMessages(conversationId: string): Observable<Message[]>{
    return this.http.get<Message[]>(`${environment.baseUrl}/conversation/${conversationId}/messages`);
  }

  getLastMessage(conversationId: string): Observable<Message[]>{
    return this.http.get<Message[]>(`${environment.baseUrl}/conversation/${conversationId}/last-message`);
  }

  sendMessage(conversationId: string, message: Message): Observable<void>{
    return this.http.post<void>(`${environment.baseUrl}/conversation/${conversationId}/message`, message);
  }
}
