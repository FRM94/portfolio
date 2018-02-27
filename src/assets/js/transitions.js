'use strict';

const CREATE = require('dom-create-element');

import { DATA as data } from '../data/data';

export function openProject(project, information) {
	// Set the project target element
	const ROOT = project.parentElement.parentElement.parentElement.querySelector('.project__highlight');
	// Set the project title
	setProjectTitle(ROOT, information);
	// Set the project introduction text
	setProjectIntro(ROOT, information);
	// Set sub sections for every description (pic left and right)
	insertProjectSub(ROOT, information);
	// Show the highlights block
	ROOT.parentElement.classList.add('highlight');
	ROOT.classList.add('active');
}

// Reset the scroll position within an element
function scrollToTop(el) {
	el.scrollTop = 0;
}

// Highlight default information
function setProjectTitle(project, information) {
	let title = information.title;
	project.querySelector('.highlight__title').innerHTML = title;
}

function setProjectIntro(project, information) {
	let intro = information.intro;
	project.querySelector('.highlight__intro').innerHTML = intro;
}

// Sub project container
function insertProjectSub(target, information) {
	let sub = target.querySelector('.highlight__sub');
	while (sub) {
		sub.parentElement.removeChild(sub);
		sub = target.querySelector('.highlight__sub');
	}
	for (let i = 0; i < information.sub.length; i++) {
		let subContainer = create({
			selector: 'div',
			styles: 'highlight__sub'
		});
		target.insertBefore(subContainer, target.childNodes[target.childNodes.length - 1]);
		target.appendChild(subContainer);
		let textWrapper = create({
			selector: 'div',
			styles: 'highlight__text-wrapper'
		});
		insertSubTitle(textWrapper, information.sub[i].subtitle);
		for (let x = 0; x < information.sub[i].descriptions.length; x++) {
			insertSubDescription(textWrapper, information.sub[i].descriptions[x]);
		}
		subContainer.appendChild(textWrapper);
		let imageWrapper = create({
			selector: 'div',
			styles: 'highlight__image-wrapper'
		});
		let projectName = information.title.replace(/\s+/g, '-').toLowerCase();
		let projectSub = information.sub[i].subtitle.replace(/\s+/g, '-').toLowerCase();
		let imageSrc = '/images/projects/' + projectName + '/' + projectSub + '.jpg';
		insertSubImage(imageWrapper, imageSrc);
		subContainer.appendChild(imageWrapper);
	}
}

function insertSubTitle(target, titleText) {
	let subtitle = create({
		selector: 'h3',
		styles: 'highlight__sub-title',
		html: titleText
	});
	target.appendChild(subtitle);
}

function insertSubDescription(target, descriptionText) {
	let description = create({
		selector: 'p',
		styles: 'highlight__description',
		html: descriptionText
	});
	target.appendChild(description);
}

function insertSubImage(target, imageSrc) {
	let image = create({
		selector: 'img',
		styles: 'highlight__image',
		src: imageSrc
	});
	image.onerror = function () {
		image.src = '/images/placeholder.jpg';
	}
	target.appendChild(image);
}

/* 
	Set relevant classes according to the section that is 
	opened, closed or switched
*/

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

/*
	Close the highlights section when the close icon is clicked
	or the section was switched
*/
for (let i = 0; i < sections.length; i++) {
	let content = sections[i].querySelector('.section__content');
	let projectContainer = sections[i].querySelector('.section__projects');
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
