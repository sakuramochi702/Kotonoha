// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

var fObjId = "";

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
					element.innerHTML = '<p id="hidden"><input type="text" id="objectId" ' 
						+ 'value="' + object.id + '"></p>'
						+ '<p id="sentence">'+ object.get('sentence') + '</p>'
						+ '<p id="tag">' + object.get('tags') + '</p>'
						+ '<p id="category">カテゴリ: '
						+ object.get('category') + '</p>'
						+ '<p id="btn-social">'
						//add_collection
						+ '<span class="fa-stack fa-lg">'
						+ '<i class="fa fa-circle fa-stack-2x '
						+ 'bg-btn-social"></i>'
						+ '<i class="fa fa-star fa-stack-1x '
						+ 'pull-left text-btn-star" onClick="onClickStar()"></i>'
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

					fObjId = object.id;
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

function onClickStar() {
	if (!Parse.User.current()) {
		swal({
			title: "エラーメッセージ",
			text: "コレクションを利用するにはログインしてください。",
			confirmButtonColor: "#cd5c5c"
		});
		return;
	}
	
	var Collection = Parse.Object.extend("Collection");

	//Collection保存
	var query = new Parse.Query(Collection);
	query.equalTo("username", Parse.User.current().getUsername());
	query.equalTo("kotonohaId", fObjId);
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
					     kotonohaId: fObjId}, {
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
