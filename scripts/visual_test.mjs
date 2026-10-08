import puppeteer from 'puppeteer'
import { spawn } from 'child_process'
import fs from 'fs'

const outDir = '/root/.gemini/antigravity-cli/brain/9cd1db5e-cb8f-4226-8fc2-e6ef0ca82bf0/scratch'
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

async function run() {
  console.log('Iniciando Vite preview...')
  const vite = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], {
    cwd: '/root/dev/sonitus',
    stdio: 'pipe',
  })

  // Esperar o servidor subir
  await new Promise((res) => setTimeout(res, 2500))

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  })

  const viewports = [
    { name: 'iphone-se', width: 375, height: 667, isMobile: true },
    { name: 'tab-s10-fe-portrait', width: 800, height: 1280, isMobile: true },
    { name: 'desktop-fullhd', width: 1920, height: 1080, isMobile: false },
  ]

  for (const vp of viewports) {
    console.log(`Testando viewport: ${vp.name} (${vp.width}x${vp.height})...`)
    const page = await browser.newPage()
    await page.setViewport({ width: vp.width, height: vp.height })
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' })

    // Screenshot Visão Geral
    await page.screenshot({ path: `${outDir}/${vp.name}-visao-geral.png`, fullPage: false })

    // Navegar para Comunidade & Educação
    if (vp.isMobile) {
      // Abre menu se for mobile/tablet
      const menuBtn = await page.$('.sanctuary-menu-toggle')
      if (menuBtn) {
        await menuBtn.click()
        await new Promise((r) => setTimeout(r, 400))
      }
      // Clica no tab item comunidade
      const tabBtns = await page.$$('.nav-tab-item')
      for (const btn of tabBtns) {
        const text = await page.evaluate((el) => el.textContent, btn)
        if (text && text.includes('Comunidade')) {
          await btn.click()
          break
        }
      }
      await new Promise((r) => setTimeout(r, 400))
    } else {
      const topBtns = await page.$$('.sanctuary-primary-nav button')
      for (const btn of topBtns) {
        const text = await page.evaluate((el) => el.textContent, btn)
        if (text && text.includes('Comunidade')) {
          await btn.click()
          break
        }
      }
      await new Promise((r) => setTimeout(r, 400))
    }
    await page.screenshot({ path: `${outDir}/${vp.name}-comunidade.png`, fullPage: false })

    // Navegar para Alertas
    if (vp.isMobile) {
      const menuBtn = await page.$('.sanctuary-menu-toggle')
      if (menuBtn) {
        await menuBtn.click()
        await new Promise((r) => setTimeout(r, 400))
      }
      const tabBtns = await page.$$('.nav-tab-item')
      for (const btn of tabBtns) {
        const text = await page.evaluate((el) => el.textContent, btn)
        if (text && text.includes('Alertas')) {
          await btn.click()
          break
        }
      }
      await new Promise((r) => setTimeout(r, 400))
    } else {
      const topBtns = await page.$$('.sanctuary-primary-nav button')
      for (const btn of topBtns) {
        const text = await page.evaluate((el) => el.textContent, btn)
        if (text && text.includes('Alertas')) {
          await btn.click()
          break
        }
      }
      await new Promise((r) => setTimeout(r, 400))
    }
    await page.screenshot({ path: `${outDir}/${vp.name}-alertas.png`, fullPage: false })

    // Navegar para Mapa
    if (vp.isMobile) {
      const menuBtn = await page.$('.sanctuary-menu-toggle')
      if (menuBtn) {
        await menuBtn.click()
        await new Promise((r) => setTimeout(r, 400))
      }
      const tabBtns = await page.$$('.nav-tab-item')
      for (const btn of tabBtns) {
        const text = await page.evaluate((el) => el.textContent, btn)
        if (text && text.includes('Mapa')) {
          await btn.click()
          break
        }
      }
      await new Promise((r) => setTimeout(r, 400))
    } else {
      const topBtns = await page.$$('.sanctuary-primary-nav button')
      for (const btn of topBtns) {
        const text = await page.evaluate((el) => el.textContent, btn)
        if (text && text.includes('Mapa')) {
          await btn.click()
          break
        }
      }
      await new Promise((r) => setTimeout(r, 400))
    }
    await page.screenshot({ path: `${outDir}/${vp.name}-mapa.png`, fullPage: false })

    await page.close()
  }

  await browser.close()
  vite.kill()
  console.log('Screenshots capturados com sucesso!')
}

run().catch((err) => {
  console.error('Erro:', err)
  process.exit(1)
})
