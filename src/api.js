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
    });
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


const api = new API('https://pokerplan-back.herokuapp.com/');
export {api};
