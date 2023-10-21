import '../assets/css/reset.scss';
import '../assets/css/index.scss';

import { getHtmlElement } from '../libs/utils';

import DomModule from '../modules/DomModule';
import { ItemsLazyLoad } from '../modules/index';

;(() => {
  const el = getHtmlElement('.J_IndexPage');

  const itemsLazyLoad = new ItemsLazyLoad(el);

  const init = () => {
    DomModule.init([
      itemsLazyLoad
    ]);
  }

  init();
})();
