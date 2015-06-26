// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

//読み込んだデータのobjectIdを保持しておく
var arrayObjectIds = [];

window.onload = function() {
	//ログイン情報
	getLoginInfo();

	if (!Parse.User.current()) {
		swal({
			title: "エラーメッセージ",
			text: "コレクションを利用するにはログインしてください。",
			confirmButtonColor: "#cd5c5c"
		});
		return;
	}

	//カテゴリ情報
	//loadCtgrInfo();

	//データ読み込み
	loadData();
}

function loadCtgrInfo() {
	var Category = Parse.Object.extend("Category");
	var query = new Parse.Query(Category);
	query.ascending("ordKey");
	query.limit(1000);
	query.find({
		success: function(results) {
			//プルダウンにセット
			var ele = document.getElementById("category");
			ele.length = 1;
			ele.options[0].text = "";
			ele.options[0].value = "NO_COND";
			for (var i=0; i<results.length; i++) {
				ele.length++;
				ele.options[i+1].text = results[i].get("categoryName");
				ele.options[i+1].value = results[i].get("categoryName");
			}
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function onKeyPressCond(code) {
	if (13 == code) {
		if (document.getElementById("cond").value != "") {
			loadData();
		}
	}
}

function onClickSearch() {
	//読込直し
	loadData();
}

function onChangeCtgr() {
	//読込直し
	loadData();
}

function loadData() {
	if (!Parse.User.current()) {
		swal({
			title: "エラーメッセージ",
			text: "コレクションを利用するにはログインしてください。",
			confirmButtonColor: "#cd5c5c"
		});
		return;
	}

	/*if (arrayObjectIds.length > 0) {
		//配列の初期化
		arrayObjectIds = [];

		//remarkの削除
		var domobj = document.getElementById("wordlist");
		var firstchild = domobj.firstChild;
		while (firstchild.nextSibling) {
			domobj.removeChild(firstchild.nextSibling);
		}
		domobj.removeChild(firstchild);
	}*/

	//var eleCond = document.getElementById("cond");
	//var eleCtgr = document.getElementById("category");
	var Kotonoha = Parse.Object.extend("Kotonoha");
	var Collection = Parse.Object.extend("Collection");
	var query = new Parse.Query(Kotonoha);
	var innerQuery = new Parse.Query(Collection);
	
	//条件指定なし or tags検索用
	/*if (eleCond.value.length > 0) {
		query.contains("tags", eleCond.value);
	}
	if (eleCtgr.options[eleCtgr.selectedIndex].value != "NO_COND") {
		query.equalTo("category", eleCtgr.options[eleCtgr.selectedIndex].value);
	}*/
	innerQuery.equalTo("username", Parse.User.current().getUsername());
	query.matchesKeyInQuery("objectId", "kotonohaId", innerQuery);
	query.limit(100);
	query.find({
		success: function(results) {
			for (var i=0; i<results.length; i++) {
				var object = results[i];
				arrayObjectIds.push(object.id);

				//div生成
				createRemarkDiv(object);
			}
			/*if (eleCond.value.length > 0) {
				loadDataForSentenceCond();
			}*/
		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function loadDataForSentenceCond() {
	var eleCond = document.getElementById("cond");
	var eleCtgr = document.getElementById("category");
	var Kotonoha = Parse.Object.extend("Kotonoha");
	var query = new Parse.Query(Kotonoha);
	query.contains("sentence", eleCond.value);
	if (eleCtgr.options[eleCtgr.selectedIndex].value != "NO_COND") {
		query.equalTo("category", eleCtgr.options[eleCtgr.selectedIndex].value);
	}
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
			/*if (eleCond.value.length > 0) {
				loadDataForCategoryCond();
			}*/
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
	element.innerHTML = '<p id="hidden"><input type="text" id="objectId" ' 
		+ 'value="' + object.id + '"></p>'
		+ '<p id="sentence">'
		+ object.get('sentence') + '</p>'
		+ '<p id="tag">' + object.get('tags') + '</p>'
		+ '<p id="category">カテゴリ: '
		+ object.get('category') + '</p>'
		+ '<p id="btn-social">'
		//remove_collection
		+ '<span class="fa-stack fa-lg">'
		+ '<i class="fa fa-circle fa-stack-2x '
		+ 'bg-btn-social"></i>'
		+ '<i class="fa fa-trash fa-stack-1x '
		+ 'pull-left text-btn-trash" onClick="onClickTrash(' + arrayObjectIds.length + ')"></i>'
		+ '</span>'
		//twitter
		+ '<span class="fa-stack fa-lg">'
		+ '<i class="fa fa-circle fa-stack-2x '
		+ 'bg-btn-social"></i>'
		+ '<i class="fa fa-twitter fa-stack-1x '
		+ 'pull-left text-btn-twitter" onClick="onClickTw()"></i>'
		+ '</span>'
		//facebook
		+ '<span class="fa-stack fa-lg">'
		+ '<i class="fa fa-circle fa-stack-2x '
		+ 'bg-btn-social"></i>'
		+ '<i class="fa fa-facebook fa-stack-1x '
		+ 'pull-left text-btn-facebook" onClick="onClickFb()"></i>'
		+ '</span>'
		+ '</p>';

	var objParent = document.getElementById('wordlist');
	objParent.appendChild(element);
}

function onClickTrash(idx) {	
	var Collection = Parse.Object.extend("Collection");
	var objId = arrayObjectIds[idx];

	//Collection保存
	var query = new Parse.Query(Collection);
	query.equalTo("username", Parse.User.current().getUsername());
	query.equalTo("kotonohaId", objId);
	query.find({
		success: function(results) {
			if (results.length > 0) {
				swal({
					title: "エラー",
					text: "既に追加済みです",
					confirmButtonColor: "#8fbc8f"
				});
			} else {
				var object = new Collection();
				object.save({username: Parse.User.current().getUsername(),
					     kotonohaId: objId}, {
					success: function(obj) {
						swal({
							title: "メッセージ",
							text: "コレクションに追加しました",
							confirmButtonColor: "#8fbc8f"
						});	
					},
					error: function(model, error) {
						swal({
							title: "エラー",
							text: "コレクションへの追加に失敗しました",
							confirmButtonColor: "#8fbc8f"
						});
					}
				});
			}
		},
		error: function(error) {
			swal({
				title: "エラー",
				text: "コレクションへの追加に失敗しました",
				confirmButtonColor: "#8fbc8f"
			});
		}
	});

}
