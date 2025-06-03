import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Terms of Service</h1>
      <div className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-headings:font-headline">
        <p>Last Updated: {new Date().toLocaleDateString()}</p>

        <p>Welcome to Calendar of Camps! These Terms of Service ("Terms") govern your use of the Calendar of Camps website and services (collectively, the "Service"), operated by Calendar of Camps Inc. ("us", "we", or "our").</p>

        <h2 className="font-headline">1. Acceptance of Terms</h2>
        <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>

        <h2 className="font-headline">2. Accounts</h2>
        <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
        <p>You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.</p>

        <h2 className="font-headline">3. Subscriptions</h2>
        <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set either on a yearly or multi-year basis, depending on the type of subscription plan you select when purchasing a Subscription.</p>
        {/* Add more details on subscriptions, payments, cancellations, refunds */}

        <h2 className="font-headline">4. User Content</h2>
        <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.</p>
        <p>By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.</p>
        {/* Add more details on content ownership, restrictions, crowdsourcing incentives */}
        
        <h2 className="font-headline">5. Intellectual Property</h2>
        <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Calendar of Camps Inc. and its licensors.</p>

        <h2 className="font-headline">6. Links To Other Web Sites</h2>
        <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by Calendar of Camps Inc.</p>
        <p>Calendar of Camps Inc. has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Calendar of Camps Inc. shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

        <h2 className="font-headline">7. Termination</h2>
        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>

        <h2 className="font-headline">8. Limitation Of Liability</h2>
        <p>In no event shall Calendar of Camps Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
        
        <h2 className="font-headline">9. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law provisions.</p>

        <h2 className="font-headline">10. Changes</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

        <h2 className="font-headline">Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@calendarofcamps.com" className="text-accent hover:underline">support@calendarofcamps.com</a> or via our <Link href="/contact" className="text-accent hover:underline">Contact Page</Link>.</p>
      </div>
    </div>
  );
}
