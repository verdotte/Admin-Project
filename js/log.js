 var app = new Vue({
  el: '#app',

  data: {
    auth: {
      email: 'hello',
      password: 'yaya'
    }
  },

  methods: {

  	login : function (event) {
  		var val = this;

  		
  		console.log(val.auth.email + " " + val.auth.password);
  		
  	}
      
      
  }


  });

