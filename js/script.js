// Zad 1
// Mając do dyspozycji poniższe endpointy API:

// // - Pobierz listę wszystkich krajów, a następnie wydrukuj informacje w postaci: Państwo - Stolica - Powierzchnia - Języki Urzędowe - Populacja
// // - Wyświetl wszystkie imiona kotów, pobierając je spod catsAPI
// // - Odczytaj nazwy 10 największych państw pod względem
// // a) powierzchni
// // b) zaludnienia
// // - Rozwiązanie zaimplementuj, wykorzystując Promise-y oraz łańcuchowe wywołanie .then()/.catch() oraz z użyciem async/await.

const countriesAPI = 'https://restcountries.com/v3.1/all'
const catsAPI = 'https://api.thecatapi.com/v1/breeds'

fetch(countriesAPI)
	.then(result => {
		return result.json()
	})

	.then(data => {
		data.forEach(country => {
			const name = country.name.common
			const capital = country.capital
			const area = country.area + `km2`
			const language = Object.values(country.languages).join(', ')
			const population = country.population + ` people`

			console.log(`${name} - ${capital} - ${area} - ${language} - ${population}`)
		})
	})
  .catch(error => console.error(error));

fetch(countriesAPI)
	.then(result => {
		return result.json()
	})

	.then(data => {
		data.sort((a, b) => b.area - a.area)
    console.log('Kraje o największej powierzchni to:');
		for (let i = 0; i < 10; i++) {
			console.log(data[i].name.common)
		}
	})
	.catch(error => console.error(error))

fetch(countriesAPI)
	.then(result => {
		return result.json()
	})

	.then(data => {
		data.sort((a, b) => b.population - a.population)
    console.log('Kraje o największym zaludnieniu to:');
		for (let i = 0; i < 10; i++) {
			console.log(data[i].name.common)
		}
	})
	.catch(error => console.error(error))




fetch(catsAPI)
	.then(result => {
		return result.json()
	})

	.then(data => {
		data.forEach(cat => {
			const name = cat.name

			console.log(name)
		})
	})




// // Zad 2.
// // Zmodyfikuj poniższy kod:

// // function job() {
// //     return 'hello world';
// // }

// // Aby spełniał następujące założenia:
// // funkcja job musi zwracać obiekt Promise
// // Promise ma się po wywołaniu wykonywać 2 sekundy i dostarczać napis ‘hello world’

function job() {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			resolve('hello world')
		}, 2000)
	})
}

job()
	.then(result => {
		console.log(result)
	})
	.catch(error => {
		console.log('error')
	})

// // Zad 3.
// // Mając do dyspozycji poniższy kod (
// // Kod wykorzystuje Promise, aby handlować result. W rezultacie zwracana jest informacja z bazy (info.name) lub wyświetlany błąd i rzucany wyjątek.

// // function job(result, database, errorManager) {
// //     return result

// //     .then(function(id) {
// //         return database.get(id);
// //     })

// //     .then(function(info) {
// //         return info.name;
// //     })

// //     .catch(function(error) {
// //         errorManager.notify(error);
// //         throw error;
// //     });
// // }

// // Przerób przykład tak, aby wykorzystać słowa kluczowe async/await.

async function job(result, database, errrorManager) {
	try {
		const id = await result
		const info = await database.get(id)
		const error = await info.name
	} catch (error) {
		errrorManager.notify(error)
		throw error
	}
}

// // Zad 4.
// // Korzystając z API: https://fakerapi.it/api/v1/persons?_quantity=<number_of_people>, stwórz skrypt, który będzie pobierał listę 10 osób i wyświetlał na stronie informacje o każdej z nich. Informacje te mają być w postaci, np.

// // Jan Kowalski
// // <zdjęcie Jana Kowalskiego pobrane z API>

// // Adam Nowak
// // <zdjęcie Adama Nowaka pobrane z API>

// // etc.

// // Podpowiedź:
// // Aby móc dynamicznie modyfikować zawartość strony, wykorzystaj operacje na DOM.

const personAPI = 'https://fakerapi.it/api/v1/persons'

fetch(personAPI)
	.then(response => response.json())
	.then(data => {
    const personList = data.data.map(person => {
      const personElement = document.createElement('div')

			const nameElement = document.createElement('h2')
			const name = `${person.firstname} ${person.lastname}`
			nameElement.textContent = name

			const imageElement = document.createElement('img')
			const image = person.image + Math.random()
			imageElement.src = image

			personElement.appendChild(nameElement)
			personElement.appendChild(imageElement)
			return personElement
		})
		const container = document.querySelector('.person-container')
		personList.forEach(person => container.appendChild(person))
	})

	.catch(error => console.error(error))

// // Zad. 5
// // Zapoznaj się z API https://jsonplaceholder.typicode.com i pobierz z API spod endpointa /users po załadowaniu strony wszystkich userów, a następnie za pomocą JSa stwórz funkcję, która stworzy komponent (kartę) i wyświetli dane usera w przeglądarce (name, username, email oraz adres miasto, ulica, kod pocztowy w rozwijanym w karcie panelu).
// // Zastosuj operacje na DOM, składnię async, await oraz ostyluj galerię kart userów z wykorzystaniem wybranej biblioteki CSS, np. SCSS.

async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data
}

function newCard(user){
  const card = document.createElement('div')
  card.classList.add('user-cards')

  const name = document.createElement('h2')
  name.innerText = user.name;

  const username = document.createElement('p')
  username.innerText = `Username: ${user.username}`

  const email =  document.createElement('p')
  email.innerText = `Email: ${user.email}`

  const address = document.createElement('div');
      address.classList.add('address');
      address.innerHTML = `
        <b>Address:</b>
        <br>
        <p>${user.address.street}</p>
        <p>${user.address.suite}</p>
        <p>${user.address.city}</p>
        <p>${user.address.zipcode}</p>
      `;

      card.appendChild(name);
      card.appendChild(username);
      card.appendChild(email);
      card.appendChild(address);

      return card;
}

async function renderCards() {
  const users = await getUsers();
  const container = document.querySelector('.user-cards');
  users.forEach(user => {
    const card = newCard(user);
    container.appendChild(card);
  });
}

renderCards();
