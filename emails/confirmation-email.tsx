import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

import GenieHQLogo from "@/components/geniehq-logo";
import { buttonVariants } from "../src/components/ui/button";

type SubscriptionConfirmationEmailProps = {
  email: string;
};

const SubscriptionConfirmationEmail = ({
  email,
}: SubscriptionConfirmationEmailProps) => {
  const previewText = "Subscription Confirmed! Welcome to GenieHQ! 🎉";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-black my-auto mx-auto font-sans text-white">
          <Container className="my-[20px] mx-auto p-[20px] max-w-4xl">
            <GenieHQLogo className="mx-auto size-24" />
            <Heading className="text-white text-[20px] font-normal text-left">
              <strong>Subscription Confirmed! 🎉</strong>
            </Heading>
            <Text className="text-white text-[14px] leading-[24px]">
              Hello there 👋,
            </Text>
            <Text className="text-white text-[14px] leading-[24px]">
              Thank you for subscribing to GenieHQ's launch updates. We're
              thrilled to have you with us. You'll receive updates and
              information as we get closer to our <em>launch 🚀</em> date. Stay
              tuned!
            </Text>
            <Text className="text-white text-[14px] leading-[24px]">
              If you have any questions, feel free to reach out to us at{" "}
              <a
                href="mailto:info@geniehq.xyz"
                className="text-orange-200 underline hover:text-orange-100"
                // className={buttonVariants({ variant: "link" })}
              >
                info@geniehq.xyz
              </a>
              .
            </Text>
            <Hr className="my-[16px] mx-0 w-full" />
            <div className="text-center">
              <Button href="https://geniehq.xyz" className={buttonVariants()}>
                Visit Our Website
              </Button>
            </div>
            {/* <div className="text-center mt-6 text-sm">
              <a
                href="https://geniehq.xyz/unsubscribe"
                className={buttonVariants({ variant: "ghost" })}
              >
                Unsubscribe
              </a>
            </div> */}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SubscriptionConfirmationEmail;
