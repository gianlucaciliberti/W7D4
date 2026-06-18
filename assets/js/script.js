const carica = async () => {
	return 42;
};

console.log(carica());

async function loadUssers() {
	console.log('1. parto');
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	console.log('2. ricevuta');
	const users = await response.json();
	console.log('3. arrivati');
}

loadUssers();

function sum(num1, num2) {
	return num1 + num2;
}

console.log(sum(5, 8));

class User {
	constructor(_name, _username, _email) {
		this.name = _name;
		this.username = _username;
		this.email = _email;
	}

	printUser() {
		return `Utente ${this.name}, username ${this.username}, email ${this.email}`;
	}
}

const usersList = document.querySelector('#usersList');
const spinner = document.querySelector('#spinner');
const createUser = document.querySelector('#createUser');

async function loadMore() {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/users',
		);
		if (!response.ok) throw new Error(response.status, response.statusText);
		const users = await response.json();
		render(users);
	} catch (err) {
		showerror(err);
	} finally {
		hideSpinner();
	}
}

function showerror(message) {
	usersList.textContent = message;
}

function hideSpinner() {
	spinner.classList.add('nascondi');
}

function render(users) {
	usersList.textContent = '';
	users.forEach((user) => {
		let newUser = new User(user.name, user.username, user.email);
		const newLi = document.createElement('li');
		newLi.textContent = newUser.printUser();
		usersList.appendChild(newLi);
	});
}

createUser.addEventListener('submit', function (e) {
	e.preventDefault();
	const nameUser = document.querySelector('#nameUser');
	const userName = document.querySelector('#userName');
	const email = document.querySelector('#email');
	let newUser = {
		name: nameUser.value,
		username: userName.value,
		email: email.value,
	};
	register(newUser);
});

async function register(newUser) {
	const formResponse = document.querySelector('#formResponse');
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/users',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application.json' },
				body: JSON.stringify(newUser),
			},
		);
		if (!response.ok) throw new Error(response.statusText);
		const data = await response.json();
		formResponse.textContent = `Utente ${newUser.name} registrato`;
		loadMore();
	} catch (err) {
		formResponse.textContent(`Errore: ${err}`);
	} finally {
		formResponse.clear();
	}
}

loadMore();

// Promise all
async function loadAll() {
	let myArray = [];
	const res = await Promise.allSettled([
		fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
			response.json(),
		),
		fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
			response.json(),
		),
	]);
	res.forEach((response) => {
		if (response.status === 'fulfilled') {
			myArray.push(response.value);
		} else {
            console.log(response.status);
        }
	});
	console.log(myArray);
}

loadAll();