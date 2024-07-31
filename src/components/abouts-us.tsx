import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "./ui/avatar";

function AboutUs() {
  return (
    <section id="about-us" className="max-w-screen-md mb-12 md:mb-24 p-6 ">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
        About Us
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        We’re two passionate software engineers based in Germany who believe in
        making life easier by saving time wherever we can. GenieHQ started from
        our own frustrations with the tedious process of installing and
        configuring applications on new devices.
      </p>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-6  lg:gap-12 w-full">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="size-16">
              <AvatarImage src="ihsen.jpg" />
              <AvatarFallback>IB</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="font-medium">Ihsen</div>
              <div className="text-sm text-muted-foreground">Genie Boss</div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar className="size-16">
              <AvatarImage src="enrico.png" />
              <AvatarFallback>EC</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="font-medium">Enrico</div>
              <div className="text-sm text-muted-foreground">Chief Genie</div>
            </div>
          </div>
        </div>
      </div>
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
