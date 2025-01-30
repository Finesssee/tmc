type EventCallback = () => void;

class EventEmitter {
  private listeners: { [key: string]: EventCallback[] } = {};

  subscribe(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  emit(event: string) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback());
    }
  }
}

export const eventEmitter = new EventEmitter();
export const TASKS_UPDATED = 'TASKS_UPDATED';
export const CATEGORIES_UPDATED = 'CATEGORIES_UPDATED'; 