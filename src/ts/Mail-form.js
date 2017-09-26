export default class MailForm {
  constructor($target) {
    this.$target = $target;
    this.$errorMessage = this.$target.find('.js-mail-form-message');
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
    let datas;

    if(location.search === '') {
      datas = this.$target.serialize();
    } else {
      datas = this.$target.serialize() + '&' + location.search.substring(1);
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
        if(obj.message[0].match(/already exist/)) {
          this.$errorMessage.empty().addClass('is-error').append('このメールアドレスは既に登録されています');
          return false;
        } else {
          this.$errorMessage.empty().addClass('is-error').append('入力内容に誤りがあります');
          return false;
        }
      } else {
        this.$errorMessage.empty().addClass('is-success').append('メルマガ登録 完了しました');
        return false;
      }
    })
    .fail(() => {
        this.$errorMessage.empty().addClass('is-error').append('送信に失敗しました');
    });
  }
}
