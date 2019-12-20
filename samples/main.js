ReactDOM.render(
	<CKEditor
		onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) }
		type="classic" data="<p>This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React.</p>"
	/>,
	document.getElementById( 'app' )
);
