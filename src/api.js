class API {
  constructor(domain) {
    this.domain = domain;
  }

  url(path) {
    return this.domain + path;
  }

  logIn(payload) {
    return fetch(this.url('/users'), {
      method: 'POST',
      body: JSON.stringify({name: payload}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json());
  }

  getUsers() {
    return fetch(this.url('/users'))
      .then(res => res.json());
  }

  pickCard(user) {
    return fetch(this.url('/users'), {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json());
  }

  nullResults() {
    return fetch(this.url('/users'), {
      method: 'DELETE',
    })
      .then(res => res.text());
  }

  deletePlayer(id) {
    return fetch(this.url('/user'), {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.text());
  }

  getTasks() {
    return fetch(this.url('/tasks'))
      .then(res => res.json());
  }

  addTasks(data) {
    return fetch(this.url('/tasks'), {
      method: 'POST',
      body: JSON.stringify({data}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json());
  }

  deleteTask(id) {
    return fetch(this.url('/tasks'), {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.text());
  }

  startNewGame() {
    return fetch(this.url('/new-game'))
      .then(res => res.text());
  }

  setupEventSource(onmessage) {
    const evtSource = new EventSource(this.url('/connection'));
    evtSource.onmessage = onmessage;

    evtSource.onerror = () => {
      evtSource.close();
      setTimeout(() => this.setupEventSource(onmessage), 1000);
    };
  }
}


const domain = process.env.NODE_ENV === 'production' ? 'https://pokerplan-back.herokuapp.com' : 'http://localhost:4000';

const api = new API(domain);

export {api};
