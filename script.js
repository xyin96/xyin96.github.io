// JavaScript Document
var currentView;
var currentProject = 0;
var skills = false;
var timeline = false;
$(function(){
	allInView();
	kcRotate($(".bg img.x1")[0], $(window).scrollTop() / 10);
	kcRotate($(".bg img.x2")[0], 20-$(window).scrollTop() / 5);

	setInterval(function(){
			$('article section.showcase div#showcase').animate({
				scrollLeft: currentProject*$("article section.showcase div#showcase div").width() + "px"
				});
			currentProject ++;
			currentProject %= 3;
	}, 5000);
	$("nav ul li").click(function (){
		$("body").animate({
			scrollTop:$("." + $(this).attr("target")).offset().top
		}, 1000);
	});
	$("input#submit.button").click(function() {
		var name = $("#name").val();
		var email = $("#email").val();
		var msg = $("#message").val();
		if (name == '' || email.indexOf('@') == -1 || msg == '') {
			alert("Insertion Failed Some Fields are Blank (or invalid)....!!");
		} else {
			// Returns successful data submission message when the entered information is stored in database.
			$.post("functions.php", {
					"name": name,
					"email": email,
					"message": msg
			}, function(data) {
				$('#form').html("<h2>Thanks! Your Email has been sent!</h2>"); // To reset form fields
			});
		}
	});
	
});



$(window).scroll(function(){
	allInView();
	kcRotate($(".bg img.x1")[0], $(window).scrollTop() / 10);
	kcRotate($(".bg img.x2")[0], 20-$(window).scrollTop() / 10);
});

function kcRotate(elem,deg){

    var Dx;
    var Dy;
    var iecos;
    var iesin;
    var halfWidth;
    var halfHeight;
    var dummy;
    
    //degrees to radians
    var rad=deg*(Math.PI/180);
    
    //get sine and cosine of rotation angle
    iecos=Math.cos(rad);
    iesin=Math.sin(rad);
    
    //get element's size
    halfWidth=elem.offsetWidth/2;
    halfHeight=elem.offsetHeight/2;
    
    //calculating position correction values
    Dx=-halfWidth*iecos + halfHeight*iesin + halfWidth;
    Dy=-halfWidth*iesin - halfHeight*iecos + halfHeight;

    //applying CSS3 rotation
    elem.style.transform="rotate("+rad+"rad)";
    
    //vendor prefixed rotations
    elem.style.mozTransform="rotate("+rad+"rad)";
    elem.style.webkitTransform="rotate("+rad+"rad)";
    elem.style.OTransform="rotate("+rad+"rad)";
    elem.style.msTransform="rotate("+rad+"rad)";
    
    //rotation Matrix for IExplorer
    elem.style.filter="progid:DXImageTransform.Microsoft.Matrix(M11="+iecos+", M12="+-iesin+", M21="+iesin+", M22="+iecos+", Dx="+Dx+", Dy="+Dy+", SizingMethod=auto expand)";
    elem.style.msFilter="progid:DXImageTransform.Microsoft.Matrix(M11="+iecos+", M12="+-iesin+", M21="+iesin+", M22="+iecos+", Dx="+Dx+", Dy="+Dy+", SizingMethod=auto expand)";

    //Fixing black box issue on IE9
    dummy=document.createElement("div");
    dummy.innerHTML='';
    if(dummy.getElementsByTagName("br").length==1) elem.style.filter="none";
    delete dummy;
    
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top + $(elem).height()/5;
    var elemBottom = elemTop + $(elem).height()*4/5;
    if($(window).height() < $(elem).height()){
        return ((docViewTop >= elemTop - $(elem).height()/5) && (docViewBottom <= elemBottom + $(elem).height()/5));
    } else {
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }
}

function allInView() {
	if (isScrolledIntoView($("article section.about"))){
		$("article section.about").css("backgroundColor", "rgba(70,90,124,0.75)");
		$("nav ul li").eq(0).css("border-left","solid white medium");
	} else {
		$("article section.about").css("backgroundColor", "rgba(27,35,82,0.75)");
		$("nav ul li").eq(0).css("border-left","solid black medium");
	}
    if (isScrolledIntoView($("article section.skills"))){
		$("article section.skills").css("background-color", "rgba(70,90,124,0.75)");
		if(!skills){
			$("article section.skills ul li ul li").each(function(index, element){
				switch(index % 2){
					case 0:
						$(this).css("background-color", "#5E6490");
					break;
					case 1:
						$(this).css("background-color", "#8085A7");
					break;
				}
				var val = $(this).attr("data-value") * 50;
				$(this).animate({
					width: val,
					opacity: 0.75
				}, 1000);
                $(this).mouseover(function(){
                    $(this).animate({
                        width: val + 25,
                        opacity: 1
                    }, 100);
                });
                $(this).mouseout(function(){
                    $(this).animate({
                        width: val,
                        opacity: 0.75
                    }, 100);
                });
                skills = true;
			});
		}
		$("nav ul li").eq(1).css("border-left","solid white medium");
	} else {
		$("article section.skills").css("backgroundColor", "rgba(27,35,82,0.75)");
		$("nav ul li").eq(1).css("border-left","solid black medium");
	}

    if (isScrolledIntoView($("article section.showcase"))){
		currentView = "showcase";
		$("article section.showcase").css("backgroundColor", "rgba(70,90,124,0.75)");
		$("nav ul li").eq(2).css("border-left","solid white medium");
	} else {
		$("article section.showcase").css("backgroundColor", "rgba(27,35,82,0.75)");
		$("nav ul li").eq(2).css("border-left","solid black medium");
	}

    if (isScrolledIntoView($("article section.timeline"))) {
		if(!timeline){
			$("article section.timeline ul li").each(function(index, element){
				$(this).animate({opacity:1},index * 250);
			});
            timeline = true;
		}
		$("article section.timeline").css("backgroundColor", "rgba(70,90,124,0.75)");
		$("nav ul li").eq(3).css("border-left","solid white medium");
	} else {
		$("article section.timeline").css("backgroundColor", "rgba(27,35,82,0.75)");
		$("nav ul li").eq(3).css("border-left","solid black medium");
	}
	
	if (isScrolledIntoView($("article section.contact"))){
		$("article section.contact").css("backgroundColor", "rgba(70,90,124,0.75)");
		$("nav ul li").eq(4).css("border-left","solid white medium");
	} else {
		$("article section.contact").css("backgroundColor", "rgba(27,35,82,0.75)");
		$("nav ul li").eq(4).css("border-left","solid black medium");
	}

}