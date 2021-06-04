import * as React from 'react';
import { getByText, render, waitFor } from '@testing-library/react';

/**
 * Creates dummy ref object.
 *
 * @returns ref object
 */
export function createDivRef() {
	const ref = React.createRef<HTMLDivElement>();
	render( <div ref={ref} /> );
	return ref;
}

/**
 * Waits until wysiwyg `iframe` appears and checks if specified content exists within it.
 *
 * @param text editor content to find
 * @returns html element
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
 * @returns html element
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
 * @returns html element
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
 * @returns html element
 */
export async function findByInlineEditorEditable( editable: boolean ) {
	return waitFor( () => {
		const editableEl = document.querySelector(
			`[contenteditable=${ editable }]`
		);
		if ( !editableEl ) {
			throw new Error();
		}
		return editableEl;
	} );
}

/**
 * Waits until inline editor's content appears and checks if specified content exists within it.
 *
 * @param text editor content to find
 * @returns html element
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
 * @returns html element
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
 * @returns html element
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
 * @returns html element
 */
export function queryClassicEditor(): HTMLIFrameElement | null {
	return document.querySelector( '.cke' );
}

/**
 * Queries classic editor's content iframe. Returns found element, null otherwise.
 *
 * @returns html element
 */
export function queryClassicEditorFrame(): HTMLIFrameElement | null {
	return document.querySelector( '.cke_wysiwyg_frame' );
}

/**
 * Queries inline editor. Returns found element, null otherwise.
 *
 * @returns html element
 */
export function queryInlineEditor(): HTMLElement | null {
	return document.querySelector( '.cke_editable_inline' );
}
