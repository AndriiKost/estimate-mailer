"use strict";
const nodemailer = require('nodemailer')
const config = require('../config/mailer')

// const mailData = {
//     companyName: 'Delian Digital',
//     userName: 'Andrii',
//     projectCost: '$2000-$2500',
//     projectDuration: '1-2 motnhs',
//     receiverEmail: 'andriikost@yahoo.com'
// };

async function mailer(args) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.user,
            pass: config.pass
        }
    });
    
    const mailOptions = {
        from: config.sender,
        to: args.receiverEmail,
        subject: `Estimate from ${args.companyName}`, 
        html: `
        <style>
        .estimate-detail {
            list-style: none;
            padding: .5em;
        }
        </style>
        <div>
            <h4>Thank You, ${args.userName}. Our team member will be back with you shortly!
            </h4>
            <div>
                <ul class="estimate-detail">
                    <li>Project Cost: ${args.projectCost}</li>
                    <li>Project Duration ${args.projectDuration}</li>
                </ul>
            </div>
        </div>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
        console.log(err)
        else
        console.log(info);
    });

}

exports.handleMail = function (req, res) {
    try {
        const newMailData = {
            companyName: req.body.companyName,
            userName: req.body.userName,
            projectCost: req.body.projectCost,
            projectDuration: req.body.projectDuration,
            receiverEmail: req.body.receiverEmail
        }

        mailer(newMailData)
        res.status(200)

        return res.send('Email sent successfully')

    } catch(err) {
        console.log(err)
        res.status(500)

        return res.send('Ooops, something went wrong....')
    }
}