function lo() {

load();		
var rootRef = firebase.database().ref();
var urlRef = rootRef.child("Candidate_Details");
urlRef.once("value", function(snapshot) {
  snapshot.forEach(function(child) {

  	var obj = child.val();

  	var candidate = [obj];

	

	candidate.forEach(function (e) {
		
                var number= Object.keys(e.votes);
		var number_vote=number.length;
		html= ' <div class="cont text-center"><div class="item"><div class="content"><img src='+e.imageUrl+' width="200" height="200"><br><p>'
		+ e.name +'</p><p>' 
		+ e.faculty + '</p><p>'
		+ e.country + '</p><p>'
		+' Vote: '+number_vote+' </p></div></div></div>'

		
        
		$("body").append(html);
		stopLoading();

	});
});
});

}

function logout() {
firebase.auth().signOut()
.then(() => {

 redirect("log.html");
 
}).catch((err) => {
  error(err);
});
 
}
	
