export default class FooterContactForm {
  constructor($target) {
    this.$target = $target;
    this.$errorMessage = this.$target.find('.js-footer-contact-form-message');
    this.init();
  }
  init() {
    this.bindEvent();
  }
  bindEvent() {
    this.$target.on('submit', (e) => {
      e.preventDefault();
      this.onSubmit();
    });
  }
  onSubmit() {
    let datas = this.$target.serialize();

    if(this.$target.serializeArray()[0].value === '') {
      this.$errorMessage.empty().addClass('is-error').append('内容を入力の上、ご送信ください');
      return false;
    }

    $.ajax({
      url: this.$target.attr('action'),
      type: 'post',
      dataType: 'json',
      data: datas,
      timeout: 100000
    })
    .done((obj) => {
      if(obj.status === '0') {
        this.$errorMessage.empty().addClass('is-error').append('入力内容に誤りがあります');
        return false;
      } else {
        this.$errorMessage.empty().addClass('is-success').append('送信が完了しました');
        return false;
      }
    })
    .fail(() => {
        this.$errorMessage.empty().addClass('is-error').append('送信に失敗しました');
    });
  }
}
