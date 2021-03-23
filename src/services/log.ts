import 'colors';

export class Log {
  static timestamp() {
    return new Date().toString().slice(16, 24);
  }

  static info(message) {
    console.log(`[${this.timestamp().cyan}] ${message}`);
  }
}
