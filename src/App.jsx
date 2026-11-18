import { useMemo, useState } from 'react'
import './App.css'

const transactions = [
  { name: 'University of Manchester', detail: 'Tuition • Manchester', date: 'Today, 10:42', amount: '− £1,250.00', type: 'Education', status: 'Completed', initials: 'U', tone: 'blue' },
  { name: 'Mum · Lagos', detail: 'Family support • Nigeria', date: 'Today, 09:18', amount: '+ ₦185,000.00', type: 'Transfer', status: 'Completed', initials: 'M', tone: 'teal' },
  { name: 'Tesco Express', detail: 'Groceries • London', date: 'Yesterday, 18:36', amount: '− £42.80', type: 'Shopping', status: 'Completed', initials: 'T', tone: 'red' },
  { name: 'Campus Café', detail: 'Food & drink • London', date: 'Yesterday, 12:14', amount: '− £8.50', type: 'Food', status: 'Completed', initials: 'C', tone: 'gold' },
  { name: 'A. Okafor', detail: 'Transfer received • Abuja', date: '16 Nov, 16:05', amount: '+ ₦75,000.00', type: 'Transfer', status: 'Review', initials: 'A', tone: 'purple' },
]

const weeklyBars = [
  { day: 'Mon', value: 42 }, { day: 'Tue', value: 65 }, { day: 'Wed', value: 50 },
  { day: 'Thu', value: 82 }, { day: 'Fri', value: 58 }, { day: 'Sat', value: 92 },
  { day: 'Sun', value: 68 },
]

const monthlyBars = [
  { day: 'Wk 1', value: 62 }, { day: 'Wk 2', value: 45 }, { day: 'Wk 3', value: 86 },
  { day: 'Wk 4', value: 70 },
]

function Icon({ name, size = 18 }) {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    transfer: <><path d="M7 7h13l-3-3" /><path d="m20 7-3 3" /><path d="M17 17H4l3 3" /><path d="m4 17 3-3" /></>,
    alert: <><path d="m12 3 9 16H3L12 3Z" /><path d="M12 9v4" /><path d="M12 16h.01" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m7 14 4-4 4 3 6-7" /></>,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  }
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function App() {
  const [period, setPeriod] = useState('7 days')
  const [query, setQuery] = useState('')
  const [activeNav, setActiveNav] = useState('Dashboard')
  const bars = period === '7 days' ? weeklyBars : monthlyBars
  const filteredTransactions = useMemo(
    () => transactions.filter((transaction) => `${transaction.name} ${transaction.detail} ${transaction.type}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const navItems = [
    { label: 'Dashboard', icon: 'grid', href: '#dashboard' },
    { label: 'Transactions', icon: 'card', href: '#transactions' },
    { label: 'International Transfers', icon: 'transfer', href: '#transfers' },
    { label: 'Risk Alerts', icon: 'alert', href: '#alerts', count: '2' },
    { label: 'Analytics', icon: 'chart', href: '#analytics' },
  ]

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="MigrantPay Monitor home">
          <span className="brand-mark"><span /></span>
          <span className="brand-name">migrant<span>pay</span><small>MONITOR</small></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.label} className={activeNav === item.label ? 'nav-link active' : 'nav-link'} href={item.href} onClick={() => setActiveNav(item.label)}>
              <Icon name={item.icon} size={16} />
              {item.label}
              {item.count && <span className="nav-count">{item.count}</span>}
            </a>
          ))}
        </nav>
        <div className="top-actions">
          <button className="icon-button notification-button" aria-label="Notifications"><Icon name="bell" size={19} /><i /></button>
          <span className="top-divider" />
          <button className="profile-button" aria-label="Student profile">
            <span className="profile-avatar">AO</span>
            <span className="profile-copy"><strong>Amara Okafor</strong><small>Student account</small></span>
            <span className="profile-chevron">⌄</span>
          </button>
        </div>
      </header>

      <main>
        <section className="welcome-band" id="home">
          <div className="welcome-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> YOUR MONEY, IN ONE PLACE</div>
            <h1>Feel at home with<br /><em>your finances.</em></h1>
            <p>Keep an eye on your GBP and NGN spending, wherever your studies take you.</p>
            <a className="welcome-link" href="#dashboard">Explore your dashboard <span>↗</span></a>
          </div>
          <div className="welcome-art" aria-hidden="true">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="floating-tag tag-gbp"><span>🇬🇧</span> GBP <b>£</b></div>
            <div className="floating-tag tag-ngn"><span>🇳🇬</span> NGN <b>₦</b></div>
            <div className="art-card">
              <div className="art-card-top"><span className="mini-brand"><span className="brand-mark"><span /></span> migrantpay</span><span className="chip-dots">••••</span></div>
              <div className="art-card-label">YOUR EVERYDAY BALANCE</div>
              <div className="art-card-amount">£2,840<span>.65</span></div>
              <div className="art-card-bottom"><span>STUDENT ACCOUNT</span><span>•• 2048</span></div>
              <div className="card-shine" />
            </div>
            <div className="art-sparkle sparkle-one">✳</div><div className="art-sparkle sparkle-two">✦</div>
          </div>
          <div className="welcome-note"><span className="note-icon">✳</span> A clearer view of life between two homes.</div>
        </section>

        <section className="dashboard-section" id="dashboard">
          <div className="section-heading">
            <div>
              <div className="section-kicker">WEDNESDAY, 18 NOVEMBER 2026 <span className="tiny-sun">✳</span></div>
              <h2>Good morning, Amara <span className="wave">✦</span></h2>
              <p>Here’s what’s happening with your money.</p>
            </div>
            <button className="outline-button" type="button" onClick={() => window.print()}><Icon name="download" size={16} /> Export overview</button>
          </div>

          <div className="summary-grid">
            <article className="summary-card balance-card">
              <div className="summary-top"><span className="summary-label">TOTAL BALANCE</span><span className="summary-icon"><Icon name="card" size={18} /></span></div>
              <div className="summary-value">£4,280<span>.65</span></div>
              <div className="summary-foot"><span className="positive">↗ 4.8%</span> <span>vs. last month</span><div className="mini-bars">{[22, 32, 27, 38, 31, 45, 50, 42, 57, 48, 65, 72].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div>
            </article>
            <article className="summary-card">
              <div className="summary-top"><span className="summary-label">SPENT THIS MONTH</span><span className="summary-icon mint"><Icon name="arrow" size={18} /></span></div>
              <div className="summary-value">£1,246<span>.80</span></div>
              <div className="summary-foot"><span className="positive">↓ 12.3%</span> <span>less than last month</span></div>
              <div className="progress-track"><span style={{ width: '48%' }} /></div>
              <div className="progress-caption"><span>Monthly budget</span><strong>£1,246 / £2,600</strong></div>
            </article>
            <article className="summary-card">
              <div className="summary-top"><span className="summary-label">SENT TO NIGERIA</span><span className="summary-icon lavender"><Icon name="transfer" size={18} /></span></div>
              <div className="summary-value">₦485<span>,000</span></div>
              <div className="summary-foot"><span className="muted-pill">3 transfers</span><span> this month</span></div>
              <div className="currency-note"><span>GBP → NGN</span><strong>Illustrative activity</strong></div>
            </article>
            <article className="summary-card">
              <div className="summary-top"><span className="summary-label">NEEDS YOUR ATTENTION</span><span className="summary-icon peach"><Icon name="alert" size={18} /></span></div>
              <div className="summary-value">02<span className="alerts-word"> alerts</span></div>
              <a className="summary-action" href="#alerts">Review flagged activity <span>→</span></a>
            </article>
          </div>

          <div className="content-grid">
            <section className="panel spending-panel" id="analytics">
              <div className="panel-heading">
                <div><h3>Spending overview</h3><p>Your outgoings at a glance</p></div>
                <select aria-label="Spending chart period" value={period} onChange={(event) => setPeriod(event.target.value)}>
                  <option>7 days</option><option>30 days</option>
                </select>
              </div>
              <div className="chart-summary"><strong>£684.20</strong><span className="chart-change">↗ 8.2%</span><small> compared to previous period</small></div>
              <div className={`bar-chart ${period === '30 days' ? 'monthly-chart' : ''}`} role="img" aria-label={`Spending chart for the last ${period}`}>
                <div className="chart-y-labels"><span>£300</span><span>£200</span><span>£100</span><span>£0</span></div>
                <div className="chart-plot">
                  <div className="chart-lines"><i /><i /><i /><i /></div>
                  <div className="bars">{bars.map((bar) => <div className="bar-column" key={bar.day}><div className="bar" style={{ height: `${bar.value}%` }}><span>£{Math.round(bar.value * 3.2)}</span></div><small>{bar.day}</small></div>)}</div>
                </div>
              </div>
              <div className="chart-legend"><span><i className="legend-dot teal-dot" /> Spending</span><span><i className="legend-dot pale-dot" /> Your weekly average</span></div>
            </section>

            <section className="panel category-panel">
              <div className="panel-heading"><div><h3>Where it goes</h3><p>Spending by category</p></div><button className="more-button" aria-label="More spending category options">···</button></div>
              <div className="category-chart-wrap">
                <div className="donut-chart"><div className="donut-center"><strong>£1,246</strong><span>total spent</span></div></div>
                <div className="category-legend">
                  <div><i className="category-dot cat-housing" /><span>Housing</span><strong>42%</strong></div>
                  <div><i className="category-dot cat-food" /><span>Food & groceries</span><strong>28%</strong></div>
                  <div><i className="category-dot cat-transport" /><span>Transport</span><strong>18%</strong></div>
                  <div><i className="category-dot cat-other" /><span>Other</span><strong>12%</strong></div>
                </div>
              </div>
              <a className="text-link" href="#transactions">View spending breakdown <span>→</span></a>
            </section>
          </div>

          <div className="content-grid lower-grid">
            <section className="panel transactions-panel" id="transactions">
              <div className="panel-heading transactions-heading">
                <div><h3>Recent transactions</h3><p>Your latest account activity</p></div>
                <div className="table-actions">
                  <label className="search-field"><Icon name="search" size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" aria-label="Search transactions" /></label>
                  <a className="see-all" href="#transactions">See all <span>→</span></a>
                </div>
              </div>
              <div className="table-scroll">
                <table>
                  <thead><tr><th>TRANSACTION</th><th>DATE</th><th>CATEGORY</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr key={`${transaction.name}-${transaction.date}`}>
                        <td><div className="transaction-name"><span className={`merchant-avatar ${transaction.tone}`}>{transaction.initials}</span><span><strong>{transaction.name}</strong><small>{transaction.detail}</small></span></div></td>
                        <td className="date-cell">{transaction.date}</td>
                        <td><span className="category-tag">{transaction.type}</span></td>
                        <td className={transaction.amount.startsWith('+') ? 'amount-cell credit' : 'amount-cell'}>{transaction.amount}</td>
                        <td><span className={transaction.status === 'Review' ? 'status-pill review' : 'status-pill'}><i />{transaction.status}</span></td>
                      </tr>
                    ))}
                    {filteredTransactions.length === 0 && <tr><td className="empty-row" colSpan="5">No transactions match that search.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="panel alerts-panel" id="alerts">
              <div className="panel-heading"><div><h3>Risk alerts <span className="alert-count">2</span></h3><p>Unusual activity to review</p></div><a className="see-all" href="#alerts">View all <span>→</span></a></div>
              <article className="alert-item">
                <span className="alert-symbol high">!</span>
                <div className="alert-copy"><div><strong>Unusually large transfer</strong><span className="severity high-severity">HIGH</span></div><p>₦185,000 transfer is larger than your usual amount.</p><small>Today, 09:18 <i>•</i> Illustrative alert</small></div>
                <button aria-label="View unusually large transfer alert"><Icon name="chevron" size={17} /></button>
              </article>
              <article className="alert-item">
                <span className="alert-symbol medium">↗</span>
                <div className="alert-copy"><div><strong>New recipient detected</strong><span className="severity medium-severity">REVIEW</span></div><p>First transfer to this recipient in Abuja.</p><small>16 Nov, 16:05 <i>•</i> Illustrative alert</small></div>
                <button aria-label="View new recipient alert"><Icon name="chevron" size={17} /></button>
              </article>
              <div className="alert-disclaimer"><Icon name="alert" size={14} /> Demo alerts only — not financial advice or fraud detection.</div>
            </section>
          </div>

          <section className="transfer-banner" id="transfers">
            <div className="transfer-icon"><Icon name="transfer" size={20} /></div>
            <div><span className="banner-eyebrow">BETWEEN HERE & HOME</span><h3>See your international transfers, all in one place.</h3><p>Track illustrative GBP → NGN activity alongside everyday spending.</p></div>
            <div className="transfer-currencies"><span>🇬🇧 <b>GBP</b></span><i>→</i><span>🇳🇬 <b>NGN</b></span></div>
            <a href="#transactions" className="banner-link">Explore transfers <span>→</span></a>
          </section>
          <footer className="page-footer"><span>© 2025 MigrantPay Monitor</span><span><i className="demo-dot" /> Demonstration dashboard · fictional data only · no payments processed</span><a href="#home">Back to top ↑</a></footer>
        </section>
      </main>
    </div>
  )
}

export default App
