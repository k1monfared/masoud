// TODO(copy): review and edit. Placeholder values for a solo RCIC consultant.
// TODO(config): set calendarUrl below to your Cal.com or Calendly booking link.

export interface Hours {
  day: string;
  hours: string;
}

export interface Social {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  telegram?: string;
}

export interface Credential {
  label: string;
  url?: string;
}

export interface SiteConfig {
  firmName: string;
  practitionerName: string;
  rcicLicense: string;
  founded: number;
  tagline: string;
  subTagline: string;
  aboutBlurb: string;
  yearsExperience: number;
  clientsServed: number;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  address: string;
  hours: Hours[];
  languages: string[];
  calendarUrl: string;
  social: Social;
  credentials: Credential[];
}

export const site: SiteConfig = {
  firmName: 'Masoud Immigration Inc.',
  practitionerName: 'Masoud',
  rcicLicense: 'R000000',
  founded: 2023,
  tagline: 'Trust your Canadian immigration journey to us.',
  subTagline: 'Trusted RCIC-IRB consulting firm based in Victoria. Free first assessment, plain-English guidance from first call to landed status.',
  aboutBlurb: 'Established in 2023, Masoud Immigration Inc. is a Canadian corporation authorized by the College of Immigration and Citizenship Consultants. Based in Victoria, British Columbia, we provide professional and personalized immigration services to individuals and organizations worldwide. We help our clients achieve their immigration goals lawfully, safely, and efficiently.',
  yearsExperience: 3,
  clientsServed: 200,
  phone: '+1 (778) 000-0000',
  phoneHref: 'tel:+17780000000',
  email: 'info@example.ca',
  emailHref: 'mailto:info@example.ca',
  address: 'Victoria, British Columbia\nCanada',
  hours: [
    { day: 'Monday to Friday', hours: '9:00 to 17:00' },
    { day: 'Saturday', hours: 'By appointment' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  languages: ['English', 'Persian'],
  calendarUrl: '',
  social: {
    linkedin: '',
    instagram: '',
    whatsapp: '',
    telegram: '',
  },
  credentials: [
    { label: 'Regulated Canadian Immigration Consultant (RCIC-IRB)', url: 'https://college-ic.ca/protecting-the-public/find-an-immigration-consultant' },
    { label: 'Foreign Worker Recruiter licensed by the Government of British Columbia', url: 'https://services.labour.gov.bc.ca/licensing/TFW_IssuancePublication' },
    { label: 'Member in good standing of the College of Immigration and Citizenship Consultants', url: 'https://college-ic.ca/' },
    { label: 'Member of the Canadian Association of Professional Immigration Consultants', url: 'https://www.capic.ca/EN/ActiveMembersList' },
    { label: 'Commissioner for Taking Affidavits for British Columbia' },
  ],
};

export const bookingHref: string = site.calendarUrl || '/contact';
