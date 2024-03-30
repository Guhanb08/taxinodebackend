import nodemailer from "nodemailer";
import AWS from "aws-sdk";

const sns = new AWS.SNS();

export const emailInvoice = async (invoice: any) => {
  try {
    var transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      auth: {
        user: "service@kudilagam.com",
        pass: "Abcd@1234",
      },
    });

    var mailOptions = {
      from: '"Taxi" <service@kudilagam.com>',
      to: invoice?.customer.emailid,
      cc: "service@kudilagam.com",
      subject: `Purchase Confirmation`,
      html: getEmailTemplate(invoice),
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          reject(false);
        } else {
          console.log("emai", true);
          resolve(true);
        }
      });
    });

    await transporter.sendMail(mailOptions, function (error, info) {});
  } catch (err) {
    return false;
  }
};

export const smsInvoice = async (invoice: any) => {
  const params = {
    Message: `Hi ${invoice.customer.customername}, We are pleased to inform you that your purchase has been successfully processed. A detailed email has been sent to you for your reference. Thank you for choosing to shop with us.`,
    PhoneNumber: `${
      invoice.customer.mobile.length == 10 ? "+91" : "+41"
    }${invoice.customer.mobile}`,
  };

  try {
    const data = await sns.publish(params).promise();
    console.log(data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getEmailTemplate = (invoice: any) => {
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Simple Transactional Email</title>
      <style media="all" type="text/css">
  @media all {
   
  
  }
  @media only screen and (max-width: 640px) {
    .main p,
  .main td,
  .main span {
      font-size: 16px !important;
    }
  
    .wrapper {
      padding: 8px !important;
    }
  
    .content {
      padding: 0 !important;
    }
  
    .container {
      padding: 0 !important;
      padding-top: 8px !important;
      width: 100% !important;
    }
  
    .main {
      border-left-width: 0 !important;
      border-radius: 0 !important;
      border-right-width: 0 !important;
    }
  
    .btn table {
      max-width: 100% !important;
      width: 100% !important;
    }
  
    .btn a {
      font-size: 16px !important;
      max-width: 100% !important;
      width: 100% !important;
    }
  }
  @media all {
    .ExternalClass {
      width: 100%;
    }
  
    .ExternalClass,
  .ExternalClass p,
  .ExternalClass span,
  .ExternalClass font,
  .ExternalClass td,
  .ExternalClass div {
      line-height: 100%;
    }
  
    .apple-link a {
      color: inherit !important;
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      text-decoration: none !important;
    }
  
    #MessageViewBody a {
      color: inherit;
      text-decoration: none;
      font-size: inherit;
      font-family: inherit;
      font-weight: inherit;
      line-height: inherit;
    }
  }
  </style>
    </head>
    <body style="font-family: Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.3; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f4f5f6; margin: 0; padding: 0;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4f5f6; width: 100%;" width="100%" bgcolor="#f4f5f6">
        <tr>
          <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
          <td class="container" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; max-width: 600px; padding: 0; padding-top: 24px; width: 600px; margin: 0 auto;" width="600" valign="top">
            <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 600px; padding: 0;">
  
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border: 1px solid #eaebed; border-radius: 16px; width: 100%;" width="100%">
  
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; box-sizing: border-box; padding: 24px;" valign="top">
                    <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 35px;">Hi ${invoice.customer.customername},</p>
                    <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;">We are pleased to inform you that your purchase   was successful.</p>
                            <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 35px;">Invoice Number: <strong>[#${invoice.invoiceno}]</strong></p>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%; min-width: 100%;" width="100%">
                      <tbody>
                        <tr>
                          <td align="left" style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top; padding-bottom: 16px;" valign="top">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                              <tbody>
                                <tr>
                                  <td style="font-family: Helvetica, sans-serif; font-size: 25px; vertical-align: top; border-radius: 4px; text-align: center; background-color: #0867ec;" valign="top" align="center" bgcolor="#0867ec"> <a href="https://taxi-itheorie.ch/taxipos/apps/invoice/order/${invoice._id}" target="_blank" style=" border-radius: 4px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 24px; text-decoration: none; text-transform: capitalize; background-color: #ffd125;  color: #000; ">View Invoice</a> </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px; margin-top: 30px;">Thank you for shopping with us!</p>
                    <p style="font-family: Helvetica, sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 16px;">${invoice.branch.companyname}</p>
                  </td>
                </tr>
  
                <!-- END MAIN CONTENT AREA -->
                </table>
  
              <!-- START FOOTER -->
              <div class="footer" style="clear: both; padding-top: 24px; text-align: center; width: 100%;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                
                </table>
              </div>
  
              <!-- END FOOTER -->
              
  <!-- END CENTERED WHITE CONTAINER --></div>
          </td>
          <td style="font-family: Helvetica, sans-serif; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>`;
};