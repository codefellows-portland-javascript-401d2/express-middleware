const http = require( 'http' );
const Store = require( './lib/store' );
const store = new Store();

const router = require( './lib/router' )();

router
	.get( '/archangels', ( req, res ) => {
		let id = req.url.replace( '/archangels/', '' );
		res.writeHead( 200, { 'Content-Type': 'application/json' } );
		res.write( JSON.stringify( store.get( id ) ) );
		res.end();
	})
	.post( '/archangels', ( req, res ) => {
		let body = '';
		req.on( 'data', chunk => body += chunk );
		req.on( 'end', () => {
			res.writeHead( 200, { 'Content-Type': 'application/json' } );
			const angel = JSON.parse( body );
			store.add( angel );
			res.write( JSON.stringify( angel ) );
			res.end();
		});		
	});
	
module.exports = http.createServer( router.routes() );