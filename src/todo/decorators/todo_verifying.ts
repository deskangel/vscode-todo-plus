/* IMPORT */

import * as vscode from 'vscode';
import Consts from '../../consts';
import TodoVerifyingItem from '../items/todo_verifying';
import Line from './line';

/* DECORATION TYPES */

const TODO_VERIFYING = vscode.window.createTextEditorDecorationType ({
  color: Consts.colors.verifying,
  rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
  dark: {
    color: Consts.colors.dark.verifying
  },
  light: {
    color: Consts.colors.light.verifying
  }
});

/* TODO VERIFYING */

class TodoVerifying extends Line {

  TYPES = [TODO_VERIFYING];

  getItemRanges ( todoVerifying: TodoVerifyingItem, negRange?: vscode.Range | vscode.Range[] ) {

    return [this.getRangeDifference ( todoVerifying.text, todoVerifying.range, negRange || [Consts.regexes.tag, Consts.regexes.formattedCode] )];

  }

}

/* EXPORT */

export default TodoVerifying;

