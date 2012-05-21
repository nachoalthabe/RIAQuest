function initObject(){
	 var req = new Request({
     url: url,
     async: false,
     onFailure: function(){
       throw ('Unable to load resource '+resource);
     }
   });
	 req.get();
}
initObject()