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
	// let sections = document.querySelectorAll('.section__project');

	for (let i = 0; i < sections.length; i++) {
		let content = sections[i].querySelector('.section__content');
		let projectContainer = sections[i].querySelector('.section__projects');

		sections[i].addEventListener('click', function () {

			if (sections[i].contains(projectContainer) && sections[i].classList.contains('active')) {
				// Loop through all the projects
				let allProjects = sections[i].querySelectorAll('.section__project');
				for (let x = 0; x < allProjects.length; x++) {
					allProjects[x].addEventListener('click', function (e) {
						e.stopPropagation();

						// Do something with the selected section
						let target = sections[i].querySelector('.project__highlight');
						let projectData = data[i].projects[x];

						function setProjectTitle() {
							let title = projectData.title;
							target.querySelector('.highlight__title').innerHTML = title;
						}
						setProjectTitle();

						function setProjectIntro() {
							let intro = projectData.intro;
							target.querySelector('.highlight__intro').innerHTML = intro;
						}
						setProjectIntro();

						// Show the highlights block (TODO: optimalise call)
						content.classList.add('highlight');
						target.classList.add('active');
					});
				}

			}
		});
		if (sections[i].contains(projectContainer)) {
			let exit = sections[i].querySelector('.highlight__close');
			exit.addEventListener('click', function (e) {
				e.stopPropagation();
				let highlight = sections[i].querySelector('.project__highlight');
				let content = sections[i].querySelector('.section__content');
				highlight.classList.remove('active');
				content.classList.remove('highlight');
			});
		}
	}
}
toggleProjects();
