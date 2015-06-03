// Initialize Parse with your Parse application javascript keys
Parse.initialize("RyriJBc2TjOhFHEaIxkDxtqcnJQSKZaClGGMmehF", "SGGa3oawzAs7RVHoTocutegM117AcvRPWFPcyfwX");

window.onload = function() {
	//
}

function onClickRgst() {
	//要素取得
	var lblUsername = document.getElementById("username");
	var lblPassword = document.getElementById("password");
	var lblEmail = document.getElementById("email");

	Parse.User.signUp(lblUsername.value, lblPassword.value, {
		success: function(user) {
			// サインアップ成功
			swal({
				title: "メッセージ",
				text: "ユーザートウロクにセイコウしました",
				confirmButtonColor: "#8fbc8f"
			});
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

