import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Message} from "../../shared/models/message.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  getMessages(conversationId: string): Observable<Message[]>{
    return this.http.get<Message[]>(`${environment.baseUrl}/conversation/${conversationId}/messages`);
  }

  getLastMessage(conversationId: string): Observable<Message>{
    return this.http.get<Message>(`${environment.baseUrl}/conversation/${conversationId}/last-message`);
  }

  sendMessage(conversationId: string, message: Message): Observable<void>{
    return this.http.post<void>(`${environment.baseUrl}/conversation/${conversationId}/message`, message);
  }
}
