// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

window.onload = function() {
	//ログイン情報
	var ele = document.createElement('div');
	ele.id = "user";	
	if (Parse.User.current()) {
		ele.innerHTML = '<p id="usernm">' 
			+ Parse.User.current().getUsername() 
			+ ' としてログイン中</p>';
		} else {
		ele.innerHTML = '<p id="usernm">ログインしていません' ;
	}
	var par = document.getElementById('userinfo');
	par.appendChild(ele);
}

function onClickRgst() {
	//要素取得
	var strUsername = document.getElementById("username").value;
	var strPassword = document.getElementById("password").value;
	var strEmail = document.getElementById("email").value;

	var user = new Parse.User();
	user.set("username", strUsername);
	user.set("password", strPassword);
	user.set("email", strEmail);
	user.signUp(strUsername, strPassword, { ACL: new Parse.ACL(), email: strEmail }, {
		success: function(user) {
			// サインアップ成功
			//swal({
			//	title: "メッセージ",
			//	text: "ユーザートウロクにセイコウしました",
			//	confirmButtonColor: "#8fbc8f"
			//});
			swal("成功");
		},
		error: function(user, error) {
			// サインアップ失敗
			swal({
				title: "エラーメッセージ",
				text: "ユーザートウロクでエラーが発生しました",
				confirmButtonColor: "#8fbc8f"
			});
		}
	});
}

function onClickDummy() {
	swal({
		title: "メッセージ",
		text: "ユーザートウロクにセイコウしました",
		confirmButtonColor: "#8fbc8f"
	});
}

