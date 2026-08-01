import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function TermsOfServicePage({ onBackToShop, onNavigate, onCartClick }) {
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
        onCartClick={onCartClick} 
        onBookClick={() => {
          if (onNavigate) onNavigate('appointment');
        }} 
        onShopClick={handleBrandClick} 
        onBrandClick={handleBrandClick} 
        alwaysShowBg={true} 
      />

      <main className="flex-1 w-full max-w-[960px] mx-auto px-6 md:px-12 pt-36 pb-24 text-neutral-800 leading-relaxed">
        {/* Page Title */}
        <h1 className="font-sans font-light text-3xl md:text-[2.2rem] tracking-[0.16em] m-0 mb-8 text-neutral-900 uppercase">
          Terms of Service
        </h1>

        {/* Intro */}
        <div className="text-sm md:text-[0.92rem] font-light text-neutral-600 mb-12 flex flex-col gap-5">
          <p>
            Welcome to <a href="https://www.ghadsirambanwarilalandsons.com" className="text-[#c89b3c] hover:underline font-normal">www.ghadsirambanwarilalandsons.com</a> ("Website"). These Terms of Service ("Terms") govern your access to and use of the Website and all services provided by Ghadsiram Banwarilal &amp; Son ("Company", "we", "our", or "us").
          </p>
          <p>
            By accessing or using this Website, you agree to be legally bound by these Terms. If you do not agree with any part of these Terms, please do not use our Website.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12 text-sm md:text-[0.92rem] font-light text-neutral-700">
          
          {/* Section 1 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              1. Eligibility
            </h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-4">
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                You must be at least 18 years old or have permission from a parent or legal guardian to use this Website.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                By using this Website, you confirm that all information provided by you is true, complete, and accurate.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              2. Account Responsibility
            </h2>
            <p className="text-neutral-600 m-0 pl-2">When creating an account, you agree to:</p>
            <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-6">
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Provide accurate and complete information.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Keep your login credentials secure.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Notify us immediately if you suspect unauthorized access to your account.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Accept responsibility for all activities carried out under your account.
              </li>
            </ul>
            <p className="text-neutral-600 m-0 pl-2 mt-2">
              We reserve the right to suspend or terminate accounts that contain false information or violate these Terms.
            </p>
          </section>

          {/* Section 3 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              3. Products
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              All jewellery displayed on the Website is subject to availability. We reserve the right to modify product descriptions, update pricing, discontinue any product, or limit product quantities.
            </p>
            <p className="text-neutral-600 m-0 pl-2">
              Product images are for illustrative purposes only. Due to lighting, screen settings, handcrafted finishing, gemstones, or natural materials, slight variations in colour, texture, or appearance may occur.
            </p>
          </section>

          {/* Section 4 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              4. Pricing
            </h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-4">
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                All prices displayed on the Website are in Indian Rupees (INR), unless otherwise stated.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Prices may change without prior notice.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Applicable taxes, shipping charges, and other fees will be displayed during checkout.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              5. Order Acceptance
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              Placing an order does not guarantee its acceptance. We reserve the right to accept or reject any order, cancel suspicious or fraudulent transactions, limit purchase quantities, or request additional verification before processing an order.
            </p>
            <p className="text-neutral-600 m-0 pl-2">
              If payment has already been received for a cancelled order, the applicable refund will be processed according to our Refund Policy.
            </p>
          </section>

          {/* Section 6 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              6. Payment
            </h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-4">
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Payments are processed through secure third-party payment gateways.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                We do not store your complete debit card, credit card, UPI, or banking credentials.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                By placing an order, you confirm that the payment information provided is valid and authorized.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              7. Shipping
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              Estimated delivery timelines are provided for convenience only and may vary depending on product availability, delivery location, courier partner delays, public holidays, and events beyond our reasonable control.
            </p>
            <p className="text-neutral-600 m-0 pl-2 font-normal text-neutral-800">
              Ghadsiram Banwarilal &amp; Son shall not be responsible for delays caused by third-party logistics providers.
            </p>
          </section>

          {/* Section 8 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              8. Returns &amp; Refunds
            </h2>
            <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-4">
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Returns, exchanges, and refunds are governed by our Return &amp; Refund Policy.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Products that show signs of wear, damage, misuse, or alteration may not qualify for return or exchange.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Customized, engraved, or made-to-order jewellery may not be eligible for return unless required under applicable law.
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              9. Intellectual Property
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              All content available on this Website, including logos, product images, videos, graphics, icons, text, website design, product descriptions, and branding is the exclusive property of Ghadsiram Banwarilal &amp; Son and is protected under applicable intellectual property laws.
            </p>
            <p className="text-neutral-600 m-0 pl-2">
              No content may be copied, reproduced, distributed, modified, or commercially used without prior written permission.
            </p>
          </section>

          {/* Section 10 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              10. Prohibited Use
            </h2>
            <p className="text-neutral-600 m-0 pl-2">You agree not to:</p>
            <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-6">
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Use the Website for unlawful purposes or attempt unauthorized access.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Introduce viruses, malware, or harmful software.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Scrape, copy, or automated-bot crawl Website content.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                Misrepresent your identity or provide false information.
              </li>
            </ul>
          </section>

          {/* Section 11 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              11. User Content
            </h2>
            <p className="text-neutral-600 m-0 pl-2">If you submit reviews, ratings, photographs, comments, or other content:</p>
            <ul className="list-none p-0 m-0 flex flex-col gap-2 pl-6">
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                You grant Ghadsiram Banwarilal &amp; Son a non-exclusive, royalty-free, worldwide license to use, display, reproduce, and publish such content.
              </li>
              <li className="relative pl-4 text-neutral-600">
                <span className="absolute left-0 text-[#c89b3c] font-normal">&bull;</span>
                You confirm that the content belongs to you and does not infringe the rights of any third party.
              </li>
            </ul>
          </section>

          {/* Section 12 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              12. Third-Party Links
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              The Website may contain links to third-party websites for your convenience. We do not control or endorse these websites and are not responsible for their content, security, or privacy practices. Your use of third-party websites is entirely at your own risk.
            </p>
          </section>

          {/* Section 13 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              13. Limitation of Liability
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              To the maximum extent permitted by law, Ghadsiram Banwarilal &amp; Son shall not be liable for indirect or consequential damages, loss of profits, business interruption, data loss, technical failures, or third-party delivery delays.
            </p>
            <p className="text-neutral-600 m-0 pl-2 font-normal text-neutral-800">
              Our total liability shall not exceed the amount paid by you for the specific order giving rise to the claim.
            </p>
          </section>

          {/* Section 14 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              14. Disclaimer
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              The Website and all services are provided on an "AS IS" and "AS AVAILABLE" basis. We do not guarantee that the Website will always be uninterrupted, error-free, or that all information will always remain complete or up to date.
            </p>
          </section>

          {/* Section 15 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              15. Termination
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              We reserve the right to suspend or terminate your access to the Website without prior notice if you violate these Terms, if fraudulent/unlawful activity is suspected, or if required by law.
            </p>
          </section>

          {/* Section 16 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              16. Indemnification
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              You agree to indemnify and hold harmless Ghadsiram Banwarilal &amp; Son, its directors, employees, affiliates, partners, and representatives from any claims, damages, liabilities, costs, or expenses arising from your misuse of the Website or violation of these Terms.
            </p>
          </section>

          {/* Section 17 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              17. Force Majeure
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              Ghadsiram Banwarilal &amp; Son shall not be liable for any delay or failure to perform its obligations due to events beyond its reasonable control, including natural disasters, floods, pandemics, strikes, government restrictions, internet failures, cyberattacks, or other force majeure events.
            </p>
          </section>

          {/* Section 18 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              18. Governing Law
            </h2>
            <p className="text-neutral-600 m-0 pl-2 font-normal text-neutral-805">
              These Terms shall be governed by and interpreted in accordance with the laws of India. Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts of Jaipur, Rajasthan.
            </p>
          </section>

          {/* Section 19 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              19. Changes to These Terms
            </h2>
            <p className="text-neutral-600 m-0 pl-2">
              We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Website after any revisions constitutes your acceptance of the updated Terms.
            </p>
          </section>

          {/* Section 20 */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-base md:text-lg font-medium text-neutral-900 tracking-wide m-0">
              20. Contact Us
            </h2>
            <div className="text-neutral-600 m-0 pl-2 flex flex-col gap-1">
              <p className="m-0 font-semibold text-neutral-850">Ghadsiram Banwarilal &amp; Son</p>
              <p className="m-0">Website: <a href="https://www.ghadsirambanwarilalandsons.com" className="text-[#c89b3c] hover:underline font-normal">www.ghadsirambanwarilalandsons.com</a></p>
              <p className="m-0">Email: <a href="mailto:ghadsirambanwarilalandsons@gmail.com" className="text-[#c89b3c] hover:underline font-normal">ghadsirambanwarilalandsons@gmail.com</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer onBrandClick={handleBrandClick} onNavigate={onNavigate} />
    </div>
  );
}
