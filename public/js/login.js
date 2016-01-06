

$('#login').on('submit', function(e) {
	e.preventDefault();
	var temp = {
		"info": []
	};
	temp.info[0] = ($('#username').val());
	temp.info[1] = ($('#pass').val());
	console.log(JSON.stringify(temp));
	$.ajax({
		url: '/checkLogin',
		type: 'POST',
		data: JSON.stringify(temp),
		contentType: "application/json",
		complete: function(data) {
			console.log(data.responseText);
				if (data) {
					console.log("did it");
				}
			}
	});
});