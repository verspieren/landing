$(document).ready(function(){
	var $body= $("body");
	$body.addClass("ready");
	var navigation = function(){
		var $menu = $(".menu-main");
		var init = function(){
			var subMenus = $(".submenu-container");

			$.each($("li.parent"), function(index, element)
			{
				var subMenu = $(element).children('.submenu-container'),
			      tl;
				if(subMenu.length !== 0)
				{
					tl = new TimelineLite({paused:true});

					tl.from(subMenu, 0.5, {height:0, opacity:0, ease:Circ.easeOut});

					element.subMenuAnimation = tl;

					$(element).hover(menuItemOver, menuItemOut);
				}
			});
		};

		function menuItemOver()
		{
			this.subMenuAnimation.timeScale(1);
			this.subMenuAnimation.play();
		}

		function menuItemOut()
		{
			this.subMenuAnimation.timeScale(4);
			this.subMenuAnimation.reverse();
		}
		
		return{init:init};
	}();
	
	
	var accordion = function(){
		var init = function(){
			var indexActive= $( ".menu-intern > ul" ).find("h3.active").parent().index();
			$( ".menu-intern > ul" ).accordion({
				collapsible: true,
				header: "h3",
				active:indexActive,
				heightStyle: 'content'
			});
			if(indexActive<0){
				$( ".menu-intern > ul" ).accordion( "option", "active", false );
			}
			$( ".accordion" ).accordion({
				collapsible: false,
				header: "h2",
			});
			$( ".menu-intern > ul" ).on( "accordionbeforeactivate", function( event, ui ) {
			       if($.trim($( ui.newPanel ).html()).length == 0){
					window.location = $.trim($( ui.newHeader ).find("a").attr("href"));
					event.preventDefault();
					}
			          
			 });
			
		};
		return{init:init};
	}();
	$('.tree-header>a').click(function(e){
	    if( $(this).parent().hasClass('active') ){
	        $(this).parent().removeClass('active').find(">ul").children('li').slideUp();
	        e.stopPropagation();
	    }
	    else{
	        $(this).parent().addClass('active').find(">ul").children('li').slideDown();
	        e.stopPropagation();
	    }
	e.preventDefault();
	return false;
	});
	
	
	//$(".date").datepicker($.datepicker.regional[ "fr" ]);
	/*$(".date").datepicker( {
		changeMonth: true,
	      changeYear: true,
		beforeShow: function(input, inst) {
		$(".ui-datepicker-title select").wrap("<div class='select icon-down'>");
		    },
		    onClose: function() {
		    }
	} );*/
	$('.date-normal').datepicker({
		language: "fr"
    	/*changeMonth: true,
	     changeYear: true,
		beforeShow: function(input, inst) {
		$(".ui-datepicker-title select").wrap("<div class='select icon-down'>");
		    },
		    onClose: function() {
		    }*/
	});
	$('.date-month').datepicker({
    format: "mm/yy",
    startView: 1,
    minViewMode: 1,
    language: "fr"
	});
	$(".tabs li").dotdotdot({
		ellipsis	: '... ',
		watch: "window",
		wrap		: 'letter',
		});
	$("select").on("focus blur",function(){
		$(this).parent().toggleClass("focus");
	});
	/*$('input').iCheck({
	    checkboxClass: 'icheckbox_minimal-blue',
	    radioClass: 'iradio_minimal-blue',
	    increaseArea: '20%' // optional
	  });*/
	
	var linkIe = $( "[class*='icon-'], .btn-connexion" );
	function refreshIE(){
	if ($("html").hasClass("ie8")) {
	     linkIe.addClass('refresh');
	            setTimeout(function(){
	                linkIe.removeClass('refresh');
	            },200);
	        }
	 }
	refreshIE();
	$(".btn-connexion").on("mouseover mouseout",function(){
		$(this).addClass('refresh');
		setTimeout(function(){
            $(this).removeClass('refresh');
        },200);
	});
	var $content = $(".content");
	 $(".btn-interface").on("click", function(e){
		$(".content").toggleClass("content-large");
		
		e.preventDefault();
		return false;
	}) 
	
	accordion.init();
	navigation.init();
	
	

	
	
	
});