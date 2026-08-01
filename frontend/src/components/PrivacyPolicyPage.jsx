import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PrivacyPolicyPage({ onBackToShop, onNavigate }) {
  const handleBrandClick = () => {
    if (onNavigate) {
      onNavigate('shop');
    } else {
      onBackToShop();
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between font-sans">
      <Navbar 
        onCartClick={() => {}} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleBrandClick} 
        onBrandClick={handleBrandClick} 
        alwaysShowBg={true} 
      />

      <main className="flex-1 w-full max-w-[960px] mx-auto px-6 md:px-12 pt-36 pb-24 text-neutral-800 leading-relaxed">
        {/* Page Title - matches the mockup's light sans-serif layout */}
        <h1 className="font-sans font-light text-3xl md:text-[2.2rem] tracking-[0.16em] m-0 mb-8 text-neutral-900 uppercase">
          Privacy Policy
        </h1>

        {/* Intro description */}
        <div className="text-sm md:text-[0.92rem] font-light text-neutral-600 mb-12 flex flex-col gap-5">
          <p>
            Ghadsirambanwarilal and sons ("we," "our," "us") respects your privacy and is committed to protecting the personal data you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, including our website <a href="https://www.ghadsirambanwarilalandsons.com" className="text-[#c89b3c] hover:underline font-normal">www.ghadsirambanwarilalandsons.com</a>, platform, and membership-based services (collectively referred to as the "Service"). We comply with international privacy standards, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). By using our Service, you consent to the practices described in this policy.
          </p>
          <p>
            This Privacy Policy extends to both users who visit the Website but do not transact business on the Website, as well as users who are registered and are authorized by the Website to transact business on the Website. "Personal Information" is the information that can be associated with a specific person and could be used to identify that specific person whether from that data, or from the data and other information that we have, or is likely to have access to. We do not consider Personal Information to include information that has been made anonymous or aggregated so that it can no longer be used to identify a specific person, whether in combination with other information or otherwise.
          </p>
          <p>
            Ghadsirambanwarilal and sons is responsible for the collection, use, disclosure, retention, and protection of your Personal Information in accordance with its privacy standards as well as any applicable national laws. Ghadsirambanwarilal and sons may transfer data to other persons as described in this Privacy Policy. Ghadsirambanwarilal and sons may process and retain your Personal Information on its servers in India where its data centres are located, and/or on the servers of its third party (in or outside India), having contractual relationships with Ghadsirambanwarilal and sons.
          </p>
        </div>

        {/* Numbered Sections */}
        <div className="flex flex-col gap-12 text-sm md:text-[0.92rem] font-light text-neutral-700">
          
          {/* Section 1 */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              1. Information We Collect
            </h2>
            <p className="text-neutral-600 m-0">We collect the following types of information when you interact with our Service:</p>
            
            <div className="flex flex-col gap-6 mt-2 pl-2">
              <div>
                <h3 className="font-sans text-sm md:text-[0.92rem] font-semibold text-neutral-800 m-0 mb-1">1.1 Personal Data</h3>
                <p className="text-neutral-600 m-0 mb-2">This includes:</p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-4">
                  <li className="relative pl-4 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    <strong className="font-normal text-neutral-800">Account Information:</strong> Name, email address, delivery address, telephone number, membership account information, preferences, and searches provided when you sign up.
                  </li>
                  <li className="relative pl-4 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    <strong className="font-normal text-neutral-800">Payment Information:</strong> Billing address, transaction history, and payment details securely processed by card issuers.
                  </li>
                  <li className="relative pl-4 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    <strong className="font-normal text-neutral-800">Communication Data:</strong> Reviews, comment lists, preferences, and queries sent via contact forms.
                  </li>
                </ul>
              </div>

              <div className="mt-2">
                <h3 className="font-sans text-sm md:text-[0.92rem] font-semibold text-neutral-800 m-0 mb-1">1.2 Usage Data</h3>
                <p className="text-neutral-600 m-0 mb-2">Automatically collected data includes:</p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-4">
                  <li className="relative pl-4 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    <strong className="font-normal text-neutral-800">Device Information:</strong> IP address, computer system details, operating system, and device identifiers.
                  </li>
                  <li className="relative pl-4 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    <strong className="font-normal text-neutral-800">Log Information:</strong> Pages viewed, session duration, and referral sources.
                  </li>
                  <li className="relative pl-4 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    <strong className="font-normal text-neutral-800">Cookies and Tracking:</strong> Data collected via cookies and similar technologies for analytics and personalization.
                  </li>
                </ul>
              </div>

              <div className="mt-2">
                <h3 className="font-sans text-sm md:text-[0.92rem] font-semibold text-neutral-800 m-0 mb-1">1.3 Third-Party Data</h3>
                <p className="text-neutral-600 m-0 mb-2">We may receive additional information from partners:</p>
                <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-4">
                  <li className="relative pl-4 text-neutral-600">
                    <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                    <strong className="font-normal text-neutral-800">Partner Integrations:</strong> User IDs and information from payment processors, social media platforms, and advertising networks used to interface with our Service.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              2. Consent for Personal Information
            </h2>
            <div className="flex flex-col gap-2 pl-2">
              <p className="m-0 text-neutral-600">
                <strong className="font-normal text-neutral-800">2.1 Consent Request:</strong> Before submitting your Personal Information, you will be prompted to give explicit consent to its collection and usage by Ghadsirambanwarilal and sons.
              </p>
              <p className="m-0 text-neutral-600">
                <strong className="font-normal text-neutral-800">2.2 Consent Withdrawal:</strong> You can withdraw your consent at any time. Withdrawal does not affect any actions taken prior to request. If you withdraw consent, you may not be able to subscribe to services or maintain a membership.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              3. Permissible Age
            </h2>
            <div className="flex flex-col gap-2 pl-2">
              <p className="m-0 text-neutral-600">
                <strong className="font-normal text-neutral-800">3.1 Underage Limitation:</strong> The Services are not intended for anyone under 18 ("Permissible Age"). We do not knowingly market to or collect data from anyone below this age.
              </p>
              <p className="m-0 text-neutral-600">
                <strong className="font-normal text-neutral-800">3.2 Account Deletion:</strong> If we learn that personal details of anyone under the Permissible Age were collected, we will delete the account and related data immediately. If you have concerns, contact us at <a href="mailto:ghadsirambanwarilalandsons@gmail.com" className="text-[#c89b3c] hover:underline">ghadsirambanwarilalandsons@gmail.com</a>.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              4. How We Use the Information
            </h2>
            <p className="text-neutral-600 m-0">We use the collected information for a variety of purposes, including:</p>
            
            <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-6">
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                To process, fulfill, and respond to your orders, queries, and transactions.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                To communicate news, special offers, and terms updates (you can opt-out at any time via the unsubscribe button or by emailing us).
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                To enhance functionality, monitor traffic, and troubleshoot technical issues to improve your shopping experience.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                To comply with vital legal processes, summons, or official court orders, as required by law.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                To display relevant, personalized advertisements and promotions.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              5. Sharing Your Personal Information
            </h2>
            <p className="text-neutral-600 m-0">We will never sell or share your data with outside firms for marketing purposes. We share information only in the following contexts:</p>
            
            <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-6">
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                <strong className="font-normal text-neutral-800">Operational Partners:</strong> Couriers and secure payment gateways that require details to fulfill your order.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                <strong className="font-normal text-neutral-800">Affiliated Entities:</strong> Subsidiaries, group entities, or successor buyers during mergers or restructuring.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                <strong className="font-normal text-neutral-800">Legal Safeguards:</strong> Sharing data when necessary to protect safety, prevent credit risk, or combat fraud.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              6. Accessing &amp; Correcting Personal Information
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              We take steps to keep your details accurate. You may request the deletion of your Personal Information at any time. Note that some copies may temporarily remain cached or archived for operational records.
            </p>
          </section>

          {/* Section 7 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              7. How Long We Keep Your Information
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              We retain details only as long as necessary to resolve queries or fulfill order processing. We will delete your information on request.
            </p>
          </section>

          {/* Section 8 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              8. Cookies Policy
            </h2>
            <div className="flex flex-col gap-4 pl-2">
              <div>
                <h3 className="font-sans text-sm md:text-[0.92rem] font-semibold text-neutral-800 m-0 mb-1">8.1 What are Cookies?</h3>
                <p className="text-neutral-600 m-0">
                  Cookies are small files placed on your hard disk for record-keeping. They help customize our site for you (e.g. keeping items in your shopping basket) and help monitor advert conversion rates.
                </p>
              </div>
              <div>
                <h3 className="font-sans text-sm md:text-[0.92rem] font-semibold text-neutral-800 m-0 mb-1">8.2 How to Disable Cookies?</h3>
                <p className="text-neutral-600 m-0">
                  You can disable cookies in your browser settings. However, doing so may impact your shopping user experience and restrict access to certain interactive parts of the website.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              9. External Links
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              Our website may contain links to external sites. Once you leave our domain, our Privacy Policy no longer applies, and you are subject to the host site's terms.
            </p>
          </section>

          {/* Section 10 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              10. Fraudulent Transactions
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              Ghadsirambanwarilal and sons reserves the right to recover cost of goods, collections fees, and initiate legal proceedings against persons using the website fraudulently.
            </p>
          </section>

          {/* Section 11 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              11. Changes of Privacy Policy
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              We reserve the right to modify this policy at our discretion. Continued use of our Service after updates is deemed acceptance of the revisions.
            </p>
            <p className="text-neutral-600 m-0 pl-2 mt-2">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:ghadsirambanwarilalandsons@gmail.com" className="text-[#c89b3c] hover:underline font-normal">ghadsirambanwarilalandsons@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
