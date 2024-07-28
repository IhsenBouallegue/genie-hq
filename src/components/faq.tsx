import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card, CardContent } from "./ui/card";

function Faq() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="shadow-lg w-[550px]">
        <CardContent className="p-6">
          <h3 className="font-semibold text-primary">
            Frequently asked questions
          </h3>
          <p className="mt-3 text-gray-400 text-3xl font-extrabold sm:text-4xl">
            All information you need to know
          </p>
          <Accordion className="w-full mt-4" type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:underline-none">
                What is Genie HQ and how does it work?
              </AccordionTrigger>
              <AccordionContent>
                Genie HQ is an app installer designed to simplify setting up
                your device. With just a few clicks, you can install essential
                programs and applications tailored to your needs through
                ready-made profiles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="hover:underline-none">
                Who is Genie HQ for?
              </AccordionTrigger>
              <AccordionContent>
                Initially, Genie HQ is geared towards tech-savvy developers and
                professionals who need a quick and efficient way to set up their
                devices. We aim to broaden our audience over time to include
                casual users.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="hover:underline-none">
                Is Genie HQ compatible with my operating system?
              </AccordionTrigger>
              <AccordionContent>
                Genie HQ currently supports Windows. We plan to add support for
                macOS and Linux in the future. There are no plans to support
                mobile devices at this time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="hover:underline-none">
                How does Genie HQ personalize app installations?
              </AccordionTrigger>
              <AccordionContent>
                Genie HQ offers personalized configurations based on your role.
                It learns about your preferences and suggests the apps you might
                need, or you can create a custom list tailored to your specific
                requirements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="hover:underline-none">
                How easy is it to set up my device with Genie HQ?
              </AccordionTrigger>
              <AccordionContent>
                Setting up your device with Genie HQ is incredibly easy. With
                just a few clicks, you can install all the essential programs
                and applications tailored to your needs, saving you time and
                effort.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="hover:underline-none">
                Will Genie HQ support other operating systems in the future?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we plan to support macOS and Linux in the future to ensure
                that users across different platforms can benefit from the ease
                of use that Genie HQ offers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger className="hover:underline-none">
                Can Genie HQ recommend apps based on my input?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely. Genie HQ includes a feature where it learns about
                you and suggests apps that you may need, enhancing your overall
                experience and productivity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b-0" value="item-8">
              <AccordionTrigger className="hover:underline-none">
                Will it be free?
              </AccordionTrigger>
              <AccordionContent>
                Yes, Genie HQ will be free to use. We aim to provide a
                user-friendly experience without any additional costs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
export default Faq;
