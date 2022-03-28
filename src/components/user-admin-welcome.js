"use strict";

const sgMail = require("@sendgrid/mail");
const Logger = require("@services/logger");

module.exports = async (req) => {
    try {
        const email = req.params.email;
        sgMail.setApiKey(process.env.SENDGRID_APIKEY);
        const msg = {
            to: email,
            from: process.env.FROM_EMAIL,
            subject: `You have been registered on ${process.env.SERVER_NAME}`,
            text: `Welcome to ${process.env.SERVER_NAME}. You (or someone else) has registered your email address.
            To get started rescuing bunnies, please click the following link:
        ${process.env.SERVER_URL}/${email}`,
            html: `<h3>Welcome to ${process.env.SERVER_NAME}</h3>
        <p>You (or someone else) has registered your email address.</p>
        To get started rescuing bunnies, please click the following link:
        <a href="${process.env.SERVER_URL}/${email}">${process.env.SERVER_URL}/${email}</a>`,
        };
        const response = await sgMail.send(msg);
        if (response[0]?.statusCode === 202 || response[0]?.statusCode === 200) {
            Logger.info(`user-welcome: sent welcome email to ${email} ok`);
            return true;
        }
        console.error(response);
    } catch (error) {
        if (error.response) {
            const { response } = error;
            const { body } = response;
            console.error(body);
        } else {
            console.error(error);
        }
        return false;
    }
};
