import EventEmitter from 'events';

export class Emitter {
  private static emitter = new EventEmitter();

  public static on(event: EventType, fn: () => any) {
    this.emitter.on(event, fn);
  }
  public static emit(event: EventType, data?: any) {
    this.emitter.emit(event, data);
  }
}

type EventType = 'IP_CHANGE';