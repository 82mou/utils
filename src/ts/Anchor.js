export default class Anchor {
  constructor($target) {
    this.$target = $target;
    this.bindEvent();
  }
  bindEvent() {
    this.$target.on('click', (e) => {
      e.preventDefault();
      this.scroll($(e.currentTarget));
    });
  }
  scroll($target) {
    let $targetAnchor = $($target.attr('href'));

    $('body, html').animate({ scrollTop: $targetAnchor.offset().top - 125 }, 500);
  }
};
