'use strict';

import * as base from './base.js';
import * as transition from './transitions.js';
import { CATEGORIES as data } from '../data/categories';

let category = document.getElementsByClassName('section');

function loadPage() {
	loadPreview();
	loadMain();
	loadProjects();
	loadProjectHighlight();
}
loadPage();

function loadPreview() {
	for (let i = 0; i < category.length; i++) {
		// Dynamically add category classes
		let target = category[i];
		target.className = 'section ' + data[i].category;
		// Dynamically add category titles
		{
			if (data[i].hasOwnProperty('name')) {
				let title = document.createElement('h2');
				title.textContent = data[i].name;
				title.setAttribute('class', 'section__title');
				target.appendChild(title);
				target.insertBefore(title, target.childNodes[0]);
			}
		}
		// Dynamically add a picture overlay (to all)
		{
			let overlay = document.createElement('div');
			overlay.setAttribute('class', 'section__overlay');
			target.appendChild(overlay);
			target.insertBefore(overlay, target.childNodes[1]);
		}
		// Dynamically add a category picture (to all)
		{
			let picture = document.createElement('img');
			picture.setAttribute('class', 'section__background');
			picture.src = '/images/' + data[i].category + '-bg.jpg';
			picture.onerror = function () {
				picture.src = '/images/placeholder.jpg';
			}
			target.appendChild(picture);
			target.insertBefore(picture, target.childNodes[2]);
		}
	}
}

function loadMain() {
	for (let i = 0; i < category.length; i++) {
		let target = category[i];

		// Dynamically add a content container
		{
			let main = document.createElement('div');
			main.setAttribute('class', 'section__content');
			target.appendChild(main);
			target.insertBefore(main, target.childNodes[1]);
		}
		// Dynamically add a content container
		{
			let container = document.createElement('div');
			container.setAttribute('class', 'section__main');
			target.querySelector('.section__content').appendChild(container);
			//target.insertBefore(container, target.childNodes[1]);
		}

		target = target.querySelector('.section__main');

		// Dynamically add a category title
		{
			if (data[i].hasOwnProperty('name')) {
				let title = document.createElement('h3');
				title.textContent = data[i].name;
				title.className = 'content__title';
				target.appendChild(title);
				target.insertBefore(title, target.childNodes[0]);
			}
		}
		// Dynamically add a close icon
		{
			let close = document.createElement('span');
			close.textContent = ' ';
			close.setAttribute('class', 'content__close');
			close.addEventListener('click', function (event) {
				event.stopPropagation();
				category[i].classList.remove('active');
				category[i].parentElement.classList.remove('active');
				category[i].parentElement.parentElement.classList.remove('active');
				category[i].parentElement.parentElement.classList.remove('no-direct');
			})
			target.appendChild(close);
			target.insertBefore(close, target.childNodes[1]);
		}
		// Dynamically add category tags
		let tags = data[i].tags;
		{
			if (tags) {
				let list = document.createElement('ul');
				list.setAttribute('class', 'content__tags');
				for (let x = 0; x < tags.length; x++) {
					let item = document.createElement('li');
					item.setAttribute('class', 'tag');
					item.textContent = tags[x];
					list.appendChild(item);
				}
				target.appendChild(list);
				target.insertBefore(list, target.childNodes[2]);
			}
		}
		// Dynamically add a category description
		{
			if (data[i].description) {
				let items = data[i].description.length;
				for (let b = 0; b < items; b++) {
					let description = document.createElement('p');
					description.textContent = data[i].description[b];
					description.setAttribute('class', 'content__description');
					target.appendChild(description);
				}
			}
		}
	}
}

function loadProjects() {
	for (let i = 0; i < category.length; i++) {
		if (data[i].projects && data[i].projects.length >= 1) {

			let target = category[i].querySelector('.section__content');

			// Dynamically add a projects container
			{
				let container = document.createElement('div');
				container.setAttribute('class', 'section__projects');
				target.appendChild(container);
				target.insertBefore(container, target.childNodes[4]);
			}

			target = category[i].querySelector('.section__content');

			// Dynamically add a projects container
			{
				let container = document.createElement('div');
				container.setAttribute('class', 'project__highlight');
				target.appendChild(container);
			}

			target = category[i].querySelector('.section__projects');

			// Dynamically add a category title
			if (data[i].hasOwnProperty('name')) {
				let title = document.createElement('h3');
				title.textContent = data[i].name + ' Projects';
				title.setAttribute('class', 'projects__title');
				target.appendChild(title);
				target.insertBefore(title, target.childNodes[1]);
			}

			let projects = data[i].projects;
			for (let x = 0; x < projects.length; x++) {

				let container = document.createElement('div');
				container.setAttribute('class', 'section__project');
				target.appendChild(container);
				let subTarget = container;
				let projectName = data[i].projects[x].title;

				// Dynamically add a project title
				{
					let title = document.createElement('h3');
					title.textContent = projectName;
					title.setAttribute('class', 'project__title');
					subTarget.appendChild(title);
				}
				// Dynamically add a project picture (to all)
				{
					let picture = document.createElement('img');
					projectName = projectName.replace(/\s+/g, '-').toLowerCase();
					picture.setAttribute('class', 'project__image');

					picture.src = '/images/projects/' + projectName + '/' + projectName + '--preview.jpg';
					picture.onerror = function () {
						picture.src = '/images/placeholder.jpg';
					}
					container.appendChild(picture);
				}
				// Set an event listener on every project
				container.addEventListener('click', function (eventInformation) {
					transition.openProject(container, data[i].projects[x]);
				}.bind(data[i].projects));
			}
		}
	}
}

function loadProjectHighlight() {
	for (let i = 0; i < category.length; i++) {
		if (!(data[i].hasOwnProperty('projects') && data[i].projects.length >= 1)) {
			continue;
		}

		let projects = data[i].projects;
		let target = category[i].querySelector('.project__highlight');

		// Dynamically add a project title
		{
			let title = document.createElement('h2');
			title.setAttribute('class', 'highlight__title');
			target.appendChild(title);
		}
		// Dynamically add a close icon
		{
			let close = document.createElement('span');
			close.textContent = ' ';
			close.setAttribute('class', 'highlight__close');
			close.addEventListener('click', function () {
				target.classList.remove('active');
				target.parentElement.classList.remove('highlight');
			})
			target.appendChild(close);
		}
		// Dynamically add a project intro
		{
			let intro = document.createElement('p');
			intro.setAttribute('class', 'highlight__intro');
			target.appendChild(intro);
		}
		// Dynamically add a category picture (to all)
		{
			let picture = document.createElement('img');
			picture.setAttribute('class', 'highlight__background');
			picture.src = '/images/highlight-bg.jpg';
			target.appendChild(picture);
		}
	}
}
