import DomModule from '../DomModule';
import { debounce, getHtmlElement, throttle } from '../../libs/utils';

interface IBackTopOptions {
  /** 显示高度的最小位置 （单位：px） */
  minHeight: number;

  /** 是否瞬间滚动回到顶点 */
  immediate: boolean;

  /** 滚动回到顶部所需要的时间 (immediate 为 false 才能生效) */
  scrollTime: number;

  /** 需要滚动的元素 */
  scrollElement: Window | HTMLElement,
}

class BackTop extends DomModule {
  private static defaultOptions: IBackTopOptions = {
    minHeight: 350,
    immediate: false,
    scrollTime: 150,
    scrollElement: window,
  };

  /** 当前的 BackTop 元素 */
  private el: HTMLElement;

  /** 显示高度的最小位置 （单位：px） */
  private minHeight: number;

  /** 是否瞬间滚动回到顶点 */
  private immediate: boolean;

  /** 滚动回到顶部所需要的时间 (immediate 为 false 才能生效) */
  private scrollTime: number;

  /** 当前滚动的元素 */
  private scrollElement: Window | HTMLElement;

  constructor(el: HTMLElement, userOptions: Partial<IBackTopOptions> = {}) {
    super();
    
    const options: IBackTopOptions = {
      ...BackTop.defaultOptions,
      ...userOptions,
    };

    this.el = getHtmlElement(el);
    this.minHeight = options.minHeight;
    this.immediate = options.immediate;
    this.scrollTime = options.scrollTime;
    this.scrollElement = options.scrollElement;
  }

  protected override initDom(): void {
  }

  protected override bindEvent(): void {
    this.scrollElement.addEventListener('scroll', this.handleDomScroll, false);
    this.el.addEventListener('click', this.handleBackTopClick, false);
  }

  private getScrollElementTop(): number {
    if (this.scrollElement instanceof Window) {
      return this.scrollElement.pageYOffset;
    }
    return this.scrollElement.scrollTop;
  }

  handleDomScroll = throttle(() => {
    const { minHeight } = this;
    const scrollTop: number = (
      document.documentElement.scrollTop
        || document.body.scrollTop
        || this.getScrollElementTop()
    );

    if (scrollTop >= minHeight) {
      this.el.classList.add('active');
    } else {
      this.el.classList.remove('active');
    }
  }, 500)

  handleBackTopClick = debounce(() => {
    console.log('click');
    const { immediate, scrollTime } = this;

    if (immediate) {
      this.scrollElement.scrollTo(0, 0);
    } else {
      this.scrollDuration(scrollTime);
    }
  }, 150)

  scrollDuration(scrollTime: number) {
    const scrollTop : number = document.documentElement.scrollTop || document.body.scrollTop || this.getScrollElementTop();
    const speed = scrollTop / scrollTime;

    let t = setInterval(() => {
      document.documentElement.scrollTop -= speed;
      if (this.scrollElement instanceof HTMLElement) {
        this.scrollElement.scrollTop -= speed;
      }
      const curScrollTop = document.documentElement.scrollTop || document.body.scrollTop || this.getScrollElementTop();
      if (curScrollTop <= 0) {
        clearInterval(t);
        t = null;
      }
    });
  }
}

export default BackTop;
