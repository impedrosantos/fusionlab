import { useState } from 'react'
import { useT } from '../i18n'

type Field =
  | 'peso'
  | 'tempo'
  | 'filprice'
  | 'waste'
  | 'watt'
  | 'kwh'
  | 'machcost'
  | 'machlife'
  | 'labtime'
  | 'labrate'
  | 'margin'

const DEFAULTS: Record<Field, string> = {
  peso: '45',
  tempo: '3.5',
  filprice: '18',
  waste: '8',
  watt: '150',
  kwh: '0.18',
  machcost: '400',
  machlife: '3000',
  labtime: '20',
  labrate: '8',
  margin: '40',
}

export default function Calculadora() {
  const t = useT()
  const [f, setF] = useState<Record<Field, string>>(DEFAULTS)

  const set = (k: Field) => (e: { target: { value: string } }) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }))

  // Parse an input, treating blank/invalid as 0.
  const n = (k: Field) => {
    const v = parseFloat(f[k])
    return Number.isFinite(v) ? v : 0
  }

  const waste = n('waste')
  const tempo = n('tempo')
  const margin = n('margin')
  const machlife = n('machlife') || 1 // avoid division by zero

  // filament cost, with waste factor applied to weight
  const custoFilamento = ((n('peso') * (1 + waste / 100)) / 1000) * n('filprice')
  const custoEletricidade = (n('watt') / 1000) * tempo * n('kwh')
  const custoMaquina = (n('machcost') / machlife) * tempo
  const custoMao = (n('labtime') / 60) * n('labrate')

  const custoTotal = custoFilamento + custoEletricidade + custoMaquina + custoMao
  const precoFinal = custoTotal * (1 + margin / 100)

  const fmt = (x: number) =>
    x.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const parts = [
    { label: t('calc.filamento'), v: custoFilamento, color: 'var(--accent)' },
    { label: t('calc.eletricidade'), v: custoEletricidade, color: 'var(--accent-3)' },
    { label: t('calc.maquinaShort'), v: custoMaquina, color: 'var(--accent-2)' },
    { label: t('calc.mao'), v: custoMao, color: '#fde68a' },
  ]

  return (
    <article className="section">
      <div className="container">
        <span className="kicker mono">{t('calc.kicker')}</span>
        <h1>{t('calc.title')}</h1>
        <p className="section-sub">{t('calc.intro')}</p>

        <div className="calc-grid">
          {/* INPUTS */}
          <div className="calc-panel">
            <p className="calc-section-title">{t('calc.pieceTitle')}</p>
            <div className="calc-row2">
              <div className="calc-field">
                <label htmlFor="peso">
                  <span>{t('calc.weightLabel')}</span>
                  <span className="val">{f.peso || '0'} g</span>
                </label>
                <input id="peso" type="number" min="0" step="1" value={f.peso} onChange={set('peso')} />
              </div>
              <div className="calc-field">
                <label htmlFor="tempo">
                  <span>{t('calc.timeLabel')}</span>
                  <span className="val">{f.tempo || '0'} h</span>
                </label>
                <input id="tempo" type="number" min="0" step="0.1" value={f.tempo} onChange={set('tempo')} />
              </div>
            </div>
            <div className="calc-row2">
              <div className="calc-field">
                <label htmlFor="filprice">
                  <span>{t('calc.filPriceLabel')}</span>
                  <span className="val">{f.filprice || '0'} €/kg</span>
                </label>
                <input id="filprice" type="number" min="0" step="0.5" value={f.filprice} onChange={set('filprice')} />
              </div>
              <div className="calc-field">
                <label htmlFor="waste">
                  <span>{t('calc.wasteLabel')}</span>
                  <span className="val">{f.waste || '0'} %</span>
                </label>
                <input id="waste" type="number" min="0" max="100" step="1" value={f.waste} onChange={set('waste')} />
              </div>
            </div>

            <div className="calc-divider" />
            <p className="calc-section-title">{t('calc.machineTitle')}</p>
            <div className="calc-row2">
              <div className="calc-field">
                <label htmlFor="watt">
                  <span>{t('calc.wattLabel')}</span>
                  <span className="val">{f.watt || '0'} W</span>
                </label>
                <input id="watt" type="number" min="0" step="10" value={f.watt} onChange={set('watt')} />
              </div>
              <div className="calc-field">
                <label htmlFor="kwh">
                  <span>{t('calc.kwhLabel')}</span>
                  <span className="val">{f.kwh || '0'} €/kWh</span>
                </label>
                <input id="kwh" type="number" min="0" step="0.01" value={f.kwh} onChange={set('kwh')} />
              </div>
            </div>
            <div className="calc-row2">
              <div className="calc-field">
                <label htmlFor="machcost">
                  <span>{t('calc.machCostLabel')}</span>
                  <span className="val">{f.machcost || '0'} €</span>
                </label>
                <input id="machcost" type="number" min="0" step="10" value={f.machcost} onChange={set('machcost')} />
              </div>
              <div className="calc-field">
                <label htmlFor="machlife">
                  <span>{t('calc.machLifeLabel')}</span>
                  <span className="val">{f.machlife || '0'} h</span>
                </label>
                <input id="machlife" type="number" min="1" step="50" value={f.machlife} onChange={set('machlife')} />
              </div>
            </div>

            <div className="calc-divider" />
            <p className="calc-section-title">{t('calc.laborTitle')}</p>
            <div className="calc-row2">
              <div className="calc-field">
                <label htmlFor="labtime">
                  <span>{t('calc.labTimeLabel')}</span>
                  <span className="val">{f.labtime || '0'} min</span>
                </label>
                <input id="labtime" type="number" min="0" step="5" value={f.labtime} onChange={set('labtime')} />
              </div>
              <div className="calc-field">
                <label htmlFor="labrate">
                  <span>{t('calc.labRateLabel')}</span>
                  <span className="val">{f.labrate || '0'} €/h</span>
                </label>
                <input id="labrate" type="number" min="0" step="0.5" value={f.labrate} onChange={set('labrate')} />
              </div>
            </div>
            <div className="calc-field">
              <label htmlFor="margin">
                <span>{t('calc.marginLabel')}</span>
                <span className="val">{f.margin || '0'} %</span>
              </label>
              <input id="margin" type="range" min="0" max="200" step="5" value={f.margin} onChange={set('margin')} />
            </div>
          </div>

          {/* RESULTS */}
          <div className="calc-panel">
            <div className="calc-hero">
              <div className="calc-hero-label mono">{t('calc.resultLabel')}</div>
              <div className="calc-price">{fmt(precoFinal)} €</div>
              <div className="calc-hero-sub">
                {t('calc.resultSub', { total: fmt(custoTotal), margin })}
              </div>
            </div>

            <div className="calc-breakdown-row">
              <span className="name">{t('calc.filamento')}</span>
              <span className="amt">{fmt(custoFilamento)} €</span>
            </div>
            <div className="calc-breakdown-row">
              <span className="name">{t('calc.eletricidade')}</span>
              <span className="amt">{fmt(custoEletricidade)} €</span>
            </div>
            <div className="calc-breakdown-row">
              <span className="name">{t('calc.maquina')}</span>
              <span className="amt">{fmt(custoMaquina)} €</span>
            </div>
            <div className="calc-breakdown-row">
              <span className="name">{t('calc.mao')}</span>
              <span className="amt">{fmt(custoMao)} €</span>
            </div>
            <div className="calc-breakdown-row total">
              <span className="name">{t('calc.totalCost')}</span>
              <span className="amt">{fmt(custoTotal)} €</span>
            </div>

            <div className="calc-barwrap">
              <div className="calc-bar">
                {parts.map((p) => (
                  <div
                    key={p.label}
                    style={{
                      width: `${custoTotal > 0 ? (p.v / custoTotal) * 100 : 0}%`,
                      background: p.color,
                    }}
                  />
                ))}
              </div>
              <div className="calc-legend">
                {parts.map((p) => (
                  <span key={p.label}>
                    <span className="dot" style={{ background: p.color }} />
                    {p.label} · {custoTotal > 0 ? Math.round((p.v / custoTotal) * 100) : 0}%
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="calc-note mono dim">{t('calc.note')}</p>
      </div>
    </article>
  )
}
