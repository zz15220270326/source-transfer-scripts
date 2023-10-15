import DomModule from '../DomModule';
import { getHtmlElement, getLocationHref } from '../../libs/utils';
import VideoListPagination from './VideoListPagination';
import { Selector } from '../common';

class SearchBar extends DomModule {
  private el: HTMLElement;

  private oSearchInput: HTMLInputElement;

  private oSearchBtn: HTMLElement;

  private oSourceTypeSelector: HTMLElement;

  private videoListPagination: VideoListPagination;

  private searchBarTypeSelector: Selector;

  constructor(
    el: HTMLElement,
    videoListPagination: VideoListPagination,
    searchBarTypeSelector: Selector
  ) {
    super();
    this.el = el;
    this.videoListPagination = videoListPagination;
    this.searchBarTypeSelector = searchBarTypeSelector;
  }

  protected initDom(): void {
    this.oSearchInput = getHtmlElement<HTMLInputElement>('.J_SearchBarInput', this.el);
    this.oSearchBtn = getHtmlElement<HTMLElement>('.J_SearchBarBtn', this.el);
    this.oSourceTypeSelector = getHtmlElement<HTMLElement>('.J_SourceTypeSelector', this.el);
  }

  protected bindEvent(): void {
    this.oSearchBtn.addEventListener('click', this.handleSearchBtnClick.bind(this), false);
    this.oSearchInput.addEventListener('keydown', this.handleEnterSearch.bind(this), false);
  }

  private handleSearch(): void {
    const keyword = this.oSearchInput.value.trim();
    const sourceType = this.searchBarTypeSelector.getValue();
    const { pageSize } = this.videoListPagination.getPageInfo();

    location.href = getLocationHref(location.pathname, {
      keyword,
      page: 1,
      source_type: sourceType,
      page_size: pageSize,
    });
  }

  private handleSearchBtnClick(): void {
    this.handleSearch();
  }

  private handleEnterSearch(e: KeyboardEvent): void {
    const code = e.code.toLowerCase();

    if (code.includes('enter')) {
      this.handleSearch();
    }
  }
}

export default SearchBar;
