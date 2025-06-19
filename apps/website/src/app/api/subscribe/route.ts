import SubscriptionConfirmationEmail from "@geniehq/email-stuff/emails/confirmation-email";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// Define the schema using Zod
const EmailSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const { email } = EmailSchema.parse(body);

    // Send the subscription request to Mailchimp
    const { error } = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: "60a37586-8af1-4ff7-9ca8-ece0ab8ee7da",
    });

    await resend.emails.send({
      from: "GenieHQ <hello@geniehq.xyz>",
      to: `${email}`,
      subject: "GenieHQ Subscription Confirmation",
      react: SubscriptionConfirmationEmail({ email }),
    });

    if (error) {
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
    return NextResponse.json({ message: "Successfully subscribed" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
