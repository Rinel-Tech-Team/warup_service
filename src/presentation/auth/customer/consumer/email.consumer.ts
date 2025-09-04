import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailConsumer {
  private readonly logger = new Logger(EmailConsumer.name);
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  @RabbitSubscribe({
    exchange: process.env.AMQP_EXCHANGE!,
    routingKey: 'email.otp',
    queue: 'email_otp_queue',
  })
  public async handleOtpEmail(msg: {
    to: string;
    subject: string;
    text: string;
  }) {
    try {
      await this.transporter.sendMail({
        from: `"${process.env.MAIL_FROM_NAME}" <${process.env.GMAIL_USER}>`,
        to: msg.to,
        subject: msg.subject,
        text: msg.text,
      });
      this.logger.log(`OTP email send to ${msg.to}`);
    } catch (err) {
      this.logger.error(`failed send OTP to ${msg.to}`, err.stack);
    }
  }
}
