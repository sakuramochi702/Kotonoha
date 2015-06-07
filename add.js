// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

window.onload = function() {
	//ログイン情報
	getLoginInfo();
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
			swal({
				title: "メッセージ",
				text: "コトノハを登録しました",
				confirmButtonColor: "#8fbc8f"
			});
			strRemark.value = "";
			strTags.value = "";
			//$(".success").show();
		},
		error: function(model, error) {
			swal({
				title: "エラー",
				text: "コトノハの登録に失敗しました",
				confirmButtonColor: "#8fbc8f"
			});
			//$(".error").show();
		}
	});
}

