
//adding registration number
function adding() {
  
  var reg = $("#reg").val();
  var form= $("#myForm").val();

 /*if(!validateReg()){
    error("wrong format");
    return;
  }*/

  if(reg== ""){
    error("fill !");
  return;
  }

  var dataRef = firebase.database().ref().child("registration_Number").push();
  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    
    try{
      load();

      dataRef.child("Reg").set(reg);
      error('successfully added');
      stopLoading();
      form.reset();
 
    }catch(e){
      error(e.message);
      stopLoading();
    }
     
  } else {
    // No user is signed in.

  }
}); 
}


//add candidate
function upload() {

const ref = firebase.storage().ref();
var user = firebase.auth().currentUser;

var fullname= $("#name").val();
var faculty= $("#selection").val();
var country= $("#country").val();
const file = document.querySelector('#image').files[0];
const name = (+new Date()) + '-' + file.name;
const metadata = {
  contentType: file.type
};

load();
firebase.auth().onAuthStateChanged(function(user) {
  
  if (user!= null) {
   
   const task = ref.child(name).put(file, metadata);

task.then(snapshot => {
     var x = snapshot.ref.getDownloadURL();
      return x;   // Will return a promise with the download link
   })

   .then(downloadURL => {
      var imageUrl = downloadURL;
     // var email = document.getElementById("email").value;
       var ref = firebase.database().ref().child("Candidate_Details").push();
      
      var candidate = {
           
           name: fullname,
           faculty: faculty,
           country: country,
           imageUrl: imageUrl  
      }

      ref.set(candidate).then(function(ref) { 
                error('successfully added');
                stopLoading();
              
            }, function(error) {
                console.log(error); 
            });

   })

   .catch(error => {
      // Use to signal error if something goes wrong.
      console.log(`Failed to upload file and get link `);
   });

  } else {
    // No user is signed in.
  }
});
} 


 //faculty
 function facSelect() {
 var sel = $("#selection").val();
 }



  //Preview image
  function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}


//logout
function logout() {
firebase.auth().signOut()
.then(() => {

 redirect("log.html");
 
}).catch((err) => {
  error(err);
});
 
}





//fffff


function log() {
   
  var email = $("#email").val();
  var password = $("#password").val();

  if(email == ""){
     error("Fill this form !");
     return;
  }

  if(password == ""){
    error("Fill this form !");
    return;
  }

  console.log(password);
    
    try{

  load();

  firebase.auth().signInWithEmailAndPassword(email, password).
  then((user) =>{

    redirect("Home.html");

  })
    .catch((err) => {
      error(err);
      stopLoading();
   });

   }catch(e){
    alert(e.message);
    stopLoading();
   }


}


function check() {
  
  var email= $("#email").val();
  var password= $("#password").val();

  load();

  firebase.auth().signInWithEmailAndPassword(email,password).

  then((user)=> {
    redirect("check.html");
  }).

  catch((err)=>{
  error(err);
  stopLoading();
  })

}




// check result





