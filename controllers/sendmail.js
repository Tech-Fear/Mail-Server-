const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");

const sendmail = async (req, res) => {
  const { to, subject, text, html } = req.body;
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let message = {
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject,
    text,
    html,
  };
  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "you  have received an mail",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error,
      });
    });
};

// from gmail
const EMAIL="nnope4086@gmail.com";
const PASSWORD='emyh onxz szby xnme';
const sendFromGmail = async (req, res) => {
  const { userEmail } = req.body;
  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(config);
  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name:"TECH-FEAR",
      link:"https://github.com/tech-fear"
    },
  });
  let response = {
    body: {
      name: "Tech_Fear",
      intro: "Hi Buddy",
      // table: {
      //   data: [
      //     {
      //       item: "Nodemailer Stack Book",
      //       description: "A Backend application",
      //       price: "$10.99",
      //     },
      //   ],
      // },
      outro: "Lets Catch UP",
    },
  };
  let mail = mailGenerator.generate(response);
  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "Using NodeMialer",
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

// module.exports = sendmail;
module.exports = {sendmail,sendFromGmail};
