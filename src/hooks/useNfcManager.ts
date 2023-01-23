import { useCallback, useEffect, useState } from 'react';
import nfcManager, { NfcTech, TagEvent } from 'react-native-nfc-manager';

const useNfcManager = () => {
    const [readTag, setReadTag] = useState<TagEvent | null>(null);
    const [isReading, setIsReading] = useState(false);
    const [nfcStarted, setNfcStarted] = useState(false);

    const checkNfc = useCallback(async () => {
        const isEnabled = await nfcManager.isEnabled();
        if (isEnabled) {
            await nfcManager.start();
            setNfcStarted(true);
            return true;
        }
        return false;
    }, []);

    useEffect(() => {
        nfcManager.getLaunchTagEvent().then(tag => {
            if (tag) {
                setReadTag(tag);
            }
        });
    }, []);

    const stopReading = useCallback(async () => {
        await nfcManager
            .cancelTechnologyRequest()
            .then(() => setIsReading(false));
    }, []);

    const readNfc = useCallback(async () => {
        if (isReading) {
            await stopReading();
            return;
        } else if (nfcStarted === false && (await checkNfc()) === false) {
            return;
        }

        setIsReading(true);

        const tech = await nfcManager.requestTechnology(NfcTech.NdefFormatable);

        if (tech === NfcTech.NdefFormatable) {
            setReadTag(await nfcManager.getTag());
        }

        await stopReading();
    }, [checkNfc, isReading, nfcStarted, stopReading]);

    return {
        readTag,
        isReading,
        readNfc,
        stopReading,
    };
};

export default useNfcManager;
