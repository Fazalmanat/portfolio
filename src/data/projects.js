// Fill in the placeholders below. Put images/videos in /public/media/ and use "/media/file.png".
// media.type: 'image' | 'video'. Leave src empty to show a placeholder.
const media = { type: 'image', src: '', alt: '' };

export const featuredProjects = [
  {
    id: 'disasterbox',
    title: 'DisasterBox',
    description: 'A VR disaster-preparedness simulator that drops users into realistic emergency scenarios so they can practice the right response before it matters in real life.',
    tags: ['Unity', 'C#', 'VR', 'Interactive Environment'],
    media: { ...media, alt: 'DisasterBox screenshot' },
    links: { demo: '', github: '', more: '' }
  },
  {
    id: 'gramasathi',
    title: 'GramaSathi',
    description: 'An AI-powered virtual village secretary that helps residents access information and services through WhatsApp, with no app download and no new interface to learn.',
    tags: ['AI', 'Voice', 'Automation', 'Firebase', 'Puppeteer'],
    media: { ...media, alt: 'GramaSathi screenshot' },
    links: { demo: '', github: '', more: '' }
  }
];

export const sideQuests = [
  { id: 'click-here', title: 'Click here', description: '', tags: [], media: { ...media, alt: 'Click here screenshot' }, links: { demo: 'https://click-here-wheat.vercel.app/', github: '', more: '' } },
  { id: 'flappy-box', title: 'Flappy box', description: '', tags: [], media: { ...media, alt: 'Flappy box screenshot' }, links: { demo: '', github: 'https://github.com/Fazalmanat/FlappyBox', more: '' } },
  { id: 'beyondfitness', title: 'beyondfitness', description: '', tags: [], media: { ...media, alt: 'beyondfitness screenshot' }, links: { demo: '', github: 'https://github.com/Fazalmanat/beyondfitness', more: '' } },
  { id: 'puzzlemaze', title: 'puzzlemaze', description: '', tags: [], media: { ...media, alt: 'puzzlemaze screenshot' }, links: { demo: '', github: 'https://github.com/Fazalmanat/puzzlemaze', more: '' } }
];