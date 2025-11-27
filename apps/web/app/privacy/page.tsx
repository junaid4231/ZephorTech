import type { Metadata } from "next";
import { Header, Footer } from "@/components";
import { PageHero } from "@/components";

export const metadata: Metadata = {
  title: "Privacy Policy | ZephorTech",
  description:
    "Learn how ZephorTech collects, uses, and protects your personal information. Our commitment to data privacy and GDPR compliance.",
  openGraph: {
    title: "Privacy Policy | ZephorTech",
    description: "Our commitment to protecting your privacy and personal data.",
    type: "website",
    url: "https://zephortech.com/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "November 20, 2024";

  return (
    <>
      <Header />
      
      <PageHero
        title="Privacy Policy"
        subtitle="Your Privacy Matters"
        description="We're committed to protecting your privacy and being transparent about how we collect and use your data."
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
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Introduction</h2>
              <p className="text-white/70 leading-relaxed">
                ZephorTech (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Information We Collect</h2>
              
              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Personal Information</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Fill out contact forms or request quotes</li>
                <li>Subscribe to our newsletter</li>
                <li>Apply for job positions</li>
                <li>Engage with our customer support</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Information Collected Automatically</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>IP address and browser type</li>
                <li>Operating system and device information</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Clickstream data</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We use the information we collect or receive to:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li>Provide, operate, and maintain our services</li>
                <li>Improve, personalize, and expand our services</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, and features</li>
                <li>Communicate with you for customer service and support</li>
                <li>Send you marketing and promotional communications (with your consent)</li>
                <li>Process your transactions and manage your orders</li>
                <li>Find and prevent fraud and security issues</li>
              </ul>
            </div>

            {/* Data Sharing and Disclosure */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Data Sharing and Disclosure</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li><strong className="text-white">Service Providers:</strong> With third-party vendors who perform services on our behalf</li>
                <li><strong className="text-white">Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong className="text-white">With Your Consent:</strong> When you have given us explicit permission</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                We do not sell your personal information to third parties.
              </p>
            </div>

            {/* Cookies and Tracking */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p className="text-white/70 leading-relaxed">
                Types of cookies we use:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong className="text-white">Preference Cookies:</strong> Remember your preferences and settings</li>
                <li><strong className="text-white">Marketing Cookies:</strong> Track your activity to show relevant advertisements</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Data Security</h2>
              <p className="text-white/70 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </div>

            {/* Your Rights (GDPR) */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Your Privacy Rights</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-white/70 space-y-2">
                <li><strong className="text-white">Access:</strong> Request copies of your personal data</li>
                <li><strong className="text-white">Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-white">Erasure:</strong> Request deletion of your personal data</li>
                <li><strong className="text-white">Restriction:</strong> Request restriction of processing your data</li>
                <li><strong className="text-white">Portability:</strong> Request transfer of your data to another party</li>
                <li><strong className="text-white">Objection:</strong> Object to our processing of your data</li>
                <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent for data processing</li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                To exercise these rights, please contact us at{" "}
                <a href="mailto:privacy@zephortech.com" className="text-primary hover:underline">
                  privacy@zephortech.com
                </a>
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Children's Privacy</h2>
              <p className="text-white/70 leading-relaxed">
                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Third-Party Links</h2>
              <p className="text-white/70 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Changes to This Policy</h2>
              <p className="text-white/70 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
              </p>
            </div>

            {/* Contact Us */}
            <div className="mb-12 p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">Contact Us</h2>
              <p className="text-white/70 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-white/70">
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  <a href="mailto:privacy@zephortech.com" className="text-primary hover:underline">
                    privacy@zephortech.com
                  </a>
                </p>
                <p>
                  <strong className="text-white">Email:</strong>{" "}
                  <a href="mailto:info@zephortech.com" className="text-primary hover:underline">
                    info@zephortech.com
                  </a>
                </p>
                <p>
                  <strong className="text-white">Address:</strong> Dubai, United Arab Emirates
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

