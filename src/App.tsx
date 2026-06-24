import { useEffect, useMemo, useState } from 'react'
import './App.css'
import apiKeyScreenshot from './assets/novita-get-api-key-3.webp'
import vercelCliInstallResult from './assets/vercel-cli-install-result.png'

type SlideMode = 'cover' | 'install' | 'image' | 'section' | 'showcase' | 'steps' | 'prompt' | 'terminal' | 'matrix' | 'timeline' | 'closing'

type InstallOption = {
  name: string
  label: string
  command: string
  variants?: {
    name: string
    command: string
  }[]
}

type Slide = {
  kicker: string
  eyebrow: string
  title: string
  body: string
  points?: string[]
  code?: string[]
  prompt?: string
  promptCards?: {
    label: string
    prompt: string
    resultImage?: {
      src: string
      alt: string
    }
  }[]
  installOptions?: InstallOption[]
  image?: {
    src: string
    alt: string
  }
  cta?: {
    label: string
    href: string
  }
  metric?: string
  metricLabel?: string
  footnote?: string
  mode: SlideMode
}

const slides: Slide[] = [
  {
    kicker: 'Novita AI x Kilo Code',
    eyebrow: 'Agenda',
    title: 'AI coding workflow',
    body: '',
    points: ['Set up Kilo Code', 'Connect Novita AI models', 'Build a portfolio site', 'Deploy with Vercel', 'Create your own HTML sites'],
    mode: 'cover',
  },
  {
    kicker: '01 / Setup',
    eyebrow: 'Kilo Code',
    title: 'Set up Kilo Code',
    body: '',
    installOptions: [
      {
        name: 'VS Code',
        label: 'IDE extension',
        command: 'vscode:extension/kilocode.kilo-code',
      },
      {
        name: 'CLI',
        label: 'Terminal agent',
        command: 'curl -fsSL https://kilo.ai/cli/install | bash',
        variants: [
          {
            name: 'curl',
            command: 'curl -fsSL https://kilo.ai/cli/install | bash',
          },
          {
            name: 'npm',
            command: 'npm install -g @kilocode/cli',
          },
          {
            name: 'pnpm',
            command: 'pnpm add -g @kilocode/cli',
          },
          {
            name: 'bun',
            command: 'bun add -g @kilocode/cli',
          },
          {
            name: 'brew',
            command: 'brew install Kilo-Org/tap/kilo',
          },
          {
            name: 'AUR',
            command: 'paru -S kilo-bin',
          },
        ],
      },
      {
        name: 'JetBrains',
        label: 'IntelliJ / PyCharm / WebStorm',
        command: 'Install from JetBrains Marketplace',
      },
    ],
    mode: 'install',
  },
  {
    kicker: '02 / API Key',
    eyebrow: 'Novita AI',
    title: 'Get your API key',
    body: '',
    points: ['Create or sign in to your Novita AI account', 'Open the API key page', 'Create a new key for this workshop', 'Keep the key ready for Kilo Code setup'],
    image: {
      src: apiKeyScreenshot,
      alt: 'Novita AI API key dashboard',
    },
    cta: {
      label: 'Create API key',
      href: 'https://novita.ai',
    },
    mode: 'image',
  },
  {
    kicker: '03 / BYOK',
    eyebrow: 'Kilo Gateway',
    title: 'Use Novita in Kilo Code',
    body: '',
    mode: 'section',
  },
  {
    kicker: '04 / Portfolio',
    eyebrow: 'Build',
    title: 'Build a portfolio site',
    body: '',
    mode: 'section',
  },
  {
    kicker: '05 / Design Direction',
    eyebrow: 'Brief',
    title: 'Specify taste',
    body: '',
    prompt: 'Design direction: editorial but practical, dark text on a warm off-white background, sharp typography, project cards that show evidence, no generic SaaS gradient hero, no stock imagery, excellent spacing on mobile, and clear calls to LinkedIn, GitHub, and email.',
    points: ['Say what to avoid', 'Name required links', 'Describe the audience', 'Request responsive checks'],
    mode: 'matrix',
  },
  {
    kicker: '06 / Deploy',
    eyebrow: 'Vercel',
    title: 'Deploy with Vercel',
    body: '',
    promptCards: [
      {
        label: 'Install prompt',
        prompt: 'install vercel cli based on https://vercel.com/docs/cli',
        resultImage: {
          src: vercelCliInstallResult,
          alt: 'Kilo Code result showing Vercel CLI is already installed',
        },
      },
      {
        label: 'Login prompt',
        prompt: 'How can I login my vercel account?',
      },
      {
        label: 'Deploy prompt',
        prompt: 'use Vercel CLI to deploy my portfolio website',
      },
    ],
    mode: 'prompt',
  },
  {
    kicker: '07 / HTML Slides',
    eyebrow: 'Create',
    title: 'Create your own HTML slides',
    body: 'HTML slides are agent-friendly presentation software: editable as code, easy to preview, simple to deploy, and ready for live iteration. This is where future presentations are heading.',
    points: ['Versioned source', 'Live components', 'Fast restyling', 'Deployable deck'],
    mode: 'showcase',
  },
  {
    kicker: '08 / HTML Slide Prompt',
    eyebrow: 'Prompt',
    title: 'Generate a deck',
    body: '',
    prompt: 'Create an HTML slide deck for this workshop. Make it keyboard navigable, clean, responsive, easy for an agent to edit, and deployable like a normal website.',
    points: ['Define the story', 'Use reusable slide data', 'Ask for responsive checks', 'Run and preview locally'],
    mode: 'prompt',
  },
  {
    kicker: '09 / Close',
    eyebrow: 'Takeaway',
    title: 'Repeat the loop',
    body: '',
    points: ['Give context', 'Generate code', 'Verify locally', 'Deploy', 'Reuse the result'],
    mode: 'closing',
  },
]

function KiloMark() {
  return (
    <svg className="kilo-mark" viewBox="0 0 32 32" role="img" aria-label="Kilo logo mark">
      <rect width="32" height="32" rx="8" />
      <path d="M23,26v-2h3v-5l-2-2h-4v2h-3v5l2,2h4ZM20,20h3v3h-3v-3Z" />
      <rect x="12" y="17" width="3" height="3" />
      <polygon points="26 12 23 12 23 9 20 6 17 6 17 9 20 9 20 12 17 12 17 15 26 15 26 12" />
      <path d="M0,0v32h32V0H0ZM29,29H3V3h26v26Z" />
      <polygon points="15 26 15 23 9 23 9 17 6 17 6 23.1875 8.8125 26 15 26" />
      <rect x="12" y="6" width="3" height="3" />
      <polygon points="9 12 12 12 12 15 15 15 15 12 12 9 9 9 9 6 6 6 6 15 9 15 9 12" />
    </svg>
  )
}

function App() {
  const [index, setIndex] = useState(0)
  const [cliInstall, setCliInstall] = useState('curl')
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null)
  const slide = slides[index]
  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index])

  const copyPrompt = async (prompt: string, id = 'default') => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(prompt)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = prompt
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopiedPrompt(id)
    window.setTimeout(() => setCopiedPrompt(null), 1400)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' '].includes(event.key)) {
        event.preventDefault()
        setIndex((current) => Math.min(current + 1, slides.length - 1))
      }
      if (['ArrowLeft', 'PageUp'].includes(event.key)) {
        event.preventDefault()
        setIndex((current) => Math.max(current - 1, 0))
      }
      if (event.key === 'Home') setIndex(0)
      if (event.key === 'End') setIndex(slides.length - 1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <main className={`deck deck--${slide.mode}${slide.promptCards ? ' deck--prompt-flow' : ''}`}>
      <div className="grid-field" aria-hidden="true" />
      <header className="topbar">
        <div className="wordmark">
          <span className="novita-mark">Novita AI</span>
          <span className="brand-plus">×</span>
          <span className="kilo-chip">
            <KiloMark />
            Kilo Code
          </span>
        </div>
        <div className="topbar__meta">
          <span>{slide.eyebrow}</span>
          <span>
            {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </header>

      <section className="slide" aria-live="polite">
        <div className="slide__copy">
          <p className="kicker">{slide.kicker}</p>
          <h1>{slide.title}</h1>
          {slide.body && <p className="body">{slide.body}</p>}
        </div>

        <aside className="slide__panel">
          {slide.metric && (
            <div className="metric-block">
              <strong>{slide.metric}</strong>
              <span>{slide.metricLabel}</span>
            </div>
          )}

          {slide.mode === 'image' && slide.points && slide.image ? (
            <div className="image-split">
              <div className="image-split__steps">
                <ol className="points">
                  {slide.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ol>
                {slide.cta && (
                  <a className="slide-cta" href={slide.cta.href} target="_blank" rel="noopener noreferrer">
                    {slide.cta.label}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
              <figure className="image-frame">
                <img src={slide.image.src} alt={slide.image.alt} />
              </figure>
            </div>
          ) : slide.points && (
            <ol className="points">
              {slide.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ol>
          )}

          {slide.installOptions && (
            <div className="install-grid">
              {slide.installOptions.map((option) => (
                <article className="install-card" key={option.name}>
                  <span>{option.label}</span>
                  <strong>{option.name}</strong>
                  {option.variants && (
                    <div className="install-tabs" aria-label="CLI install methods">
                      {option.variants.map((variant) => (
                        <button
                          className={variant.name === cliInstall ? 'is-active' : ''}
                          key={variant.name}
                          type="button"
                          onClick={() => setCliInstall(variant.name)}
                        >
                          {variant.name}
                        </button>
                      ))}
                    </div>
                  )}
                  <code>
                    {option.variants?.find((variant) => variant.name === cliInstall)?.command ?? option.command}
                  </code>
                </article>
              ))}
            </div>
          )}

          {slide.mode !== 'image' && slide.cta && (
            <a className="slide-cta" href={slide.cta.href} target="_blank" rel="noopener noreferrer">
              {slide.cta.label}
              <span aria-hidden="true">→</span>
            </a>
          )}

          {slide.mode !== 'image' && slide.image && (
            <figure className="image-frame">
              <img src={slide.image.src} alt={slide.image.alt} />
            </figure>
          )}

          {slide.code && (
            <div className="terminal" aria-label="Terminal commands">
              <div className="terminal__label">Terminal</div>
              {slide.code.map((line) => (
                <code key={line}>$ {line}</code>
              ))}
            </div>
          )}

          {slide.prompt && (
            <div className="promptBox">
              <div className="promptBox__header">
                <span>Prompt</span>
                <button type="button" onClick={() => copyPrompt(slide.prompt!)}>
                  {copiedPrompt === 'default' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p>{slide.prompt}</p>
            </div>
          )}

          {slide.promptCards && (
            <div className="promptGrid">
              {slide.promptCards.map((card) => (
                <div className="promptBox" key={card.label}>
                  <div className="promptBox__header">
                    <span>{card.label}</span>
                    <button type="button" onClick={() => copyPrompt(card.prompt, card.label)}>
                      {copiedPrompt === card.label ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p>{card.prompt}</p>
                  {card.resultImage && (
                    <figure className="promptResult">
                      <img src={card.resultImage.src} alt={card.resultImage.alt} />
                    </figure>
                  )}
                </div>
              ))}
            </div>
          )}
        </aside>
      </section>

      <footer className="controls">
        <button type="button" onClick={() => setIndex((current) => Math.max(current - 1, 0))} disabled={index === 0}>
          <span aria-hidden="true">←</span>
          Prev
        </button>
        <div className="progress" aria-label="Slide progress">
          <span style={{ width: `${progress}%` }} />
        </div>
        <button
          type="button"
          onClick={() => setIndex((current) => Math.min(current + 1, slides.length - 1))}
          disabled={index === slides.length - 1}
        >
          Next
          <span aria-hidden="true">→</span>
        </button>
      </footer>

      {slide.footnote && <p className="footnote">{slide.footnote}</p>}
    </main>
  )
}

export default App
