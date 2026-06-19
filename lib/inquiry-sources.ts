/**
 * Inquiry Source Tracking
 * 
 * Every form instance must pass one of these literal strings as its `source` prop.
 * This file is the single source of truth — import from here everywhere.
 */

export type InquirySource =
    // Homepage
    | "homepage_request_quote"
    | "homepage_build_lab"
    | "homepage_experience_program"
    // Product listing
    | "product_enquire"
    | "product_customize"
    | "product_need_help"
    // Product detail
    | "product_detail_buy"
    | "product_detail_experience"
    // Solutions
    | "solutions_developer"
    | "solutions_education"
    | "solutions_enterprise"
    // Contact / Footer
    | "contact_page"
    | "footer_contact"
    | "footer_support"
    // Support hub
    | "support_page"
    | "support_page_callback"
    // Generic fallback
    | "general"
    | "floating_talk_to_us"
    | "program_page";

/** Human-readable labels for admin display */
export const SOURCE_LABELS: Record<InquirySource, string> = {
    homepage_request_quote:    "Homepage — Request Quote",
    homepage_build_lab:        "Homepage — Build Lab",
    homepage_experience_program: "Homepage — Experience Program",
    product_enquire:           "Product — Enquire",
    product_customize:         "Product — Customize",
    product_need_help:         "Product — Need Help",
    product_detail_buy:        "Product Detail — Buy",
    product_detail_experience: "Product Detail — Experience",
    solutions_developer:       "Solutions — Developer",
    solutions_education:       "Solutions — Education",
    solutions_enterprise:      "Solutions — Enterprise",
    contact_page:              "Contact Page",
    footer_contact:            "Footer — Contact",
    footer_support:            "Footer — Support",
    support_page:              "Support Hub",
    support_page_callback:     "Support Hub — Quick Callback",
    general:                   "General",
    floating_talk_to_us:       "Floating CTA — Talk To Us",
    program_page:              "Programs Page",
};
