'use: strict';

function scrollToTop(el) {
	el.scrollTop = 0;
}

function toggleSections() {
	let parent = document.querySelector('.container');
	let items = document.querySelectorAll('.section');

	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function () {

			// Item closed (no new item opened)
			if (this.classList.contains('active')) {
				this.classList.remove('active');
				parent.classList.remove('active');

				let content = items[i].querySelector('.section__content');
				setTimeout(function () {
					scrollToTop(content);
				}, 500);

				if (this.parentElement.classList.contains('stacked')) {
					this.parentElement.classList.remove('active');
					parent.classList.remove('no-direct');
				}
			} else {
				for (let x = 0; x < items.length; x++) {
					// Switched to another item
					if (items[x].classList.contains('active')) {
						items[x].classList.remove('active');
						if (items[x].parentElement.classList.contains('stacked')) {
							items[x].parentElement.classList.remove('active');
							parent.classList.remove('no-direct');
						}
					}
				}
				// Item opened
				parent.classList.add('active');
				if (this.parentElement.classList.contains('stacked')) {
					this.parentElement.classList.add('active');
					parent.classList.add('no-direct');
				}
				this.classList.add('active');
			}
		});
	}
}
toggleSections();

function toggleProject() {



	let parent = document.querySelector('.section__content');
	let items = document.querySelectorAll('.section__project');

	console.log(items);

	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function () {

			console.log('hi');

			// // Item closed (no new item opened)
			// if (this.classList.contains('active')) {
			// 	this.classList.remove('active');
			// 	parent.classList.remove('active');
			// 	if (this.parentElement.classList.contains('stacked')) {
			// 		this.parentElement.classList.remove('active');
			// 		parent.classList.remove('no-direct');
			// 	}
			// } else {
			// 	for (let x = 0; x < items.length; x++) {
			// 		// Switched to another item
			// 		if (items[x].classList.contains('active')) {
			// 			items[x].classList.remove('active');
			// 			if (items[x].parentElement.classList.contains('stacked')) {
			// 				items[x].parentElement.classList.remove('active');
			// 				parent.classList.remove('no-direct');
			// 			}
			// 		}
			// 	}
			// 	// Item opened
			// 	parent.classList.add('active');
			// 	if (this.parentElement.classList.contains('stacked')) {
			// 		this.parentElement.classList.add('active');
			// 		parent.classList.add('no-direct');
			// 	}
			// 	this.classList.add('active');
			// }
		});
	}
}
toggleProject();