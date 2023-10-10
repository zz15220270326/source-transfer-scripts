import DomModule from '../DomModule';
import { debounce, getHtmlElement, throttle } from '../../libs/utils';

interface IBackTopOptions {
  /** 显示高度的最小位置 （单位：px） */
  minHeight: number;

  /** 是否瞬间滚动回到顶点 */
  immediate: boolean;

  /** 滚动回到顶部所需要的时间 (immediate 为 false 才能生效) */
  scrollTime: number;
}

class BackTop extends DomModule {
  private static defaultOptions: IBackTopOptions = {
    minHeight: 350,
    immediate: false,
    scrollTime: 150
  };

  /** 当前的 BackTop 元素 */
  private el: HTMLElement;

  /** 显示高度的最小位置 （单位：px） */
  private minHeight: number;

  /** 是否瞬间滚动回到顶点 */
  private immediate: boolean;

  /** 滚动回到顶部所需要的时间 (immediate 为 false 才能生效) */
  private scrollTime: number;

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
  }

  protected override initDom(): void {
  }

  protected override bindEvent(): void {
    window.addEventListener('scroll', this.handleDomScroll, false);
    this.el.addEventListener('click', this.handleBackTopClick, false);
  }

  handleDomScroll = throttle(() => {
    const { minHeight } = this;
    const scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop;

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
      window.scrollTo(0, 0);
    } else {
      this.scrollDuration(scrollTime);
    }
  }, 300)

  scrollDuration(scrollTime: number) {
    const scrollTop : number = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(scrollTop);
    const speed = scrollTop / scrollTime;

    let t = setInterval(() => {
      document.documentElement.scrollTop -= speed;
      const curScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (curScrollTop <= 0) {
        clearInterval(t);
        t = null;
      }
    });
  }
}

export default BackTop;
