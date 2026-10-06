import { describe, expect, it } from 'vitest';
import { builtPage } from './site';

describe('Home page', () => {
  const home = builtPage('index.html');

  it('states what Pragvantix offers in one headline', () => {
    const headlines = home.querySelectorAll('h1');
    expect(headlines).toHaveLength(1);
    expect(headlines[0].text.trim().length).toBeGreaterThan(0);
  });

  it('presents the three service pillars', () => {
    const pillars = home.querySelectorAll('[data-pillar]').map((p) => p.text);
    expect(pillars).toHaveLength(3);
    expect(pillars[0]).toContain('AWS Cloud');
    expect(pillars[1]).toContain('AI');
    expect(pillars[2]).toContain('Cyber Security');
  });

  it('offers a Book a discovery call button that leads to Contact', () => {
    const buttons = home
      .querySelectorAll('a')
      .filter((a) => a.text.trim() === 'Book a discovery call');
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0].getAttribute('href')).toBe('/contact/');
  });
});
