
type dispositivos = {
  'id': "number",
  'local': 'string',
  'status': 'string',
  'alert': 'boolean',
  'controle': 'string',
  'energia': 'number',
  'date': 'string'
}



// observer.ts
export interface Observer {
    update(data: dispositivos): void;
  }
  
  export class Subject {
    private observers: Observer[] = [];
  
    subscribe(observer: Observer) {
      this.observers.push(observer);
    }
  
    unsubscribe(observer: Observer) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    notify(data: dispositivos) {
      this.observers.forEach(observer => observer.update(data));
    }
  }
  