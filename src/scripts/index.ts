import '../assets/css/reset.scss';
import '../assets/css/index.scss';

import { getHtmlElement } from '../libs/utils';

import { VideoListTable, VideoListPagination, SearchBar } from '../modules/index';
import { BackTop } from '../modules/common';
import DomModule from '../modules/DomModule';

;(() => {
  const oSearchBar: HTMLElement | null = getHtmlElement('.J_SearchBar');
  const oVideoListTable: HTMLElement | null = getHtmlElement('.J_VideoListTable');
  const oVideoListPagination: HTMLElement | null = getHtmlElement('.pagination-container');
  const oBackTop: HTMLElement | null = getHtmlElement('.J_BackTop');

  const videoListTable = new VideoListTable(oVideoListTable);
  const videoListPagination = new VideoListPagination(oVideoListPagination);
  const searchBar = new SearchBar(oSearchBar, videoListPagination);
  const backTop = new BackTop(oBackTop);

  const init = () => {
    DomModule.init([
      videoListTable,
      videoListPagination,
      searchBar,
      backTop
    ]);
  }

  init();
})();
