/* eslint-env node */

import path from 'path';
import express from 'express';
import renderMarkup from './renderMarkup';

const PORT = process.env.PORT || 8080;
const app = express();

app.get( '/', ( _, res ) => {
	res.send( renderMarkup() );
} );

app.use( express.static( path.resolve( __dirname, '../public' ) ) );

app.listen( PORT, () => {
	console.log( `Server is listening on port ${ PORT }` );
} );
