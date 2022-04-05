class Socket {
  constructor(onopen, onmessage) {
    this.create(onopen, onmessage);
  }

  create(onopen, onmessage) {
    this.socket = new WebSocket('ws://localhost:4000');

    this.socket.onopen = () => {
      onopen();
      console.log('Connection opened')
    };

    this.socket.onmessage = () => {
      onmessage();
      console.log('Message received')
    };

    this.socket.onclose = () => {
      this.create();
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
