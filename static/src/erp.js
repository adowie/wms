$(function(){
    $("<div id='required_field_options'><h6>Fields List</h6><hr><div class='list'></div></div>").insertAfter("#required_fields");
    $("select#item").bind("change",focusFieldList);
    $("button.reuse_rq").bind("click",reuseResourceQuery);
    $("#clean_form").bind("click",cleanForm);
    focusFieldList();
    $("#confirm_import").bind("click",setImportFlag);
    $("#submit").bind("click",freeHoldOnConstraintField);
    $(".edit_config_item").bind("click",editConfigItems);
});

function editConfigItems(){
	var edit = $(this).parent();
	$("#required_fields").text($.trim(edit.siblings(".required_fields").attr("data")));
	$("select#item option[value='"+$.trim(edit.siblings(".item").attr("data"))+"']").prop('selected',true);
	focusFieldList();
}

function freeHoldOnConstraintField(){
	$("#constraint").attr("disabled",false);
}

function setImportFlag(){
	$("#di").val(1);

	setTimeout(function(){
		$("#submit").click();
		loading(true);
	},1000);
}

function cleanForm(){
	$("select").each(function(){
		$(this).children("option:eq(0)").prop('selected',true);
	})
	$("input,textarea").val("");
	$("#required_field_options .list").html("");
	// $("#required_fields").val("");
}

function reuseResourceQuery(){
	var item_ = $(this).attr("id");
	var query_ = $(this).attr("query");
	$("#query").html(query_);
	$("#"+item_+".import_target").click();
}

function focusFieldList(){
	var sel_ = $("select#item");

	if(sel_.length > 0){
		var sel_tbl = sel_.val();
	
	
		if(!sel_tbl)
			sel_tbl = $(this).val();


		var fields = $("#test_field option");
		var tbl_fields = [];

		$(".field_").unbind("click");
		$("#constraint").val(sel_tbl);
		$("#constraint").attr("disabled",true);

		$.each(fields,function(i){
			field_tbl = $(this).text().split(":")[0];
			
			if(field_tbl != sel_tbl && sel_tbl != "none"){
				$(this).hide();
			}else{
				$(this).show();	

				if(sel_tbl != "none"){
					tbl_fields.push($(this).text());
				}
			}
		});

		if(tbl_fields.length > 0){
			var html_ = "";
			$.each(tbl_fields,function(i,val){
				html_ += "<span class='field_'>"+val+"</span>";
			});
			$("#required_field_options .list").html(html_);

		}else{
			$("#required_field_options .list").html("");
		}


		$(".field_").bind("click",setRequiredFields);
	}
}


function setRequiredFields(){
	this_val = $(this).text().split(":")[1];
	required_val = $("#required_fields").val().split(",");

	if(required_val[0] == "")
		required_val[0] = this_val;
	else
		if($.inArray(this_val, required_val) == -1)
			required_val.push(this_val);	
	
	console.log(this_val);
	console.log(required_val);

	$("#required_fields").val(required_val.join(","));
}