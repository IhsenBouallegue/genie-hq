import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import { CardContent, MotionCard } from "@repo/ui/components/ui/card";
import Image from "next/image";

function Faq() {
  return (
    <section
      id="faq"
      className="flex flex-col justify-center items-center p-6 max-w-6xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <MotionCard className="shadow-lg md:w-[600px] md:max-w-fit">
          <CardContent className="p-8">
            <h3 className="font-semibold text-primary">
              Frequently asked questions
            </h3>
            <p className="mt-3 text-3xl font-extrabold sm:text-4xl">
              All information you need to know
            </p>
            <Accordion className="w-full mt-4" type="multiple">
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:underline-none">
                  What is GenieHQ and how does it work?
                </AccordionTrigger>
                <AccordionContent>
                  GenieHQ is an app installer designed to simplify setting up
                  your device. With just a few clicks, you can install essential
                  programs and applications tailored to your needs through
                  ready-made profiles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:underline-none">
                  Who is GenieHQ for?
                </AccordionTrigger>
                <AccordionContent>
                  Initially, GenieHQ is geared towards tech-savvy developers and
                  professionals who need a quick and efficient way to set up
                  their devices. We aim to broaden our audience over time to
                  include casual users.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="hover:underline-none">
                  Is GenieHQ compatible with my operating system?
                </AccordionTrigger>
                <AccordionContent>
                  GenieHQ currently supports Windows. We plan to add support for
                  macOS and Linux in the future. There are no plans to support
                  mobile devices at this time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="hover:underline-none">
                  How does GenieHQ personalize app installations?
                </AccordionTrigger>
                <AccordionContent>
                  GenieHQ offers personalized configurations based on your role.
                  It learns about your preferences and suggests the apps you
                  might need, or you can create a custom list tailored to your
                  specific requirements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="hover:underline-none">
                  How easy is it to set up my device with GenieHQ?
                </AccordionTrigger>
                <AccordionContent>
                  Setting up your device with GenieHQ is incredibly easy. With
                  just a few clicks, you can install all the essential programs
                  and applications tailored to your needs, saving you time and
                  effort.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="hover:underline-none">
                  Will GenieHQ support other operating systems in the future?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we plan to support macOS and Linux in the future to
                  ensure that users across different platforms can benefit from
                  the ease of use that GenieHQ offers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="hover:underline-none">
                  Can GenieHQ recommend apps based on my input?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely. GenieHQ includes a feature where it learns about
                  you and suggests apps that you may need, enhancing your
                  overall experience and productivity.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="border-b-0" value="item-8">
                <AccordionTrigger className="hover:underline-none">
                  Will it be free?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, GenieHQ will be free to use. We aim to provide a
                  user-friendly experience without any additional costs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </MotionCard>
        <div className=" relative w-full min-h-80 h-full">
          <Image
            src="/genie-no-bg-new-icons.png"
            alt="Genie"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </section>
  );
}
export default Faq;
