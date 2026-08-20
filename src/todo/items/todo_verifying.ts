/* IMPORT */

import Consts from '../../consts';
import Item from './item';
import Todo from './todo';

/* TODO VERIFYING */

class TodoVerifying extends Todo {

  static is ( str: string ) {

    return Item.is ( str, Consts.regexes.todoVerifying );

  }

}

/* EXPORT */

export default TodoVerifying;

