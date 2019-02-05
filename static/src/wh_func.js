$(function(){
	$(".max_imize").bind("click",maximizeWHView);
	$(".min_imize").bind("click",minimizeWHView);
    $(".erp_dc").bind("click",confirmDefault);
	initWarehouseConfiguration(false);
	// document.body.appendChild(createBarrel());
    cleanAlert();

    $(".import_target").bind("click",enableTargetForm);
})

function enableTargetForm(){
	$(this).addClass("activated");
	form_ = $("#target_form");
	form_.addClass("active");
	$("#target_info").html("<h3>Adding Resource ("+$(this).val()+")</h3> <h5>Required Fields: [<b>"+$(this).attr("required_fields")+"</b>]</h4>");

	$("input#resource").val($(this).val());

	$("#cls_form").click(function(){
		form_.removeClass("active");
		$(".import_target").removeClass("active");
	});
}

function cleanAlert(){
    $(".alert.alert-info").append("<span class='alert_cls'><i class='fa fa-times'></i></span>");
    $(".alert_cls").bind("click",function(){
        $(this).parent().hide();
    })

    alert =  $(".alert.alert-info");
    error = alert.text().toLowerCase().indexOf("error") >= 0 ? true : false; 

    if(!error){
	    setTimeout(function(){
	    	$(".alert_cls").click();
	    },5000);
	}
}

function confirmDefault(){
    if ($(this).checked )
        $(this).next().show();
    else
        $(this).next().hide();

}

function initWarehouseConfiguration(fullscreen){
    if(!fullscreen){
        // $(".view_wh, .wrapper").animate({"height": ($(window).height() - 150) +"px"});
        // $(".wrapper").animate({"height": ($(window).height() - 50) +"px"});
        // $(".center").animate({"height": ($(window).height() - 174) +"px"});
    }
	var wh_wid = $(".view_wh").width();
	var aisles = $(".aisle");
	var aisle_shelf = $(".aisle .shelf");
	$.each(aisle_shelf,function(){
		if($(this).children("li").length < 1)
			$(this).remove();
	})

	$.each(aisles,function(i){
		var aisle_shelf = $(this).children(".shelf")
		var div_ider = aisle_shelf.length > 1 ? 1.2 : .5
		$(this).css({"width":( wh_wid / (aisles.length / div_ider ) ) - 15+"px"})
	});
}

function maximizeWHView(){
    $(".view_wh").css({"position":"absolute"});
	$(".view_wh").animate({"width":"100%","height":"100%","top":"0px","left":"0","z-index":5555});
	$(".inner_wh").animate({"height":"100%"});
	$(".min_imize").show();
	setTimeout(function(){
		initWarehouseConfiguration(true);
	},500);
}


function minimizeWHView(){
    $(".view_wh").css({"position":"relative"});
	$(".view_wh").animate({"width":"98%","height": ($(window).height() - 150) +"px","left":"1%","z-index":5});
	$(".inner_wh").animate({"height":"100%"});
	$(this).hide();
}

