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

  pickCard({name, picked}) {
    return fetch(this.url('/users'), {
      method: 'PATCH',
      body: JSON.stringify({name, picked}),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json());
  }
}


const api = new API('http://localhost:4000')
export  { api };
