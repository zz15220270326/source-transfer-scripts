import DomModule from '../DomModule';

class VideoListPagination extends DomModule {
  private el: HTMLElement;

  private page: number;

  private pageSize: number;

  constructor(el: HTMLElement) {
    super();
    this.el = el;

    this.page = 1;
    this.pageSize = 10;
  }

  override init(): void {
    super.init();
    this.initSearch();
  }

  protected initDom(): void {
    // ...
  }

  protected initSearch() {
    const { search } = location;
    if (search.length) {
      const query = search.replace('?', '').split('&').reduce<Record<string, string>>((query, str) => {
        const [key, value] = str.split('=');
        query[key] = value;
        return query;
      }, {});
      this.page = +query['page'] || 1;
      this.pageSize = +query['page_size'] || 10;
    } else {
      location.search = `?page=${this.page}&page_size=${this.pageSize}`;
    }
  }

  protected bindEvent(): void {
    this.el.addEventListener('click', this.handlePaginationClick.bind(this), false);
  }

  private handlePaginationClick(ev: Event): void {
    const e = ev || window.event;
    const tar = e.target || e.srcElement;
    
    if (!(tar instanceof HTMLElement)) return;

    const tagName = tar.tagName.toLowerCase();
    const classList = tar.className.split(' ');

    if (classList.includes('pagination-list-item')) {
      const oLink = tar.getElementsByClassName('pagination-list-item-link')[0];
      oLink instanceof HTMLElement && this.handleClickPageLink(oLink);
    }
    if (classList.includes('pagination-list-item-link')) {
      this.handleClickPageLink(tar);
    }
  }

  private handleClickPageLink(el: HTMLElement) {
    const newPage = parseInt(el.getAttribute('data-index')) + 1;

    location.href = `/?page=${newPage}&page_size=${this.pageSize}`;
  }

  private handleChangePageSize(el: HTMLElement) {}
}

export default VideoListPagination;
