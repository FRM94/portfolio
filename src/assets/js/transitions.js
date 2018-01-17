'use: strict';

function scrollToTop(el) {
	el.scrollTop = 0;
}

function toggleSections() {
	let parent = document.querySelector('.container');
	let items = document.querySelectorAll('.section');

	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function () {
			for (let x = 0; x < items.length; x++) {
				// Item opened
				parent.classList.add('active');
				if (this.parentElement.classList.contains('stacked')) {
					this.parentElement.classList.add('active');
					parent.classList.add('no-direct');
				}
				// Switched
				if (!this.classList.contains('active')) {
					this.classList.add('active');
					let content = items[i].querySelector('.section__content');
					scrollToTop(content);
				}
				if (items[x].classList.contains('active') && items[x] !== this) {
					items[x].classList.remove('active');
					if (items[x].parentElement.classList.contains('stacked')) {
						items[x].parentElement.classList.remove('active');
						parent.classList.remove('no-direct');
					}
				}
			}
		});
		let exit = items[i].querySelector('.content__close');
		exit.addEventListener('click', function (e) {
			e.stopPropagation();
			items[i].classList.remove('active');
			parent.classList.remove('active');
			if (items[i].parentElement.classList.contains('stacked')) {
				items[i].parentElement.classList.remove('active');
				parent.classList.remove('no-direct');
			}
			let content = items[i].querySelector('.section__content');
			setTimeout(function () {
				scrollToTop(content);
			}, 500);
		});
	}
}
toggleSections();
