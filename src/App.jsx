import { useState, useEffect, useCallback } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Comfortaa:wght@300;400;600&family=Lato:wght@300;400;700&family=JetBrains+Mono:wght@400;500&display=swap');
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --blue:#0057B8; --blue-dark:#003D80; --blue-light:#E8F0FE; --blue-mid:#C2D6F5;
  --gold:#FFD700; --gold-dark:#C8A800; --charcoal:#1A1A1A; --silver:#ADADAD;
  --lt-silver:#F5F5F5; --white:#FAFAFA; --success:#28A745; --success-bg:#EAF7EE;
  --warning:#B07D0A; --warning-bg:#FFF8E6; --error:#DC3545; --error-bg:#FDECEA;
  --code-bg:#1C2333; --code-fg:#CDD9E5; --border:#DCDFE5; --ink:#1A1A1A;
  --ink-mid:#4A5568; --ink-muted:#6B7280;
}
.ac-root{font-family:'Lato',Helvetica,Arial,sans-serif;background:var(--lt-silver);color:var(--ink);min-height:100vh;line-height:1.6;}
.ac-header{background:var(--blue);position:sticky;top:0;z-index:30;box-shadow:0 2px 10px rgba(0,0,0,0.2);}
.ac-header-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:16px;padding:14px 32px;}
.ac-logo-mark{width:32px;height:32px;background:white;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'Montserrat',sans-serif;font-weight:800;font-size:11px;color:var(--blue);flex-shrink:0;letter-spacing:-0.02em;}
.ac-header-text{flex:1;}
.ac-header-text h1{font-family:'Montserrat',sans-serif;font-weight:800;font-size:18px;color:white;letter-spacing:-0.02em;line-height:1.2;}
.ac-tagline{font-family:'Comfortaa',cursive;font-size:11px;color:rgba(255,255,255,0.75);margin-top:1px;}
.ac-badge{background:var(--gold);color:var(--charcoal);font-family:'Montserrat',sans-serif;font-weight:700;font-size:10px;padding:3px 12px;border-radius:999px;letter-spacing:0.04em;white-space:nowrap;}
.ac-layout{max-width:1200px;margin:0 auto;display:flex;}
.ac-sidebar{width:230px;flex-shrink:0;background:white;border-right:1px solid var(--border);position:sticky;top:61px;height:calc(100vh - 61px);overflow-y:auto;padding:20px 0 60px;}
.ac-sidebar::-webkit-scrollbar{width:0;}
.sidebar-label{font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--silver);padding:0 18px 8px;margin-top:4px;}
.ac-nav-btn{width:100%;display:flex;align-items:center;gap:10px;padding:9px 18px;background:none;border:none;border-left:3px solid transparent;cursor:pointer;text-align:left;transition:background 0.1s;}
.ac-nav-btn:hover{background:var(--lt-silver);}
.ac-nav-btn.on{border-left-color:var(--blue);background:var(--blue-light);}
.nav-num{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--silver);width:20px;flex-shrink:0;text-align:right;}
.ac-nav-btn.on .nav-num{color:var(--blue);}
.nav-lbl{font-size:12.5px;color:var(--ink-mid);line-height:1.3;flex:1;}
.ac-nav-btn.on .nav-lbl{color:var(--blue);font-weight:700;}
.nav-level{font-family:'Montserrat',sans-serif;font-size:8.5px;font-weight:700;padding:1px 5px;border-radius:3px;flex-shrink:0;letter-spacing:0.03em;}
.lv-ap{background:var(--success-bg);color:var(--success);}
.lv-jn{background:var(--warning-bg);color:var(--warning);}
.lv-en{background:var(--blue-light);color:var(--blue);}
.ac-content{flex:1;min-width:0;padding:32px 40px 80px;}
.ac-progress{display:flex;align-items:center;gap:12px;background:white;border:1px solid var(--border);border-radius:8px;padding:10px 16px;margin-bottom:28px;}
.prog-lbl{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--ink-muted);white-space:nowrap;}
.prog-track{flex:1;height:4px;background:var(--border);border-radius:2px;overflow:hidden;}
.prog-fill{height:100%;background:var(--blue);border-radius:2px;transition:width 0.35s ease;}
.sec-h2{font-family:'Montserrat',sans-serif;font-weight:800;font-size:26px;color:var(--blue-dark);letter-spacing:-0.02em;margin-bottom:4px;}
.sec-meta{display:flex;align-items:center;gap:10px;margin-bottom:14px;}
.sec-badge{font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:700;padding:3px 10px;border-radius:999px;letter-spacing:0.05em;}
.sec-obj{font-size:15px;color:var(--ink-mid);max-width:720px;margin-bottom:28px;line-height:1.7;}
.h3{font-family:'Montserrat',sans-serif;font-weight:700;font-size:13px;letter-spacing:0.07em;text-transform:uppercase;color:var(--ink-mid);margin:30px 0 12px;border-bottom:2px solid var(--blue-light);padding-bottom:6px;}
.h4{font-family:'Montserrat',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:var(--ink-muted);margin:0 0 8px;}
.sp{font-size:14px;color:var(--ink-mid);margin-bottom:14px;line-height:1.75;}
.sp strong{color:var(--ink);}
.ic{font-family:'JetBrains Mono',monospace;font-size:12px;background:var(--blue-light);color:var(--blue-dark);padding:1px 6px;border-radius:3px;border:1px solid var(--blue-mid);}
.tbl-wrap{margin:12px 0 22px;overflow:hidden;border-radius:8px;border:1px solid var(--border);}
.ac-tbl{width:100%;border-collapse:collapse;background:white;font-size:13px;}
.ac-tbl th{background:var(--blue);color:white;font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:9px 14px;text-align:left;}
.ac-tbl td{padding:9px 14px;border-bottom:1px solid var(--border);color:var(--ink-mid);vertical-align:top;line-height:1.55;}
.ac-tbl tr:last-child td{border-bottom:none;}
.ac-tbl tr:nth-child(even) td{background:var(--lt-silver);}
.ac-tbl td:first-child{color:var(--ink);font-weight:600;}
.code-wrap{margin:12px 0 22px;border-radius:8px;overflow:hidden;border:1px solid #30363D;}
.code-hdr{display:flex;align-items:center;justify-content:space-between;background:#2D3748;padding:7px 14px;}
.code-lang{font-family:'JetBrains Mono',monospace;font-size:10px;color:#8B949E;letter-spacing:0.04em;}
.copy-btn{background:none;border:1px solid #4A5568;border-radius:4px;color:#8B949E;font-family:'JetBrains Mono',monospace;font-size:10px;padding:2px 9px;cursor:pointer;transition:all 0.12s;}
.copy-btn:hover{border-color:#79C0FF;color:white;}
.copy-btn.ok{border-color:#68D391;color:#68D391;}
.ac-pre{background:var(--code-bg);color:var(--code-fg);padding:16px 18px;overflow-x:auto;font-family:'JetBrains Mono',monospace;font-size:12.5px;line-height:1.65;white-space:pre;}
.callout{border-left:4px solid var(--blue);background:var(--blue-light);border-radius:0 6px 6px 0;padding:12px 16px;margin:12px 0 22px;font-size:13.5px;color:var(--ink-mid);}
.callout.gold{border-left-color:var(--gold-dark);background:var(--warning-bg);}
.callout.green{border-left-color:var(--success);background:var(--success-bg);}
.callout.amber{border-left-color:var(--warning);background:var(--warning-bg);}
.callout.red{border-left-color:var(--error);background:var(--error-bg);}
.callout.blue{border-left-color:var(--blue);background:var(--blue-light);}
.c-label{font-family:'Montserrat',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;margin-bottom:5px;color:var(--blue);}
.callout.gold .c-label{color:var(--gold-dark);}
.callout.green .c-label{color:var(--success);}
.callout.amber .c-label{color:var(--warning);}
.callout.red .c-label{color:var(--error);}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:12px 0 22px;}
.grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin:12px 0 22px;}
.card{background:white;border:1px solid var(--border);border-radius:8px;padding:16px 18px;}
.diff-row{display:flex;gap:14px;margin:12px 0 22px;}
.diff-col{flex:1;border-radius:8px;overflow:hidden;border:1px solid var(--border);}
.diff-hdr{padding:7px 14px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.04em;}
.diff-bad{background:var(--error-bg);color:var(--error);}
.diff-good{background:var(--success-bg);color:var(--success);}
.diff-body{background:white;padding:14px 16px;font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--ink-mid);white-space:pre-wrap;line-height:1.65;}
.step-list{margin:10px 0 22px;}
.step-item{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid var(--border);}
.step-item:last-child{border-bottom:none;}
.step-num{width:26px;height:26px;border-radius:50%;background:var(--blue);color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.step-title{font-family:'Montserrat',sans-serif;font-weight:700;font-size:13px;color:var(--ink);margin-bottom:2px;}
.step-desc{font-size:13px;color:var(--ink-mid);}
.checklist{margin:8px 0 22px;background:white;border:1px solid var(--border);border-radius:8px;overflow:hidden;}
.chk-item{display:flex;align-items:flex-start;gap:10px;padding:9px 16px;border-bottom:1px solid var(--border);font-size:13.5px;color:var(--ink-mid);}
.chk-item:last-child{border-bottom:none;}
.chk-icon{color:var(--success);font-size:13px;flex-shrink:0;margin-top:2px;}
.pill{display:inline-block;padding:2px 9px;border-radius:999px;font-family:'Montserrat',sans-serif;font-size:10.5px;font-weight:700;margin:2px 3px 2px 0;letter-spacing:0.02em;}
.pill-blue{background:var(--blue-light);color:var(--blue-dark);border:1px solid var(--blue-mid);}
.pill-gold{background:var(--warning-bg);color:var(--warning);border:1px solid #F6D860;}
.mem-card{background:white;border:1px solid var(--border);border-radius:8px;margin-bottom:24px;overflow:hidden;}
.mem-hdr{padding:12px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;}
.mem-stripe{width:4px;height:32px;border-radius:2px;flex-shrink:0;}
.mem-title{font-family:'Montserrat',sans-serif;font-weight:800;font-size:15px;}
.mem-sub{font-size:12px;color:var(--ink-muted);margin-top:1px;}
.mem-body{padding:16px 18px;display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.mem-col-lbl{font-family:'Montserrat',sans-serif;font-size:9.5px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;padding:4px 10px;border-radius:3px;margin-bottom:10px;display:inline-block;}
.mem-yes{background:var(--success-bg);color:var(--success);}
.mem-no{background:var(--error-bg);color:var(--error);}
.mem-examples{font-size:13px;color:var(--ink-mid);line-height:1.7;padding:10px 14px;background:var(--lt-silver);border-radius:6px;}
.mem-ex{margin-bottom:8px;padding-bottom:8px;border-bottom:1px dashed var(--border);}
.mem-ex:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none;}
.mem-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:10px;background:var(--blue-light);color:var(--blue-dark);padding:0px 5px;border-radius:3px;margin-right:4px;}
.footer-nav{display:flex;justify-content:space-between;align-items:center;margin-top:48px;padding-top:24px;border-top:2px solid var(--blue-light);}
.fn-btn{font-family:'Montserrat',sans-serif;font-weight:700;font-size:12px;letter-spacing:0.03em;padding:10px 22px;border-radius:6px;cursor:pointer;transition:background 0.12s,color 0.12s;}
.fn-primary{background:var(--blue);color:white;border:2px solid var(--blue);}
.fn-primary:hover{background:var(--blue-dark);border-color:var(--blue-dark);}
.fn-primary:disabled{background:var(--border);border-color:var(--border);color:var(--silver);cursor:not-allowed;}
.fn-ghost{background:white;color:var(--blue);border:2px solid var(--blue-mid);}
.fn-ghost:hover{border-color:var(--blue);}
.fn-ghost:disabled{color:var(--silver);border-color:var(--border);cursor:not-allowed;}
@media(max-width:900px){.ac-sidebar{display:none;}.ac-content{padding:20px 18px 60px;}.grid2,.grid3,.diff-row,.mem-body{grid-template-columns:1fr;flex-direction:column;}}
`;

const MODULES=[{id:"mindset",num:"01",label:"Orchestration mindset",lv:"ap"},{id:"headless",num:"02",label:"Headless architecture",lv:"ap"},{id:"prompts",num:"03",label:"Prompt engineering",lv:"ap"},{id:"react",num:"04",label:"React artifacts",lv:"jn"},{id:"blockkit",num:"05",label:"Slack and Block Kit",lv:"jn"},{id:"loop",num:"06",label:"The agent loop",lv:"ap"},{id:"memory",num:"07",label:"Context and memory",lv:"jn"},{id:"tools",num:"08",label:"Tool design",lv:"jn"},{id:"mcp",num:"09",label:"MCP protocol",lv:"jn"},{id:"multiagent",num:"10",label:"Multi-agent orchestration",lv:"en"},{id:"production",num:"11",label:"Production checklist",lv:"en"},{id:"acs",num:"12",label:"ACS stack reference",lv:"en"}];
const LV={ap:{label:"Apprentice",bg:"var(--success-bg)",fg:"var(--success)"},jn:{label:"Journeyman",bg:"var(--warning-bg)",fg:"var(--warning)"},en:{label:"Engineer",bg:"var(--blue-light)",fg:"var(--blue)"}};

function IC({children}){return <code className="ic">{children}</code>;}
function Note({type,label,children}){return(<div className={"callout"+(type?" "+type:"")}>{label&&<div className="c-label">{label}</div>}{children}</div>);}
function Code({lang,text}){const[ok,setOk]=useState(false);const copy=()=>{navigator.clipboard.writeText(text);setOk(true);setTimeout(()=>setOk(false),1800);};return(<div className="code-wrap"><div className="code-hdr"><span className="code-lang">{lang}</span><button className={"copy-btn"+(ok?" ok":"")} onClick={copy}>{ok?"copied":"copy"}</button></div><pre className="ac-pre">{text}</pre></div>);}
function Table({heads,rows}){return(<div className="tbl-wrap"><table className="ac-tbl"><thead><tr>{heads.map((h,i)=><th key={i}>{h}</th>)}</tr></thead><tbody>{rows.map((row,ri)=>(<tr key={ri}>{row.map((cell,ci)=><td key={ci}>{cell}</td>)}</tr>))}</tbody></table></div>);}
function StepList({items}){return(<div className="step-list">{items.map((it,i)=>(<div key={i} className="step-item"><div className="step-num">{i+1}</div><div><div className="step-title">{it.title}</div><div className="step-desc">{it.body}</div></div></div>))}</div>);}
function Checks({items}){return(<div className="checklist">{items.map((it,i)=>(<div key={i} className="chk-item"><span className="chk-icon">&#10003;</span><span>{it}</span></div>))}</div>);}
function MemCard({color,title,sub,yes,no}){return(<div className="mem-card"><div className="mem-hdr"><div className="mem-stripe" style={{background:color}}/><div><div className="mem-title" style={{color}}>{title}</div><div className="mem-sub">{sub}</div></div></div><div className="mem-body"><div><span className="mem-col-lbl mem-yes">Belongs here</span><div className="mem-examples">{yes.map((ex,i)=>(<div key={i} className="mem-ex">{ex.tag&&<span className="mem-tag">{ex.tag}</span>}{ex.text}</div>))}</div></div><div><span className="mem-col-lbl mem-no">Does NOT belong here</span><div className="mem-examples">{no.map((ex,i)=>(<div key={i} className="mem-ex"><strong style={{color:"var(--error)"}}>Not here: </strong>{ex}</div>))}</div></div></div></div>);}
function ProConItem({color,icon,title,body}){return(<div style={{display:"flex",gap:10,marginBottom:10}}><div style={{color:color,fontWeight:700,fontSize:14,flexShrink:0,marginTop:1,width:14,textAlign:"center"}}>{icon}</div><div><div style={{fontFamily:"Montserrat,sans-serif",fontWeight:700,fontSize:12,color:"var(--ink)",marginBottom:2}}>{title}</div><div style={{fontSize:12.5,color:"var(--ink-mid)",lineHeight:1.55}}>{body}</div></div></div>);}

const C={
PROMPT_TEMPLATE:`## Role\nYou are the [NAME] agent.\nYou [JOB IN ONE SENTENCE].\n\n## Behavior rules\n- [What you always do]\n- [What you never do]\n- [How you handle ambiguity]\n\n## Tool usage\n- Always call [TOOL] before [ACTION] to avoid stale context.\n- Use [TOOL_A] for X and [TOOL_B] for Y -- never swap them.\n\n## Output format\nRespond with [FORMAT]. If the result is empty, say so explicitly -- never fabricate.\n\n## Constraints\n- Max [N] tool calls per task.\n- If you hit an error twice on the same tool, stop and surface it.\n\n## Memory\nBefore responding, check [MEMORY_TOOL] for [ENTITY] context.`,
CHAIN:`You are the triage orchestrator.\n\nYour job: receive an inbound request, classify it, then\ndelegate to the correct specialist by calling spawn_worker.\n\nWorker types:\n- "briefing"   -- daily briefing, status summaries\n- "tickets"    -- project board queries, sprint updates\n- "client"     -- anything needing client context from DB\n- "financial"  -- invoices, AR, billing summaries\n\nRules:\n- Call get_daily_briefing first on session start.\n- Never do the work yourself -- always delegate.\n- If the request is unclear, ask before acting.`,
REACT_BASIC:`import { useState } from "react";\n\nexport default function AskClaude() {\n  const [input, setInput] = useState("");\n  const [result, setResult] = useState("");\n  const [loading, setLoading] = useState(false);\n\n  const ask = async () => {\n    setLoading(true);\n    const res = await fetch("https://api.anthropic.com/v1/messages", {\n      method: "POST",\n      headers: { "Content-Type": "application/json" },\n      body: JSON.stringify({\n        model: "claude-sonnet-4-20250514",\n        max_tokens: 1000,\n        system: "You are a concise assistant. Reply in plain text.",\n        messages: [{ role: "user", content: input }],\n      }),\n    });\n    const data = await res.json();\n    setResult(data.content[0].text);\n    setLoading(false);\n  };\n\n  return (\n    <div style={{ padding: 24 }}>\n      <textarea value={input} onChange={e => setInput(e.target.value)} rows={4}\n        style={{ width: "100%", marginBottom: 12 }} />\n      <button onClick={ask} disabled={loading}>\n        {loading ? "Thinking..." : "Ask Claude"}\n      </button>\n      {result && <pre style={{ marginTop: 16 }}>{result}</pre>}\n    </div>\n  );\n}`,
BLOCKKIT:`{\n  "channel": "C1234567890",\n  "blocks": [\n    { "type": "header", "text": { "type": "plain_text", "text": "Daily Briefing -- Apr 25" } },\n    { "type": "section", "text": { "type": "mrkdwn",\n      "text": "*3 items* need attention today.\\n> Contract signature pending 5 days\\n> Invoice overdue 100 days\\n> Client sign-off required on deliverable" } },\n    { "type": "divider" },\n    { "type": "actions", "elements": [\n      { "type": "button", "style": "primary",\n        "text": { "type": "plain_text", "text": "Open Board" },\n        "url": "https://your-project-board.com" },\n      { "type": "button",\n        "text": { "type": "plain_text", "text": "View AR" },\n        "action_id": "view_ar" }\n    ]},\n    { "type": "context", "elements": [\n      { "type": "mrkdwn", "text": "Generated by your gateway  8:00 AM CT" }\n    ]}\n  ]\n}`,
BLOCKKIT_SYS:`You are a Slack Block Kit message generator.\n\nRules:\n- Respond ONLY with a valid JSON object: { "blocks": [...] }\n- Never include any text outside the JSON object.\n- Use "mrkdwn" for body text. Use "plain_text" for headers and buttons.\n- Bold: *asterisks*. Italic: _underscores_. Maximum 50 blocks (Slack limit).\n- Never use "type": "image" without a verified HTTPS image URL.`,
LOOP:`async function runAgent(userMessage, systemPrompt, tools) {\n  const history = [{ role: "user", content: userMessage }];\n  let turns = 0;\n  const MAX_TURNS = 25;\n\n  while (turns < MAX_TURNS) {\n    const response = await anthropic.messages.create({\n      model: "claude-sonnet-4-6", max_tokens: 4096,\n      system: systemPrompt, tools, messages: history,\n    });\n    history.push({ role: "assistant", content: response.content });\n    if (response.stop_reason === "end_turn")\n      return response.content.find(b => b.type === "text")?.text;\n    if (response.stop_reason === "tool_use") {\n      const results = await Promise.all(\n        response.content.filter(b => b.type === "tool_use")\n          .map(async b => ({ type: "tool_result", tool_use_id: b.id,\n            content: await executeTool(b.name, b.input) }))\n      );\n      history.push({ role: "user", content: results });\n    }\n    turns++;\n  }\n  throw new Error("Max turns exceeded");\n}`,
TOOL_DEF:`{\n  "name": "client_get_summary",\n  "description": "Return the current brief for a client -- status, open commitments,\n    recent notes. Call BEFORE reading any client document or drafting any\n    client communication. Do NOT call for prospects -- use prospect_search instead.",\n  "input_schema": {\n    "type": "object",\n    "properties": {\n      "client_id": { "type": "string",\n        "description": "UUID from the clients table -- not the display name" },\n      "include_notes": { "type": "boolean", "default": true }\n    },\n    "required": ["client_id"]\n  }\n}`,
BRAIN_EPISODIC:`// Neon Postgres: INSERT into your notes table after a client call\n// pool is a standard node-postgres (pg) Pool connected to your Neon DB\n\nawait pool.query(\n  \`INSERT INTO notes\n     (entity_id, entity_type, note_type, content, tags, created_at)\n   VALUES ($1, $2, $3, $4, $5, NOW())\`,\n  [\n    "client-uuid-here",\n    "client",\n    "call",          // call | decision | commitment | risk\n    "Client flagged dashboard load time (>8s). " +\n    "Eng to pull server logs. Fix targeted for this sprint. " +\n    "Client approval required before production deploy.",\n    ["dashboard", "performance", "approval-required"],\n  ]\n);\n\n// What is Neon Postgres?\n// A serverless PostgreSQL database hosted in the cloud.\n// Connect with any standard pg client -- no special SDK needed.\n// Scales to zero when idle, so you only pay for active use.`,
BRAIN_SEMANTIC:`// Neon Postgres: UPSERT a clients row when a fact changes\n\nawait pool.query(\n  \`INSERT INTO clients\n     (id, crm_id, open_invoices, primary_email, updated_at)\n   VALUES ($1, $2, $3, $4, NOW())\n   ON CONFLICT (id) DO UPDATE SET\n     crm_id        = EXCLUDED.crm_id,\n     open_invoices = EXCLUDED.open_invoices,\n     primary_email = EXCLUDED.primary_email,\n     updated_at    = NOW()\`,\n  [clientId, "CRM-ACCOUNT-ID", 2, "contact@clientfirm.com"]\n);\n\n// Tip: never store secrets (API keys, tokens, passwords) in this table.\n// Use Railway's environment variable vault, or a service like Doppler.`,
SKILL_FILE:`# skills/status-report.md\n---\nname: status-report\ntrigger: "status report", "weekly update", "client report for [name]"\n---\n\n## What this skill does\nGenerates a formatted weekly status report for a client.\n\n## Step sequence\n1. client_get_summary(client_id)              <- load client context first\n2. tickets_search(project, since="-7d")       <- last 7 days of activity\n3. meeting_notes_search(client_name)          <- this week's meeting notes\n4. email_list(filter="from:client_domain")    <- inbound emails this week\n5. Compile into StatusReport_template.docx\n\n## Rules\n- Never fabricate ticket IDs or meeting note snippets.\n- If tickets_search returns empty, write "No activity this period".\n- Set health: Green / Amber / Red based on open blocker count.\n\n## What are skill files?\nSkill files are procedural memory stored as markdown in your repo.\nThe agent reads them when executing a repeatable task. Store in a\n/skills folder and load via MCP resources or your system prompt.`,
WORKING_PROMOTE:`// When a multi-step task does not finish in one session,\n// write its state to the database BEFORE the session ends.\n// This converts fragile working memory into durable episodic memory.\n\nif (taskStatus === "in_progress") {\n  await pool.query(\n    \`INSERT INTO commitments\n       (entity_id, status, summary, next_action, created_at)\n     VALUES ($1, $2, $3, $4, NOW())\`,\n    [\n      entityId,\n      "in_progress",\n      "Invoice draft in progress. Line items: [$4,200 services | $800 admin]. " +\n      "Awaiting client confirmation before sending.",\n      "Follow up by EOD Friday",\n    ]\n  );\n}\n\n// Next session: SELECT * FROM commitments\n//   WHERE entity_id = $1 AND status = 'in_progress'\n// The agent finds the draft without the user re-explaining anything.`,
MCP_ARCH:`User surfaces: Slack bot | Web app | Claude Project | React artifact\n         |\n         v\n  +---------------------------------------+\n  |       api-gateway  (Railway)          |\n  |  HTTP+SSE  Auth  RBAC  Secrets  Audit |\n  +------------------+--------------------+\n                     | MCP tool calls\n  +------+------+-------+------+------+\n  |      |      |       |      |      |\n  db    crm  tickets  email  files  ...\n  |\n  v\n Neon Postgres\n clients | notes | tasks | audit | commitments`,
HEADLESS_ARCH:`                  The headless AI stack\n\n  +-----------+  +-----------+  +-----------+  +-----------+\n  | Slack bot |  |  Claude   |  |  React    |  |  Web app  |\n  |           |  |  Project  |  | Artifact  |  |  (custom) |\n  +-----------+  +-----------+  +-----------+  +-----------+\n        |              |              |              |\n        +--------------+--------------+--------------+\n                               |\n                               v\n               +-------------------------------------+\n               |       INTELLIGENCE LAYER            |\n               |   Claude API + System Prompts       |\n               |   MCP tool calls + Agent loop       |\n               +-------------------------------------+\n                               |\n                               v\n               +-------------------------------------+\n               |  api-gateway  (hosted on Railway)   |\n               |   Auth  RBAC  Secrets  Audit log    |\n               +--+-------+-------+-------+----------+\n                  |       |       |       |\n                 db     crm   tickets   email ...\n                  |\n               Neon Postgres`,
MONOLITH:`  MONOLITHIC APP                  HEADLESS APP\n  +-----------------------+        +------------------+\n  |  UI (Slack OR React)  |        |   Slack surface  |\n  |  + Business logic     |        +------------------+\n  |  + Tool calls         |   vs   |   React surface  |\n  |  + Data layer         |        +------------------+\n  +-----------------------+        |   Claude Project  |\n                                   +--------+---------+\n  Change the UI?                            |\n  Rewrite the whole app.          +--------+---------+\n                                  | Intelligence +    |\n                                  | tools + memory    |\n                                  +--------+---------+\n                                           |\n                                  Neon / CRM / Tickets\n\n  Change the UI? Swap one head. Nothing else changes.`,
ORCHESTRATOR:`async function spawnWorker({ type, task }) {\n  const PROMPTS = {\n    briefing:  "You are the briefing specialist...",\n    tickets:   "You are the project board specialist...",\n    client:    "You are the client context specialist...",\n    financial: "You are the financial specialist...",\n  };\n  // Worker runs its own full agent loop in isolation\n  const result = await runAgent(task, PROMPTS[type], WORKER_TOOLS[type]);\n  // Return a SUMMARY -- not the full transcript\n  return { type, summary: result };\n}`,
PARALLEL:`// Run all workers simultaneously -- not sequentially\nconst results = await Promise.all([\n  spawnWorker({ type: "briefing",  task: "Get today stale tasks" }),\n  spawnWorker({ type: "financial", task: "Get open invoices over 30 days" }),\n  spawnWorker({ type: "client",    task: "Summarize current engagement" }),\n]);\nconst output = results.map(r => r.summary).join("\\n\\n");`,
};

function SMindset(){return(<><p className="sec-obj">Understand the fundamental shift from writing code that does things to writing prompts that instruct an AI that does things.</p><div className="h3">The mental model shift</div><p className="sp">A traditional developer writes deterministic logic: <strong>if X, do Y</strong>. An orchestration engineer writes prompts that describe the job, and the model picks the path. Your job moves from writing steps to defining the arena.</p><div className="grid3"><div className="card"><div className="h4">Traditional dev</div><p className="sp">Writes every branch. Code fails silently. Debugging is deterministic.</p></div><div className="card" style={{borderTop:"3px solid var(--blue)"}}><div className="h4">Prompt engineer</div><p className="sp">Writes intent and constraints. Model picks the path. Debugging is observational.</p></div><div className="card"><div className="h4">Orchestration engineer</div><p className="sp">Designs the tool surface, memory schema, and agent loop. The model does the rest.</p></div></div><div className="h3">Three things you control</div><Table heads={["You control","The model controls","Your lever"]} rows={[["System prompt","Which tools to call and in what order","Write clear intent and explicit constraints"],["Tool surface","How to interpret tool results","Expose only what this agent legitimately needs"],["Memory schema","What facts to surface in a response","Store the right things in your database"],["Loop limits","When to stop","Max turns, token budget, wall-clock timeout"]]}/><Note type="gold" label="Core principle">The system prompt is the agent brain. If the agent does the wrong thing, the fix is almost always in the system prompt -- not in the code.</Note><div className="h3">Four questions before you build anything</div><StepList items={[{title:"What is the job?",body:"Write it in one sentence. If you cannot, split it into two agents."},{title:"What does the agent need?",body:"List the tools and context it requires. Nothing extra."},{title:"What can go wrong?",body:"Name the two most likely failure modes. Build guards for both."},{title:"How will you know it worked?",body:"Define success before you write the first prompt."}]}/></>);}

function SHeadless(){return(<><p className="sec-obj">Understand the architectural pattern that makes everything else in this course possible -- separating the intelligence layer from the UI layer.</p><div className="h3">What headless means</div><p className="sp">A traditional app bundles UI and logic together. Change the UI and you change everything. A headless app separates the <strong>intelligence layer</strong> (tools, memory, reasoning) from the <strong>surface layer</strong> (how it looks and where it lives). The agent has no idea if it is talking through Slack, a browser, or a CLI.</p><div className="h3">Monolithic vs headless</div><Code lang="architecture comparison" text={C.MONOLITH}/><div className="h3">The three layers</div><Table heads={["Layer","What it contains","Example implementation"]} rows={[["Surface layer (the heads)","Everything the user touches -- UI, input, formatted output","Slack bot, Claude Projects, React artifacts, web app, CLI"],["Intelligence layer","Claude API, system prompts, tool selection, the agent loop","Claude API + prompts repo + MCP tool calls via your gateway"],["Data layer","Persistent storage -- facts, events, and processes","Neon Postgres, CRM, ticketing system, email, cloud storage"]]}/><Note type="gold" label="The key insight">When you add a new tool to your gateway, every surface gets it instantly. Build once in the intelligence layer -- deploy everywhere.</Note><div className="h3">The full headless architecture</div><Code lang="architecture" text={C.HEADLESS_ARCH}/><div className="h3">Common surfaces -- what each head looks like</div><Table heads={["Surface","Channel","Best for","Output format"]} rows={[[<IC>Slack bot</IC>,"Team chat (async)","Briefings, alerts, task delegation, quick queries","Slack Block Kit JSON"],[<IC>Claude Projects</IC>,"claude.ai (browser)","Deep research, document creation, complex analysis","Markdown + file attachments"],[<IC>React artifacts</IC>,"claude.ai (embedded)","Dashboards, forms, kanban boards, training tools","JSX + Tailwind + Anthropic API"],[<IC>Web app (custom)</IC>,"Browser (your domain)","Team dashboards, client portals, branded tools","React + your design system"],[<IC>Claude Code</IC>,"CLI (terminal)","Code writing, repo work, agentic coding sessions","Terminal output + file edits"]]}/><div className="h3">Pros and cons of going headless</div><div className="grid2"><div className="card" style={{borderTop:"3px solid var(--success)"}}><div className="h4" style={{color:"var(--success)",marginBottom:14}}>Advantages</div><ProConItem color="var(--success)" icon="+" title="One backend, infinite surfaces" body="Add a new UI without touching agent logic, tool definitions, or your gateway."/><ProConItem color="var(--success)" icon="+" title="Single auth and audit layer" body="Auth, secrets, and audit logging live in the gateway -- not duplicated per surface."/><ProConItem color="var(--success)" icon="+" title="Upgrade once, benefit everywhere" body="A new tool or improved system prompt instantly improves all surfaces simultaneously."/><ProConItem color="var(--success)" icon="+" title="Isolated testing" body="Eval the intelligence layer independently of any UI. Unit-test tools, not screens."/><ProConItem color="var(--success)" icon="+" title="Independent scaling" body="Scale the gateway and database based on usage -- not locked to any one surface."/></div><div className="card" style={{borderTop:"3px solid var(--error)"}}><div className="h4" style={{color:"var(--error)",marginBottom:14}}>Trade-offs</div><ProConItem color="var(--error)" icon="-" title="More initial setup" body="Multiple repos to wire together before anything works end-to-end."/><ProConItem color="var(--error)" icon="-" title="Debugging spans systems" body="A bug could be in the surface, the prompt, the gateway, or the database. Structured logging is non-negotiable."/><ProConItem color="var(--error)" icon="-" title="Cross-surface session state" body="A task started in Claude Projects and continued in Slack loses working memory. Promote state to the database before closing."/><ProConItem color="var(--error)" icon="-" title="Output format fragmentation" body="Block Kit, markdown, and JSX are all different. Each surface needs its own output handler."/><ProConItem color="var(--error)" icon="-" title="Latency adds up" body="Surface to Claude API to gateway to tool is 3-5 network hops. Cache what you can."/></div></div><div className="h3">When headless is the right call</div><Table heads={["Situation","Headless?","Reason"]} rows={[["Same capability needed in Slack AND a web app","Yes","One backend. Two heads. Zero duplication."],["One-off internal tool for one team","Optional","Simpler to start monolithic; migrate if surfaces multiply."],["Tools need consistent auth across surfaces","Yes","Gateway pattern is the only clean solution at scale."],["Single Slack app and nothing else","Maybe","Full headless adds overhead. Worth it only if expansion is planned."]]}/><Note type="amber" label="The key commitment">Once you go headless, every surface shares the same database, gateway tools, and system prompts. Every improvement you make to the intelligence layer compounds across all surfaces.</Note></>);}

function SPrompts(){return(<><p className="sec-obj">Learn the anatomy of an orchestration system prompt and the patterns that turn a chatbot into a reliable autonomous agent.</p><div className="h3">System prompt anatomy</div><p className="sp">Every agent system prompt needs the same six sections. Miss any one and behavior degrades.</p><Code lang="system prompt template" text={C.PROMPT_TEMPLATE}/><div className="h3">Before and after: the trigger test</div><p className="sp">Tools are selected by their <strong>description</strong>. If it does not say when to call the tool, the model guesses wrong. This is the single highest-leverage prompt fix.</p><div className="diff-row"><div className="diff-col"><div className="diff-hdr diff-bad">BAD -- describes what, not when</div><div className="diff-body">{"\"description\": \"Gets client data from the database.\""}</div></div><div className="diff-col"><div className="diff-hdr diff-good">GOOD -- trigger condition is explicit</div><div className="diff-body">{"\"description\": \"Return the current brief for a client. Call BEFORE reading any client document. Do NOT call for prospect accounts -- use prospect_search instead.\""}</div></div></div><div className="h3">The five prompt patterns every engineer needs</div><Table heads={["Pattern","When to use","Key line to include"]} rows={[["Preflight check","Agent needs context before acting","Before taking any action, call X to load current state."],["Negative space","Preventing wrong tool selection","Never call tool_Y for this. Use tool_Z instead."],["Failure surface","Making errors visible","If a tool returns an error, include it verbatim in your response."],["Format lock","Downstream parsing","Respond only with JSON matching this exact schema."],["Confidence gate","Avoiding hallucinated facts","If you are not certain, say so explicitly -- never guess."]]}/><div className="h3">Chain prompting: orchestrator to worker</div><Code lang="orchestrator system prompt" text={C.CHAIN}/><Note type="amber" label="Common mistake">Long system prompts with no structure get ignored at the bottom. Keep sections short. Put the most important rules first. Use headers so the model can scan.</Note></>);}

function SReact(){return(<><p className="sec-obj">Build AI-powered React artifacts inside Claude using the Anthropic API -- Claude calling Claude, rendering live results as interactive UI with no backend required.</p><div className="h3">What Claude-in-Claude means</div><p className="sp">Claude can call the Anthropic API from inside a React artifact. You can build apps where the UI <strong>is</strong> the agent: the user interacts with a component, the component calls Claude, and the result renders inline.</p><div className="grid2"><div className="card" style={{borderTop:"3px solid var(--success)"}}><div className="h4">Build this with artifacts</div><p className="sp">Kanban boards, briefing dashboards, form analyzers, doc generators, prompt labs, training tools like this one.</p></div><div className="card" style={{borderTop:"3px solid var(--error)"}}><div className="h4">Never use browser storage</div><p className="sp"><IC>localStorage</IC> and <IC>sessionStorage</IC> are blocked in Claude artifacts. All state lives in React <IC>useState</IC>. This is non-negotiable.</p></div></div><div className="h3">Minimal Claude-in-Claude pattern</div><Code lang="jsx" text={C.REACT_BASIC}/><Note type="green" label="Available artifact libraries"><span className="pill pill-blue">recharts</span><span className="pill pill-blue">lucide-react</span><span className="pill pill-blue">lodash</span><span className="pill pill-blue">d3</span><span className="pill pill-blue">shadcn/ui</span><span className="pill pill-blue">three.js</span>{"  Use Tailwind utility classes for styling. No external CSS files."}</Note></>);}

function SBlockKit(){return(<><p className="sec-obj">Build interactive Slack messages using Block Kit -- the JSON spec that turns flat text into buttons, dropdowns, modals, and rich cards your team can act on.</p><div className="h3">What Block Kit is</div><p className="sp">Block Kit is Slack's UI framework. Instead of sending a plain string message, you send a JSON <IC>blocks</IC> array. Each block is a component: section, header, divider, actions, input, context. Claude can generate Block Kit JSON directly from a prompt.</p><div className="h3">The six blocks you will use 90% of the time</div><Table heads={["Block type","Purpose","Key fields"]} rows={[[<IC>header</IC>,"Bold title at top of message","text.text (plain_text only)"],[<IC>section</IC>,"Body text with optional accessory","text, optional accessory (button, image, select)"],[<IC>divider</IC>,"Horizontal rule","No fields required"],[<IC>actions</IC>,"Row of buttons or selects","elements array of button objects"],[<IC>context</IC>,"Small muted footer text","elements array of text or image"],[<IC>input</IC>,"Form fields (modals only)","element, label, block_id"]]}/><div className="h3">A complete Block Kit message</div><Code lang="json -- Slack message payload" text={C.BLOCKKIT}/><div className="h3">Prompting Claude to generate Block Kit</div><Code lang="system prompt -- Block Kit generator" text={C.BLOCKKIT_SYS}/><Note type="amber" label="Slack gotcha">Messages over ~3000 characters fail with <IC>invalid_blocks</IC>. Split long messages into multiple calls. Avoid ampersands in mrkdwn text -- they break the block parser. Test all JSON at <strong>app.slack.com/block-kit-builder</strong> before shipping.</Note></>);}

function SLoop(){return(<><p className="sec-obj">Understand the agent loop at the code level -- what the model returns, how to handle each stop condition, and how to prevent runaway agents.</p><div className="h3">The loop in plain English</div><StepList items={[{title:"Send a message to the model",body:"Include system prompt + conversation history + tool definitions."},{title:"Model responds",body:"Either with a final answer (end_turn) or a request to call a tool (tool_use)."},{title:"If tool_use: execute it",body:"Call the function, get the result, append it to history as a user message."},{title:"Loop back to step 1",body:"The model sees the tool result and decides what to do next."},{title:"If end_turn: you are done",body:"Return the final assistant message text to the user."}]}/><div className="h3">The canonical loop</div><Code lang="javascript" text={C.LOOP}/><div className="h3">Stop conditions</div><Table heads={["stop_reason","Meaning","What to do"]} rows={[[<IC>end_turn</IC>,"Model finished naturally","Return the text block to the user"],[<IC>tool_use</IC>,"Model wants a tool result","Execute tools, append results, loop"],[<IC>max_tokens</IC>,"Output cap hit mid-response","Continue with empty user message or abort"],[<IC>pause_turn</IC>,"Long-running tool yielded","Resume after dependency completes"],[<IC>refusal</IC>,"Model declined the request","Surface to caller -- never retry blindly"]]}/><Note type="red" label="Required guards -- all three, always">Max iterations (25-50). Token budget per run. Wall-clock timeout (5 min). Without all three, a broken tool can loop infinitely and drain hundreds of dollars overnight. Enforce in code, not only in the system prompt.</Note></>);}

function SMemory(){
  return(<>
    <p className="sec-obj">Learn the four memory types every agent uses, understand where each one lives in a Neon Postgres database, and see concrete examples so you store the right thing in the right place.</p>
    <Note type="blue" label="What is Neon Postgres?">
      Neon is a serverless PostgreSQL database. You get a standard Postgres database hosted in the cloud with no server to manage. It scales to zero when idle -- no cost when your agent is not running. Connect with any standard <IC>pg</IC> (node-postgres) client library. Think of it as the persistent memory layer for your agent -- anything that needs to survive a session ending goes here.
    </Note>
    <Note type="gold" label="The core rule">
      Memory type is determined by <strong>lifespan and query pattern</strong> -- not by how important the data is. Ask: how long does this fact live, and how will the agent retrieve it?
    </Note>
    <div className="h3">The four memory types at a glance</div>
    <Table heads={["Type","Lifespan","Query pattern","Where it lives"]} rows={[
      ["Episodic","Indefinite -- tied to a real event","What happened with client X on date Y?","notes table in Neon Postgres"],
      ["Semantic","Until explicitly updated","What is the current value of fact Z?","clients, contacts tables in Neon Postgres"],
      ["Procedural","Stable -- changes with process updates","How do I execute task W?","Skill files (.md) in your repo"],
      ["Working","This session or task only","What have I done so far this turn?","Conversation history (in-memory, automatic)"],
    ]}/>
    <div className="h3">Episodic memory -- what happened</div>
    <p className="sp">Time-stamped records of real events. Store these so the agent can reconstruct history without asking the user to repeat themselves.</p>
    <MemCard color="var(--blue)" title="Episodic" sub="Neon Postgres -- notes table  |  note_type: call | decision | commitment | risk"
      yes={[
        {tag:"call",text:"Client call 4/22 -- David flagged slow dashboard load time (>8s), wants fix by Friday."},
        {tag:"commitment",text:"Deal closed 4/18 -- contract signature still pending 5 days later. Escalate."},
        {tag:"decision",text:"Project kickoff 4/10 -- client confirmed sign-off deadline is EOD Friday."},
        {tag:"commitment",text:"Controller flagged $14K reconciliation gap on 4/15. Assigned to themselves."},
      ]}
      no={[
        "A client's CRM Account ID -- that is a durable fact, not an event. Store in semantic.",
        "How to run the weekly status report -- that is a repeatable process. Store in procedural.",
        "Currently drafting an invoice -- that is in-progress state. Store in working.",
      ]}
    />
    <Code lang="neon postgres -- insert an episodic note" text={C.BRAIN_EPISODIC}/>
    <div className="h3">Semantic memory -- what is true</div>
    <p className="sp">Durable facts about entities: clients, contacts, accounts, systems. These do not expire on a date -- they expire when someone explicitly updates them. The agent reads these before acting on anything client-facing.</p>
    <MemCard color="var(--success)" title="Semantic" sub="Neon Postgres -- clients, contacts tables  |  updated via UPSERT"
      yes={[
        {tag:"account",text:"Client firm -- CRM Account ID and billing tier. Two overdue invoices."},
        {tag:"contacts",text:"Client contacts: Jane Smith (partner, signer), Tom Lee (associate, day-to-day)."},
        {tag:"system",text:"Your gateway URL: https://your-gateway.railway.app. Auth: Bearer token from Railway secrets."},
        {tag:"partner",text:"Operations lead -- billing rate, role, start date, revenue targets."},
      ]}
      no={[
        "Client called on 4/22 -- that is an event. Store in episodic.",
        "How to create a client invoice -- that is a process. Store in procedural.",
        "Anything that changes multiple times per day -- use a live tool call instead.",
      ]}
    />
    <Code lang="neon postgres -- upsert a semantic fact" text={C.BRAIN_SEMANTIC}/>
    <div className="h3">Procedural memory -- how to do things</div>
    <p className="sp">Repeatable processes: playbooks, deployment steps, onboarding checklists, skill files. The agent reads these to execute multi-step tasks reliably without inventing steps fresh each time.</p>
    <MemCard color="var(--warning)" title="Procedural" sub="Skill files (.md) in your /skills folder -- loaded via MCP resources or system prompt"
      yes={[
        {tag:"playbook",text:"Weekly status report: 1) Query tickets 7 days. 2) Pull meeting notes. 3) Format per template. 4) Email client."},
        {tag:"playbook",text:"New client onboarding: create DB record, create project board, create CRM account, send welcome email."},
        {tag:"playbook",text:"Deploy checklist: validate, run all tests, deploy staging, zero errors, deploy prod."},
        {tag:"playbook",text:"Daily briefing: query open tasks, surface overdue items, format as Slack Block Kit message."},
      ]}
      no={[
        "Client called on 4/22 -- that is an event. Store in episodic.",
        "Client CRM Account ID -- that is a fact. Store in semantic.",
        "One-off instructions that apply to a single task and will never repeat.",
      ]}
    />
    <Code lang="skill file pattern -- procedural memory as markdown" text={C.SKILL_FILE}/>
    <div className="h3">Working memory -- this task, this session</div>
    <p className="sp">The scratchpad that lives only as long as the current agent run. It is the conversation history itself. When the session ends, it is gone. <strong>Design agents to not need it to persist.</strong> When a task spans sessions, promote its state to Neon Postgres before closing.</p>
    <MemCard color="var(--silver)" title="Working" sub="Conversation history (automatic -- no database write needed)"
      yes={[
        {tag:"in-progress",text:"Currently drafting invoice -- line items not yet confirmed by client."},
        {tag:"mid-task",text:"Pulled 3 tickets from the board, still fetching meeting notes before responding."},
        {tag:"in-progress",text:"On step 2 of 5 in the deploy checklist."},
      ]}
      no={[
        "Anything that must survive a session ending -- write to Neon Postgres first.",
        "Client facts needed in future sessions -- store in the clients table.",
        "Commitments made in this session -- INSERT to the commitments table before closing.",
      ]}
    />
    <Code lang="neon postgres -- promote working state to episodic before session ends" text={C.WORKING_PROMOTE}/>
    <div className="h3">Quick-reference: where does this go?</div>
    <Table heads={["If you are storing...","Memory type","Where in Neon Postgres"]} rows={[
      ["A meeting outcome, call note, or commitment","Episodic","notes table with entity_id and note_type"],
      ["A client account ID, billing rate, or contact","Semantic","clients or contacts table via UPSERT"],
      ["A process that repeats across multiple engagements","Procedural","Skill file (.md) in your /skills folder"],
      ["What the agent has done so far this turn","Working","Conversation history (automatic -- do nothing)"],
      ["An unfinished task that must survive session end","Episodic","commitments table with status = in_progress"],
      ["A secret, API key, or token","Semantic","Encrypted secrets table or Railway env vars -- never plaintext"],
    ]}/>
    <Note type="amber" label="The most common mistake">
      Inserting rows with no <IC>entity_id</IC> and no <IC>note_type</IC>. Without those two fields, your agent cannot query its own memory. Every row needs at least an entity reference and a type. Add a <IC>tags</IC> array column for keyword search. No structure, no retrieval.
    </Note>
  </>);
}

function STools(){return(<><p className="sec-obj">Learn to design tools the model will use correctly -- bad tool schemas produce bad agent behavior that no system prompt can fix.</p><div className="h3">Anatomy of a tool definition</div><Code lang="json" text={C.TOOL_DEF}/><div className="h3">The six tool design rules</div><Checks items={["Name is a verb-object phrase (client_get_summary, not just client)","Description says WHEN to call it -- the trigger condition, not just what it returns","Required fields are minimal -- every required field is a potential failure point","Return structured JSON, not prose -- models reason over structure","Errors are informative strings -- the model uses them to self-correct","Idempotent where possible -- retries will happen, make them safe"]}/><div className="h3">Granularity sweet spot</div><div className="grid3"><div className="card" style={{borderTop:"3px solid var(--error)"}}><div className="h4" style={{color:"var(--error)"}}>Too coarse</div><p className="sp">One tool with a freeform prompt input. Model loses control, you lose observability, debugging is nearly impossible.</p></div><div className="card" style={{borderTop:"3px solid var(--blue)"}}><div className="h4" style={{color:"var(--blue)"}}>Sweet spot</div><p className="sp">8-25 tools, each doing one bounded thing. Group by domain so the model can scan: <IC>db.*</IC>, <IC>crm.*</IC>, <IC>tickets.*</IC></p></div><div className="card" style={{borderTop:"3px solid var(--error)"}}><div className="h4" style={{color:"var(--error)"}}>Too fine</div><p className="sp">50+ tools, one per database field. Token-bloated list -- model gets lost choosing between nearly identical options.</p></div></div><Note type="amber" label="Secrets rule">Never expose a raw SQL tool that can write to your secrets or credentials table. Writes to sensitive tables must go through a dedicated function that validates the caller. The model will always pick the cheapest path -- make the safe path the cheap one.</Note></>);}

function SMCP(){
  return(<>
    <p className="sec-obj">Understand how MCP connects Claude to your tools -- and how hosting your gateway on Railway gives every surface a single shared auth, secrets, and audit layer without rebuilding it for each one.</p>
    <div className="h3">MCP in one sentence</div>
    <p className="sp"><strong>Define a tool once on an MCP server. Every MCP client -- Claude Desktop, a Slack bot, React artifacts, a web app -- can call it without re-implementing auth or connection logic.</strong></p>
    <div className="h3">What is Railway?</div>
    <p className="sp">Railway is a cloud hosting platform for Node.js, Python, and other servers. You connect your GitHub repo, and Railway auto-deploys every time you push to <IC>main</IC>. Your MCP gateway server runs on Railway -- it is the single HTTPS URL that all your Claude surfaces point to. Think of it as the managed hosting layer between Claude and your tools.</p>
    <Note type="blue" label="Why Railway for a gateway?">
      Railway gives you a persistent HTTPS URL, environment variable management (secrets never go in code), automatic redeploys on push, and a built-in log viewer. You can have a working gateway live in under 10 minutes from a GitHub repo.
    </Note>
    <div className="h3">Three MCP primitives</div>
    <Table heads={["Primitive","Purpose","Example"]} rows={[
      ["Tools","Functions the model invokes",<><IC>get_daily_briefing</IC>, <IC>create_ticket</IC>, <IC>send_email</IC></>],
      ["Resources","Read-only data the model fetches by URI","Schema docs, reference tables, skill files"],
      ["Prompts","Reusable prompt templates","Slash commands, canned instructions, skill triggers"],
    ]}/>
    <div className="h3">Transport options</div>
    <Table heads={["Transport","Use when","Typical setup"]} rows={[
      [<IC>stdio</IC>,"Local subprocess, single user, development","Claude Desktop pointing to a local server process"],
      [<IC>HTTP + SSE</IC>,"Remote server, multi-user, production","Your gateway running on Railway -- the standard production pattern"],
      [<IC>WebSocket</IC>,"Bidirectional streaming, specialized","Less common -- only needed for real-time push from server to client"],
    ]}/>
    <div className="h3">The gateway pattern</div>
    <p className="sp">Instead of connecting each Claude surface directly to each tool, you run one MCP gateway server that fronts all your integrations. Every surface talks to the gateway -- the gateway handles auth, rate limits, and audit logging to your Neon database.</p>
    <Code lang="architecture" text={C.MCP_ARCH}/>
    <div className="h3">What your gateway actually does</div>
    <Table heads={["Responsibility","Why it lives in the gateway"]} rows={[
      ["Authentication","Validates the Bearer token on every request so tools cannot be called anonymously"],
      ["Authorization (RBAC)","Checks which tools the caller is allowed to use -- read-only users should not be able to delete records"],
      ["Secrets management","Stores API keys and tokens as Railway environment variables -- never in source code"],
      ["Audit logging","Writes every tool call (who, what, when, result) to a Neon Postgres table for debugging and compliance"],
      ["Tool aggregation","Exposes tools from many services (CRM, ticketing, email, database) as a single unified MCP surface"],
    ]}/>
    <Note type="gold" label="Why this matters">
      When you add a new tool to your gateway, every surface gets it instantly -- no changes needed in Slack, Claude Projects, or any artifact. Build auth and logging once. Every surface inherits it.
    </Note>
  </>);
}

function SMultiAgent(){return(<><p className="sec-obj">Design systems where multiple Claude agents work together -- an orchestrator that thinks, workers that act, a result neither could produce alone.</p><div className="h3">When to go multi-agent</div><Table heads={["Signal","What it means"]} rows={[["Tool list exceeds ~25","Single agent loses reliable tool selection"],["Sub-tasks are independent","Run workers in parallel -- faster and cheaper"],["Context per task would blow the window","Each worker gets its own clean context"],["Different models fit different jobs","Haiku for routing decisions, Sonnet for execution"]]}/><div className="h3">Orchestrator to worker pattern</div><Code lang="javascript" text={C.ORCHESTRATOR}/><div className="h3">Parallel workers</div><Code lang="javascript" text={C.PARALLEL}/><Note type="red" label="Cost explosion warning">Every worker runs a full agent loop. 4 workers x 10 turns x Sonnet pricing adds up quickly. Use Haiku for the orchestrator routing decision. Use Sonnet only for execution workers that genuinely need reasoning depth.</Note></>);}

function SProduction(){return(<><p className="sec-obj">The checklist every agent must pass before it touches production data -- cost, latency, reliability, and observability covered.</p><div className="h3">Pre-production checklist</div><Checks items={["Max turns enforced (25-50) in code, not only in the system prompt","Token budget defined and logged per run","Wall-clock timeout set (5 min) -- a zombie agent is not recoverable","Repeated-error detector: 3 same-error retries then abort and surface","Every tool call logged: caller, args, result, duration, error","Stop reason logged on every model response","Final outcome recorded: success / partial / error / aborted","Structured logger only (e.g. Pino) -- no console.log in production gateway code","Sensitive fields (secrets, card numbers) never written to logs"]}/><div className="h3">Cost control levers</div><Table heads={["Lever","Typical saving","How"]} rows={[["Prompt caching","50-90% on input tokens",<><IC>cache_control</IC> on stable system prompt blocks</>],["Model tiering","5-10x on routing decisions","Haiku for orchestrator routing, Sonnet for execution workers"],["Sub-agent summaries","Linear in sub-task count","Workers return summary strings, not full transcripts"],["Tool-result capping","Varies by tool","Cap verbose payloads at 2000 chars before appending to history"]]}/><div className="h3">Eval levels before every deploy</div><Table heads={["Level","What you test","Cadence"]} rows={[["Unit","Each tool in isolation, including all error paths","Every commit"],["Tool select","Does the model pick the right tool for a given input?","Per prompt change"],["Trajectory","End-to-end task scored on success and path quality","Per release"],["Regression","Every production failure pinned as a permanent test case","Continuous"]]}/><Note type="green" label="The eval compounding law">Every production failure you convert into a regression test is permanent insurance. After six months your eval suite is worth more than your codebase.</Note></>);}

function SACS(){return(<><p className="sec-obj">The full ACS headless app architecture -- four repos, one gateway, every surface wired to the same auth and memory layer.</p><div className="h3">Repo map</div><Table heads={["Repo","Role","Pattern"]} rows={[[<IC>acs-gateway</IC>,"MCP server fronting every connector -- auth, RBAC, secrets vault, audit","Tool aggregator and safety boundary"],[<IC>acs-brain</IC>,"Memory MCP -- clients, contacts, notes, tasks, events, playbooks","Episodic + semantic + procedural memory on Neon Postgres"],[<IC>acs-slack-bot</IC>,"Socket Mode Bolt bot (Advo); MCP client to gateway","Conversational agent surface"],[<IC>acs-prompts</IC>,"Markdown source of truth for all Claude Project system prompts","System prompt version control"]]}/><div className="h3">Live connector surface</div><p className="sp">{["brain","salesforce","jira","ms365","otter","slack","github","quickbooks","apollo"].map(p=>(<span key={p} className={p==="brain"?"pill pill-gold":"pill pill-blue"}>{p}</span>))}</p><div className="h3">Architecture diagram</div><Code lang="ascii -- ACS headless app" text={C.MCP_ARCH}/><div className="h3">Data layer</div><Table heads={["Component","Tech","Rule"]} rows={[["Memory store","Neon Postgres","Relational beats vectors for the ACS entity model; serverless branching for prod safety"],["Secrets","Railway environment variables","Never in source code -- all tokens and API keys live in Railway's vault"],["Audit log","Postgres append-only table","Every gateway call: caller, args hash, result, timestamp"],["Deploy","Railway auto-deploy on main","Always npm run build + zero TS errors before pushing"]]}/><div className="h3">Current build priorities (April 2026)</div><StepList items={[{title:"PM Home v4 -- wire fetchers and action handlers",body:"UI is shipped. Plumbing pending. Next: real Jira and Brain calls behind each card."},{title:"Brain schema additions",body:"workspaces, team_members, agent_runs, playbooks, and slack_workflows tables."},{title:"Runner cron agents",body:"Daily briefing at 8am CT. Weekly status reports every Friday morning."},{title:"acs-web React dashboard (step 11c)",body:"Not yet started. Will be the primary non-Slack surface for the team."},{title:"Cowork Projects setup (step 12)",body:"Jason and Felisa Projects with role-scoped tool surfaces."}]}/><Note type="red" label="Hard rules -- non-negotiable">Never write secrets directly to Neon -- always use Railway env vars or the vault module. Never bypass auth middleware on any gateway route. Always npm run build + zero TS errors before committing. Confirm before any production Neon migration.</Note></>);}

const SECTION_MAP={mindset:SMindset,headless:SHeadless,prompts:SPrompts,react:SReact,blockkit:SBlockKit,loop:SLoop,memory:SMemory,tools:STools,mcp:SMCP,multiagent:SMultiAgent,production:SProduction,acs:SACS};

export default function App(){
  const[active,setActive]=useState("mindset");
  useEffect(()=>{const el=document.createElement("style");el.textContent=CSS;document.head.appendChild(el);return()=>document.head.removeChild(el);},[]);
  const idx=MODULES.findIndex(m=>m.id===active);
  const mod=MODULES[idx];const lv=LV[mod.lv];
  const pct=((idx+1)/MODULES.length)*100;
  const prev=idx>0?MODULES[idx-1]:null;
  const next=idx<MODULES.length-1?MODULES[idx+1]:null;
  const View=SECTION_MAP[active];
  const go=useCallback((id)=>{setActive(id);window.scrollTo(0,0);},[]);
  return(
    <div className="ac-root">
      <header className="ac-header">
        <div className="ac-header-inner">
          <div className="ac-logo-mark">ACS</div>
          <div className="ac-header-text">
            <h1>Agentic AI Academy</h1>
            <div className="ac-tagline">Amateur to Orchestration Engineer  ·  Advocate Cloud Solutions</div>
          </div>
          <div className="ac-badge">Internal Training</div>
        </div>
      </header>
      <div className="ac-layout">
        <nav className="ac-sidebar">
          <div className="sidebar-label" style={{marginTop:8}}>Modules</div>
          {MODULES.map(m=>(<button key={m.id} className={"ac-nav-btn"+(active===m.id?" on":"")} onClick={()=>go(m.id)}><span className="nav-num">{m.num}</span><span className="nav-lbl">{m.label}</span><span className={"nav-level lv-"+m.lv}>{LV[m.lv].label.slice(0,3)}</span></button>))}
        </nav>
        <main className="ac-content">
          <div className="ac-progress">
            <span className="prog-lbl">{mod.num} of {MODULES.length}</span>
            <div className="prog-track"><div className="prog-fill" style={{width:pct+"%"}}/></div>
            <span className="prog-lbl">{Math.round(pct)}% complete</span>
          </div>
          <div className="sec-h2">{mod.label}</div>
          <div className="sec-meta"><span className="sec-badge" style={{background:lv.bg,color:lv.fg}}>{lv.label.toUpperCase()}</span></div>
          <View/>
          <div className="footer-nav">
            <button className="fn-btn fn-ghost" disabled={!prev} onClick={()=>prev&&go(prev.id)}>{prev?("Back: "+prev.label):"Start of course"}</button>
            <button className="fn-btn fn-primary" disabled={!next} onClick={()=>next&&go(next.id)}>{next?("Next: "+next.label):"Course complete"}</button>
          </div>
        </main>
      </div>
    </div>
  );
}
