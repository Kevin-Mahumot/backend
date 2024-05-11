import nodemailer from 'nodemailer';

async function sendEmail(toEmail,code) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahumotkevin223@gmail.com', 
            pass: 'dnzf vxfd sggg vxjq' 
        }
    });

    let mailOptions = {
        from: 'mahumotkevin223@gmail.com', 
        to: toEmail,
        subject: 'Email verification',
        text: `Code: ${code}`
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to ' + toEmail + '! Message ID: ', info.messageId);
    } catch (error) {
        console.error('Error occurred:', error.message);
        throw new Error('Email sending failed'); // Throw an error to stop the program
    }
}

async function main(userEmail,code) {
    try {
        await sendEmail(userEmail,code);
    } catch (error) {
        console.error('Error in sending email:', error.message);
        process.exit(1); 
    }
}

export { main }; 
