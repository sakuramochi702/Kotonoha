// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

//ログイン情報の取得関数
function getLoginInfo() {
	//ログイン情報
	var ele = document.createElement('div');
	var ele2 = document.getElementById("content");

	ele.id = "user";	
	if (Parse.User.current()) {
		ele.innerHTML = '<p id="usernm">' 
			+ Parse.User.current().getUsername() 
			+ ' としてログイン中</p>'
			+ '<p id="logout" class="logout" onClick="onClickLogout()">'
			+ 'ログアウト</p>';

		ele2.style.margin = "32px auto 0 auto";
	} else {
		ele.innerHTML = '<p id="usernm">ログインしていません</p>';
		ele2.style.margin = "32px auto 0 auto";
	}
	var par = document.getElementById('userinfo');
	par.appendChild(ele);
}

//ログアウト処理
function onClickLogout() {
	try {
		Parse.User.logOut();
		swal({
			title: "メッセージ",
			text: "ログアウトしました。",
			confirmButtonColor: "#8fbc8f"
		}, function() {
			//ダイアログクローズ後の処理
			//※SweetAlertは非同期処理なのでコールバックで行う
			window.location.href = "index.html";
		});
	} catch (e) {

	}
}

