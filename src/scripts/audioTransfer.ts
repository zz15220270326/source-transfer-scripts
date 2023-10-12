import '../assets/css/reset.scss';
import '../assets/css/audioTransfer.scss';

import DomModule from '../modules/DomModule';
import { getHtmlElement } from '../libs/utils';

;(() => {
  const init = () => {
    DomModule.init([]);
  }

  init();
})();
