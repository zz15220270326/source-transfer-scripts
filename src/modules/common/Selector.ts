import DomModule from '../DomModule';

import { getHtmlElement } from '../../libs/utils';

class Selector extends DomModule {
  private el: HTMLElement;

  private oDisplayInput: HTMLInputElement;

  private oSelectorList: HTMLElement;

  private oSelectorListItems: HTMLElement[];

  private change: (newValue: string, oldValue?: string) => void;

  constructor(el: HTMLElement, handleValueChange?: (newValue: string) => void) {
    super();
    this.el = el;
    this.change = handleValueChange || (() => {});
  }

  protected initDom(): void {
    this.oDisplayInput = getHtmlElement<HTMLInputElement>('.filter-text', this.el);
    this.oSelectorList = getHtmlElement<HTMLElement>('.selector-list', this.el);
    this.oSelectorListItems = [...this.oSelectorList.querySelectorAll('.selector-item')] as HTMLElement[];
  }

  protected bindEvent(): void {
    this.el.addEventListener('mouseenter', this.handleElEnterLeave.bind(this), false);
    this.oDisplayInput.addEventListener('mouseenter', this.handleElEnterLeave.bind(this), false);
    this.el.addEventListener('mouseleave', this.handleElEnterLeave.bind(this), false);
    this.el.addEventListener('click', this.handleSelectorClick.bind(this), false);
  }

  private handleElEnterLeave(ev: Event) {
    const e = ev || window.event;
    const evType = e.type.toLowerCase();
    const { oSelectorList } = this;

    switch (evType) {
      case 'mouseenter':
        oSelectorList.classList.add('active');
        break;
      case 'mouseleave':
        oSelectorList.classList.remove('active');
        break;
      default:
        break;
    }
  }

  private handleSelectorClick(ev: Event) {
    /**
     * 1. 如果点击到了 listItem
     *    - 获取 listItem 元素上面绑定的值 data-vaue
     *    - 设置 el.active
     *    - 设置 el.data-value
     *    - 设置 oDisplayInput 的值
     *    - 给一个回调 (外部根据这个回调来继续完成接下来的任务)
     */
    const e = ev || window.event;
    const el = (e.target || e.srcElement) as HTMLElement;
    const elClassList = el.className.split(' ');

    if (elClassList) {
      const value: string = el.getAttribute('data-value');
      this.setListItemActive(value);
      this.setElDataValue(value);
      this.setDisplayInput(value);
      this.change(value);
    }
  }

  private setListItemActive(value: string) {
    this.oSelectorListItems.forEach(el => {
      const elValue = el.getAttribute('data-value');
      if (elValue == value) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  private setElDataValue(value: string) {
    this.el.setAttribute('data-value', value);
  }

  private setDisplayInput(value: string) {
    this.oSelectorListItems.forEach((el) => {
      const elValue = el.getAttribute('data-value');
      if (elValue === value) {
        this.oDisplayInput.value = `当前选择 ：${el.innerText}`;
      }
    });
  }

  public getValue(): string {
    const { el } = this;
    const value = el.getAttribute('data-value') || '';
    return value;
  }
}

export default Selector;
