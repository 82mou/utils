export default class FbResize {
	constructor() {
		this.$window = $(window);
		this.windowWidth = this.$window.width();
		this.htmlStr = $('#js-fb').html();
		this.timer = null;
	}
	init() {
		this.bindEvent();
	}
	bindEvent() {
		this.$window.on('resize.facebook-widget',() => this.resize());
	}
	resize() {
		let resizedWidth = this.$window.width();
		if(this.windowWidth !== resizedWidth && resizedWidth < 1025) {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				$('#js-fb').html(this.htmlStr);
				window.FB.XFBML.parse();
				//window.FB.XFBML.parse()で再レンダリングします。
				this.windowWidth = this.$window.width();
			}, 500);
		} else {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				$('#js-fb').html(this.htmlStr);
				window.FB.XFBML.parse();
				//window.FB.XFBML.parse()で再レンダリングします。
				this.windowWidth = 500;
			}, 500);
		}
	}
}
