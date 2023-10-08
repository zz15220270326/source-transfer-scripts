import '../assets/css/reset.scss';
import '../assets/css/index.scss';

import { getHtmlElement } from '../libs/utils';
import { VideoListTable, VideoListPagination } from '../modules/index';
import DomModule from '../modules/DomModule';

;(() => {
  const oVideoListTable: HTMLElement | null = getHtmlElement('.J_VideoListTable');
  const oVideoListPagination: HTMLElement | null = getHtmlElement('.pagination-container');

  const init = () => {
    DomModule.init([
      new VideoListTable(oVideoListTable),
      new VideoListPagination(oVideoListPagination)
    ]);
  }

  init();
})();
