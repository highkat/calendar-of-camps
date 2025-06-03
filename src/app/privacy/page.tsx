import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none text-foreground prose-headings:text-primary prose-headings:font-headline">
        <p>Last Updated: {new Date().toLocaleDateString()}</p>

        <p>Calendar of Camps Inc. ("us", "we", or "our") operates the Calendar of Camps website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

        <h2 className="font-headline">1. Information Collection and Use</h2>
        <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
        
        <h3 className="font-headline">Types of Data Collected</h3>
        <h4 className="font-headline">Personal Data</h4>
        <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
        <ul className="list-disc list-inside">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number (for reminders, if opted-in)</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
          <li>Information about your children (e.g., name, age) if you create child profiles</li>
          <li>Cookies and Usage Data</li>
        </ul>

        <h4 className="font-headline">Usage Data</h4>
        <p>We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

        <h2 className="font-headline">2. Use of Data</h2>
        <p>Calendar of Camps Inc. uses the collected data for various purposes:</p>
        <ul className="list-disc list-inside">
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our Service</li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
          <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information</li>
          <li>To send registration reminders, if you opt-in</li>
        </ul>
        
        <h2 className="font-headline">3. Data Security</h2>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

        <h2 className="font-headline">4. Children's Privacy</h2>
        <p>Our Service allows parents to create profiles for their children. We collect information about children (such as name and age) only with the consent of the parent or guardian for the purpose of providing our camp scheduling services. We do not knowingly collect personally identifiable information from children under 13 without parental consent. If you are a parent or guardian and you are aware that your child has provided us with Personal Data without your consent, please contact us.</p>
        
        <h2 className="font-headline">5. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
        <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "Last Updated" date at the top of this Privacy Policy.</p>
        <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

        <h2 className="font-headline">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@calendarofcamps.com" className="text-accent hover:underline">support@calendarofcamps.com</a> or via our <Link href="/contact" className="text-accent hover:underline">Contact Page</Link>.</p>
      </div>
    </div>
  );
}
