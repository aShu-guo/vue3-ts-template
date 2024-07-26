import { md5 } from 'js-md5';

const ports = new Map();

self.onconnect = (event) => {
  const port = event.source;

  // set up a listener
  port.onmessage = function (event) {
    const { type, data } = event.data;
    const rawKey = md5(data.key);
    switch (type) {
      case 'init':
        if (!ports.get(rawKey)) {
          ports.set(rawKey, port);
        }
        break;
      case 'unmounted':
        ports.delete(rawKey);
        break;
      case 'broadcast':
        const channel = ports.get(rawKey);

        if (channel) {
          channel.postMessage(data.data);
        }

        break;
    }
  };

  // send a message back to the port
  port.postMessage('ready!'); // can also send
};
