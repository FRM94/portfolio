'use: strict';

import * as base from './base.js';

function loadContent() {
	var dataRequest = new XMLHttpRequest();
	dataRequest.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(dataRequest.responseText);
			var category = document.getElementsByClassName('section');

			for (var i = 0; i < category.length; i++) {
				// Dynamically add category classes
				var target = category[i];
				target.setAttribute('class', 'section ' + data[i].category);

				// Dynamically add category titles
				function insertTitle() {
					if (data[i].hasOwnProperty('name')) {
						var title = document.createElement('h2');
						title.textContent = data[i].name;
						title.setAttribute('class', 'section__title');
						target.appendChild(title);
						target.insertBefore(title, target.childNodes[0]);
					}
				}
				insertTitle();

				// Dynamically add category tags
				var tags = data[i].tags;
				function createList() {
					if (data[i].hasOwnProperty('tags')) {
						var list = document.createElement('ul');
						list.setAttribute('class', 'section__tags');
						for (var x = 0; x < tags.length; x++) {
							var item = document.createElement('li');
							item.setAttribute('class', 'tag');
							item.textContent = tags[x];
							list.appendChild(item);
						}
						target.appendChild(list);
						target.insertBefore(list, target.childNodes[1]);
					}
				}
				createList();

				// Dynamically add category description
				function insertDescription() {
					if (data[i].hasOwnProperty('description')) {
						var description = document.createElement('p');
						description.textContent = data[i].description;
						description.setAttribute('class', 'section__text');
						target.appendChild(description);
						target.insertBefore(description, target.childNodes[2]);
					}
				}
				insertDescription();

				// Dynamically add picture overlay (to all)
				var overlay = document.createElement('div');
				overlay.setAttribute('class', 'section__overlay');
				target.appendChild(overlay);
				target.insertBefore(overlay, target.childNodes[3]);

				// Dynamically add category picture (to all)
				var picture = document.createElement('img');
				picture.setAttribute('class', 'section__background');
				picture.src = 'dist/images/' + data[i].category + '-bg.jpg';
				target.appendChild(picture);
				target.insertBefore(picture, target.childNodes[4]);
			}
		}
	};
	dataRequest.open('GET', 'src/assets/data/categories.json');
	dataRequest.send();
}

loadContent();
