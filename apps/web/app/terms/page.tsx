import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import { PageHero } from "@/components";

export const metadata: Metadata = {
  title: "Terms of Service | ZephorTech",
  description:
    "Terms and conditions for using ZephorTech's services. Review our service terms, user obligations, and legal agreements.",
  openGraph: {
    title: "Terms of Service | ZephorTech",
    description: "Terms and conditions for using ZephorTech's services.",
    type: "website",
    url: "https://zephortech.com/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "November 20, 2024";

  return (
    <>
      <Header />
      
      <PageHero
        title="Terms of Service"
        subtitle="Legal Agreement"
        description="Please read these terms carefully before using our services."
        backgroundType="gradient"
      />

      <section className="relative py-16 md:py-24" style={{ background: "#0A0A0A" }}>
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-invert prose-lg max-w-none">
            {/* Last Updated */}
            <div className="mb-12 p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/60 mb-0">
                Last updated: <span className="text-white font-semibold">{lastUpdated}</span>
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Agreement to Terms</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you and ZephorTech (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) concerning your access to and use of our website and services.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our services.
              </p>
            </div>

            {/* Services Description */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Services Description</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                ZephorTech provides software development, IT consulting, and digital transformation services, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Web and mobile application development</li>
                <li>AI and machine learning solutions</li>
                <li>SaaS platform development</li>
                <li>E-commerce solutions</li>
                <li>Cloud infrastructure and DevOps services</li>
                <li>Digital marketing and SEO services</li>
              </ul>
            </div>

            {/* User Obligations */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">User Obligations</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                By using our services, you agree to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not use our services for any unlawful purpose</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not transmit any viruses, malware, or harmful code</li>
                <li>Not interfere with or disrupt our services</li>
                <li>Not violate any intellectual property rights</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Intellectual Property Rights</h2>
              
              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Our Content</h3>
              <p className="text-white/70 leading-relaxed">
                The content, features, and functionality of our website and services, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, data compilations, and software, are owned by ZephorTech and protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Client Content</h3>
              <p className="text-white/70 leading-relaxed">
                Content and materials you provide to us in connection with our services remain your property. You grant us a limited license to use such materials solely for the purpose of providing our services to you.
              </p>

              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Work Product</h3>
              <p className="text-white/70 leading-relaxed">
                Ownership of work product created under a service agreement will be governed by the specific terms of that agreement. Unless otherwise specified, all work product becomes your property upon full payment.
              </p>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Payment Terms</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Payment terms will be specified in your service agreement or invoice. General terms include:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Payment is due according to the terms specified in your agreement</li>
                <li>Late payments may incur interest charges</li>
                <li>We reserve the right to suspend services for non-payment</li>
                <li>Refund policies are project-specific and detailed in service agreements</li>
                <li>All prices are in USD unless otherwise stated</li>
              </ul>
            </div>

            {/* Warranties and Disclaimers */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Warranties and Disclaimers</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">Service Quality:</strong> We strive to provide high-quality services but cannot guarantee that our services will be uninterrupted, timely, secure, or error-free.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">AS-IS Basis:</strong> Our website and services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We make no warranties, expressed or implied, regarding merchantability, fitness for a particular purpose, or non-infringement.
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Third-Party Services:</strong> We are not responsible for any third-party services or products you may use in conjunction with our services.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                To the maximum extent permitted by law, ZephorTech shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Loss of profits or revenue</li>
                <li>Loss of data or information</li>
                <li>Business interruption</li>
                <li>Loss of goodwill</li>
                <li>Cost of substitute services</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Our total liability for any claims under these Terms shall not exceed the amount paid by you to us in the twelve (12) months preceding the claim.
              </p>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Indemnification</h2>
              <p className="text-white/70 leading-relaxed">
                You agree to indemnify, defend, and hold harmless ZephorTech and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or related to your use of our services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Termination</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Breach of these Terms</li>
                <li>Non-payment</li>
                <li>Fraudulent or illegal activity</li>
                <li>Violation of applicable laws</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Upon termination, your right to use our services will immediately cease. Provisions of these Terms that by their nature should survive termination shall survive.
              </p>
            </div>

            {/* Dispute Resolution */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Dispute Resolution</h2>
              
              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Informal Resolution</h3>
              <p className="text-white/70 leading-relaxed">
                If you have a dispute with us, you agree to first contact us and attempt to resolve the dispute informally by sending a written notice to{" "}
                <a href="mailto:legal@zephortech.com" className="text-primary hover:underline">
                  legal@zephortech.com
                </a>
              </p>

              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Arbitration</h3>
              <p className="text-white/70 leading-relaxed">
                If we cannot resolve the dispute informally, any legal dispute shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration will be conducted in English and will take place in [Jurisdiction].
              </p>

              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Class Action Waiver</h3>
              <p className="text-white/70 leading-relaxed">
                You agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated, or representative action.
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Governing Law</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of [State/Country], without regard to its conflict of law provisions. You agree to submit to the personal jurisdiction of the courts located in [Jurisdiction] for any actions not subject to arbitration.
              </p>
            </div>

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-white/70 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the &ldquo;Last updated&rdquo; date. Your continued use of our services after any changes constitutes acceptance of the new Terms.
              </p>
            </div>

            {/* Severability */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Severability</h2>
              <p className="text-white/70 leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining Terms will otherwise remain in full force and effect.
              </p>
            </div>

            {/* Entire Agreement */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Entire Agreement</h2>
              <p className="text-white/70 leading-relaxed">
                These Terms, along with our Privacy Policy and any service-specific agreements, constitute the entire agreement between you and ZephorTech regarding our services and supersede all prior agreements and understandings.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-12 p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Contact Information</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-white/70">
                <p>
                  <strong className="text-white">Legal Inquiries:</strong>{" "}
                  <a href="mailto:legal@zephortech.com" className="text-primary hover:underline">
                    legal@zephortech.com
                  </a>
                </p>
                <p>
                  <strong className="text-white">General Inquiries:</strong>{" "}
                  <a href="mailto:info@zephortech.com" className="text-primary hover:underline">
                    info@zephortech.com
                  </a>
                </p>
                <p>
                  <strong className="text-white">Address:</strong> 123 Tech Street, Innovation City, IC 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

