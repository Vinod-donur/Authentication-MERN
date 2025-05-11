const { sender, client } = require("./email.config.js");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
} = require("./emailTemplates.js");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "verification",
    });
    console.log("Varification email is sent successfully", response);
  } catch (error) {
    console.error("Error sending varification email", error);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "88cf4112-a5b4-4f2f-973b-8fa61a8b66ac",
      template_variables: {
        company_info_name: "Auth company",
        name: name,
        category: "welcome",
      },
    });
    console.log("Welcome email is sent successfully", response);
  } catch (error) {
    console.error("Error sending welcome email", error);
  }
};

const passwordResetRequest = async (email, url) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Link to reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url),
      category: "resetPassword",
    });
    console.log("Reset password link sent successfully", response);
  } catch (error) {
    console.error("Error sending passwordReset link email", error);
  }
};

const resetPasswordSuccess = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset password was successfull",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "resetPassword",
    });
    console.log("resetPasswordSuccess email sent successfully", response);
  } catch (error) {
    console.error("Error sending resetPasswordSuccess email", error);
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  passwordResetRequest,
  resetPasswordSuccess,
};
