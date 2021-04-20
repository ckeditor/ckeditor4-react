import * as React from 'react';
import { getByText, render, waitFor } from '@testing-library/react';

/**
 * Waits until content `iframe` appears and checks if specified content exists within it.
 *
 * @param text editor content to find
 * @returns html element
 */
export async function findByEditorContent( text: string ) {
	return waitFor( () => {
		const iframe = document.getElementsByTagName( 'iframe' )[ 0 ];
		// @ts-ignore
		return getByText( iframe.contentWindow.document.body, text );
	} );
}

/**
 * Creates dummy ref element.
 *
 * @returns ref object
 */
export function createDivRef() {
	const ref = React.createRef<HTMLDivElement>();
	render( <div ref={ref} /> );
	return ref;
}
