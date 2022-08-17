const form = document.querySelector('.form');
const input = document.querySelector('.input');
const userContainer = document.querySelector('.user-container');

async function user(search) {
	const url = `https://api.github.com/users/${search}`;
	const response = await fetch(url);
	const data = await response.json();

	const userEl = document.createElement('div');
	userEl.classList.add('user');
	userContainer.append(userEl);

	if (data.message === 'Not Found') {
		userEl.classList.add('not-found')
		userEl.innerHTML = 'User not found';
	} else {
		const reposUrl = data.repos_url;
		const reposResponse = await fetch(reposUrl);
		const reposData = await reposResponse.json();
		const lastProjects = reposData.map(item => {
			return `<span class="user__info-project">${item.name}</span>`;
		}).slice(0, 5).join(' ');

		userEl.innerHTML = `
				<img src="${data.avatar_url}" alt="Avatar" class="user__img">
			<div class="user__info">
				<h2 class="user__info-name">${data.name}</h2>
				<p class="user__info-bio">${data.bio}</p>
				<div class="user__info-social">
					<div class="user__info-message">${data.followers} Followers</div>
					<div class="user__info-message">${data.following} Following</div>
					<div class="user__info-message">${data.public_repos} Repos</div>
				</div>
				<div class="user__info-projects">${lastProjects}</div>
			</div>
		`;
	}
}


form.addEventListener('submit', (e) => {
	e.preventDefault();
	userContainer.innerHTML = ``;
	user(input.value);
	input.value = '';
});