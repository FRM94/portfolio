'use: strict';

import { CATEGORIES } from '../data/categories';

let data = CATEGORIES;

function scrollToTop(el) {
	el.scrollTop = 0;
}

function toggleSections() {
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

					if (sections[x].parentElement.classList.contains('stacked') && this.parentElement.classList.contains('stacked')) {
						// Do nothing
					} else {
						sections[x].parentElement.classList.remove('active');
						parent.classList.remove('no-direct');
					}
				}
			}
		});
		let exit = sections[i].querySelector('.content__close');
		exit.addEventListener('click', function (e) {
			e.stopPropagation();

			sections[i].classList.remove('active');
			parent.classList.remove('active');
			if (sections[i].parentElement.classList.contains('stacked')) {
				sections[i].parentElement.classList.remove('active');
				parent.classList.remove('no-direct');
			}
			for (let x = 0; x < sections.length; x++) {
				let projectContainer = sections[x].querySelector('.section__projects');
				if (sections[x].contains(projectContainer)) {
					let highlight = sections[x].querySelector('.project__highlight');
					let content = sections[x].querySelector('.section__content');
					highlight.classList.remove('active');
					content.classList.remove('highlight');
				}
			}
			let content = sections[i].querySelector('.section__content');
			setTimeout(function () {
				scrollToTop(content);
			}, 500);
		});
	}
}
toggleSections();

function toggleProjects() {
	let main = document.querySelector('.container');
	let sections = document.querySelectorAll('.section');

	// Loop through all the sections
	for (let i = 0; i < sections.length; i++) {
		// Set the main wrapper
		let content = sections[i].querySelector('.section__content');
		// Set the project container wrapper
		let projectContainer = sections[i].querySelector('.section__projects');

		// Set a click event listener on the section
		sections[i].addEventListener('click', function () {
			// Check if the section contains projects AND is active
			if (sections[i].contains(projectContainer) && sections[i].classList.contains('active')) {
				// Find the projects in a section and loop through all the projects
				let allProjects = sections[i].querySelectorAll('.section__project');
				for (let x = 0; x < allProjects.length; x++) {
					// Set a click event listener on each project block
					allProjects[x].addEventListener('click', function (e) {
						e.stopPropagation();

						// Set the target element and retrieve the according data
						let target = sections[i].querySelector('.project__highlight');
						let projectData = data[i].projects[x];

						console.log(x);

						// Set the project title
						function setProjectTitle() {
							let title = projectData.title;
							target.querySelector('.highlight__title').innerHTML = title;
						}
						setProjectTitle();

						// Set the project introduction text
						function setProjectIntro() {
							let intro = projectData.intro;
							target.querySelector('.highlight__intro').innerHTML = intro;
						}
						setProjectIntro();

						// Set sub sections for every description (pic left and right)
						let descriptions = projectData.description;
						let countItems = target.childNodes.length;
						for (var b = 0; b < descriptions.length; b++) {

							// Set a sub container
							function insertProjectSub() {
								let subContainer = document.createElement('div');
								subContainer.setAttribute('class', 'highlight__sub');
								target.insertBefore(subContainer, target.childNodes[countItems - 1]);
								target.appendChild(subContainer);
							}
							insertProjectSub();

							let sub = target.querySelectorAll('.highlight__sub');

							// Set a sub title
							function insertSubTitle() {
								let description = document.createElement('p');
								description.textContent = descriptions[b];
								description.setAttribute('class', 'highlight__description');
								sub[b].appendChild(description);
							}
							insertSubTitle();
						}

						// Show the highlights block (TODO: optimalise call)
						content.classList.add('highlight');
						target.classList.add('active');
					});
				}
			}
		});
		// If the section has projects
		if (sections[i].contains(projectContainer)) {
			let exit = sections[i].querySelector('.highlight__close');
			exit.addEventListener('click', function (e) {
				e.stopPropagation();

				let section = sections[i];
				let content = section.querySelector('.section__content');
				let highlight = section.querySelector('.project__highlight');
				let subs = highlight.querySelectorAll('.highlight__sub');

				content.classList.remove('highlight');
				highlight.classList.remove('active');

				for (let c = 0; c < subs.length; c++) {
					subs[c].parentElement.removeChild(subs[c]);
				}
			});
		}
	}
}
toggleProjects();
