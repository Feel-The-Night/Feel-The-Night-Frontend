<#
  apply-start-here.ps1

  Implements the Start Here page (Figma node 125:20) and makes the
  Login/Register item sit flush against the right edge of the top bar.

  Run from the root of Feel-The-Night-Frontend:
      powershell -ExecutionPolicy Bypass -File .\apply-start-here.ps1

  The script writes only the files listed in the summary, runs build and lint,
  and commits only if both pass. It never runs git init, git push, or touches
  the remote.
#>

$ErrorActionPreference = 'Stop'

$created = @()
$modified = @()

function Write-ProjectFile {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$Content
    )

    $full = Join-Path (Get-Location) $Path
    $dir = Split-Path -Parent $full
    if (-not (Test-Path -LiteralPath $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }

    $existed = Test-Path -LiteralPath $full
    $body = ($Content -replace "`r`n", "`n")
    if (-not $body.EndsWith("`n")) { $body += "`n" }
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($full, $body, $utf8NoBom)

    if ($existed) {
        $script:modified += $Path
        Write-Host "  modified  $Path"
    }
    else {
        $script:created += $Path
        Write-Host "  created   $Path"
    }
}

function Update-ProjectFile {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][string]$Old,
        [Parameter(Mandatory = $true)][string]$New
    )

    $full = Join-Path (Get-Location) $Path
    if (-not (Test-Path -LiteralPath $full)) {
        throw "Expected file not found: $Path"
    }

    $text = [System.IO.File]::ReadAllText($full)
    $normalized = $text -replace "`r`n", "`n"
    $Old = ($Old -replace "`r`n", "`n")
    $New = ($New -replace "`r`n", "`n")

    if ($normalized.Contains($New)) {
        Write-Host "  unchanged $Path (patch already applied)"
        return
    }

    if (-not $normalized.Contains($Old)) {
        throw "Could not patch $Path - the expected block was not found. Resolve it by hand and re-run."
    }

    $patched = $normalized.Replace($Old, $New)
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($full, $patched, $utf8NoBom)
    $script:modified += $Path
    Write-Host "  modified  $Path"
}

# ----------------------------------------------------------------------------
# 1. Verify we are in the right project
# ----------------------------------------------------------------------------

Write-Host "Checking project..."

if (-not (Test-Path -LiteralPath './package.json')) {
    throw 'package.json not found. Run this script from the root of Feel-The-Night-Frontend.'
}

$pkg = Get-Content -Raw -LiteralPath './package.json' | ConvertFrom-Json
if ($pkg.name -ne 'feel-the-night-frontend') {
    throw "Wrong project: package.json name is '$($pkg.name)', expected 'feel-the-night-frontend'."
}

foreach ($required in @(
    './src/routes/AppRoutes.tsx',
    './src/pages/Start',
    './src/styles/tokens.css',
    './src/components/layout/Header/Header.module.css'
)) {
    if (-not (Test-Path -LiteralPath $required)) {
        throw "Expected path missing: $required. This does not look like the current Feel-The-Night-Frontend."
    }
}

if (-not (Test-Path -LiteralPath './.git')) {
    throw 'No .git directory here. This script does not run git init.'
}

Write-Host "Project OK: $($pkg.name)"
Write-Host ''

# ----------------------------------------------------------------------------
# 2. Start Here page
# ----------------------------------------------------------------------------

Write-Host 'Writing files...'

$Start_tsx = @'
import StartCard from './StartCard'
import styles from './Start.module.css'

const cards = [
  { title: 'Select your\ncharacter' },
  { title: 'Understand your\npower' },
  { title: 'Defence is\nan offence' },
  { title: 'Get out of jail' },
]

export default function Start() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>survive the night</h1>
      <hr className={styles.divider} />
      <ul className={styles.grid}>
        {cards.map((card) => (
          <li key={card.title}>
            <StartCard title={card.title} />
          </li>
        ))}
      </ul>
    </section>
  )
}
'@

Write-ProjectFile -Path 'src/pages/Start/Start.tsx' -Content $Start_tsx

$Start_module_css = @'
/* Start Here - Figma node 125:20 */

.page {
  padding-block-start: var(--space-8);
}

.title {
  margin-bottom: var(--space-8);
  text-align: center;
  text-transform: uppercase;
}

.divider {
  margin: 0 0 var(--space-6);
  border: 0;
  border-top: var(--border-width-md) solid var(--color-accent);
}

.grid {
  display: grid;
  /* 880px cards with a 36px column gap and a 45px row gap in the 1920px frame */
  grid-template-columns: repeat(2, 1fr);
  gap: 45px 36px;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (max-width: 60rem) {
  .grid {
    grid-template-columns: 1fr;
  }
}
'@

Write-ProjectFile -Path 'src/pages/Start/Start.module.css' -Content $Start_module_css

$StartCard_tsx = @'
import styles from './StartCard.module.css'

type StartCardProps = {
  /** Card heading. Line breaks are preserved, matching the Figma layout. */
  title: string
  /** Background image imported from src/assets. See src/assets/README.md. */
  image?: string
}

export default function StartCard({ title, image }: StartCardProps) {
  return (
    <article
      className={styles.card}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <h2 className={styles.title}>{title}</h2>
    </article>
  )
}
'@

Write-ProjectFile -Path 'src/pages/Start/StartCard.tsx' -Content $StartCard_tsx

$StartCard_module_css = @'
/* Start Here card - Figma nodes 125:30, 125:31, 127:100, 127:101 (880x340) */

.card {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 880 / 340;
  padding: var(--space-4);
  border: var(--border-width-md) solid var(--color-accent);
  border-radius: var(--radius-md);
  /* Falls back to a flat surface until the Figma artwork is exported. */
  background-color: var(--color-surface);
  background-position: center;
  background-size: cover;
  overflow: hidden;
}

.title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.75vw, var(--font-size-display-md));
  font-weight: 400;
  line-height: 1.2;
  text-align: center;
  text-transform: uppercase;
  text-shadow: var(--text-shadow-card);
  color: var(--color-text);
  white-space: pre-line;
}
'@

Write-ProjectFile -Path 'src/pages/Start/StartCard.module.css' -Content $StartCard_module_css

# ----------------------------------------------------------------------------
# 3. Header: Login/Register flush against the right edge
# ----------------------------------------------------------------------------

$headerOld = @'
.inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding-inline: var(--content-padding);
}
'@

$headerNew = @'
/* The bar spans the viewport and the last nav item (Login/Register) sits flush
   against the right edge, so only the left side is padded. */
.inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  width: 100%;
  padding-left: var(--content-padding);
  padding-right: 0;
}
'@

Update-ProjectFile -Path 'src/components/layout/Header/Header.module.css' -Old $headerOld.Trim() -New $headerNew.Trim()

# The Start Here grid is 1796px wide inside the 1920px frame, so the content
# box follows the frame width instead of the divider width.

$tokensOld = @'
  --content-max-width: 1820px; /* divider width inside the 1920px frame */
'@

$tokensNew = @'
  --content-max-width: 1920px; /* design frame width */
'@

Update-ProjectFile -Path 'src/styles/tokens.css' -Old $tokensOld.Trim() -New $tokensNew.Trim()

Write-Host ''

# ----------------------------------------------------------------------------
# 4. Build and lint - stop on any failure
# ----------------------------------------------------------------------------

Write-Host 'Running npm run build...'
& npm run build
if ($LASTEXITCODE -ne 0) {
    throw "npm run build failed (exit code $LASTEXITCODE). Nothing was committed."
}
$buildResult = 'passed'

Write-Host ''
Write-Host 'Running npm run lint...'
& npm run lint
if ($LASTEXITCODE -ne 0) {
    throw "npm run lint failed (exit code $LASTEXITCODE). Nothing was committed."
}
$lintResult = 'passed'

Write-Host ''

# ----------------------------------------------------------------------------
# 5. Summary
# ----------------------------------------------------------------------------

Write-Host '--------------------------------------------------'
Write-Host 'Summary'
Write-Host '--------------------------------------------------'

if ($created.Count -gt 0) {
    Write-Host 'Created:'
    $created | Sort-Object -Unique | ForEach-Object { Write-Host "  $_" }
}
if ($modified.Count -gt 0) {
    Write-Host 'Modified:'
    $modified | Sort-Object -Unique | ForEach-Object { Write-Host "  $_" }
}

Write-Host "Build: $buildResult"
Write-Host "Lint:  $lintResult"
Write-Host ''

# ----------------------------------------------------------------------------
# 6. Commit (no push, no remote changes)
# ----------------------------------------------------------------------------

& git add .
if ($LASTEXITCODE -ne 0) {
    throw "git add failed (exit code $LASTEXITCODE)."
}

$staged = & git diff --cached --name-only
if ([string]::IsNullOrWhiteSpace(($staged -join ''))) {
    Write-Host 'Nothing to commit - the working tree already matches this change.'
    exit 0
}

& git commit -m 'feat: implement start here page'
if ($LASTEXITCODE -ne 0) {
    throw "git commit failed (exit code $LASTEXITCODE)."
}

$hash = (& git rev-parse --short HEAD).Trim()
Write-Host ''
Write-Host "Commit created: $hash  feat: implement start here page"
Write-Host 'Not pushed. Run git push yourself when you are ready.'
