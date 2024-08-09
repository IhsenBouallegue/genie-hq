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
import { buttonVariants } from "../components/ui/button";

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
        <Body className="bg-gray-900 my-auto mx-auto font-sans text-white">
          <Container className="my-8 mx-auto p-8 max-w-4xl bg-gray-800 rounded-lg shadow-lg">
            <GenieHQLogo className="mx-auto mb-6 w-24 h-24" />
            <Heading className="text-white text-2xl font-bold text-center mb-4">
              Subscription Confirmed! 🎉
            </Heading>
            <Text className="text-white text-lg leading-6 mb-4">
              Hello there 👋,
            </Text>
            <Text className="text-white text-lg leading-6 mb-4">
              Thank you for subscribing to GenieHQ's launch updates. We're
              thrilled to have you with us. You'll receive updates and
              information as we get closer to our <em>launch 🚀</em> date. Stay
              tuned!
            </Text>
            <Text className="text-white text-lg leading-6 mb-4">
              If you have any questions, feel free to reach out to us at{" "}
              <a
                href="mailto:info@geniehq.xyz"
                className="text-orange-400 underline hover:text-orange-300"
              >
                info@geniehq.xyz
              </a>
              .
            </Text>
            <Hr className="my-6 mx-0 w-full border-gray-700" />
            <div className="text-center">
              <Button
                href="https://geniehq.xyz"
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
              >
                Visit Our Website
              </Button>
            </div>
            {/* Uncomment the following block if you want to add an unsubscribe link */}
            {/* <div className="text-center mt-6 text-sm">
          <a
            href="https://geniehq.xyz/unsubscribe"
            className="text-gray-400 underline hover:text-gray-300"
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
