import DomModule from '../DomModule';

import { getHtmlElement, lazyLoadImg, debounce } from '../../libs/utils';

class ItemsLazyLoad extends DomModule {
  private el: HTMLElement;

  private oInner: HTMLElement;

  private oImgItems: HTMLElement[];

  constructor(el: HTMLElement) {
    super();
    this.el = el;
  }

  protected initDom(): void {
    this.oInner = getHtmlElement('.inner', this.el);
    this.oImgItems = [...this.el.getElementsByClassName('page-list-item') as HTMLCollectionOf<HTMLElement>];

    lazyLoadImg(
      this.oImgItems,
      document.documentElement.clientHeight,
      document.documentElement.scrollTop,
    );
  }

  protected bindEvent(): void {
    this.oInner.addEventListener('scroll', debounce(this.handleScroll.bind(this), 150), false);
  }

  private handleScroll(e: Event): void {
    console.log('scroll');
    const clientHeight = this.el.clientHeight;
    const scrollTop = this.oInner.scrollTop || document.body.scrollTop || document.documentElement.scrollTop;

    lazyLoadImg(
      this.oImgItems,
      clientHeight,
      scrollTop
    );
  }
}

export default ItemsLazyLoad;
