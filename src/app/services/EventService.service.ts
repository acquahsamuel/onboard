import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { map, filter } from "rxjs/operators";
import { CLIENTDATA } from "../pages/ghana-card/interface";

interface Event {
  type: string;
  payload?: any;
}

type EventCallback = (payload: any) => void;

@Injectable({
  providedIn: "root",
})
export class EventServiceService {
  private handler = new Subject<Event>();
  private _cardData = new BehaviorSubject<CLIENTDATA | null>(null);

  constructor() {}

  broadcast(type: "DashboardData", payload = {}) {
    this.handler.next({ type, payload });
  }

  public get cardData(): Observable<CLIENTDATA | null> {
    return this._cardData.asObservable();
  }

  public setCardData(data: CLIENTDATA) {
    this._cardData.next(data);
  }

  /**
   * Subscribe to event
   * @param type type of event
   * @param callback call back function
   */
  subscribe(type: "DashboardData", callback: EventCallback): Subscription {
    return this.handler
      .pipe(filter((event) => event.type === type))
      .pipe(map((event) => event.payload))
      .subscribe(callback);
  }
}
