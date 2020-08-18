import { createApolloServer } from './apollo';
import { configureServices } from './services';
import db from './db';

configureServices(db).then((services) => {
    const port = normalizePort(process.env.PORT || '3000');

    const server = createApolloServer(services);

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
