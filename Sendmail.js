importPackage(javax.mail, javax.mail.internet);

let map = new java.util.Properties(),
user = 'NAVER_E-MAIL',
pw = 'NAVER_PASSWORD';
map.put('mail.smtp.host', 'smtp.naver.com');
map.put('mail.smtp.port', 587);
map.put('mail.smtp.auth', 'true');
map.put('mail.smtp.ssl.enable', 'true');
map.put('mail.smtp.ssl.trust', 'smtp.naver.com');

function Sendmail(email, subject, text, send_html) {
    try {
        let authen = new javax.mail.Authenticator() {
            getPasswordAuthentication() {
                return new PasswordAuthentication(user, pw);
            }
        },
        session = Session.getInstance(map, authen),
        msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress(user));
        msg.addRecipient(Message.RecipientType.TO, new InternetAddress(email));
        msg.setSubject(subject);
        if (send_html) msg.setContent(text, 'text/html');
        else msg.setText(text);
        Transport.send(msg);
        return 'E-mail: ' + email.split('@')[0] + '\nDomain: '+ email.split("@")[1] + '\nType: ' + (send_html ? 'HTML' : 'Plain Text') + '\nSubject: ' + subject + '\nMessage: ' + text.slice(0, 10);
    } catch (e) {
        return JSON.stringify(e, null, 4);
    }
}
