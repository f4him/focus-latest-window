import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Shell from 'gi://Shell';

export default class StealMyFocusExtension {
    constructor() {
        this._handlerId = null;
        this._tracker = null; 
    }

    enable() {
        this._tracker = Shell.WindowTracker.get_default();

        this._handlerId = global.display.connect(
            'window-demands-attention',
            (display, window) => {
                Main.activateWindow(window);
            }
        );
    }

    disable() {
        if (this._handlerId !== null) {
            global.display.disconnect(this._handlerId);
            this._handlerId = null;
        }
        this._tracker = null;
    }
}
