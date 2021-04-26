export function camelToKebab( str: string ) {
	return str
		.split( /(?=[A-Z])/ )
		.join( '-' )
		.toLowerCase();
}
