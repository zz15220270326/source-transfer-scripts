import '../assets/css/reset.scss';
import '../assets/css/sourceList.scss';

import { getHtmlElement } from '../libs/utils';

import {
  VideoListTable,
  VideoListPagination,
  SearchBar
} from '../modules/sourceList';
import {
  BackTop,
  Selector
} from '../modules/common';
import DomModule from '../modules/DomModule';

;(() => {
  const oSearchBar: HTMLElement | null = getHtmlElement('.J_SearchBar');
  const oSourceTypeSelector: HTMLElement | null = getHtmlElement('.J_SourceTypeSelector');

  const oVideoListTable: HTMLElement | null = getHtmlElement('.J_VideoListTable');
  const oVideoListPagination: HTMLElement | null = getHtmlElement('.pagination-container');
  const oBackTop: HTMLElement | null = getHtmlElement('.J_BackTop');

  const videoListTable = new VideoListTable(oVideoListTable);
  const videoListPagination = new VideoListPagination(oVideoListPagination);
  const searchBarTypeSelector = new Selector(oSourceTypeSelector);
  const searchBar = new SearchBar(
    oSearchBar,
    videoListPagination,
    searchBarTypeSelector
  );
  const backTop = new BackTop(oBackTop, {
    scrollElement: getHtmlElement('.inner'),
    minHeight: 300
  });

  const init = () => {
    DomModule.init([
      videoListTable,
      videoListPagination,
      searchBarTypeSelector,
      searchBar,
      backTop
    ]);
  }

  init();
})();
