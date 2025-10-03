"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GL } from "./gl";

interface InsightArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  featured?: boolean;
}

const insightArticles: InsightArticle[] = [
  {
    id: "1",
    title: "LLM-Powered Quantitative Trading: The Future is Now",
    description: "Exploring how Large Language Models are revolutionizing algorithmic trading strategies and market analysis through natural language understanding of financial data.",
    category: "AI Trading",
    readTime: "8 min read",
    date: "2024-10-01",
    author: "Joe Wang",
    featured: true
  },
  {
    id: "2",
    title: "Neural Networks in High-Frequency Trading",
    description: "Deep dive into how neural network architectures can process market microstructure data for ultra-low latency trading decisions.",
    category: "Deep Learning",
    readTime: "12 min read",
    date: "2024-09-28",
    author: "Evy Yang"
  },
  {
    id: "3",
    title: "AI Governance in Financial Markets",
    description: "Establishing frameworks for responsible AI deployment in trading systems while maintaining competitive advantage and regulatory compliance.",
    category: "AI Governance",
    readTime: "6 min read",
    date: "2024-09-25",
    author: "Jayne Yu"
  },
  {
    id: "4",
    title: "Transformer Models for Market Sentiment Analysis",
    description: "Leveraging attention mechanisms to analyze news sentiment and social media signals for predictive market insights.",
    category: "NLP",
    readTime: "10 min read",
    date: "2024-09-20",
    author: "Joe Wang"
  },
  {
    id: "5",
    title: "Risk Management with Reinforcement Learning",
    description: "Implementing RL agents for dynamic portfolio optimization and automated risk adjustment in volatile market conditions.",
    category: "Risk Management",
    readTime: "14 min read",
    date: "2024-09-15",
    author: "Evy Yang"
  },
  {
    id: "6",
    title: "Explainable AI in Trading Algorithms",
    description: "Building transparency into black-box trading models for better interpretability and regulatory compliance.",
    category: "Explainable AI",
    readTime: "7 min read",
    date: "2024-09-10",
    author: "Jayne Yu"
  }
];

const categories = ["All", "AI Trading", "Deep Learning", "AI Governance", "NLP", "Risk Management", "Explainable AI"];

export function Insights() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    // Trigger initial animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers = new Map();

    Object.entries(sectionRefs.current).forEach(([key, element]) => {
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => new Set([...prev, key]));
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(element);
        observers.set(key, observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const filteredArticles = selectedCategory === "All"
    ? insightArticles
    : insightArticles.filter(article => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative">
      <GL hovering={hovering} />

      <div className="relative z-10">
        <section id="insights" className="py-20 md:py-32">
          <div className="container">
            {/* Header */}
            <div className="text-center mb-16" ref={el => sectionRefs.current.header = el}>
              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-sentient mb-6 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
                AI Trading <i className="font-light">Insights</i>
              </h2>
              <p className={`font-mono text-foreground/60 text-lg max-w-2xl mx-auto ${isLoaded ? 'animate-fade-in-up animate-delay-200' : ''}`}>
                Thought leadership and cutting-edge research in artificial intelligence
                applications for financial markets and quantitative trading
              </p>
            </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12" ref={el => sectionRefs.current.filters = el}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 font-mono text-sm uppercase transition-all duration-300 border rounded-lg hover-lift ${selectedCategory === category
                  ? "bg-primary text-background border-primary"
                  : "text-foreground/60 border-border hover:text-foreground hover:border-foreground/40"
              } ${isLoaded ? 'animate-fade-in-up' : ''}`}
              style={{animationDelay: isLoaded ? `${index * 0.05 + 0.4}s` : '0s'}}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {selectedCategory === "All" && (
          <div className="mb-16" ref={el => sectionRefs.current.featured = el}>
            {insightArticles
              .filter(article => article.featured)
              .map((article) => (
                <Card
                  key={article.id}
                  className={`border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/40 hover-lift transition-all duration-300 cursor-pointer ${visibleSections.has('featured') ? 'animate-scale-in' : ''}`}
                  onMouseEnter={() => setHoveredCard(article.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        Featured
                      </Badge>
                      <Badge variant="outline" className="font-mono text-xs">
                        {article.category}
                      </Badge>
                    </div>
                    <CardTitle className={`text-2xl md:text-3xl font-sentient leading-tight hover:text-primary transition-colors duration-300 ${visibleSections.has('featured') ? 'animate-fade-in-up animate-delay-400' : ''}`}>
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {article.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm font-mono text-foreground/60">
                      <div className="flex items-center gap-4">
                        <span>{article.author}</span>
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className={`mt-6 transition-all duration-300 ${
                        hoveredCard === article.id ? "translate-x-2" : ""
                      }`}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={el => sectionRefs.current.articles = el}>
          {filteredArticles
            .filter(article => selectedCategory === "All" ? !article.featured : true)
            .map((article, index) => (
              <Card
                key={article.id}
                className={`border-border/40 bg-background/30 backdrop-blur-sm hover:border-primary/40 hover:bg-background/50 hover-lift transition-all duration-300 cursor-pointer group ${visibleSections.has('articles') ? 'animate-fade-in-up' : ''}`}
                style={{animationDelay: visibleSections.has('articles') ? `${index * 0.1}s` : '0s'}}
                onMouseEnter={() => setHoveredCard(article.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs font-mono text-foreground/40">
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-sentient leading-tight group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm font-mono text-foreground/60 mb-4">
                    <span>{article.author}</span>
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <div className={`transition-all duration-300 ${
                    hoveredCard === article.id ? "translate-x-2" : ""
                  }`}>
                    <span className="text-primary font-mono text-sm uppercase hover:text-primary/80 transition-colors duration-150">
                      Read Article →
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

            {/* CTA Section */}
            <div className="text-center mt-20" ref={el => sectionRefs.current.cta = el}>
              <div className="max-w-2xl mx-auto">
                <h3 className={`text-2xl md:text-3xl font-sentient mb-4 ${visibleSections.has('cta') ? 'animate-fade-in-up' : ''}`}>
                  Stay Updated with Our <i className="font-light">Research</i>
                </h3>
                <p className={`font-mono text-foreground/60 mb-8 ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-200' : ''}`}>
                  Subscribe to receive the latest insights in AI-powered trading strategies
                  and financial technology innovations
                </p>
                <Button
                  size="default"
                  className={`hover-lift ${visibleSections.has('cta') ? 'animate-fade-in-up animate-delay-400' : ''}`}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}