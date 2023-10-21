import '../assets/css/reset.scss';
import '../assets/css/index.scss';

import { getHtmlElement } from '../libs/utils';

import DomModule from '../modules/DomModule';
import { ItemsLazyLoad } from '../modules/index';
import { BackTop } from '../modules/common';

;(() => {
  const el = getHtmlElement('.J_IndexPage');
  const oBackTop: HTMLElement | null = getHtmlElement('.J_BackTop');

  const itemsLazyLoad = new ItemsLazyLoad(el);
  const backTop = new BackTop(oBackTop, {
    scrollElement: getHtmlElement('.inner', el),
    minHeight: 200
  });

  const init = () => {
    DomModule.init([
      itemsLazyLoad,
      backTop
    ]);
  }

  init();
})();
