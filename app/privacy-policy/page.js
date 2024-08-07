import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6 mt-2">
          Privacy Policy
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`
1. Introduction

Welcome to NetGlobal! This Privacy Policy explains how NetGlobal ("we," "us," or "our") collects, uses, and safeguards your personal information when you use our website, https://netglobal.io (the "Website"). We are committed to protecting your privacy and ensuring the security of your personal information.

2. Information We Collect

We collect the following types of information when you use our Website:

a. Personal Information

Name
Email address
Payment information (for order processing)
Banking data uploaded by you

b. Non-Personal Information

Web cookies: We use cookies for website analytics and functionality. You can manage your cookie preferences through your browser settings.

3. Purpose of Data Collection

We collect and use your personal information for the following purposes:

Order processing: To fulfill your orders, manage transactions, and provide customer support.

4. Data Sharing

We do not share your personal information with any third parties, except as necessary to fulfill the purposes stated in this Privacy Policy or as required by law.

5. Children's Privacy

We do not knowingly collect personal information from children under the age of 13. If you believe that we have collected personal information from a child under 13, please contact us at contact@netglobal.io, and we will take appropriate steps to delete such information.

6. Updates to the Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Users will be notified of significant changes via email. We encourage you to review this Privacy Policy periodically.

7. Contact Information

If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:

Email: contact@netglobal.io

For all other inquiries, please visit our Contact Us page on the Website.

By using NetGlobal, you consent to the terms of this Privacy Policy.

Last Updated: 03-12-2023`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
