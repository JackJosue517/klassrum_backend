const firebase = require('./../firebase/index')
const Notification = require('./../models/notification')

//TODO: All REGISTRATION_TOKEN WILL BE GIVEN BY METHOD POST

/*
 *  Send messages to specific devices *
 * */
exports.sendToThisDevice = (req, res, next) => {
  // This registration token comes from the client FCM SDKs.
  //* const registrationToken = 'YOUR_REGISTRATION_TOKEN'
  const registrationToken = req.body.token

  const message = {
    data: {
      score: '850',
      time: '2:45',
    },
    token: registrationToken,
  }

  // Send a message to the device corresponding to the provided
  // registration token
  firebase
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a messag ID string
      console.log('Successfully sent message: ', response)
      res.status(200).json({ response })
    })
    .catch((error) => {
      console.log('Error sending message: ', error)
      res.status(500).json({ error })
    })
}

/*
 *  Send messages to multiples devices *
 * */
exports.sendToMultipleDevices = (req, res, next) => {
  // Create a list containing up to 500 registration tokens.
  // These registration tokens come from the client FCM SDKs.
  const registrationTokens = req.body.tokens

  const message = {
    data: {
      score: '850',
      time: '2:45',
    },
    tokens: registrationTokens,
  }

  // Send a message to the device corresponding to the provided
  // registration token
  firebase
    .messaging()
    .sendMulticast(message)
    .then((response) => {
      if (response.failureCount > 0) {
        const failedTokens = []
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(registrationTokens[idx])
          }
        })
        console.log('List of tokens that caused failures: ' + failedTokens)
        res.status(500).json({ error, failedTokens })
      }
      res.status(200).json({ response })
    })
}

/*
 *  Send messages to topics *
 * */
exports.sendToTopics = (req, res, next) => {
  // The topic name can be optionally prefixed with "/topics/".
  const topic = req.params.topic
  const registrationTokens = topic

  const message = {
    data: {
      score: '850',
      time: '2:45',
    },
    tokens: registrationTokens,
  }

  //TODO: The following condition will send messages to devices that are subscribed to TopicA
  //TODO: either TopicB or TopicC
  //TODO: "'TopicA' in topics && ('TopicB' in topics or 'TopicC' in topics)"
  //TODO: const condition = -->
  //TODO: message = {condition: condition, notification: {title: '', body: ''}}

  // Send a message to devices subscribed to the provided topic.
  firebase
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a messag ID string
      console.log('Successfully sent message: ', response)
      res.status(200).json({ response, code: 'OK' })
    })
    .catch((error) => {
      console.log('Error sending message: ', error)
      res.status(500).json({ error })
    })
}

exports.subscribeNewClient = (req, res, next) => {
  // These registration tokens come from the client FCM SDKs
  const registrationTokens = req.body.tokens

  const topic = req.params.topic

  // Subscribe the devices corresponding to the registration tokens to the
  // topic (1000)
  firebase
    .messaging()
    .subscribeToTopic(registrationTokens, topic)
    .then((response) => {
      console.log('Successfully subscribed to topic: ', response)
      res.status(200).json({ response, code: 'OK' })
    })
    .catch((error) => {
      console.log('Error subscribing to topic: ', error)
      res.status(500).json({ error })
    })
}

exports.unsubscribeClient = (req, res, next) => {
  // These registration tokens come from the client FCM SDKs
  const registrationTokens = req.body.tokens

  const topic = req.params.topic

  // Subscribe the devices corresponding to the registration tokens to the
  // topic (1000)
  firebase
    .messaging()
    .unsubscribeFromTopic(registrationTokens)
    .then((response) => {
      console.log('Successfully unsubscribed to topic: ', response)
      res.status(200).json({ response, code: 'OK' })
    })
    .catch((error) => {
      console.log('Error unsubscribing to topic: ', error)
      res.status(500).json({ error })
    })
}

exports.getAllNotifications = (req, res, next) => {
  Notification.find({ user: req.params.idUser })
    .then((notifications) => {
      res.status(200).json(notifications)
    })
    .catch((error) => {
      res
        .status(400)
        .json({ error, code: 'E01', description: 'UNEXCEPTED-ERROR-GET-DATA' })
    })
}

exports.addNewNotification = (req, res, next) => {
  const notification = Notification({
    ...req.body,
  })
  notification
    .save()
    .then(() =>
      res.status(201).json({ code: 'S01', description: 'RESSOURCE-CREATED' })
    )
    .catch((error) =>
      res.status(400).json({
        error,
        code: 'E02',
        description: 'UNEXCEPTED-ERROR-POST-DATA',
      })
    )
}

exports.removeAllNotifications = (req, res, next) => {
  Notification.delete({ user: req.params.idUser })
    .then(() =>
      res.status(200).json({
        code: 'S02',
        description: 'RESSOURCE-DELETED',
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
        code: 'E04',
        description: 'UNEXCEPTED-ERROR-DELETE-DATA',
      })
    )
}

exports.removeOneNotification = (req, res, next) => {
  Notification.deleteOne({
    user: req.params.idUser,
    _id: req.params.idNotification,
  })
    .then(() =>
      res.status(200).json({
        code: 'S02',
        description: 'RESSOURCE-DELETED',
      })
    )
    .catch((error) =>
      res.status(400).json({
        error,
        code: 'E04',
        description: 'UNEXCEPTED-ERROR-DELETE-DATA',
      })
    )
}
