import {
  buildFieldShapes,
  countQuestions,
  type Section,
} from "../wizard/types";

/**
 * The scale assessment: five sections, twenty questions.
 *
 * REVENUE_RANGES is reused from the idea assessment. The industry list, new-
 * customer volumes, conversion shares, reply speeds, weekly-task list, step-away
 * outcomes and fix-one-thing list had no existing counterpart in this codebase
 * and are authored here — adjust freely.
 */

const REVENUE_RANGES = [
  "Under $500",
  "$500–2k",
  "$2k–5k",
  "$5k–10k",
  "$10k+",
];

const REVENUE_WITH_UNSURE = [...REVENUE_RANGES, "I'm not sure"];

const INDUSTRIES = [
  "Home & trade services",
  "Cleaning",
  "Beauty & personal care",
  "Health & wellness",
  "Food & beverage",
  "Retail & ecommerce",
  "Professional services",
  "Creative & media",
  "Education & coaching",
  "Events",
  "Transport & logistics",
  "Technology",
  "Property & real estate",
  "Other",
];

export const SECTIONS: Section[] = [
  {
    badge: "1",
    title: "Your Business",
    fields: [
      {
        kind: "row",
        id: "basics",
        label: "The basics",
        inputs: [
          { id: "business_name", label: "Business name", placeholder: "Acme Cleaning" },
          { id: "website", label: "Website", placeholder: "acme.com" },
          { id: "region", label: "City/region", placeholder: "Leeds, UK" },
        ],
      },
      {
        kind: "select",
        id: "industry",
        label: "What industry?",
        placeholder: "Choose an industry",
        options: INDUSTRIES,
      },
      {
        kind: "single-rows",
        id: "market",
        label: "Who do you sell to, and where?",
        rows: [
          {
            id: "sell_to",
            label: "Who you sell to",
            options: ["Consumers", "Businesses", "Both", "Government/organizations"],
          },
          {
            id: "sell_where",
            label: "Where you sell",
            options: [
              "Just my local area",
              "Mostly local, some beyond",
              "Nationwide or online",
            ],
          },
        ],
      },
    ],
  },
  {
    badge: "2",
    title: "Money",
    fields: [
      {
        kind: "single",
        id: "revenue_now",
        label: "What's your average monthly revenue right now?",
        options: REVENUE_WITH_UNSURE,
      },
      {
        kind: "single",
        id: "revenue_year_ago",
        label: "And roughly what was it a year ago?",
        hint: "Skip if you've been running under a year",
        options: REVENUE_WITH_UNSURE,
        optional: true,
      },
      {
        kind: "single",
        id: "revenue_target",
        label: "Where do you want monthly revenue to be 12 months from now?",
        options: REVENUE_RANGES,
      },
      {
        kind: "row",
        id: "offers",
        label: "What are your top 2–3 offers?",
        inputs: [
          { id: "offer_1", placeholder: "Offer 1" },
          { id: "offer_2", placeholder: "Offer 2" },
          { id: "offer_3", placeholder: "Offer 3" },
        ],
        follow: {
          id: "offers_most_profitable",
          label: "Are those also your most profitable?",
          options: ["Yes", "No", "Not sure"],
        },
      },
    ],
  },
  {
    badge: "3",
    title: "Customers",
    fields: [
      {
        kind: "multi",
        id: "sources",
        label: "Where do customers actually come from?",
        hint: "Select all that apply, then tap one again to mark it your #1 source",
        primary: true,
        options: [
          "Word of mouth",
          "Repeat customers",
          "Instagram",
          "TikTok",
          "Facebook",
          "Google search",
          "Google/Meta ads",
          "LinkedIn",
          "Local directories",
          "Walk-ins",
          "Partnerships",
          "Not sure",
        ],
      },
      {
        kind: "single",
        id: "new_customers",
        label: "Roughly how many new customers a month?",
        options: ["0–5", "6–15", "16–30", "31–60", "60+", "Not sure"],
      },
      {
        kind: "single",
        id: "repeat_share",
        label: "What share of your revenue comes from repeat customers?",
        options: ["0–10%", "11–25%", "26–50%", "51–75%", "76–100%", "Not sure"],
      },
      {
        kind: "single",
        id: "conversion",
        label:
          "Of the people who enquire, roughly what share become customers?",
        options: ["0–10%", "11–25%", "26–50%", "51–75%", "76–100%", "Not sure"],
      },
      {
        kind: "single",
        id: "reply_speed",
        label: "How fast do you usually reply to a new enquiry?",
        options: [
          "Within an hour",
          "Same day",
          "Next day",
          "A few days",
          "It varies a lot",
        ],
      },
    ],
  },
  {
    badge: "4",
    title: "How You Run It",
    fields: [
      {
        kind: "single",
        id: "headcount",
        label: "How many people work in the business, including you?",
        hint: "Employees and contractors in one number",
        options: ["Just me", "2–3", "4–5", "6–10", "11–20", "21–50", "50+"],
      },
      {
        kind: "multi",
        id: "documented",
        label: "Which of these are actually written down?",
        options: [
          "Your sales process",
          "How you deliver the work",
          "New-hire onboarding",
          "Who's responsible for what",
          "Training",
          "None of these yet",
        ],
      },
      {
        kind: "multi",
        id: "manual_work",
        label: "What's messy or still done by hand?",
        options: [
          "Scheduling",
          "Customer follow-up",
          "Invoicing & payments",
          "Bookkeeping",
          "Marketing",
          "Inventory",
          "Team scheduling & payroll",
          "Reporting",
          "Service delivery",
          "Nothing major",
        ],
      },
      {
        kind: "multi",
        id: "time_sinks",
        label: "What eats the most of your week?",
        max: 3,
        options: [
          "Doing the actual work",
          "Chasing new business",
          "Quoting and proposals",
          "Customer support",
          "Scheduling and logistics",
          "Invoicing and chasing payment",
          "Bookkeeping and admin",
          "Marketing and content",
          "Managing the team",
          "Hiring and training",
        ],
      },
      {
        kind: "single",
        id: "step_away",
        label: "If you stepped away for two weeks, what would happen?",
        options: [
          "Everything would keep running",
          "Most things would run, a few would slip",
          "It would limp along and I'd have a mess to fix",
          "It would grind to a halt",
        ],
      },
    ],
  },
  {
    badge: "5",
    title: "What You Want",
    fields: [
      {
        kind: "single",
        id: "fix_first",
        label: "If Dervo could fix one thing right now, what would it be?",
        options: [
          "Bring in more customers",
          "Charge more for what I do",
          "Get off the tools",
          "Make the work repeatable",
          "Sort out cash flow",
          "Hire and keep good people",
          "Know which numbers matter",
          "Find time to work on the business",
        ],
      },
      {
        kind: "textarea",
        id: "vision",
        label: "What do you want the business to look like a year from now?",
        placeholder:
          "e.g. Two crews running without me on site, steady £15k months, and weekends back",
      },
      {
        kind: "textarea",
        id: "anything_else",
        label: "Anything else Dervo should know?",
        placeholder: "Type your answer",
        optional: true,
      },
    ],
  },
];

export const QUESTION_COUNT = countQuestions(SECTIONS);
export const FIELD_SHAPES = buildFieldShapes(SECTIONS);
