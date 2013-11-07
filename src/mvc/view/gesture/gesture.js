
define( [ 'backbone', 'underscore', 'jquery', 'jquery.hammer' ], function( Backbone, _, $ ) {

	return Backbone.View.extend( {
	
		constructor: function( attributes, options ) {
		
			var hammerOptions = this.gestureOptions;
			
			// Backbone.View.apply가 실행이 되어야 this.$, this.$el을 사용할 수 있으므로 여기서는 다른 방법을 사용한다.
			var $el = $( this.el );
			var selectors = {};
		
			if ( this.events ) {
				_.each( this.events, function( value, key ) {
					var match = key.match( /^(\S+)\s*(.*)$/ );
					var eventName = match[ 1 ], selector = match[ 2 ];
					
					// hammer.js에서 처리 가능한 이벤트를 정의한 selector들을 구한다.
					if ( _.contains( [ 'hold', 'tap', 'doubletap', 'transformstart', 'transform', 'transformend', 'dragstart', 'drag', 'dragend', 'dragup', 'dragdown', 'dragleft', 'dragright', 'swipe', 'swipeup', 'swipedown', 'swipeleft', 'swiperight', 'rotate', 'pinch', 'pinchin', 'pinchout', 'touch', 'release' ], eventName ) ) {
						if ( selectors[ selector ] )
							selectors[ selector ].push( eventName );
						else
							selectors[ selector ] = [ eventName ];
					}
				} );
			}
			
			_.each( selectors, function( value, key ) {
			
				var options = hammerOptions ? _.clone( hammerOptions ) : {};
				
				options[ 'drag' ] = _.contains( value, 'dragstart' ) || _.contains( value, 'drag' ) || _.contains( value, 'dragend' ) || _.contains( value, 'dragup' ) || _.contains( value, 'dragdown' ) || _.contains( value, 'dragleft' ) || _.contains( value, 'dragright' );
				options[ 'swipe' ] = _.contains( value, 'swipe' ) || _.contains( value, 'swipeup' ) || _.contains( value, 'swipedown' ) || _.contains( value, 'swipeleft' ) || _.contains( value, 'swiperight' );
				options[ 'transform' ] = _.contains( value, 'transformstart' ) || _.contains( value, 'transform' ) || _.contains( value, 'transformend' ) || _.contains( value, 'rotate' ) || _.contains( value, 'pinch' ) || _.contains( value, 'pinchin' ) || _.contains( value, 'pinchout' );
				options[ 'tap' ] = _.contains( value, 'tap' ) || _.contains( value, 'doubletap' );
				options[ 'hold' ] = _.contains( value, 'hold' );
				
				( key ? $el.find( key ) : $el ).hammer( options );
			} );
			
			// 여기서 extend 된 View들의 initialize가 실행된다.
			// 따라서 extend 된 View들의 initialize보다 먼저 실행하려면 앞쪽에, 나중에 실행하려면 뒷쪽에 코드를 작성한다.
			Backbone.View.apply( this, arguments );
		}
	} );
} );
