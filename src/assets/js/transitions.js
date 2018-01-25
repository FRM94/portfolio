'use strict';

import { CATEGORIES } from '../data/categories';

let data = CATEGORIES;

export function openProject(project, information) {
	// Set the project target element
	const root = project.parentElement.parentElement.querySelector('.project__highlight');
	// Set the project title
	setProjectTitle(root, information);
	// Set the project introduction text
	setProjectIntro(root, information);
	// Set sub sections for every description (pic left and right)
	insertProjectSub(root, information);
	// Show the highlights block
	root.parentElement.classList.add('highlight');
	root.classList.add('active');
}

function scrollToTop(el) {
	el.scrollTop = 0;
}

function insertProjectSub(target, information) {
	let sub = target.querySelector('.highlight__sub');
	while (sub) {
		sub.parentElement.removeChild(sub);
		sub = target.querySelector('.highlight__sub');
	}
	for (let i = 0; i < information.description.length; i++) {
		let subContainer = document.createElement('div');
		subContainer.setAttribute('class', 'highlight__sub');
		target.insertBefore(subContainer, target.childNodes[target.childNodes.length - 1]);
		target.appendChild(subContainer);
		insertSubTitle(subContainer, information.description[i])
	}
}

function insertSubTitle(target, descriptionText) {
	let description = document.createElement('p');
	description.textContent = descriptionText;
	description.setAttribute('class', 'highlight__description');
	target.appendChild(description);
}

function setProjectTitle(project, information) {
	let title = information.title;
	project.querySelector('.highlight__title').innerHTML = title;
}

function setProjectIntro(project, information) {
	let intro = information.intro;
	project.querySelector('.highlight__intro').innerHTML = intro;
}

let parent = document.querySelector('.container');
let sections = document.querySelectorAll('.section');

for (let i = 0; i < sections.length; i++) {
	sections[i].addEventListener('click', function () {
		for (let x = 0; x < sections.length; x++) {
			parent.classList.add('active');
			if (this.parentElement.classList.contains('stacked')) {
				this.parentElement.classList.add('active');
				parent.classList.add('no-direct');
			}
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				let content = sections[i].querySelector('.section__content');
				scrollToTop(content);
			}
			if (sections[x].classList.contains('active') && sections[x] !== this) {
				sections[x].classList.remove('active');
				let projectContainer = sections[i].querySelector('.section__projects');
				if (sections[i].contains(projectContainer) && this.parentElement !== 'active') {
					let highlight = sections[i].querySelector('.project__highlight');
					let content = sections[i].querySelector('.section__content');
					highlight.classList.remove('active');
					content.classList.remove('highlight');
				}
				if (!(sections[x].parentElement.classList.contains('stacked') && this.parentElement.classList.contains('stacked'))) {
					sections[x].parentElement.classList.remove('active');
					parent.classList.remove('no-direct');
				}
			}
		}
	});
}

// Loop through all the sections
for (let i = 0; i < sections.length; i++) {
	// Set the main wrapper
	let content = sections[i].querySelector('.section__content');
	// Set the project container wrapper
	let projectContainer = sections[i].querySelector('.section__projects');
	// Close the highlight once the close icon is closed and remove the dynamic elements
	if (sections[i].contains(projectContainer)) {
		let exit = sections[i].querySelector('.highlight__close');
		exit.addEventListener('click', (e) => {
			e.stopPropagation();
			let section = sections[i];
			let content = section.querySelector('.section__content');
			let highlight = section.querySelector('.project__highlight');
			let subs = highlight.querySelectorAll('.highlight__sub');
			for (let c = 0; c < subs.length; c++) {
				subs[c].parentElement.removeChild(subs[c]);
			}
			content.classList.remove('highlight');
			highlight.classList.remove('active');
		});
	}
}
