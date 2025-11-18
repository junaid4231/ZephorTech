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

  it("has the hero-canvas container for Phase 3 animation", () => {
    const { container } = render(<Hero />);
    
    const canvas = container.querySelector("#hero-canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass("absolute");
    expect(canvas).toHaveClass("inset-0");
    expect(canvas).toHaveClass("-z-10");
  });

  it("renders trust indicators / stats", () => {
    render(<Hero />);
    
    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText(/Projects Delivered/i)).toBeInTheDocument();
    expect(screen.getByText("200+")).toBeInTheDocument();
    expect(screen.getByText(/Happy Clients/i)).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<Hero />);
    
    const section = screen.getByRole("region");
    expect(section).toHaveAttribute("aria-labelledby", "hero-heading");
  });

  it("matches snapshot structure", () => {
    const { container } = render(<Hero />);
    
    // Verify key structural elements are present
    expect(container.querySelector("#hero-canvas")).toBeInTheDocument();
    expect(container.querySelector("section")).toHaveClass("bg-gradient-primary");
    expect(container.querySelector("h1")).toHaveClass("font-poppins");
  });
});

