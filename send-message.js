import { config } from 'dotenv';
config();
import { readFileSync } from 'fs';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

// const serviceAccount = JSON.parse(readFileSync('./c2.json'));

const topic = "example";


initializeApp({
  credential: applicationDefault(),
});

subscribeToTopic()
sendMessage()


function sendMessage() {
  getMessaging().sendToTopic(topic, {
    notification: {
      title: 'Test',
      body: `{"type": "NEW_ISSUE"}`
    }
  }).then(() => {
    console.log(`Success sending the message`)
  })
    .catch(error => {
      console.log(error);
    });
}


function subscribeToTopic() {
  const registrationTokens = [
    // "eIb2K6I41GpPmIE83Yclrk:APA91bH3NJZmSDMkE5nWBLtVarhc5rr02W-TBe3VzEXU6NLMBK3GOFlnT0YS_FK7ncAQRHtfxK84jOdwXHOTiJPaHL6aNl02fI-DHFjY2Deja_kzVGwGNmT7TwoTkH8hem3ettxiauJM",
    "dBNq8tEi8f4YVvriOMdZn9:APA91bGCVNhYnVGChpjs110LrIHOz6CRLfiKVfQsxOUdEwIh9cRXP0BC0QN1KfKlJff9REWfL5Zr6Kkw6tqS6oFLlJJ_PkAS8ptBiF-8QPh4823xOtkF-TUV8Tiagi5oDI9hF7EzOM94" // Arc
    // "dirkP8EAM5HY3NDnKQkzyd:APA91bFZy57hDpQc164xD2cmn9G9JvtPP5UB5egoHKeglRyy-AG7czNjFCK1_usN3y9-N74g_wrhdK14M0IVpu4na_sKztz7K5bVFz4UNvD79SZifJAw7XDNgQuePdxctrQjtgP_CZAz" // ios
  ];

  getMessaging().subscribeToTopic(registrationTokens, topic)
    .then((response) => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log('Successfully subscribed to topic:', response);
    })
    .catch((error) => {
      console.log('Error subscribing to topic:', error);
    });
}

