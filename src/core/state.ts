export const AppState = {
    LOADING: 'LOADING',
    READY: 'READY',
    DETECTING: 'DETECTING',
    EVENT: 'EVENT',
    ERROR: 'ERROR'
} as const;

export type AppState = typeof AppState[keyof typeof AppState];

type StateListener = (state: AppState) => void;

export class StateSystem {
    private currentState: AppState = AppState.LOADING;
    private listeners: StateListener[] = [];

    get state(): AppState {
        return this.currentState;
    }

    set state(newState: AppState) {
        if (this.currentState !== newState) {
            console.log(`[StateSystem] Transition: ${this.currentState} -> ${newState}`);
            this.currentState = newState;
            this.notify();
        }
    }

    addListener(listener: StateListener) {
        this.listeners.push(listener);
        listener(this.currentState);
    }

    removeListener(listener: StateListener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    private notify() {
        this.listeners.forEach(l => l(this.currentState));
    }
}

export const appState = new StateSystem();
