//https://www.eclipse.org/paho/clients/js/
function enviarmsg() {
  console.log("Mensaje enviado");
  texto = document.getElementById('enviar').value;
  message = new Paho.MQTT.Message(texto);
  message.destinationName = "asilva.fie@unach.edu.ec/test1";
  client.send(message);
}

function LED1_On() {
	console.log("led on");
 	document.getElementById('estado').innerHTML='Encendido';
	message = new Paho.MQTT.Message("ON");
    	message.destinationName = "asilva.fie@unach.edu.ec/test1";
    	client.send(message);
  
}
function LED1_Off(){	
	console.log("led off");
	document.getElementById('estado').innerHTML='Apagado';
	message = new Paho.MQTT.Message("OFF");
    	message.destinationName = "asilva.fie@unach.edu.ec/test1";
    	client.send(message);
 	
}






// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
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
	
    client.subscribe("asilva.fie@unach.edu.ec/test");
    message = new Paho.MQTT.Message("Hola desde la Web");
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
	  document.getElementById("sensor").innerHTML=message.payloadString;
  }
  
