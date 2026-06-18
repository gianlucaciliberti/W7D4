const carica = async () => {
	return 42;
};

const result = carica();
console.log(result);

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

async function loadMore() {
	try {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/users',
		);
		if (!response.ok) throw new Error(response.status, response.statusText);
		const users = await response.json();
		render(users);
	} catch (err) {
		showerror(err.message);
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

loadMore();
