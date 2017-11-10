'use babel';

import { remote } from 'electron';
import { CompositeDisposable, notifications, workspace } from 'atom';

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

        console.log(remote, remote.BrowserWindow);

        if (!editor)
            return atom.notifications.addError('😱 Please feed me code!');

        const url = `https://carbon.now.sh/?bg=rgba(0,0,0,0)&t=dracula&l=auto&ds=true&wc=true&wa=true&pv=43px&ph=57px&ln=false&code=${encodeURI(
            editor.getText()
        )}`;

        // atom.notifications.addSuccess(url);

        (new remote.BrowserWindow()).loadURL(url);
    },
};
