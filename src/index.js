import * as ccxt from 'ccxt'
import * as asciichart from 'asciichart'
import * as asTable from 'as-table'
import log from 'ololog'
log.configure({
    locate: false
})

import * as ansicolor from 'ansicolor'

(async function main() {
    console.log(ccxt.exchanges)

    const index = 4
    const ohlcv = await new ccxt.bitmex().fetchOHLCV('BTC/USD', '1m')
    const lastPrice = ohlcv[ohlcv.length - 1][index]
    const series = ohlcv.slice(-80).map(x => x[index]) // closing price
    const bitcoinRate = ('₿ = $' + lastPrice).green
    const chart = asciichart.plot(series, {
        height: 15,
        padding: '            '
    })
    log.yellow("\n" + chart, bitcoinRate, "\n")
})()