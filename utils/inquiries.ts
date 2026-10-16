export interface ProjectBrief {
  id: string;
  name: string;
  email: string;
  company?: string;
  services: string[];
  budget: string;
  timeline?: string;
  details: string;
  packageSelected?: string;
  createdAt: string;
  status: 'new' | 'in-review' | 'contacted' | 'completed';
  source: 'contact-page' | 'home-page';
}

const STORAGE_KEY = 'qarvion_project_briefs';

const initialSampleBriefs: ProjectBrief[] = [
  {
    id: 'brief-sample-1',
    name: 'Marcus Vance',
    email: 'marcus@vancecapital.io',
    company: 'Vance Capital',
    services: ['Brand Identity Design', 'Web & UI/UX Design'],
    budget: '$250 - $500',
    timeline: 'Within 2-3 Weeks',
    packageSelected: 'Growth Branding ($99)',
    details: 'Looking to rebrand our fin-tech advisory firm. We need an updated geometric logo mark, stationery kit, and high-conversion landing page design.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'new',
    source: 'contact-page'
  },
  {
    id: 'brief-sample-2',
    name: 'Sophia Laurent',
    email: 'sophia@luminaorganic.com',
    company: 'Lumina Skincare',
    services: ['Social Media Growth', 'Paid Performance Ads'],
    budget: '$100 - $250',
    timeline: 'Immediate Launch',
    packageSelected: 'Growth Authority ($159/mo)',
    details: 'Need 20 monthly Instagram carousels and TikTok ad creatives for our upcoming summer product drop. Target audience: clean beauty enthusiasts.',
    createdAt: new Date(Date.now() - 3600000 * 28).toISOString(),
    status: 'contacted',
    source: 'contact-page'
  }
];

export function getStoredBriefs(): ProjectBrief[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleBriefs));
      return initialSampleBriefs;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : initialSampleBriefs;
  } catch (error) {
    console.error('Failed to load stored briefs:', error);
    return initialSampleBriefs;
  }
}

/**
 * Sanitizes input string to prevent control character injection, trims whitespace,
 * and enforces length boundaries.
 */
export function sanitizeText(input: unknown, maxLength = 1000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\0/g, '') // remove null bytes
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // strip control characters
    .trim()
    .slice(0, maxLength);
}

/**
 * Validates standard email address format
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.length <= 150;
}

export function saveBrief(briefData: Omit<ProjectBrief, 'id' | 'createdAt' | 'status'>): ProjectBrief {
  const current = getStoredBriefs();
  
  // Sanitize and bound all incoming fields
  const cleanName = sanitizeText(briefData.name, 100);
  const cleanEmail = sanitizeText(briefData.email, 120);
  const cleanCompany = briefData.company ? sanitizeText(briefData.company, 100) : undefined;
  const cleanDetails = sanitizeText(briefData.details, 3000);
  const cleanBudget = sanitizeText(briefData.budget, 50);
  const cleanTimeline = briefData.timeline ? sanitizeText(briefData.timeline, 50) : undefined;
  const cleanPackage = briefData.packageSelected ? sanitizeText(briefData.packageSelected, 100) : undefined;
  const cleanServices = Array.isArray(briefData.services) 
    ? briefData.services.map(s => sanitizeText(s, 60)).filter(Boolean)
    : ['General Inquiry'];

  const newBrief: ProjectBrief = {
    name: cleanName || 'Anonymous Client',
    email: cleanEmail,
    company: cleanCompany,
    services: cleanServices.length > 0 ? cleanServices : ['General Inquiry'],
    budget: cleanBudget || 'Flexible',
    timeline: cleanTimeline,
    packageSelected: cleanPackage,
    details: cleanDetails,
    source: briefData.source === 'home-page' ? 'home-page' : 'contact-page',
    id: `brief-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  const updated = [newBrief, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('qarvion_new_brief', { detail: newBrief }));
  } catch (err) {
    console.error('Failed to save brief to localStorage:', err);
  }

  return newBrief;
}

/**
 * Forwards project brief directly to the agency email (qarviontech@gmail.com) via FormSubmit
 */
export async function sendBriefToEmail(brief: ProjectBrief): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isValidEmail(brief.email)) {
      return { success: false, error: 'Invalid email address format' };
    }

    const servicesText = Array.isArray(brief.services) ? brief.services.join(', ') : (brief.services || 'General Inquiry');
    const response = await fetch('https://formsubmit.co/ajax/qarviontech@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Project Brief from ${brief.name} ${brief.company ? `(${brief.company})` : ''} - Qarvion`,
        _replyto: brief.email,
        "Client Name": brief.name,
        "Client Email": brief.email,
        "Company / Brand": brief.company || 'N/A',
        "Services Requested": servicesText,
        "Budget": brief.budget,
        "Timeline": brief.timeline || 'Flexible',
        "Project Scope": brief.details,
        "Submitted From": brief.source === 'home-page' ? 'Home Page Quick Form' : 'Contact Page Project Brief',
        "Submission Date": new Date(brief.createdAt).toLocaleString(),
        _template: 'table'
      })
    });

    if (response.ok) {
      return { success: true };
    }
    const data = await response.json().catch(() => ({}));
    return { success: false, error: data.message || 'Submission response error' };
  } catch (err: any) {
    console.warn('Form email dispatch network issue:', err);
    return { success: false, error: err?.message || 'Network error' };
  }
}

export function updateBriefStatus(id: string, status: ProjectBrief['status']): void {
  const current = getStoredBriefs();
  const updated = current.map(b => b.id === id ? { ...b, status } : b);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('qarvion_new_brief'));
  } catch (err) {
    console.error('Failed to update brief status:', err);
  }
}

export function deleteBrief(id: string): void {
  const current = getStoredBriefs();
  const updated = current.filter(b => b.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('qarvion_new_brief'));
  } catch (err) {
    console.error('Failed to delete brief:', err);
  }
}

export function clearAllBriefs(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new CustomEvent('qarvion_new_brief'));
  } catch (err) {
    console.error('Failed to clear briefs:', err);
  }
}

/**
 * Neutralizes CSV/Spreadsheet Formula Injection (DDE attacks)
 * If a cell begins with =, +, -, @, \t, or \r, prepend a single quote (')
 * so spreadsheet software treats it strictly as a plain text string.
 */
function sanitizeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return '""';
  let str = String(value).replace(/"/g, '""').replace(/\r\n|\r|\n/g, ' ');
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str}"`;
}

export function exportBriefsToCSV(briefs: ProjectBrief[]): void {
  const headers = ['ID', 'Date', 'Name', 'Email', 'Company', 'Services', 'Budget', 'Package Selected', 'Status', 'Details'];
  
  const rows = briefs.map(b => [
    sanitizeCsvCell(b.id),
    sanitizeCsvCell(new Date(b.createdAt).toLocaleString()),
    sanitizeCsvCell(b.name),
    sanitizeCsvCell(b.email),
    sanitizeCsvCell(b.company || ''),
    sanitizeCsvCell(b.services.join(', ')),
    sanitizeCsvCell(b.budget),
    sanitizeCsvCell(b.packageSelected || 'None'),
    sanitizeCsvCell(b.status),
    sanitizeCsvCell(b.details)
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Qarvion_Project_Briefs_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke object URL to free memory safely
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
