"use strict";

const sgMail = require("@sendgrid/mail");
const Logger = require("@services/logger");

module.exports = async ({ email, code }) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_APIKEY);
        const msg = {
            to: email,
            from: process.env.FROM_EMAIL,
            subject: `Login code from ${process.env.SERVER_NAME}: ${code}`,
            text: `Welcome to ${process.env.SERVER_NAME}. You (or someone else) has requested a login code: ${code}
        To use this, simply enter the code in the login form, or click the following link:
        ${process.env.SERVER_URL}/${email}/${code}`,
            html: `<h3>Welcome to ${process.env.SERVER_NAME}</h3>
        <p>You (or someone else) has requested a login code: ${code}</p>
        To use this, simply enter the code in the login form, or click the following link:
        <a href="${process.env.SERVER_URL}/${email}/${code}">${process.env.SERVER_URL}/${email}/${code}</a>`,
        };
        const response = await sgMail.send(msg);
        if (response[0]?.statusCode === 202 || response[0]?.statusCode === 200) {
            Logger.info(`user-emailcode: sent email code '${code}' to '${email}' ok`);
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
