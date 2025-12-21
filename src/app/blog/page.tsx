"use client";

import { useEffect } from "react";

export default function BlogPage() {
  useEffect(() => {
    // Load Substack feed widget
    const script = document.createElement("script");
    script.src = "https://substackapi.com/embeds/feed.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.SubstackFeedWidget) {
        // @ts-ignore
        window.SubstackFeedWidget.createWidget({
          substackUrl: "aarsh1a.substack.com",
          posts: 10,
          layout: "center",
          colors: {
            primary: "#FFFFFF",
            secondary: "#A0A0A0",
            background: "transparent",
          },
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="w-full min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-semibold text-4xl mb-3 tracking-tight">blog</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            anything and everything i know about
          </p>
        </div>

        {/* Substack Feed Embed */}
        <div className="substack-feed">
          <div id="substack-feed-embed"></div>
        </div>

        {/* Fallback link */}
        <div className="mt-12 text-center">
          <a
            href="https://substack.com/@aarsh1ia/posts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline"
          >
            View all posts on Substack →
          </a>
        </div>
      </div>
    </section>
  );
}

