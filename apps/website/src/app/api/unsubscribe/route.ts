import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const UnsubscribeSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = UnsubscribeSchema.parse(body);

    await resend.contacts.remove({
      email: email,
      audienceId: "60a37586-8af1-4ff7-9ca8-ece0ab8ee7da",
    });

    return NextResponse.json(
      { message: "Successfully unsubscribed" },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 },
    );
  }
}
