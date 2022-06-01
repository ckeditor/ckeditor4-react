import { getByText, waitFor } from '@testing-library/react';

/**
 * Creates dummy element.
 *
 * @returns element
 */
export function createDivElement() {
	const el = document.createElement( 'div' );
	document.body.appendChild( el );
	return el;
}

/**
 * Waits for predicate to evaluate to true.
 *
 * In a typical use case of `@testing-library/react` we would rely on a combination of `waitFor` and `expect`.
 * However, such approach fails with Karma / Jasmine setup. Therefore, a custom `waitForValueToChange` is used.
 *
 * @param fn predicate
 * @returns resolved promise if predicate evaluates to true
 */
export async function waitForValueToChange( fn: () => boolean ) {
	return waitFor( () => {
		if ( !fn() ) {
			throw new Error();
		}
	} );
}

/**
 * Waits until wysiwyg `iframe` appears and checks if specified content exists within it.
 *
 * @param text editor content to find
 * @returns found html element wrapped in promise
 */
export async function findByClassicEditorContent( text: string ) {
	return waitFor( () => {
		const iframe = queryClassicEditorFrame();
		if ( !iframe?.contentWindow?.document.body ) {
			throw new Error();
		}
		return getByText( iframe.contentWindow.document.body, text );
	} );
}

/**
 * Waits until wysiwyg `iframe` appears and returns it based on `editable` flag.
 *
 * @param editable indicates if editor is editable
 * @returns found html element wrapped in promise
 */
export async function findByClassicEditorEditable( editable: boolean ) {
	return waitFor( () => {
		const iframe = queryClassicEditorFrame();
		const editableEl = iframe?.contentWindow?.document.querySelector(
			`[contenteditable=${ editable }]`
		);
		if ( !editableEl ) {
			throw new Error();
		}
		return editableEl;
	} );
}

/**
 * Finds editor by its name.
 *
 * @param text editor root element to find
 * @returns found html element wrapped in promise
 */
export async function findByEditorName( name: string ) {
	return waitFor( () => {
		const contentEl: HTMLElement | null = document.getElementById(
			`cke_${ name }`
		);
		if ( !contentEl ) {
			throw new Error();
		}
		return contentEl;
	} );
}

/**
 * Waits until inline editor appears and returns it based on `editable` flag.
 *
 * @param editable indicates if editor is editable
 * @returns found html element wrapped in promise
 */
export async function findByInlineEditorEditable( editable: boolean ) {
	return waitFor( () => {
		const editableEl = document.querySelector(
			`[contenteditable=${ editable }]`
		) as HTMLElement;
		if ( !editableEl || editableEl.style.visibility === 'hidden' ) {
			throw new Error();
		}
		return editableEl;
	} );
}

/**
 * Waits until inline editor's content appears and checks if specified content exists within it.
 *
 * @param text editor content to find
 * @returns found html element wrapped in promise
 */
export async function findByInlineEditorContent( text: string ) {
	return waitFor( () => {
		const contentEl = queryInlineEditor();
		if ( !contentEl ) {
			throw new Error();
		}
		return getByText( contentEl, text );
	} );
}

/**
 * Finds classic editor.
 *
 * @returns found html element wrapped in promise
 */
export function findClassicEditor() {
	return waitFor( () => {
		const editor = queryClassicEditor();
		if ( !editor ) {
			throw new Error();
		}
		return editor;
	} );
}

/**
 * Finds inline editor.
 *
 * @returns found html element wrapped in promise
 */
export function findInlineEditor() {
	return waitFor( () => {
		const editor = queryInlineEditor();
		if ( !editor ) {
			throw new Error();
		}
		return editor;
	} );
}

/**
 * Queries classic editor. Returns found element, null otherwise.
 *
 * @returns found html element wrapped in promise
 */
export function queryClassicEditor(): HTMLIFrameElement | null {
	return document.querySelector( '.cke' );
}

/**
 * Queries classic editor's content iframe. Returns found element, null otherwise.
 *
 * @returns found html element wrapped in promise
 */
export function queryClassicEditorFrame(): HTMLIFrameElement | null {
	return document.querySelector( '.cke_wysiwyg_frame' );
}

/**
 * Queries inline editor. Returns found element, null otherwise.
 *
 * @returns found html element wrapped in promise
 */
export function queryInlineEditor(): HTMLElement | null {
	return document.querySelector( '.cke_editable_inline' );
}
