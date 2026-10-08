import puppeteer from 'puppeteer'
import fs from 'fs'

const outDir = '/root/.gemini/antigravity-cli/brain/9cd1db5e-cb8f-4226-8fc2-e6ef0ca82bf0/scratch'
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

async function run() {
  console.log('Iniciando Puppeteer com Firefox...')
  const browser = await puppeteer.launch({
    browser: 'firefox',
    headless: true,
    executablePath: '/usr/bin/firefox-esr',
    args: ['--no-sandbox', '--disable-gpu'],
  })

  const viewports = [
    { name: 'iphone-se', width: 375, height: 667, isMobile: true },
    { name: 'tab-s10-fe', width: 800, height: 1280, isMobile: true },
    { name: 'desktop-fullhd', width: 1920, height: 1080, isMobile: false },
  ]

  for (const vp of viewports) {
    console.log(`\n=== Capturando ${vp.name} (${vp.width}x${vp.height}) ===`)
    const page = await browser.newPage()
    await page.setViewport({ width: vp.width, height: vp.height })
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' })

    // 1. Visão Geral
    await page.screenshot({ path: `${outDir}/${vp.name}-1-visao-geral.png` })
    console.log(`  -> ${vp.name}-1-visao-geral.png`)

    // Função de clique em tab
    const navigateTo = async (tabLabel) => {
      if (vp.isMobile) {
        const menuBtn = await page.$('.sanctuary-menu-toggle')
        if (menuBtn) {
          await menuBtn.click()
          await new Promise((r) => setTimeout(r, 450))
        }
        const items = await page.$$('.nav-tab-item')
        for (const item of items) {
          const txt = await page.evaluate((el) => el.textContent, item)
          if (txt && txt.includes(tabLabel)) {
            await item.click()
            await new Promise((r) => setTimeout(r, 450))
            break
          }
        }
      } else {
        const topNavBtns = await page.$$('.sanctuary-primary-nav button')
        for (const btn of topNavBtns) {
          const txt = await page.evaluate((el) => el.textContent, btn)
          if (txt && txt.includes(tabLabel)) {
            await btn.click()
            await new Promise((r) => setTimeout(r, 450))
            break
          }
        }
      }
    }

    // 2. Mapa Acústico
    await navigateTo('Mapa')
    await page.screenshot({ path: `${outDir}/${vp.name}-2-mapa.png` })
    console.log(`  -> ${vp.name}-2-mapa.png`)

    // 3. Comunidade & Educação
    await navigateTo('Comunidade')
    await page.screenshot({ path: `${outDir}/${vp.name}-3-comunidade.png` })
    console.log(`  -> ${vp.name}-3-comunidade.png`)

    // 4. Alertas & Triagem
    await navigateTo('Alertas')
    await page.screenshot({ path: `${outDir}/${vp.name}-4-alertas.png` })
    console.log(`  -> ${vp.name}-4-alertas.png`)

    // 5. Sobre o Projeto
    await navigateTo('Sobre')
    await page.screenshot({ path: `${outDir}/${vp.name}-5-sobre.png` })
    console.log(`  -> ${vp.name}-5-sobre.png`)

    await page.close()
  }

  await browser.close()
  console.log('\nTodas as telas foram capturadas com sucesso!')
}

run().catch((e) => {
  console.error('Erro na captura:', e)
  process.exit(1)
})
