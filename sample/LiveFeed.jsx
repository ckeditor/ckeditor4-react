import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CKEditor from '../src/ckeditor.jsx';

class LiveFeed extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			data: '<p>foo bar</p>'
		};

		this.handleChange = this.handleChange.bind( this );
		this.onEditorChange = this.onEditorChange.bind( this );
	}

	onEditorChange( evt ) {
		this.setState( {
			data: evt.editor.getData()
		} );
	}

	handleChange( changeEvent ) {
		this.setState( {
			data: changeEvent.target.value
		} );
	}

	render() {
		return (
			<div>
				<EditorRenderer data={this.state.data} />
				<CKEditor
					data={this.state.data}
					config={{
						extraPlugins: 'easyimage',
						removePlugins: 'image',
						cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
						cloudServices_tokenUrl:
							'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
					}}
					onChange={this.onEditorChange} />
				<label style={{ clear: 'both' }}>
					Change val:
					<textarea defaultValue={this.state.data} onChange={this.handleChange}></textarea>
				</label>
				<input readOnly value={this.state.data} style={{ width: '100%' }} />
			</div>
		);
	}
}

class EditorRenderer extends Component {
	render() {
		return (
			<div className="editor-renderer">
				<h2>Rendered content:</h2>
				<div dangerouslySetInnerHTML={{ __html: this.props.data }}></div>
			</div>
		);
	}
}

EditorRenderer.defaultProps = {
	data: ''
};

EditorRenderer.propTypes = {
	data: PropTypes.string
};

export default LiveFeed;
