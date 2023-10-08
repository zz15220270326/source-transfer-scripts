import '../assets/css/reset.scss';
import '../assets/css/index.scss';

import { getHtmlElement } from '../libs/utils';
import { VideoListTable, VideoListPagination } from '../modules/index';

;(() => {
  const oVideoListTable: HTMLElement | null = getHtmlElement('.J_VideoListTable');
  const oVideoListPagination: HTMLElement | null = getHtmlElement('.pagination-container');

  const init = () => {
    oVideoListTable && new VideoListTable(oVideoListTable).init();
    oVideoListPagination && new VideoListPagination(oVideoListPagination).init();
  }

  init();
})();