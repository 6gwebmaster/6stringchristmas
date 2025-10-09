import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { motion } from "motion/react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mgvnnvwe", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-red-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl mb-6 text-red-800 uppercase font-bold"
              style={{ 
                fontFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
                letterSpacing: '0.15em',
                textShadow: '2px 2px 0px rgba(255, 235, 59, 0.9), 3px 3px 0px rgba(255, 223, 0, 0.6)'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Contact
            </motion.h2>
            <motion.p 
              className="text-2xl text-gray-700 max-w-5xl mx-auto"
              style={{ fontFamily: '"Zain", "Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", sans-serif' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Have questions about the show or interested in booking a private performance?
            </motion.p>
          </motion.div>

          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="shadow-xl border-red-200">
              {status === "success" ? (
                <>
                  <CardHeader>
                    <CardTitle className="text-2xl text-green-700 text-center">Message Sent! 🎄</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <div className="space-y-6">
                      <p className="text-xl text-gray-700">
                        Thank you for reaching out!
                      </p>
                      <Button 
                        onClick={() => setStatus("idle")}
                        className="bg-red-700 hover:bg-red-800 text-white mt-4"
                        size="lg"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="text-2xl text-red-800">Send a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            placeholder="Your first name" 
                            className="border-red-200 focus:border-red-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            placeholder="Your last name" 
                            className="border-red-200 focus:border-red-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email" 
                          placeholder="your.email@example.com" 
                          className="border-red-200 focus:border-red-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject"
                          name="subject"
                          placeholder="What's this about?" 
                          className="border-red-200 focus:border-red-500"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message"
                          name="message"
                          placeholder="Tell us more..." 
                          rows={5}
                          className="border-red-200 focus:border-red-500"
                          required
                        />
                      </div>
                      
                      {status === "error" && (
                        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                          Oops! There was an error sending your message. Please try again.
                        </div>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-red-700 hover:bg-red-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        size="lg"
                        disabled={status === "submitting"}
                      >
                        {status === "submitting" ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}