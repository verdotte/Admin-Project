function lo() {

load();		
var rootRef = firebase.database().ref();
var urlRef = rootRef.child("Candidate_Details");
urlRef.once("value", function(snapshot) {
  snapshot.forEach(function(child) {

  	var obj = child.val();

  	var candidate = [obj];

	

	candidate.forEach(function (e) {
		

		html= ' <div class="cont text-center"><div class="item"><div class="content"><img src='+e.imageUrl+' width="200" height="200"><br><p>'
		+ e.name +'</p><p>' 
		+ e.faculty + '</p><p>'
		+ e.country + '</p><p>'
		+' Vote: 0 </p></div></div></div>'

		
        
		$("body").append(html);
		stopLoading();

	});
});
});

}
	