window.onload = function() {
	loadMemberList();

	bit('memberForm').onsubmit = function() {
		try {
			validateForm();
			addMember();
		} catch (err) {
			alert(err);
		}
		return false;
	};
};

function validateForm() {
	var pass1 = $('pass1').value;
	var pass2 = $('pass2').value;
	if (pass1 != pass2) {
		throw '암호가 일치하지 않습니다!';
	}
	var name = $('name').value;
	var email = $('email').value;
	if (name == '' || email == '') {
		throw '이름과 이메일은 필수 입력 항목입니다!';
	}
}

function bit(id) {
  return document.getElementById(id);
}

var $ = bit;

function loadMemberList() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			//var obj = eval('(' + xhr.responseText + ')');
			var members = JSON.parse(xhr.responseText).jsonResult.data;
			var memberTable = $("memberTable");
			var tr = null;
			members.forEach(function(member){
				tr = document.createElement('tr');
				[member.no,member.name,member.email,member.tel].forEach(function(value){
					td = document.createElement('td');
					td.innerHTML = value;
					tr.appendChild(td);
				});
				memberTable.appendChild(tr);
			});
		}	  
	};
	xhr.open('GET', 'http://localhost:8080/web02/member/ajax/list.do', true);
	xhr.send(null);
}

function addMember() {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var result = JSON.parse(xhr.responseText).jsonResult; 
			if (result.resultStatus != 0) {
				alert('회원 등록 실패!');
				console.log(result.error);
			} else {
				// 목록 다시 가져오기
				alert('회원 등록 성공!');
			}
		}
	};
	xhr.open('POST', 'http://localhost:8080/web02/member/ajax/add.do', true);
	
	var data = 'name=' + encodeURIComponent($('name').value) +
		'&email=' + encodeURIComponent($('email').value) +
		'&password=' + $('pass1').value +
		'&tel=' + encodeURIComponent($('tel').value) +
		'&age=' + $('age').value;
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(data);
}




























