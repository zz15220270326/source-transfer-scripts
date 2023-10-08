abstract class DomModule {
  /** 初始化操作方法 */
  public init() {
    this.initDom();
    this.bindEvent();
  }

  /** 初始化 dom 元素 */
  protected abstract initDom(): void;

  /** 给 dom 元素绑定事件处理函数 */
  protected abstract bindEvent(): void;

  public static init(modules: DomModule[]) {
    modules.forEach(module => module.init());
  }
}

export default DomModule;
