import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6 mt-2">
          Terms of Services
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`
1. Introduction

Welcome to NetGlobal! These Terms of Service ("Terms") govern your use of the website located at https://netglobal.io (the "Website"). By accessing or using the Website, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use the Website.

2. Ownership

When you purchase a package on our Website, you own your own banking data. However, please note that you do not own the graphs or dashboards generated from your banking data. You may request a full refund within seven (7) days after your purchase if you are not satisfied with our services.

3. User Data

When using our Website, we collect the following user data:

Name
Email address
Payment information
Banking data uploaded by you
For more details on how we collect, use, and protect your data, please refer to our Privacy Policy.

4. Non-Personal Data Collection

We use web cookies for website analytics and functionality. You can manage your cookie preferences through your browser settings.

5. Governing Law

These Terms are governed by the laws of the United Kingdom (UK).

6. Updates to the Terms

We may update these Terms from time to time for operational, legal, or regulatory reasons. Users will be notified of significant changes via email. We encourage you to review these Terms periodically.

7. Contact Information

If you have any questions, concerns, or requests regarding these Terms or any other matter related to our services, please contact us at:

Email: contact@netglobal.io.

Thank you for using NetGlobal!

Last Updated: 03-12-2023
`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
