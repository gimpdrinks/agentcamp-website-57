import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8 scroll-mt-24">Terms of Service</h1>
        <div className="prose prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using the AgentCamp website and services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Service Description</h2>
            <p className="text-muted-foreground mb-4">
              AgentCamp provides AI development retreats and educational services designed to help participants build and launch AI-powered projects.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>7-day intensive AI development retreats</li>
              <li>Mentorship from experienced AI entrepreneurs</li>
              <li>Project-based learning experiences</li>
              <li>Community access and networking opportunities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">
              By using our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Respect other participants and instructors</li>
              <li>Follow all retreat guidelines and policies</li>
              <li>Not engage in any harmful or disruptive behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Payment and Refunds</h2>
            <p className="text-muted-foreground mb-4">
              Payment terms and refund policies will be clearly communicated at the time of purchase. Generally:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Full payment is required to secure your spot</li>
              <li>Refunds may be available up to 30 days before the retreat</li>
              <li>Emergency refunds will be considered on a case-by-case basis</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground">
              You retain ownership of any projects or intellectual property you create during AgentCamp retreats. AgentCamp retains rights to its educational materials, methodologies, and branding.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              AgentCamp provides educational services "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your participation in our programs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms of Service, please contact us at legal@agentcamp.co.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
