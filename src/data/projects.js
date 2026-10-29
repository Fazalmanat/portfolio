// Each project has a `media` list (photos and/or videos shown in the popup).
// To use your own files: put them in /public/media/ and change the `src` paths below.
//   Photo: { type: 'image', src: '/media/my-photo.jpg', alt: 'what it shows' }
//   Video: { type: 'video', src: '/media/my-demo.mp4', poster: '/media/poster.jpg' }
// Add or remove items freely. Links left as '' are hidden in the popup.
const ph = (id, n, title) => ({ type: 'image', src: `/media/placeholder-${id}-${n}.svg`, alt: `${title} placeholder ${n}` });

export const featuredProjects = [
  {
    id: 'disasterbox',
    title: 'DisasterBox',
    description: 'A VR disaster-preparedness simulator that drops users into realistic emergency scenarios so they can practice the right response before it matters in real life.',
    tags: ['Unity', 'C#', 'VR', 'Interactive Environment'],
    media: [{ type: 'image', src: '/media/disasterbox.jpg', alt: 'Disasterbox  opening screen' },{ type: 'image', src: '/media/disasterbox2.jpg' }],
    links: { demo: '', github: '', more: '' }
  },
  {
    id: 'gramasathi',
    title: 'GramaSathi',
    description: 'An AI-powered virtual village secretary that helps residents access information and services through WhatsApp, with no app download and no new interface to learn.',
    tags: ['AI', 'Voice', 'Automation', 'Firebase', 'Puppeteer'],
    media: [ph('gramasathi', 1, 'GramaSathi'), ph('gramasathi', 2, 'GramaSathi')],
    links: { demo: '', github: '', more: '' }
  }
];

export const sideQuests = [
  { id: 'click-here', title: 'Click here', description: 'Click here is a responsive browser game where a tiny button hides somewhere on screen and you have to spot it and click it. Every hit moves the button, shifts the background and border colors, and raises the stakes. It runs on desktop and mobile, and it follows your light or dark theme.', tags: [],    media: [{ type: 'image', src: '/media/clickhere.png', alt: 'Clickhere opening screen' },{ type: 'image', src: '/media/clickhere2.png' }], links: { demo: 'https://click-here-wheat.vercel.app/', github: '', more: 'gf' } },
  { id: 'flappy-box', title: 'Flappy box', description: 'Flappy Box is a minimalist twist on the classic Flappy Bird, developed in Unity. The bird is replaced with a simple box, and the collision rules are flipped: pillars are harmless, and the player loses only by leaving the screen boundaries. It’s a small project that explores custom game-over conditions and basic 2D physics and controls.', tags: [],media: [{ type: 'image', src: '/media/flappybox.png', alt: 'flappybox opening screen' },{ type: 'image', src: '/media/flappybox2.png' }] , links: { demo: '', github: 'https://github.com/Fazalmanat/FlappyBox', more: '' } },
  { id: 'beyondfitness', title: 'beyondfitness', description: 'Beyond Fitness is a browser-based fitness companion built to make working out more accessible. It gathers workout videos across a range of exercise types, such as strength, cardio, and flexibility, in one place, so users can easily find and follow routines that suit their goals without needing to install anything.', tags: [], media: [{ type: 'image', src: '/media/beyondfitness.png', alt: 'beyondfitness landing page' }], links: { demo: '', github: 'https://github.com/Fazalmanat/beyondfitness', more: '' } },
  { id: 'puzzlemaze', title: 'puzzlemaze', description: 'Puzzle Maze is a 3D game developed in Unity that adds a puzzle layer to the classic maze formula. Players navigate winding corridors, smash through breakable walls, and collect clues that help them solve challenges along the way. The project explores 3D movement, interactive environments, and puzzle design in a single, compact experience.', tags: [], media: [{ type: 'image', src: '/media/puzzlemaze.jpg', alt: 'Puzzlemaze opening screen' },{ type: 'image', src: '/media/puzzlemaze2.jpg' },{type:'image',src:'/media/puzzlemaze3.jpg'}], links: { demo: '', github: 'https://github.com/Fazalmanat/puzzlemaze', more: '' } },
  { id: 'repeat', title: 'repeat', description: 'The Endless Manuscript is an experimental horror website built with HTML, CSS, and JavaScript. It creates a recursive visual experience by repeatedly capturing the browser window and randomly placing screenshots across the screen. Featuring distorted handwritten text, imperfect occult-inspired symbols, and a slowly shifting hypnotic background, the project explores generative visuals, CSS animations, and recursive effects to create an unsettling, ever-evolving atmosphere.', tags: [], media: [{ type: 'image', src: '/media/repeat.jpg', alt: 'repeat opening screen' },{ type: 'image', src: '/media/repeat2.jpg' }], links: { demo: '', github: 'https://github.com/Fazalmanat/repeat', more: '' } }
];