'use: strict';

function toggleSections() {
	var parent = document.querySelector('.container');
	var items = document.querySelectorAll('.section');

	for (var i = 0; i < items.length; i++) {
		items[i].addEventListener('click', function () {
			// Item closed (no new item opened)
			if (this.classList.contains('active')) {
				this.classList.remove('active');
				parent.classList.remove('active');
				if (this.parentElement.classList.contains('stacked')) {
					this.parentElement.classList.remove('active');
				}
			} else {
				for (var x = 0; x < items.length; x++) {
					// Switched to another item
					if (items[x].classList.contains('active')) {
						/* TODO - Toggle local data

							1. Hide current data
							2. Run items animations
							3. Show loaded data
						*/
						items[x].classList.remove('active');
						if (items[x].parentElement.classList.contains('stacked')) {
							items[x].parentElement.classList.remove('active');
						}
					}
				}
				// Item opened
				parent.classList.add('active');
				if (this.parentElement.classList.contains('stacked')) {
					this.parentElement.classList.add('active');
				}
				this.classList.add('active');
				loadFullCategory();
				/* TODO - Load server data

					1. Hide current data
					2. Load item data
					3. Create elements and assign data to it
				*/
			}
		});
	}
}

toggleSections();
