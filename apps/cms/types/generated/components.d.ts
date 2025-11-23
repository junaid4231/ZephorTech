import type { Schema, Struct } from "@strapi/strapi";

export interface BlogContentSection extends Struct.ComponentSchema {
  collectionName: "components_blog_content_sections";
  info: {
    description: "Structured block for article storytelling";
    displayName: "Content Section";
  };
  attributes: {
    bullets: Schema.Attribute.JSON;
    description: Schema.Attribute.RichText;
    eyebrow: Schema.Attribute.String;
    highlight: Schema.Attribute.String;
    layout: Schema.Attribute.Enumeration<["text-left", "text-right", "full"]> &
      Schema.Attribute.DefaultTo<"full">;
    mediaCaption: Schema.Attribute.String;
    mediaUrl: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface BlogImpactStat extends Struct.ComponentSchema {
  collectionName: "components_blog_impact_stats";
  info: {
    description: "Metric highlight for blog posts";
    displayName: "Impact Stat";
  };
  attributes: {
    description: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlogQuoteBlock extends Struct.ComponentSchema {
  collectionName: "components_blog_quote_blocks";
  info: {
    description: "Featured pull-quote for articles";
    displayName: "Quote Block";
  };
  attributes: {
    attribution: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface ServiceFaq extends Struct.ComponentSchema {
  collectionName: "components_service_faqs";
  info: {
    description: "Frequently asked question for a service";
    displayName: "Service FAQ";
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceFeature extends Struct.ComponentSchema {
  collectionName: "components_service_features";
  info: {
    description: "Individual feature of a service";
    displayName: "Service Feature";
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceProcessStep extends Struct.ComponentSchema {
  collectionName: "components_service_process_steps";
  info: {
    description: "A step in the service delivery process";
    displayName: "Service Process Step";
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    duration: Schema.Attribute.String;
    step: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceUseCase extends Struct.ComponentSchema {
  collectionName: "components_service_use_cases";
  info: {
    description: "Use case for a service";
    displayName: "Service Use Case";
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    examples: Schema.Attribute.JSON;
    industry: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "blog.content-section": BlogContentSection;
      "blog.impact-stat": BlogImpactStat;
      "blog.quote-block": BlogQuoteBlock;
      "service.faq": ServiceFaq;
      "service.feature": ServiceFeature;
      "service.process-step": ServiceProcessStep;
      "service.use-case": ServiceUseCase;
    }
  }
}
