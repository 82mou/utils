const TRANSITION_END = 'transitionend';
window.scrollPos;
window.stickyHeaderFlg;

export default class NavSp {
  constructor(targetContents, targetBtn, targetBodyClass, bodyClassObj) {
    this.$target = $(targetContents);
    this.$targetBtn = $(targetBtn);
    this.$wrapper = $('#js-wrapper');
    this.$body = $('body');
    this.$stickyHeader = $('.js-sticky-header');
    this.$window = $(window);
    this.targetBodyClass = targetBodyClass;
    this.bodyClassObj = bodyClassObj;
    this.init();
  }
  init() {
    this.bindEvent();
  }
  bindEvent() {
    this.$targetBtn.on('click', (e) => {
      e.preventDefault();
      this.slideManager();
      // 再bind防止のためunbind
      this.$target.off(TRANSITION_END);
      this.slideToggle();
    });
  }
  slideManager() {
    this.slideToggle = this.$body.hasClass(this.targetBodyClass) ? this.slideClose : this.slideOpen;
  }
  slideOpen() {
    if(this.$body.hasClass(this.targetBodyClass)) {
      return;
    }
    // スクロール位置を保存
    window.scrollPos = this.$window.scrollTop() > 1 ? this.$window.scrollTop() : Math.abs(parseInt(this.$wrapper.css('top'), 10));
    // bodyについてるis-active,is-active--searchを削除
    for(let i = 0; this.bodyClassObj.length > i; i++) {
      this.$body.removeClass(this.bodyClassObj[i]);
    }
    // bodyにナビを表示するためのclassを付与
    this.$body.addClass(this.targetBodyClass);
    // 保存したスクロール量分wrapperをずらす
    this.$wrapper.css({
      'top': -window.scrollPos
    });
  }
  slideClose() {
    if(!this.$body.hasClass(this.targetBodyClass)) {
      return;
    }
    this.$body.removeClass(this.targetBodyClass);
    // 閉じるときの位置の記憶を解除
    this.$wrapper.css({
      'top': ''
    });
    $('html, body').animate({
      scrollTop: window.scrollPos
    }, 0);
  }
}
