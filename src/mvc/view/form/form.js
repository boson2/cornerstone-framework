
define( [ 'backbone', 'underscore', 'jquery', 'validation-view', 'bootstrap' ], function( Backbone, _, $, ValidationView ) {

	// TODO Validation success/fail 시에 이벤트 발생
	return Backbone.View.extend( {
	
		initialize: function() {
			this.render();
			this.model.on( 'change', this.render, this );
			
			if ( this.options.validationViewClass )
				this.validation = new this.options.validationViewClass( { el: this.$el } );
			else
				this.validation = new ValidationView( { el: this.$el } );
		},
		
		render: function() {
		
			var self = this;
		
			_.each( this.model.attributes, function( value, key ) {
			
				var input = self.$( ':input[name=' + key + ']:first' );
				if ( !input || !input.length ) return;
				
				var type = input.attr( 'type' );
				if ( type && type.toUpperCase() === 'CHECKBOX' ) {
					self.$( ':input[name=' + key + ']' ).removeAttr( 'checked' );
					
					if ( _.isArray( value ) )
						_.each( value, function( item, index ) {
							self.$( ':input[name=' + key + '][value=' + item + ']' ).prop( 'checked', true );
						} );
					else
						self.$( ':input[name=' + key + '][value=' + value + ']' ).prop( 'checked', true );
				}
				else if ( type && type.toUpperCase() === 'RADIO' )
					self.$( ':input[name=' + key + '][value=' + value + ']' ).prop( 'checked', true );
				else
					input.val( value );
			} );
		},
		
		_onValidationError: function( model, err ) {
		
			if ( _.isArray( err ) )
				_.each( err, this.validation.fail );
			else
				this.validation.fail( err );
		},
		
		toModel: function() {
			
			this.validation.reset();
		
			var values = {};
			
			_.each( this.$el.serializeArray(), function( item, index ) {
			
				if ( values[ item.name ] ) {
				
					if ( !_.isArray( values[ item.name ] ) )
						values[ item.name ] = [ values[ item.name ] ];
					
					values[ item.name ].push( item.value );
				}
				else {
					values[ item.name ] = item.value;
				}
			} );
			
			this.model.clear( { silent: true } );
			this.model.set( values );
			
			if ( this.model.isValid() ) this.validation.success();
			else this._onValidationError( this.model, this.model.validationError );
			
			return this.model;
		}
	} );
} );
