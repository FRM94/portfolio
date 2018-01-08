'use: strict';

var dataRequest = new XMLHttpRequest();

dataRequest.open(
	'GET',
	'https://raw.githubusercontent.com/FRM94/portfolio/master/main.json'
);

dataRequest.onload = function () {
	var data = JSON.parse(dataRequest.responseText);
	var category = document.getElementsByClassName('section');

	for (var i = 0; i < category.length; i++) {
		var target = category[i];

		// Dynamically add category titles
		var title = document.createElement('h2');
		title.textContent = data[i].category;
		title.setAttribute('class', 'section__title');
		target.appendChild(title);
		target.insertBefore(title, target.childNodes[0]);

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
		var description = document.createElement('p');
		description.textContent = data[i].description;
		description.setAttribute('class', 'section__text');
		target.appendChild(description);
		target.insertBefore(description, target.childNodes[1]);

	}
};

dataRequest.send();
