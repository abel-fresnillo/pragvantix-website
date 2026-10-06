import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parse } from 'node-html-parser';
import { describe, expect, it } from 'vitest';
import Base from '../src/layouts/Base.astro';
import { builtPage } from './site';

const meta = { title: 'Título', description: 'Descripción' };

async function render(props: Record<string, string>) {
  const container = await AstroContainer.create();
  return parse(await container.renderToString(Base, { props }));
}

describe('Shared layout language', () => {
  it('marks the launch site as English', () => {
    expect(builtPage('index.html').querySelector('html')?.getAttribute('lang')).toBe('en');
  });

  it('lets a page in another language reuse the layout by passing its language', async () => {
    const page = await render({ ...meta, lang: 'es' });
    expect(page.querySelector('html')?.getAttribute('lang')).toBe('es');
    expect(page.querySelector('title')?.text).toBe('Título');
  });
});
