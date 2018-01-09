'use: strict';

function toggleSections() {
	var parent = document.querySelectorAll('.container');
	var items = document.querySelectorAll('.section');

	for (var i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function () {
			if (this.classList.contains('active')) {
				for (var x = 0; x < items.length; x++) {
					items[x].classList.remove('active');
				}
				parent[0].classList.remove('active');
			} else {
				for (var x = 0; x < items.length; x++) {
					items[x].classList.remove('active');
				}
				parent[0].classList.add('active');
				this.classList.add('active');
			}
		});
	}
}

toggleSections();
