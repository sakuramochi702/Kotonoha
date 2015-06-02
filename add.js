// Initialize Parse with your Parse application javascript keys
Parse.initialize("RyriJBc2TjOhFHEaIxkDxtqcnJQSKZaClGGMmehF", "SGGa3oawzAs7RVHoTocutegM117AcvRPWFPcyfwX");

window.onload = function() {
	//
}

function onClickAdd() {
	//要素取得
	var strRemark = document.getElementById("remark");
	var strTags = document.getElementById("tags");
	var strUserName = document.getElementById("username");

	var Kotonoha = Parse.Object.extend("Kotonoha");
	var object = new Kotonoha();
	object.save({sentence: strRemark.value, tags: strTags.value, username: strUserName.value}, {
		success: function(obj) {
			alert("コトノハをトウコウしました。");
			strRemark.value = "";
			strTags.value = "";
			$(".success").show();
		},
		error: function(model, error) {
			alert("コトノハのトウコウに失敗しました。");
			$(".error").show();
		}
	});
}

