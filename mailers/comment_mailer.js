const nodemailer = require('../config/nodemailer');


  // Define a function to send a new comment mail
exports.newComment = async (comment) => {
  // Render the HTML template with the comment data
  let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

  console.log('inside newComment mailer', comment);

  // Send the mail with the transporter object
  try {
    let info = await nodemailer.transporter.sendMail({
      from: '"Codeial👻" <h10317981@gmail.com>',
      to: comment.user.email,
      subject: 'New Comment Published!',
      html: htmlString,
    });
    console.log('Message sent', info);
  } catch (err) {
    console.log('Error in sending mail', err);
  }
}


// exports.newComment = (comment) => {
 
//   let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

//   console.log('inside newComment mailer', comment);

//   nodemailer.transporter.sendMail({
//       from: '"Codeial👻" <h10317981@gmail.com>',
//       to: comment.user.email,
//       subject: 'New Comment Published!',
//       html: htmlString,
//   }, (err,info) => {
//       if(err){
//           console.log('Error in sending mail', err);
//           return;
//       }
      
//       console.log('Message sent' , info);
//       return;
//   });

// }