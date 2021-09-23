//https://www.eclipse.org/paho/clients/js/
function enviarmsg() {
  console.log("Mensaje enviado");
  var texto = document.getElementById('enviarmensaje').value;
  message = new Paho.MQTT.Message(texto);
  message.destinationName = "asilva.fie@unach.edu.ec/test1";
  client.send(message);
  document.getElementById('enviarmensaje').value = '';
}

function LED1_On() {
	console.log("Led Encendido");
 	document.getElementById('estado').innerHTML='Encendido';
	document.getElementById('led').src='/static/images/On.png';
	
	message = new Paho.MQTT.Message("ON");
    	message.destinationName = "asilva.fie@unach.edu.ec/test1";
    	client.send(message);
  
}
function LED1_Off(){	
	console.log("Led Apagado");
	document.getElementById('estado').innerHTML='Apagado';
	document.getElementById('led').src='/static/images/Off.png';
	message = new Paho.MQTT.Message("OFF");
    	message.destinationName = "asilva.fie@unach.edu.ec/test1";
    	client.send(message);
 	
}
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "asilva.fie@unach.edu.ec",
    password: "ANDres_soapmac161293#",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Usted esta Conectado");
    alert("Usted se ha Conectado");
    client.subscribe("asilva.fie@unach.edu.ec/test");
    client.subscribe("asilva.fie@unach.edu.ec/test1");
    message = new Paho.MQTT.Message("Hola Conectado desde la Web");
    message.destinationName = "asilva.fie@unach.edu.ec/test1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	  document.getElementById("recibido").innerHTML=message.payloadString;
if (message.payloadString=="ON") {
	document.getElementById("sensor1").innerHTML=message.payloadString;
} else if (message.payloadString=="OFF") {
 	document.getElementById("sensor1").innerHTML=message.payloadString;
} else {
  	document.getElementById("recibido").innerHTML=message.payloadString;
}
  
