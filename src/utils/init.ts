
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import Consts from '../consts';
import * as Commands from '../commands';
import Views from '../views';

/* INIT */

const Init = {

  commands ( context: vscode.ExtensionContext ) {

    const {commands} = vscode.extensions.getExtension ( 'fabiospampinato.vscode-todo-plus' ).packageJSON.contributes;

    async function saveEditor ( textEditor?: vscode.TextEditor ) {
      if ( !textEditor || !textEditor.document.isDirty || textEditor.document.isUntitled ) return;
      await textEditor.document.save ();
    }

    commands.forEach ( ({ command, title }) => {

      const commandName = _.last ( command.split ( '.' ) ) as string,
            handler = Commands[commandName],
            disposable = vscode.commands.registerCommand ( command, async ( ...args ) => {

              const prevTextEditor = vscode.window.activeTextEditor,
                    result = await handler ( ...args ),
                    nextTextEditor = vscode.window.activeTextEditor;

              await saveEditor ( prevTextEditor );
              if ( nextTextEditor !== prevTextEditor ) await saveEditor ( nextTextEditor );

              return result;

            });

      context.subscriptions.push ( disposable );

    });

    return Commands;

  },

  language () {

    vscode.languages.setLanguageConfiguration ( Consts.languageId, {
      wordPattern: /(-?\d*\.\d\w*)|([^\-\`\~\!\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
      indentationRules: {
        increaseIndentPattern: Consts.regexes.project,
        decreaseIndentPattern: Consts.regexes.impossible
      }
    });

  },

  views () {

    Views ().forEach ( View => {
      vscode.window.registerTreeDataProvider ( View.id, View );
    });

    vscode.workspace.onDidChangeConfiguration ( () => {
      Views ().forEach ( View => View.refresh () );
    });

  }

};

/* EXPORT */

export default Init;
