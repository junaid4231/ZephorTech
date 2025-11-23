/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import Hero from "@/sections/Hero";

describe("Hero Section", () => {
  it("renders the main heading", () => {
    render(<Hero />);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Cutting-Edge/i);
    expect(heading).toHaveTextContent(/IT Solutions/i);
  });

  it("renders the subheading", () => {
    render(<Hero />);
    
    expect(
      screen.getByText(/We deliver innovative technology solutions/i)
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<Hero />);
    
    const hireUsButton = screen.getByText(/Hire Us/i).closest("a");
    expect(hireUsButton).toBeInTheDocument();
    expect(hireUsButton).toHaveAttribute("href", "/contact#quote");

    const ourWorkButton = screen.getByText(/Our Work/i).closest("a");
    expect(ourWorkButton).toBeInTheDocument();
    expect(ourWorkButton).toHaveAttribute("href", "/portfolio");
  });

  it("renders trust indicators / stats", () => {
    render(<Hero />);
    
    expect(screen.getByText(/Projects Delivered/i)).toBeInTheDocument();
    expect(screen.getByText(/Happy Clients/i)).toBeInTheDocument();
    expect(screen.getByText(/Years Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Client Satisfaction/i)).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<Hero />);
    
    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby", "hero-heading");
  });

  it("renders the hero badge content", () => {
    render(<Hero />);
    expect(screen.getByText(/Trusted by 200\+ Companies Worldwide/i)).toBeInTheDocument();
  });
});

