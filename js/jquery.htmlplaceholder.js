/**
 * This widget is used to create fancy placeholder for input and textarea elements.
 * @author bill@billgao.net
 */

(function($, undefined){
	$.widget("ui.htmlplaceholder", {
		options: {
			msg: "Type here"
		},
		
		_create: function(){
			this.container = $( "<span>" )
				.addClass("jQuery-htmlplaceholder-container")
				.css({
					position: 'relative',
					display: 'inline-block'
				});
			
			this.element.wrap(this.container);
			
			this.placeholder = $( "<div>" )
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
			
			var message = this.option('msg');
			if ($.isFunction(message))
				message = message.call(this, this.element);
			
			this.placeholder.html(message);
			
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
				case "msg":
					this.placeholder.html(value);
					break;
			};
			
			$widget.prototype._setOption.apply( this, arguments );
		},
		
		/* 
		 * Get css style value and convert it to integer
		 */
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