const { expect, browser, $ } = require('@wdio/globals')
const assert = require('assert');

describe('Google Cloud Platform Pricing Calculator', () => {
    it('should login with valid credentials', async () => {
        await browser.url(`https://cloud.google.com/`)

        await $('.YSM5S').click()
        await $('#i4').setValue('Google Cloud Platform Pricing Calculator')
        await $('.PETVs-OWXEXe-UbuQg').click()

        await $('//a[text()="Google Cloud Pricing Calculator"]').click()
        await $('//span[text()="Add to estimate"]').click()
        await $('//h2[text()="Compute Engine"]').click()


        // Number of instances: 4
        await $('#c11').setValue('4');

        // Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or another User-Provided OS
        await browser.execute(() => {
            document.querySelector('#c21').click();
        })
        await $('li[data-value="free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license"]').click()

        // Provisioning model: Regular
        await $('//label[text()="Regular"]').click()

        // Machine Family: General purpose 
        await browser.execute(() => {
            document.querySelector('#c25').click();
        })
        await $('li[data-value="general-purpose"]').click()

        // Series: N1 
        await browser.execute(() => {
            document.querySelector('#c29').click();
        })
        await $('li[data-value="n1"]').click()

        // Machine type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
        await browser.execute(() => {
            document.querySelector('#c33').click();
        })
        await $('li[data-value="n1-standard-8"]').click()

        // Select “Add GPUs“
        await $('button[aria-label="Add GPUs"]').click()

        // Select region
        await browser.execute(() => {
            document.querySelector('#c45').click();
        })
        await $('li[data-value="europe-west3"]').click()
        
        // Committed usage: 1 Year
        await $('//label[text()="1 year"]').click()

        await browser.pause(3000);

        // Click button share
        await $('button[aria-label="Open Share Estimate dialog"]').click()

        // Open estimate summary
        await $('//a[text()="Open estimate summary"]').click()

        
        await browser.waitUntil(async () => {
            return (await browser.getWindowHandles()).length > 1
        }, { timeout: 10000, timeoutMsg: 'Expected new tab to be opened' })

        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[1])

        const machineType = await $('//span[text()="n1-standard-8, vCPUs: 8, RAM: 30 GB"]').getText()
        expect(machineType).toExist()

        const osSoftware = await $('//span[text()="Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)"]').getText()
        expect(osSoftware).toExist()

        const provisioningModel = await $('//span[text()="Regular"]').getText()
        expect(provisioningModel).toExist()

        const region = await $('//span[text()="Frankfurt (europe-west3)"]').getText()
        expect(region).toExist()

        const discountOption = await $('//span[text()="1 year"]').getText()
        expect(discountOption).toExist()
    })
})

