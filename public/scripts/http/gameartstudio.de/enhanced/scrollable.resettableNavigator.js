/**
 * @license 
 * jQuery Tools 1.2.4 / Scrollable Navigator
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 *
 * http://flowplayer.org/tools/scrollable/navigator.html
 *
 * Since: September 2009
 * Date:    Sun Aug 15 08:16:31 2010 +0000 
 */
(function($) {
		
	var t = $.tools.scrollable; 
	
	t.resettableNavigator = {
		
		conf: {
			navi: '.navi',
			naviItem: null,		
			activeClass: 'active',
			indexed: false,
			idPrefix: null,
			
			// 1.2
			history: false
		}
	};		
	
	function find(root, query) {
		var el = $(query);
		return el.length < 2 ? el : root.parent().find(query);
	}
	
	// jQuery plugin implementation
	$.fn.resettableNavigator = function(conf) {

		// configuration
		if (typeof conf == 'string') { conf = {navi: conf}; } 
		conf = $.extend({}, t.resettableNavigator.conf, conf);
		
		var ret;
		
		this.each(function() {
				
			var api = $(this).data("scrollable"),
				 navi = conf.navi.jquery ? conf.navi : find(api.getRoot(), conf.navi), 
				 buttons = api.getNaviButtons(),
				 cls = conf.activeClass,
				 history = conf.history && $.fn.history;

			// @deprecated stuff
			if (api) { ret = api; }
			
			api.getNaviButtons = function() {
				alert('getNaviButtons');
				return buttons.add(navi);	
			}; 
			
			api.resetNavi = function() {
				navi.children().remove();
				generate();
			};
			
			function doClick(el, i, e) {
				api.seekTo(i);				
				if (history) {
					if (location.hash) {
						location.hash = el.attr("href").replace("#", "");	
					}
				} else  {
					return e.preventDefault();			
				}
			}
			
			// navi elements
			function els() {
				return navi.find(conf.naviItem || '> *');	
			}
			
			function addItem(i) {  
				
				var item = $("<" + (conf.naviItem || 'a') + "/>").click(function(e)  {
					doClick($(this), i, e);
					
				}).attr("href", "#" + i);
				
				// index number / id attribute
				if (i === 0) {  item.addClass(cls); }
				if (conf.indexed)  { item.text(i + 1); }
				if (conf.idPrefix) { item.attr("id", conf.idPrefix + i); } 
								
				return item.appendTo(navi);
			}

			
			// generate navigator
			function generate() {
				if (els().length) {
					els()
					.each(function(i) { 
						$(this).click(function(e)  {
							doClick($(this), i, e);		
						});
					});
				
				}
				else {
					$.each(api.getItems(), function(i) {
						addItem(i); 
					});
				}
				
//				if (navi.children().size() == 1) navi.hide();
//				else navi.show();
			}
			generate();
			
			// activate correct entry
			api.onBeforeSeek(function(e, index) {
				setTimeout(function() {
					if (!e.isDefaultPrevented()) {	
						var el = els().eq(index);
						if (!e.isDefaultPrevented() && el.length) {			
							els().removeClass(cls).eq(index).addClass(cls);
						}
					}
				}, 1);
			}); 
			
			function doHistory(evt, hash) {
				var el = els().eq(hash.replace("#", ""));
				if (!el.length) {
					el = els().filter("[href=" + hash + "]");	
				}
				el.click();		
			}
			
			// new item being added
			api.onAddItem(function(e, item) {
				item = addItem(api.getItems().index(item)); 
				if (history)  { item.history(doHistory); }
			});
			
			if (history) { els().history(doHistory); }
			
			
		});		
		
		return conf.api ? ret : this;
		
	};
	
})(jQuery);			
