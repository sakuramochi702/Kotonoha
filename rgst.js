// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

window.onload = function() {
	//ログイン情報
	getLoginInfo();
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
	try {
		//user.signUp(strUsername, strPassword, {
		user.signUp(null, {
			success: function(user) {
				// サインアップ成功
				swal({
					title: "メッセージ",
					text: "ユーザーを登録しました",
					confirmButtonColor: "#8fbc8f"
				});
			},
			error: function(user, error) {
				// サインアップ失敗
				swal({
					title: "エラーメッセージ",
					text: "エラーが発生しました。" +
						"ID/パスワードを確認してください。",
					confirmButtonColor: "#cd5c5c"
				});
			}
		});
	} catch (e) {
		// サインアップ失敗
		swal({
			title: "エラーメッセージ",
			text: "エラーが発生しました。ID,パスワードを確認してください。",
			confirmButtonColor: "#cd5c5c"
		});

	}
}

function onClickDummy() {
	swal({
		title: "メッセージ",
		text: "ユーザートウロクにセイコウしました",
		confirmButtonColor: "#8fbc8f"
	});
}

