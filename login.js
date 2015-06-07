// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

window.onload = function() {
	//ログイン情報
	getLoginInfo();
}

function onClickLogin() {
	if (Parse.User.current()) {
			swal({
				title: "エラーメッセージ",
				text: "既にログイン済です。" +
					"別のユーザーでログインするには、一度ログアウトしてください。",
				confirmButtonColor: "#cd5c5c"
			});
			return;
	}

	//要素取得
	var strUsername = document.getElementById("username").value;
	var strPassword = document.getElementById("password").value;

	try {
		Parse.User.logIn(strUsername, strPassword, {
			success: function(user){
				// ログイン成功
				window.location.href = "index.html";
			},
			error: function(user, error){
				// ログイン失敗
				swal({
					title: "エラーメッセージ",
					text: "ログインに失敗しました。" +
						"ID/パスワードを確認してください。",
					confirmButtonColor: "#cd5c5c"
				});
			}
		});
	} catch (e) {

	}
}

