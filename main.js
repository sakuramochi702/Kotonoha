// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

window.onload = function() {
	//ログイン情報
	getLoginInfo();

	//ランダム1件表示の読み込み
	loadRandomData();
}

function loadRandomData() {
	var KotonohaCnt = Parse.Object.extend("Kotonoha");
	var queryCnt = new Parse.Query(KotonohaCnt);
	queryCnt.count({
		success: function(number) {
			var Kotonoha = Parse.Object.extend("Kotonoha");
			var query = new Parse.Query(Kotonoha);
			query.skip(Math.floor(Math.random() * number));
			query.limit(1);
			query.find({
				success: function(results) {
					var object = results[0];

					//div生成
					var element = document.createElement('div');
					element.id = "remark";
					element.innerHTML = '<p id="sentence">'
						+ object.get('sentence') + '</p>'
						+ '<p id="tag">' + object.get('tags') + '</p>'
						+ '<p id="datetime">Added by '
						+ object.get('username') + '</p>'
						+ '<p id="btn-social">'
						//add_collection
						+ '<span class="fa-stack fa-lg">'
						+ '<i class="fa fa-circle fa-stack-2x '
						+ 'bg-btn-social"></i>'
						+ '<i class="fa fa-star fa-stack-1x '
						+ 'pull-left text-btn-star"></i>'
						+ '</span>'
						//twitter
						+ '<span class="fa-stack fa-lg">'
						+ '<i class="fa fa-circle fa-stack-2x '
						+ 'bg-btn-social"></i>'
						+ '<i class="fa fa-twitter fa-stack-1x '
						+ 'pull-left text-btn-twitter"></i>'
						+ '</span>'
						//facebook
						+ '<span class="fa-stack fa-lg">'
						+ '<i class="fa fa-circle fa-stack-2x '
						+ 'bg-btn-social"></i>'
						+ '<i class="fa fa-facebook fa-stack-1x '
						+ 'pull-left text-btn-facebook"></i>'
						+ '</span>'
						+ '</p>';

					var objParent = document.getElementById('wordlist');
					objParent.appendChild(element);	
				},
				error: function(error) {
					alert("Error: " + error.code + " " + error.message);
				}
			});
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


