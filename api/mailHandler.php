<?phpfunction sendEmail() {  $request = Slim::getInstance()->request();  $emailPostData = json_decode($request->getBody());  if (isset($emailPostData->email) && !empty($emailPostData->email) &&          isset($emailPostData->mensaje) && !empty($emailPostData->mensaje) &&          isset($emailPostData->name) && !empty($emailPostData->name) &&          isset($emailPostData->telefono) && !empty($emailPostData->telefono)) {    $subject = "Mail from " . $emailPostData->email;    $messageBody = "";    $messageBody .= "<p>Nombre: " . $emailPostData->name . "</p>" . "\n";    $messageBody .= "<p>Telefono: " . $emailPostData->telefono . "</p>" . "\n";    $messageBody .= "<br>" . "\n";    $messageBody .= "<p>Email: " . $emailPostData->email . "</p>" . "\n";    $messageBody .= "<br>" . "\n";    $messageBody .= "<p>Mensaje: " . $emailPostData->mensaje . "</p>" . "\n";    $messageBody .= "<br>" . "\n";    $messageBody = strip_tags($messageBody);    $headers = "From:" . $emailPostData->email;    try {      if (mail('alecellis1985@gmail.com', $subject, $messageBody, $headers)) {        $response = MessageHandler::getSuccessResponse("El email ha sido enviado, gracias por contactarnos!", null);      } else {        $response = MessageHandler::getErrorResponse("Un error ha ocurido, por favor comuniquese mas tarde o llame directamente a prestaUy.");      }    } catch (Exception $e) {      $response = MessageHandler::getErrorResponse("Un error ha ocurido, por favor comuniquese mas tarde o llame directamente a prestaUy.");    }  } else {    $response = MessageHandler::getErrorResponse("Error, por favor complete todos los campos correctamente!");  }  echo $response;}