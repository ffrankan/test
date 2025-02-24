import * as Tone from 'tone'
import { samplerPianoConf, samplerBaseConf, samplerDrumsConf } from '@/conf'
const conf = {
    piano: samplerPianoConf,
    base: samplerBaseConf,
    drums: samplerDrumsConf
}
export const getSampler = (instrument = 'piano') => {
    return new Promise(async (resolve, reject) => {
        const sampler = new Tone.Sampler(conf[instrument])
            .toDestination()
        await Tone.loaded()
        resolve(sampler)
    })
}
