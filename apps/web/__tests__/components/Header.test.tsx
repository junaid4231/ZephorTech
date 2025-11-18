import { render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import { mainNavigation } from "@/config";

describe("Header", () => {
  it("renders the ZephorTech logo", () => {
    render(<Header />);
    expect(screen.getByLabelText("ZephorTech Home")).toBeInTheDocument();
    expect(screen.getByText("ZephorTech")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Header />);
    
    mainNavigation.forEach((link) => {
      // Use getAllByText since links appear in both desktop and mobile menus
      const navLinks = screen.getAllByText(link.label);
      expect(navLinks.length).toBeGreaterThan(0);
      navLinks.forEach((navLink) => {
        expect(navLink.closest("a")).toHaveAttribute("href", link.href);
      });
    });
  });

  it("renders the CTA button", () => {
    render(<Header />);
    
    const ctaButtons = screen.getAllByText("Get a Quote");
    expect(ctaButtons.length).toBeGreaterThan(0);
    ctaButtons.forEach((button) => {
      expect(button.closest("a")).toHaveAttribute("href", "/contact#quote");
    });
  });

  it("has proper ARIA labels for accessibility", () => {
    render(<Header />);
    
    expect(screen.getByLabelText("Main navigation")).toBeInTheDocument();
    expect(screen.getByLabelText("Toggle navigation menu")).toBeInTheDocument();
  });
});

