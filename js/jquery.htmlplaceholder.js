(function($, undefined){
	$.widget("ui.htmlplaceholder", {
		options: {
			value: "Type here"
		},
		
		_create: function(){
			this.placeholder = $( "<div>" )
				.insertAfter( this.element )
				.html(this.option('value'))
				.addClass("jQuery-htmlplaceholder")

				.mousedown($.proxy(function(ev){
					this.element.focus();
				}, this));
			
			this.placeholder.css({
				position: 'relative',
				height: '0px',
				marginTop: '-' + (parseInt(this.element.css('height'), 10) + parseInt(this.element.css('borderBottomWidth'), 10) + parseInt(this.element.css('paddingBottom'), 10)) + 'px',
				marginLeft: (parseInt(this.element.css('borderLeftWidth'), 10) + parseInt(this.element.css('paddingLeft'), 10)) + 'px',
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
		
		destroy: function() {
			this.placeholder.remove();
		}
	});
	$.extend($.ui.htmlplaceholder, {
		version: "1.8.16"
	});
}(jQuery));