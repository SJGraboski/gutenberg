/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * WordPress dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import { Disabled, FocusableIframe } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

function WidgetPreview( { postLink, attributes, ...props } ) {
	const DEFAULT_HEIGHT = 300;
	const HEIGTH_MARGIN = 20;
	const [ height, setHeight ] = useState( DEFAULT_HEIGHT );
	const iframeUrl = addQueryArgs( postLink, {
		widgetPreview: attributes,
	} );
	return (
		<Disabled>
			<FocusableIframe
				onLoad={ ( event ) => {
					const iframeContentHeight = get(
						event,
						[ 'currentTarget', 'contentDocument', 'body', 'scrollHeight' ]
					);
					if ( iframeContentHeight !== height ) {
						setHeight( iframeContentHeight );
					}
				} }
				src={ iframeUrl }
				height={ height + HEIGTH_MARGIN }
				{ ...props }
			/>
		</Disabled>
	);
}

export default withSelect( ( select ) => {
	const { getCurrentPostAttribute } = select( 'core/editor' );
	return {
		postLink: getCurrentPostAttribute( 'link' ),
	};
} )( WidgetPreview );
