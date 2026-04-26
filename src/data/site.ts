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
}

export interface SiteConfig {
  firmName: string;
  practitionerName: string;
  rcicLicense: string;
  tagline: string;
  subTagline: string;
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
}

export const site: SiteConfig = {
  firmName: 'Masoud Immigration',
  practitionerName: 'Masoud',
  rcicLicense: 'R000000',
  tagline: 'Plain-English help with your move to Canada.',
  subTagline: 'Licensed RCIC. Free 30-minute first call. We work out where you stand and what fits.',
  yearsExperience: 8,
  clientsServed: 400,
  phone: '+1 (555) 000-0000',
  phoneHref: 'tel:+15550000000',
  email: 'hello@example.com',
  emailHref: 'mailto:hello@example.com',
  address: '100 Example Street, Suite 200\nCity, Province A1A 1A1',
  hours: [
    { day: 'Monday to Friday', hours: '9:00 to 17:00' },
    { day: 'Saturday', hours: 'By appointment' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  languages: ['English', 'Persian', 'French'],
  calendarUrl: '',
  social: {
    linkedin: '',
    facebook: '',
    instagram: '',
  },
};

export const bookingHref: string = site.calendarUrl || '/contact';
