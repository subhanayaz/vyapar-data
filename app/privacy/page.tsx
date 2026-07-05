import type { Metadata } from "next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE.name}`,
  description: "How VyaparData collects, uses, and protects data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />

      <main className="legal-page">
        <div className="legal-wrap">
          <div className="sec-eyebrow">Legal</div>
          <h1 className="legal-h1">Privacy Policy</h1>
          <p className="legal-updated">Last updated: 4 July 2026</p>

          <p className="legal-p">
            VyaparData (&quot;we&quot;, &quot;us&quot;) compiles and sells business
            contact lists to other businesses for sales and marketing outreach.
            This page explains what data we hold, where it comes from, and what
            rights you have over it - whether you&apos;re a customer buying a
            list from us, or a business whose listing appears in one.
          </p>

          <h2 className="legal-h2">1. What data we collect</h2>
          <p className="legal-p">Depending on context, this includes:</p>
          <ul className="legal-list">
            <li>Business contact records we compile for sale: business name, owner/contact name, phone number, email, address, city, state, pincode, and industry category.</li>
            <li>Customer details you give us when you request a sample or place an order: your name, phone/WhatsApp number, industry of interest, and any city/state you specify.</li>
            <li>Basic technical data from visiting this website (e.g. browser type, pages viewed) for keeping the site running securely - we do not use tracking cookies or ad networks.</li>
          </ul>

          <h2 className="legal-h2">2. Where business contact data comes from</h2>
          <p className="legal-p">
            The records in our lists are compiled from publicly available
            sources - online business directories, maps and location
            listing platforms, and other public business listings - the
            kind of information a business itself has already made
            publicly visible so customers can find it. We organise this
            information by industry and location; we do not collect
            private or non-public personal data, and we do not scrape
            personal social media profiles.
          </p>

          <h2 className="legal-h2">3. How we use data</h2>
          <ul className="legal-list">
            <li>To prepare and deliver the sample or paid list you&apos;ve requested, by email or WhatsApp.</li>
            <li>To process payment and provide support for your order.</li>
            <li>To keep our lists reasonably current and remove records on request (see Section 6).</li>
          </ul>
          <p className="legal-p">
            We do not use the data for any purpose beyond preparing and
            delivering business contact lists, and we do not sell customer
            details (i.e. details of people who buy from us) to anyone.
          </p>

          <h2 className="legal-h2">4. How we share data</h2>
          <p className="legal-p">
            We share list data with the customer who purchases it, for their
            own outreach use. We do not sell or share it with any other
            third party. We may share limited order details with payment
            processors solely to complete a transaction.
          </p>

          <h2 className="legal-h2">5. Data retention</h2>
          <p className="legal-p">
            We keep compiled business records for as long as reasonably
            needed to keep our lists useful and accurate, and customer order
            details for as long as needed for support and accounting
            purposes. Records are deleted or anonymised once no longer
            needed, or sooner on request.
          </p>

          <h2 className="legal-h2">6. Your rights &amp; opting out</h2>
          <p className="legal-p">
            If your business appears in one of our lists and you&apos;d like
            it corrected or removed, or if you are a customer and want a copy,
            correction, or deletion of your own details, message us on
            WhatsApp at <strong>{WHATSAPP_DISPLAY}</strong> with the business
            name or details in question. We aim to action requests within 7
            days.
          </p>

          <h2 className="legal-h2">7. Security</h2>
          <p className="legal-p">
            We take reasonable technical and organisational measures to
            protect the data we hold from unauthorised access, loss, or
            misuse. No method of storage or transmission is 100% secure, but
            we work to keep this data reasonably protected.
          </p>

          <h2 className="legal-h2">8. Children&apos;s data</h2>
          <p className="legal-p">
            Our services are intended for businesses and are not directed at
            children. We do not knowingly collect data belonging to children.
          </p>

          <h2 className="legal-h2">9. Changes to this policy</h2>
          <p className="legal-p">
            We may update this policy from time to time. Material changes
            will be reflected by updating the date at the top of this page.
          </p>

          <h2 className="legal-h2">10. Contact us</h2>
          <p className="legal-p">
            For any privacy question, correction, or removal request,
            reach us on WhatsApp at <strong>{WHATSAPP_DISPLAY}</strong>.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
