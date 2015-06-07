// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

window.onload = function() {
	//ログイン情報
	getLoginInfo();

	//ランダム1件表示の読み込み
	loadOneData();
}

function loadOneData() {
	var Kotonoha = Parse.Object.extend("Kotonoha");
	var query = new Parse.Query(Kotonoha);
	query.find ({
		success: function(results) {
			var idx = Math.floor(Math.random()*results.length);
			var object = results[idx];

			//div生成
			var element = document.createElement('div');
			element.id = "remark";
			element.innerHTML = '<p id="sentence">' + object.get('sentence') + '</p>'
				+ '<p id="tag">' + object.get('tags') + '</p>'
				+ '<p id="datetime">Added by ' + object.get('username') + '</p>';

			var objParent = document.getElementById('wordlist');
			objParent.appendChild(element);

			
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function onClickNext() {
	document.getElementById('explain2').style.display = 'block';
	document.getElementById('btnNext2').style.display = 'block';
}

function onClickNext2() {
	document.getElementById('explain3').style.display = 'block';
	document.getElementById('btnRgst').style.display = 'block';
}


