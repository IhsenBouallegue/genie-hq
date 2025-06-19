import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "GenieHQ Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="prose dark:prose-invert lg:prose-lg max-w-screen-lg py-24 px-6">
        <h1>Privacy Policy</h1>
        <p>
          <strong>Effective Date:</strong> 30 July 2024
        </p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to GenieHQ ("we," "us," "our"). We are committed to protecting your personal data
          and your privacy rights. This Privacy Policy explains how we collect, use, store, and
          protect your personal data when you visit our website{" "}
          <Link href="https://geniehq.xyz" target="_blank" rel="noopener noreferrer">
            https://geniehq.xyz
          </Link>{" "}
          and subscribe to our newsletter or any other services.
        </p>

        <h2>2. Data We Collect</h2>
        <p>We collect the following personal data:</p>
        <ul>
          <li>
            <strong>Email Address:</strong> When you subscribe to our newsletter or sign up for
            updates.
          </li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <p>We use your data for the following purposes:</p>
        <ul>
          <li>To send newsletters, updates, and promotional materials related to our services.</li>
          <li>To respond to inquiries and provide customer support.</li>
          <li>To analyze user interactions and improve our services.</li>
        </ul>

        <h2>4. Legal Basis for Processing</h2>
        <p>
          We process your data based on your consent, which you provide by opting in to receive our
          communications. You may withdraw your consent at any time by clicking the unsubscribe link
          in our emails or contacting us directly.
        </p>

        <h2>5. Data Sharing and Disclosure</h2>
        <p>
          We do not sell, trade, or rent your personal data to third parties. However, we use the
          services of third-party providers like{" "}
          <Link href="https://resend.com" target="_blank" rel="noopener noreferrer">
            Resend
          </Link>{" "}
          to manage and send our email communications. These providers are contractually obligated
          to protect your data and use it only for the purpose of providing the specific service to
          us.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your data only as long as necessary to fulfill the purposes for which it was
          collected, or as required by law. If you unsubscribe from our communications, your data
          will be promptly deleted.
        </p>

        <h2>7. Your Rights</h2>
        <p>You have the following rights concerning your personal data:</p>
        <ul>
          <li>
            <strong>Right to Access:</strong> request access to your personal data.
          </li>
          <li>
            <strong>Right to Rectification:</strong> correct any inaccuracies in your data.
          </li>
          <li>
            <strong>Right to Erasure:</strong> request the deletion of your data.
          </li>
          <li>
            <strong>Right to Restrict Processing:</strong> request a restriction on the processing
            of your data.
          </li>
          <li>
            <strong>Right to Data Portability:</strong> receive your data in a structured, commonly
            used, and machine-readable format.
          </li>
          <li>
            <strong>Right to Object:</strong> object to the processing of your data for specific
            purposes.
          </li>
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <Link href="mailto:info@geniehq.xyz">info@geniehq.xyz</Link>.
        </p>

        <h2>8. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your data from
          unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>9. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies to enhance your experience on our website. You can
          manage your cookie preferences through your browser settings.
        </p>

        <h2>10. Changes to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated effective date.
        </p>

        <h2>11. Contact Information</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p>
          GenieHQ
          <br />
          Email: <Link href="mailto:info@geniehq.xyz">info@geniehq.xyz</Link>
        </p>
      </div>
    </div>
  );
}
