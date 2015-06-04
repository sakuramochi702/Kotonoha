// Initialize Parse with your Parse application javascript keys
Parse.initialize("RyriJBc2TjOhFHEaIxkDxtqcnJQSKZaClGGMmehF", "SGGa3oawzAs7RVHoTocutegM117AcvRPWFPcyfwX");

window.onload = function() {
	//
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
	user.signUp(null, {
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

