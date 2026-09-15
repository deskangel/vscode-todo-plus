/* IMPORT */

import * as vscode from 'vscode';
import Consts from '../../consts';
import TodoItem from '../items/todo';
import Line from './line';

/* DECORATION TYPES */

const PRIORITY_LOW = vscode.window.createTextEditorDecorationType ({
  opacity: '0.55',
  rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen
});

const PRIORITY_HIGH = vscode.window.createTextEditorDecorationType ({
  color: 'rgba(0, 0, 0, 0)',
  rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
  before: {
    color: '#f14c4c',
    contentText: '!',
    fontWeight: 'bold',
    margin: '0 -1ch 0 0'
  }
});

const PRIORITY_CRITICAL = vscode.window.createTextEditorDecorationType ({
  color: 'rgba(0, 0, 0, 0)',
  rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen,
  before: {
    color: '#f14c4c',
    contentText: '!!',
    fontWeight: 'bold',
    margin: '0 -1ch 0 0'
  }
});

/* PRIORITY */

class Priority extends Line {

  TYPES = [PRIORITY_LOW, PRIORITY_HIGH, PRIORITY_CRITICAL];

  getSymbolRange ( todo: TodoItem ) {

    const match = todo.text.match ( Consts.regexes.todoSymbol );

    if ( !match ) return;

    const start = todo.range.start.character + match[0].indexOf ( match[1] ),
          end = start + match[1].length;

    return new vscode.Range ( todo.range.start.line, start, todo.range.start.line, end );

  }

  getDecorations ( todos: TodoItem[] ) {

    const lowRanges = [],
          highRanges = [],
          criticalRanges = [];

    todos.forEach ( todo => {

      if ( todo.hasTag ( Consts.regexes.tagPriorityLow ) ) {
        lowRanges.push ( todo.range );
      }

      if ( todo.hasTag ( Consts.regexes.tagPriorityCritical ) ) {
        const symbolRange = this.getSymbolRange ( todo );
        if ( symbolRange ) criticalRanges.push ( symbolRange );
      } else if ( todo.hasTag ( Consts.regexes.tagPriorityHigh ) ) {
        const symbolRange = this.getSymbolRange ( todo );
        if ( symbolRange ) highRanges.push ( symbolRange );
      }

    });

    return [
      { type: PRIORITY_LOW, ranges: lowRanges },
      { type: PRIORITY_HIGH, ranges: highRanges },
      { type: PRIORITY_CRITICAL, ranges: criticalRanges }
    ];

  }

}

/* EXPORT */

export default Priority;
