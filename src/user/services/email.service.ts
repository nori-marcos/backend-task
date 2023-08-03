import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error('Fail to create the test:', err);
        return;
      }

      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: 'seu_email@example.com',
        to,
        subject,
        text,
      });

      console.log('Emails sent successfully!');
      console.log(
        'Link to view the email:',
        nodemailer.getTestMessageUrl(info),
      );
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  }
}
