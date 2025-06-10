
"use client";
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageSquare, User, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'next/navigation';

export default function ContactPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get('subject') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Honeypot state

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      console.log("Honeypot triggered on contact form. Potential bot.");
      // Silently exit or show a generic non-committal message if desired
      // For now, just reset loading state and return
      setIsLoading(false);
      // You might still want to reset the form fields here if you showed a fake success
      // but for silent failure, just exiting is fine.
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form submitted:', { name, email, subject, message });
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setHoneypot(''); // Reset honeypot
    setIsLoading(false);
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Get in Touch</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Have questions, feedback, or need support? We&apos;d love to hear from you!
        </p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center text-primary">
            <MessageSquare className="mr-3 h-7 w-7" /> Send Us a Message
          </CardTitle>
          <CardDescription>
            Fill out the form below and our team will respond as soon as possible.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Honeypot Field */}
            <div className="absolute left-[-5000px]" aria-hidden="true">
              <Label htmlFor="hp_message_contact">Your message (for bots only)</Label>
              <Input
                id="hp_message_contact"
                type="text"
                name="hp_message_contact"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="pl-10" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a reason for contacting us" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GeneralInquiry">General Inquiry</SelectItem>
                  <SelectItem value="SupportRequest">Support Request</SelectItem>
                  <SelectItem value="Feedback">Feedback & Suggestions</SelectItem>
                  <SelectItem value="Partnership">Partnership Opportunities</SelectItem>
                  <SelectItem value="AdvertisingInquiry">Advertising Inquiry</SelectItem>
                  <SelectItem value="CampSubmissionIssue">Camp Submission Issue</SelectItem>
                </SelectContent>
              </Select>
               {subject === "AdvertisingInquiry" && (
                 <p className="text-xs text-muted-foreground mt-1">Interested in advertising? Great! Please provide some details about your camp or business.</p>
               )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                required
                rows={5}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end p-6">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? 'Sending...' : <> <Send className="mr-2 h-5 w-5" /> Send Message </>}
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="text-center mt-12 md:mt-16">
        <h3 className="text-xl font-semibold text-primary mb-2">Other Ways to Reach Us</h3>
        <p className="text-muted-foreground">
          Email: <a href="mailto:support@calendarofcamps.com" className="text-accent hover:underline">support@calendarofcamps.com</a>
        </p>
        {/* Add social media links or phone number if applicable */}
      </div>
    </div>
  );
}
