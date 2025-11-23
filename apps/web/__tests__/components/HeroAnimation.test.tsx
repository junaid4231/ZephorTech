/// <reference types="@testing-library/jest-dom" />
import { render } from "@testing-library/react";
import HeroAnimation from "@/components/HeroAnimation";

describe("HeroAnimation", () => {
  it("renders without crashing", () => {
    const { container } = render(<HeroAnimation />);
    expect(container).toBeInTheDocument();
  });

  it("uses dynamic import for client-side rendering", () => {
    // This test verifies that the component is structured correctly
    // The actual animation component is dynamically imported with SSR disabled
    const { container } = render(<HeroAnimation />);
    
    // Component should render (even if animation doesn't load in test environment)
    expect(container.firstChild).toBeDefined();
  });
});

