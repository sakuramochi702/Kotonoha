// Initialize Parse with your Parse application javascript keys
Parse.initialize("RyriJBc2TjOhFHEaIxkDxtqcnJQSKZaClGGMmehF", "SGGa3oawzAs7RVHoTocutegM117AcvRPWFPcyfwX");

window.onload = function() {
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

//現在時刻を文字列型で
function toLocaleString(date)
{
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
        ].join( '/' ) + ' '
        + date.toLocaleTimeString();
}
