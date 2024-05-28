import { useEffect, useState } from 'react';
import Counter from '../contracts/counter.ts';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { Address, OpenedContract } from '@ton/core';
import { useTonConnect } from './useTonConnect';

export function useCounterContract() {
  const client = useTonClient();
  const [val, setVal] = useState<null | string>();
  const { sender } = useTonConnect();
  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Counter(
      Address.parse('EQBHfkNinQqraW9dLt5exPSykUBrX_O8SeQYlG-dYOaxO513') // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<Counter>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
        if (!counterContract) return;
        setVal(null);
        const val = await counterContract.getCounter();
        setVal(val.toString());
        await sleep(8000); // sleep 5 seconds and poll value again
        getValue();
      }
    getValue();
  }, [counterContract]);

  return {
    value: val,
    address: counterContract?.address.toString(),
    sendIncrement: () => {
        return counterContract?.sendIncrement(sender);
      },
  };
}