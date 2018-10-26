function Home() {
	return [
		React.createElement( 'h2', {}, 'Classic Example' ),
		React.createElement( CKEditor, {
			data: '<p>Hi, I\'m CKEditor 4 instance!</p>'
		} ),

		React.createElement( 'h2', {}, 'Inline Example' ),
		React.createElement( CKEditor, {
			type: 'inline',
			data: '<p>Hi, I\'m CKEditor 4 instance!</p>'
		} )
	];
}

function Subpage() {
	return React.createElement( CKEditor, {
		data: '<p>Hi, I\'m CKEditor 4 instance on subpage!</p>'
	} );
}

function App() {
	return [
		React.createElement( 'h1', {}, 'CKEditor 4 – React Component – development sample' ),
		React.createElement( 'nav', {},
			React.createElement( ReactRouterDOM.Link, {
				to: '/'
			}, 'Home Page' ),

			React.createElement( ReactRouterDOM.Link, {
				to: '/subpage'
			}, 'Sample Subpage' )
		),

		React.createElement( ReactRouterDOM.Switch, {},
			React.createElement( ReactRouterDOM.Route, {
				path: '/subpage',
				component: Subpage
			} ),

			React.createElement( ReactRouterDOM.Route, {
				component: Home
			} )
		)
	];
}
