(function (window) {
	var textareaResize = function() {
		var textareaArray = document.querySelectorAll('textarea');
		var heightLimit = 200;

		textareaArray.forEach(function (textarea) {
			textarea.oninput = function() {
				textarea.style.height = '';
				textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + 'px';
			};
		});
	};

	var proyectsScroll = (function() {
		var instance;

		function init() {
			var proyects = document.getElementById('proyects');
			var firstChild = document.querySelector('.proyect');
			var mouseX;
			var centerX = window.innerWidth/2;
			var elMargin = window.getComputedStyle(firstChild).getPropertyValue('margin-left');
			var val = parseInt(elMargin.replace('px',''));
			var isScrolling = true;
			var proyectsBtn = document.querySelectorAll('.js-btn');
			
			var _setBtnText = function(btn) {
				var pauseIcon = document.createElement('i');
				var stopText = document.createTextNode('  Detener');
				pauseIcon.classList.add('fa', 'fa-pause');
				btn.innerHTML = '';
				btn.appendChild(pauseIcon);
				btn.appendChild(stopText);
			};

			proyectsBtn.forEach(function(btn) {
				var btnText = btn.innerText;
				_setBtnText(btn);
				
				btn.addEventListener('mouseover', function() {
					isScrolling = false;
					this.innerHTML = btnText;
				});
	
				btn.addEventListener('mouseout', function () {
					isScrolling = true;
					_setBtnText(btn);
				});
			});

			proyects.addEventListener('mouseover', function() {
				mouseX = event.clientX;		
			});
	
			setInterval(function() {
				if (mouseX < centerX && isScrolling && window.innerWidth-firstChild.offsetWidth*2 >= val) {
					firstChild.style.marginLeft = val + 'px';
					val += (centerX - mouseX)/150;
				} else if (mouseX > centerX && isScrolling && -(window.innerWidth-firstChild.offsetWidth*2) <= val+firstChild.offsetWidth*2) {				
					firstChild.style.marginLeft = val + 'px';
					val -= (mouseX-centerX)/150;
				}
			}, 10);
		}
		return {
			getInstance: function () {

				if (!instance) {
					instance = init();
				}

				return instance;
			}
		};
	})();

	var mediaQueries = function () {
		var mq;

		if (matchMedia) {
			mq = window.matchMedia('(min-width: 1024px)');
			mq.addListener(proyectWidth);
			proyectWidth(mq);
		}

		function proyectWidth(mq) {
			if (mq !== undefined) {
				if (mq.matches) {
					proyectsScroll.getInstance();
				}
			}
		}
	};

	var init = function () {
		textareaResize();
		mediaQueries();
	};

	window.app = {
		init: init
	};

}(window));

(function(w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'dataLayer', 'GTM-5878F3K');

window.addEventListener('load', function () {
	window.app.init();
});
