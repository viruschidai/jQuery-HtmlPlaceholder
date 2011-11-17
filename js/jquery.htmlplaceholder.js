(function($, undefined){
	$.widget("ui.htmlplaceholder", {
		options: {
			value: "Type here"
		},
		
		_create: function(){
			this.container = $( "<span>" )
				.addClass("jQuery-htmlplaceholder-container");
			
			this.element.wrap(this.container);
			
			this.placeholder = $( "<div>" )
				.html(this.option('value'))
				.addClass("jQuery-htmlplaceholder")
				.click($.proxy(function(ev){
					this.element.focus();
				}, this));
			
			this.placeholder.insertAfter( this.element )
				.css({
					position: 'absolute',
					height: '0px',
					width: '100%',
					top: ( this._cssToInt('marginTop') + this._cssToInt('borderTopWidth') + this._cssToInt('paddingTop')) +'px',
					left: ( this._cssToInt('marginLeft') + this._cssToInt('borderLeftWidth') + this._cssToInt('paddingLeft')) +'px'
				});
			
			this.element.focus($.proxy(function(){
				this.placeholder.hide();
			}, this));
			
			this.element.blur($.proxy(function(){
				if (this.element.val() === "")
					this.placeholder.show();
			}, this));
			
			if (this.element.val() !== "")
				this.placeholder.hide();
		},
		
		_setOption: function( key, value ){
			switch( key ) {
				case "value":
					this.placeholder.html(value);
					break;
			};
			
			$widget.prototype._setOption.apply( this, arguments );
		},
		
		_cssToInt: function(style){
			return parseInt(this.element.css(style), 10) || 0;
		},
		
		destroy: function() {
			this.element.insertBefore(this.container);
			this.container.remove();
		}
	});
	$.extend($.ui.htmlplaceholder, {
		version: "1.8.16"
	});
}(jQuery));