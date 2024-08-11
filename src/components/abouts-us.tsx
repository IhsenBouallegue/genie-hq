import { AvatarFallback } from "@radix-ui/react-avatar";
import { MailIcon } from "lucide-react";
import Heading from "./heading";
import { Avatar, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";

function AboutUs() {
  return (
    <section id="about-us" className="max-w-screen-md mb-12 md:mb-24 p-6 ">
      <Heading>About Us</Heading>

      <h3 className="text-2xl font-semibold text-primary mt-8">Our mission</h3>
      <p className="leading-7 mt-6">
        We're two passionate software engineers based in Germany who believe in
        making life easier by saving time wherever we can. GenieHQ started from
        our own frustrations with the tedious process of installing and
        configuring applications on new devices.
      </p>

      <h3 className="text-2xl font-semibold text-primary mt-8">Who are we?</h3>
      <div className="mx-auto grid max-w-5xl items-center gap-12 py-6 lg:gap-12 w-full [&:not(:first-child)]:mt-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center gap-2 p-6">
            <Avatar className="size-32 rounded-xl">
              <AvatarImage src="ihsen.jpg" />
              <AvatarFallback>IB</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="font-medium">Ihsen</div>
              <a
                className={buttonVariants({ variant: "link" })}
                href="mailto:ihen@geniehq.xyz"
              >
                <MailIcon className="size-4 mr-2" />
                ihsen@geniehq.xyz
              </a>
              <Quote>
                I like to solve problems. But I also like to create them,
                especially at 3 am when I can barely read the code 🤷‍♂
              </Quote>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 p-6">
            <Avatar className="size-32 rounded-xl">
              <AvatarImage src="enrico.jpg" />
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="font-medium text-lg">Enrico</div>
              <a
                className={buttonVariants({ variant: "link" })}
                href="mailto:enrico@geniehq.xyz"
              >
                enrico@geniehq.xyz
              </a>
              <Quote>Hold on let me overthink this 🤔</Quote>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-primary  mt-8">Our vision</h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Our app simplifies this by automatically setting up your device with
        essential applications, whether you're on Windows, macOS, or Linux. We
        aim to give you more time to focus on what you love by making the setup
        process quick, easy, and hassle-free.
      </p>
    </section>
  );
}
export default AboutUs;
function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-gray-300 text-left">
      <svg
        className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 14"
      >
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
      </svg>
      <p>"{children}"</p>
    </blockquote>
  );
}
