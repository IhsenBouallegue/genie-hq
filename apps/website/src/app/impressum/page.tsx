import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum Policy",
  description: "GenieHQ Impressum",
};

export default function Impressum() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="prose dark:prose-invert lg:prose-lg max-w-screen-lg py-24 px-6">
        <h2>Impressum</h2>
        <p>
          <strong>Information according to § 5 TMG (German Telemedia Act):</strong>
        </p>

        <p>
          <strong>GenieHQ</strong>
          <br />
          Ihsen Bouallegue & Enrico Chies
          <br />
          Currently under development – address and registration details will be updated upon
          official business registration.
        </p>

        <p>
          <strong>Contact Information:</strong>
          <br />
          Email: <a href="mailto:info@geniehq.xyz">info@geniehq.xyz</a>
        </p>

        <h3>Disclaimer</h3>
        <p>
          <strong>Accountability for Content:</strong>
          <br />
          The contents of our pages have been created with the utmost care. However, we cannot
          guarantee the contents' accuracy, completeness, or topicality. According to statutory
          provisions, we are furthermore responsible for our content on these web pages. In this
          context, please note that we are not obliged to monitor the transmitted or saved
          information of third parties or investigate circumstances pointing to illegal activity.
        </p>
        <p>
          <strong>Accountability for Links:</strong>
          <br />
          Responsibility for the content of external links (to web pages of third parties) lies
          solely with the operators of the linked pages. At the time of linking, no violations were
          evident to us. Should any legal infringement become known to us, we will remove the
          respective link immediately.
        </p>

        <h3>Copyright</h3>
        <p>
          The content and works provided on these web pages are governed by the copyright laws of
          [Country]. Duplication, processing, distribution, or any form of commercialization of such
          material beyond the scope of the copyright law requires the prior written consent of its
          respective author or creator.
        </p>

        <p>
          <strong>Note:</strong>
          <br />
          This imprint will be updated with additional details upon the official registration of the
          business.
        </p>
      </div>
    </div>
  );
}
