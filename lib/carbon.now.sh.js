'use babel';

import { remote } from 'electron';
import { CompositeDisposable, notifications, workspace } from 'atom';

import { getCarbonURL } from './generate-url';

export default {
    subscriptions: null,

    activate(state) {
        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'carbon.now.sh:toggle': () => this.toggle(),
            })
        );
    },

    deactivate() {
        this.subscriptions.dispose();
    },

    serialize() {
        return {};
    },

    toggle() {
        console.log('Carbon.now.sh was toggled!');
        const editor = atom.workspace.getActiveTextEditor();

        if (!editor)
            return atom.notifications.addError('😱 Please feed me code!');

        const url = getCarbonURL(
            editor.getSelectedText() ||
                (() => {
                    editor.selectLinesContainingCursors();

                    return editor.getSelectedText();
                })()
        );

        url
            ? new remote.BrowserWindow().loadURL(url)
            : atom.notifications.addError(
                  'Selected code is longer than 500 characters, refusing to send to carbon.'
              );
    },
};
