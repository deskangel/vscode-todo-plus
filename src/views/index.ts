
/* IMPORT */

import Embedded from './embedded';
import Files from './files';
import Config from '../config';

/* EXPORT */

export default () => Config.getKey ( 'embedded.enabled' ) === false ? [Files] : [Files, Embedded];
