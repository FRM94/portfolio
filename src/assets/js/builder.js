'use strict';

import * as transition from './transitions.js';
import { DATA as data } from '../data/data';

const CREATE = require('dom-create-element');
let category = document.getElementsByClassName('section');

(function loadPage() {
	loadPreview();
	loadMain();
	loadProjects();
	loadProjectHighlight();
})();

function loadPreview() {

	// For each section:
	for (let i = 0; i < category.length; i++) {

		// Add category classes
		let target = category[i];
		target.className = 'section ' + data[i].category;

		// Add category titles
		{
			if (data[i].hasOwnProperty('name')) {
				let title = CREATE({
					selector: 'h2',
					styles: 'section__title',
					html: data[i].name
				});
				target.appendChild(title);
			}
		}

		// Add a content container
		{
			let main = CREATE({
				selector: 'div',
				styles: 'section__content'
			});
			target.appendChild(main);
		}

		// Add a picture overlay (to all)
		{
			let overlay = CREATE({
				selector: 'div',
				styles: 'section__overlay'
			});
			target.appendChild(overlay);
		}

		// Add a category picture (to all)
		{
			let picture = CREATE({
				selector: 'img',
				styles: 'section__background',
				src: './images/' + data[i].category + '-bg.jpg'
			});
			picture.onerror = function () {
				picture.src = './images/placeholder.jpg';
			}
			target.appendChild(picture);
		}
	}
}

function loadMain() {
	// For each section: 
	for (let i = 0; i < category.length; i++) {

		// Set target element
		let target = category[i].querySelector('.section__content');

		// Dynamically add a main content container
		{
			let container = CREATE({
				selector: 'div',
				styles: 'section__main'
			});
			target.appendChild(container);
		}

		// Set new target
		target = target.querySelector('.section__main');

		// Add a category title
		{
			if (data[i].hasOwnProperty('name')) {
				let title = CREATE({
					selector: 'h3',
					styles: 'content__title',
					html: data[i].name
				});
				target.appendChild(title);
			}
		}

		// Add a close icon
		{
			let close = CREATE({
				selector: 'span',
				styles: 'content__close',
				html: ' '
			});
			close.addEventListener('click', function (event) {
				event.stopPropagation();
				category[i].classList.remove('active');
				category[i].parentElement.classList.remove('active');
				category[i].parentElement.parentElement.classList.remove('active');
				category[i].parentElement.parentElement.classList.remove('no-direct');
			})
			target.appendChild(close);
		}

		// Add category tags
		let tags = data[i].tags;
		{
			if (tags) {
				let list = CREATE({
					selector: 'ul',
					styles: 'content__tags'
				});
				for (let x = 0; x < tags.length; x++) {
					let item = CREATE({
						selector: 'li',
						styles: 'tag',
						html: tags[x]
					});
					list.appendChild(item);
				}
				target.appendChild(list);
			}
		}

		// Add a category description
		{
			if (data[i].description) {
				let items = data[i].description.length;
				for (let b = 0; b < items; b++) {
					let description = CREATE({
						selector: 'p',
						styles: 'content__description',
						html: data[i].description[b]
					});
					target.appendChild(description);
				}
			}
		}
	}
}

function loadProjects() {

	// For each section:
	for (let i = 0; i < category.length; i++) {

		// If the section contains projects
		if (data[i].projects && data[i].projects.length >= 1) {

			// Set initial target element
			let target = category[i].querySelector('.section__content');

			// Add a section for all projects
			{
				let container = CREATE({
					selector: 'div',
					styles: 'section__projects'
				});
				target.appendChild(container);
			}

			// Set new target element
			target = category[i].querySelector('.section__content');

			// Add a projects container
			{
				let container = CREATE({
					selector: 'div',
					styles: 'project__highlight'
				});
				target.appendChild(container);
			}

			// Set new target element
			target = category[i].querySelector('.section__projects');

			// Dynamically add a category title
			if (data[i].hasOwnProperty('name')) {
				let title = CREATE({
					selector: 'h3',
					styles: 'projects__title',
					html: data[i].name + ' projects'
				});
				target.appendChild(title);
			}

			let subprojects = CREATE({
				selector: 'div',
				styles: 'projects__wrapper',
			});
			target.appendChild(subprojects);

			// Select all projects
			let projects = data[i].projects;
			target = category[i].querySelector('.projects__wrapper');

			// For each project:
			for (let x = 0; x < projects.length; x++) {

				// Add a project container
				let container = CREATE({
					selector: 'div',
					styles: 'section__project',
					html: data[i].name + ' projects'
				});
				target.appendChild(container);

				let subTarget = container;
				let projectName = data[i].projects[x].title;

				// Add a project title
				{
					let title = CREATE({
						selector: 'h3',
						styles: 'project__title',
						html: projectName
					});
					subTarget.appendChild(title);
				}

				// Add a project picture (to all)
				{
					projectName = projectName.replace(/\s+/g, '-').toLowerCase();
					let picture = CREATE({
						selector: 'img',
						styles: 'project__image',
						src: './images/projects/' + projectName + '/' + 'preview.jpg'
					});
					picture.onerror = function () {
						picture.src = './images/placeholder.jpg';
					}
					container.appendChild(picture);
				}

				// Set an event listener
				container.addEventListener('click', function (eventInformation) {
					transition.openProject(container, data[i].projects[x]);
				}.bind(data[i].projects));
			}
		}
	}
}

function loadProjectHighlight() {
	// For each section: 
	for (let i = 0; i < category.length; i++) {

		// If the section data has more than one project
		if (!(data[i].hasOwnProperty('projects') && data[i].projects.length >= 1)) {
			continue;
		}

		// Set the target elements
		let projects = data[i].projects;
		let target = category[i].querySelector('.project__highlight');

		// Dynamically add a project title
		{
			let title = CREATE({
				selector: 'h2',
				styles: 'highlight__title'
			});
			target.appendChild(title);
		}

		// Dynamically add a close icon
		{
			let close = CREATE({
				selector: 'span',
				styles: 'highlight__close',
				html: ' '
			});
			close.addEventListener('click', function () {
				target.classList.remove('active');
				target.parentElement.classList.remove('highlight');
			})
			target.appendChild(close);
		}

		// Dynamically add a project intro
		{
			let intro = CREATE({
				selector: 'p',
				styles: 'highlight__intro'
			});
			target.appendChild(intro);
		}

		// Dynamically add a category picture (to all)
		{
			let picture = CREATE({
				selector: 'img',
				styles: 'highlight__background',
				src: './images/highlight-bg.jpg'
			});
			picture.onerror = function () {
				picture.src = './images/placeholder.jpg';
			}
			target.appendChild(picture);
		}
	}
}
