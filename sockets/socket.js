const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket');
const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente conectado');
    const token = client.handshake.headers['x-token'];
    const [isValid, uid] = checkJWT(token);
    if (!isValid) {
        client.disconnect();
    }
    userConnected(uid);

    // Create room - log user into room
    client.join(uid);
    client.on('personal-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload);
    });
    // client.to(uid).emit();

    client.on('disconnect', () => {
        userDisconnected(uid);
        console.log('Cliente desconectado');
    });
    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje', payload);
    //     io.emit('mensaje', { admin: 'Nuevo mensaje' });
    // });
});
