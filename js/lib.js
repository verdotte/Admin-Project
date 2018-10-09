//This file holds the classes and function that can be reused
//Need jquery to be called
var Utils = {
	formatTime: function(milliseconds) {
		if (milliseconds <= 0)
			return '00:00';

		var seconds = Math.round(milliseconds);
		var minutes = Math.floor(seconds / 60);
		if (minutes < 10)
			minutes = '0' + minutes;

		seconds = seconds % 60;
		if (seconds < 10)
			seconds = '0' + seconds;

		return minutes + ':' + seconds;
	},
	isFormValid: function(user){//CREATE FUNCTION ERROR FIRST

	if(user.username != undefined){
		if(user.username ==""){
			error("Username is empty");
			return false;
		}
	}

	if(user.phone != undefined){
		if(String(user.phone) == ''){
			error("Phone is empty");
			return false;
		}
	}

	if(user.univ != undefined){
		if(user.univ ==""){
			error("University is empty");
			return false;
		}
	}

	if(user.email != undefined){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(user.email ==""){
			error("Email is empty");
			return false;
		}else if(!re.test(String(user.email).toLowerCase())){
			error("Wrong Email");
			return false;
		}
	}

	if(user.password != undefined){
		if(user.password ==""){
			error("university is empty");
			return false;
		}else if(user.password.length<6){
			error("Password length is less than 6 characters");
			return false;
		}
	}

	if(user.password2 != undefined){
		if(user.password2 ==""){
			error("university is empty");
			return false;
		}else if(user.password2 != user.password){
			error("Passwords do not match!");
			return false;
		}
	}

	return true;

}
};

var Manipulate = {
	//Slice string length if is over the defined value
	str_slice_exceed : function(str,val){
		if(str.length > val)
			return str.slice(0,val) + ' ..';
		else
			return str;
	},
	switchClasses : function(target, firstClass, secondClass){
		//elem.click(function(){
			if(target.hasClass(firstClass)){
				target.removeClass(firstClass);
				target.addClass(secondClass);
			}
			else if(target.hasClass(secondClass)){
				target.removeClass(secondClass);
				target.addClass(firstClass);
			}
		//});
}
}
var Effect = {
	//scroll to section smoothly
	smooth_scroll : function(delay){
		$('a[href^="#"]').click(function(e) {
			$('html,body').animate({ scrollTop: $(this.hash).offset().top}, delay);
			return false;
			e.preventDefault();
		});
	},
	//Hide and show side menu
	side_menu_toggle : function(menu,content,slide){
		$(menu).click(function(){
			if(slide)
				$(content).toggle();
			else
				$(content).slideToggle();
		});
		$('section').click(function(){
			if(slide)
				$(content).hide();
			else
				$(content).slideUp();
		});
	},
	//Stop loading page if the page is loaded
	page_loaded : function(app){
		$(window).on('load',function(){
			$('.loading').fadeOut();
			$(app).fadeIn();
		});
	},
	//Count input characters
	input_count : function(input, target, txt){
		var a = 0;
		$(input).keyup(function(){
			a = $(input).val().length;
			$(target).html(a+' '+txt);
		});

	},
	//SWIPE PAGES
	swipe_tabs : function(container, n){//container is an id of the main wrapper to slide
		var a = 0;
		var x = window.innerWidth;
		container.on('touchstart ', function(e){	
			
			container.on('touchend', function(e){
				for(var i = 0; i<n-1 ; i++){
					if(container.scrollLeft() >= x*i && container.scrollLeft() <= (x*i)+(x/2)){
						container.animate({scrollLeft:x*i},200);
					}else if(container.scrollLeft() >= (x*i)+(x/2) && container.scrollLeft() <= x*(i+1) ){
						container.animate({scrollLeft:(x*(i+1))},200);
					}
				}
			});
		});
	},
	//SLIDE RIGHT
	slide_right : function(elm,val){
		$(elm).on('touchstart', function(e){
			var a = e.originalEvent.touches[0].pageX;
			$(elm).on('touchmove', function(v){
				var b = v.originalEvent.touches[0].pageX;
				if(b < a - val){
					return true;
				}else{
					return false;
				}
			});
		});
	}


}



function LoadScript(url) {
    var script = document.createElement("script");
    script.src = url; 
    document.head.appendChild(script);
}

//TOAST
function toast(message){
	$('.app').append('<div class="toast">'+message+'</div>');
	$('.toast').fadeIn(600);
	setTimeout(function(){$('.toast').fadeOut(700)},3000);
}

//SNACK BAR
function snack(data,onActionClicked){
	
	if(data.action == undefined){

		setTimeout(function(){$('.snack-bar').css('bottom','-100px');},3000);

	}

		if(data.action == undefined){
			data.action = '';
		}

		$('.app').append('<div class="snack-bar"><div class="text">'+data.text+'</div><div class="action">'+data.action+'</div></div>');

		$('.snack-bar').animate({bottom:'0px'},100);

		$('.snack-bar').find('.action').click(function(){
			onActionClicked();
			$('.snack-bar').css('bottom','-100px');
		});

}

function error(msg){
	$('body').prepend('<div class="toast">'+String(msg)+'</div>');
	$('.toast').fadeIn(600);
	setTimeout(function(){$('.toast').fadeOut(700)},2000);
}

function load(){
	html = '<div class="linear-loader"><div class="fill"></div></div>';
	$("body").prepend(html);
	$('.linear-loader').show();
}

function stopLoading(){
	$('.linear-loader').hide();
}


function redirect(link) {
  window.location.href= link;
}

function validateReg(regx) {
  var re = /^([0-9]{2})[/]?([0-9]{3})[/]?([a-zA-Z]{4})[-]?([a-zA-Z]{1})$/;
  return re.test(regx);
}



