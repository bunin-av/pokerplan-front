class Socket {
  constructor() {
    this.create();
  }

  create() {
    this.socket = new WebSocket('ws://localhost:4000');

    this.socket.onopen = () => {
      console.log('Connection opened')
    };

    this.socket.onmessage = (message) => {
      console.log(message)
      console.log('Message received')
    };

    this.socket.onclose = () => {
      console.log('Connection closed')
    };

    this.socket.onerror = () => {
      console.log('Error occurred!')
    };
  }
}


class SocketMessage {
  constructor(event, user) {
    this.event = event;
    this.user = user;
    this.id = Date.now();
  }
}


export {Socket, SocketMessage};
