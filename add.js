// Initialize Parse with your Parse application javascript keys
Parse.initialize("HkycYcXTouVqnrPIz4KYcUGEG4iSwhaiNuqDohzR", "ST9G77Nfh2ZCgjsByoQ3OW4rlsKnkdjNhwoKs2Lg");

window.onload = function() {
	//新規カテゴリEdtを消しておく
	document.getElementById("new_ctgr").style.display = "none";

	//ログイン情報
	getLoginInfo();

	//デフォルト名称
	var eleName = document.getElementById("username");
	if (Parse.User.current()) {
		eleName.value = Parse.User.current().getUsername();
	} else {
		eleName.value = "unknown";
	}

	//カテゴリ読込
	loadCategoryInfo();
}

function loadCategoryInfo() {
	var Category = Parse.Object.extend("Category");
	var query = new Parse.Query(Category);
	query.ascending("ordKey");
	query.limit(1000);
	query.find({
		success: function(results) {
			//プルダウンにセット
			var ele = document.getElementById("category");
			ele.length = 1;
			for (var i=0; i<results.length; i++) {
				ele.length++;
				ele.options[i+1].text = results[i].get("categoryName");
				ele.options[i+1].value = results[i].get("categoryName");
			}
			ele.length++;
			ele.options[results.length+1].text = "(新規カテゴリ追加)";
			ele.options[results.length+1].value = "new_category";

		},
		error: function(error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}

function onClickAdd() {
	//要素取得
	var strRemark = document.getElementById("remark");
	var strTags = document.getElementById("tags");
	var cmbCategory = document.getElementById("category");
	var strNewCtgr = document.getElementById("new_ctgr");
	var strUserName = document.getElementById("username");

	//カテゴリの新規登録
	var rgstCtgr;
	if (cmbCategory.options[cmbCategory.selectedIndex].value == "new_category") {
		rgstCtgr = strNewCtgr.value;
		saveNewCategory(rgstCtgr);
	} else {
		rgstCtgr = cmbCategory.options[cmbCategory.selectedIndex].value;
	}

	var Kotonoha = Parse.Object.extend("Kotonoha");
	var object = new Kotonoha();
	object.save({sentence: strRemark.value, 
		     tags: strTags.value, 
		     category: rgstCtgr,
		     username: strUserName.value}, {
		success: function(obj) {
			swal({
				title: "メッセージ",
				text: "コトノハを登録しました",
				confirmButtonColor: "#8fbc8f"
			});
			strRemark.value = "";
			strTags.value = "";
			strNewCtgr.value = "";
			cmbCategory.options[0].selected = true;
		},
		error: function(model, error) {
			swal({
				title: "エラー",
				text: "コトノハの登録に失敗しました",
				confirmButtonColor: "#8fbc8f"
			});
		}
	});
}

function saveNewCategory(ctgrName) {
	var Category = Parse.Object.extend("Category");
	var object = new Category();
	object.save({categoryName: ctgrName}, {
		success: function(obj) {
			var cmb = document.getElementById("category");
			cmb.length++;
			cmb.options[cmb.length-1].text = "(新規カテゴリ追加)";
			cmb.options[cmb.length-1].value = "new_category";
			cmb.options[cmb.length-2].text = ctgrName;
			cmb.options[cmb.length-2].value = ctgrName;

		},
		error: function(model, error) {
			swal({
				title: "エラー",
				text: "コトノハの登録に失敗しました",
				confirmButtonColor: "#8fbc8f"
			});
		}
	});

}

function onChangeCategory() {
	var eleCmb = document.getElementById("category");
	var eleEdt = document.getElementById("new_ctgr");

	if (eleCmb.options[eleCmb.selectedIndex].value == "new_category") {
		eleEdt.style.display = "";
	} else {
		eleEdt.style.display = "none";
		eleEdt.value = "";
	}
}
