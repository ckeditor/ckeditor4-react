export function camelToKebab( str: string ) {
	return str
		.split( /(?=[A-Z])/ )
		.join( '-' )
		.toLowerCase();
}

export function uniqueName() {
	return Math.random()
		.toString( 36 )
		.replace( /[^a-z]+/g, '' )
		.substr( 0, 5 );
}
