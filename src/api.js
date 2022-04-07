class API {
  constructor(domain) {
    this.domain = domain;
  }

  url(subdomain) {
    return this.domain + subdomain;
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

  addTask(data) {
    return fetch(this.url('/tasks'), {
      method: 'POST',
      body: JSON.stringify({data}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json());
  }

  nullResults() {
    return fetch(this.url('/users'), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json());
  }
}


const api = new API('http://localhost:4000');
const eventSource = new EventSource('http://localhost:4000/connection');
export  { api, eventSource };
