class _EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(listener);
    }

    emit(event, payload, numberTabs) {
        if (this.events[event]) {
            this.events[event].forEach(listener => {
                listener(payload, numberTabs);
            });
        }
    }

    remove() {
        this.events = {};
    }
}

export const EventEmitter = new _EventEmitter();