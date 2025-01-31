const vision = require('@google-cloud/vision');

const CREDENTIALS = {
    "type": "service_account",
    "project_id": "elated-drive-331319",
    "private_key_id": "c7a197654c475874f5db5df03c98e9086990bddf",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCmgK///n3Pw3CZ\nymxyfHkY9nxJBJa4OFmGA5JKUHtcz+ZWJd0rQDEMAcfH2/vowUl+5jRMY7mlP4ME\nLCzDoLw5FIdOaMyo6CxBySc9SmTDfT6Rfi4r1wRZFkSjmJf3VyEw4rVqQThaUiTA\nJAOBhSuDEopLyJsxx5Pm4+4kQIJjX0ttIZx10rbk+irl/YavTurTv9pvwgfU180q\nglry7Kz7eNm/V7zUBP1nzuMZJjBLiVbHQRynJEjKgAYxHNHx1HixFnMLvupnrDIm\nlKKK28jZeztQALRHzpKtgiz4qqoc/OULxlOtK4kbVHZhalvTRwKXkI6lG/Ixlvft\nPT57JsX5AgMBAAECggEAUqTmdyDJLuJ51gQZHxx0eTUDTLT34Lmrie7k4nkfOlrB\nIDqMFIc4sRaDJMsmtwmVouS9ybroL0Mek2gf0fxK4OQ1IvC2wRH4wbCIBw6RhEz6\nzPm+DimcMWHxsOgxaeY4Bc1JsdNslrxWHH7jtJq2lckSlvocOjGvUngJQLo6Xfrl\nVHZsVFw1x6iltS1OfDr1pV+ucXq9ahWfrULRR2/Y/1IxGFYB5yLNr0PFaMGcfyFp\njwCh5KEpCNbJAvvkmw067U6YDMUaiyKgHypRmnJwe2wVlwuz7zQcDECf1Gijy9FG\nflCF4dShzfOFgqBHWG9IE3RovOAv1wg3kWi8Aky3LwKBgQDltPp9i/U8lGiIhfcN\nqXg22ihzYeQ1mIF+L7Zv9jcfqeq98k8ohJ+kcNk0nKPQJJNKx3wl9KcMsETmmAHq\nWiR3JSVVZ0q2GIYUXy3iy/iqWTk/iXZvJmgtcGrpFsYSYseaNKbofO7EfyriutIC\nWukSWT4f+G68jQrg86fLYgzAfwKBgQC5j6gow6cy5cLEMGGroA0nroTd4fSi9Zlt\nhO5P/md078mPvwRBx1RnwWHw2x6exijcTRCa2NKNv1wqdtAzN7V/0yjFobzWA/m1\nhY8vja9bMZ9UrvC2C/tmX3r/jICL50MY8PeKfdtd2ogi6z+xVagCPF/VQkAO1Mre\nwJKd+/E9hwKBgGSMPqVb8SHuWH+CHG1XhC6GefRfojQvqGci3XnOzbxHdWBlw26Z\n9wNU/k7AThhbGjo+bcJzf/fW5KIHYbdCc/nPQbNLfnGM9IvQSdafsB5o5d1A/52R\ns0JIlhOni1Ya9QI0D+duYFmUzKHoYury/liwxbfa2CYimuNy5Dzrk2djAoGAW6Ho\nLXEooMa7HjyyDplzxZO1wwgw0UQs5ttM/62mkyVSSKzQQldXhAEIB3N9NHSwetGH\nkJ/foeXMcp/HgnNRKnUw3h9Xa+v8pLn2kkoKPSNNBfl5nrxeAhjGWWmdlPi3tppP\n81DhQgCHV48KHd0poSkFPf+AOJK2N7eq718ZqwMCgYEAu10IUnXvDLBgUrJD0J5Y\neb4l+371luLOVbgljUesQr3TbpUj1/cKSRVFoZH3HcQEMwumpLVC5yR9IkbK0oVb\nigCMPlw99mE1DD2e3OvpMaLG6IW/v8jW2MvQqi04tmv9zDYLq4g2UN7ZYhIYqSsb\nXIN9WRFBZUrmlPltdzsj86A=\n-----END PRIVATE KEY-----\n",
    "client_email": "abhi-970@elated-drive-331319.iam.gserviceaccount.com",
    "client_id": "118103471270675116351",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/abhi-970%40elated-drive-331319.iam.gserviceaccount.com"
  
  };

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
};

const client = new vision.ImageAnnotatorClient(CONFIG);

const detectLandmark = async (file_path) => {

    let [result] = await client.landmarkDetection('landmark_one.jpeg');
    console.log(result.landmarkAnnotations[0].description);
};

detectLandmark();

// const detectText = async (file_path) => {

//     let [result] = await client.textDetection(file_path);
//     console.log(result.fullTextAnnotation.text);
// };

// detectText('text.png');