//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	console.log("Leyendo Sensores");
	message = new Paho.MQTT.Message("Leyendo Sensores");
    	message.destinationName = "mayra.leon@unach.edu.ec/t1";
    	client.send(message);
  
}
function LED1_Off(){	
	//alert("led off");
	console.log("led off");
	message = new Paho.MQTT.Message("OFF");
    	message.destinationName = "mayra.leon@unach.edu.ec/t1";
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
    userName: "mayra.leon@unach.edu.ec",
    password: "Valeska2016+",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("mayra.leon@unach.edu.ec/t2");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "mayra.leon@unach.edu.ec/t1";
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
    console.log("Mensaje Recibido:"+message.payloadString);
    separador='Sensores';
    mensaje=message.payloadString;
const mensajesep = mensaje.split(' ');
	  if(mensaje.includes(separador)){
	  	document.getElementById("sensor1").innerHTML=mensajesep[1];
	  	document.getElementById("sensor2").innerHTML=mensajesep[2];
	  }
    document.getElementById("historial").innerHTML=numero[2];
  }
