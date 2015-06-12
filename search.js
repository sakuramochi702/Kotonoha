// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

//読み込んだデータのobjectIdを保持しておく
var arrayObjectIds = [];

window.onload = function() {
	//ログイン情報
	getLoginInfo();

	//データ読み込み
	loadData();
}

function onClickSearch() {
	//配列の初期化
	arrayObjectIds = [];

	//remarkの削除
	var domobj = document.getElementById("wordlist");
	var firstchild = domobj.firstChild;
	while (firstchild.nextSibling) {
		domobj.removeChild(firstchild.nextSibling);
	}
	domobj.removeChild(firstchild);

	//読込直し
	loadData();
}

function loadData() {
	var eleCond = document.getElementById("cond");

	var Kotonoha = Parse.Object.extend("Kotonoha");
	var query = new Parse.Query(Kotonoha);
	
	//条件指定なし or tags検索用
	if (eleCond.value.length > 0) {
		query.contains("tags", eleCond.value);
	}
	query.limit(100);
	query.find({
		success: function(results) {
			for (var i=0; i<results.length; i++) {
				var object = results[i];
				arrayObjectIds.push(object.id);

				//div生成
				createRemarkDiv(object);
			}
			if (eleCond.value.length > 0) {
				loadDataForSentenceCond();
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});

	if (eleCond.value.length > 0) {
			}
}

function loadDataForSentenceCond() {
	var eleCond = document.getElementById("cond");
	var Kotonoha = Parse.Object.extend("Kotonoha");
	var query = new Parse.Query(Kotonoha);
	query.contains("sentence", eleCond.value);
	query.find({
		success: function(results) {
			for (var i=0; i<results.length; i++) {
				var object = results[i];

				if (!alreadyContained(object.id)) {
					//div生成
					arrayObjectIds.push(object.id);
					createRemarkDiv(object);
				}
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function alreadyContained(val) {
	for(var i = 0; i < arrayObjectIds.length; i++){
		if (arrayObjectIds[i] === val) {
			return true;
			break;
		}
	}
	return false;
}

function createRemarkDiv(object) {
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
}
