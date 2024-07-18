const clients = new Map();

let nextClientId = 0;

function addClient(response) {
  const clientId = nextClientId++;
  clients.set(clientId, response);
  console.log("client added- clientId,total clients", clientId, clients.size)
  return clientId;
}

function removeClient(clientId) {
  const client = clients.get(clientId);
  if (client) {
    client.end();
    clients.delete(clientId);
    console.log("client removed- clientId,total clients", clientId, clients.size)
  }
}

function getClientStream() {
  let array = Array.from(clients.values());
  return array
}

module.exports = { addClient, removeClient, getClientStream };
