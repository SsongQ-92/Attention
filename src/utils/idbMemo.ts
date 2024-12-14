import { get, set } from 'idb-keyval';

import { Memo } from '../config/types';

export const asyncLoadMemo = async () => {
  return await get('memos');
};

export const asyncCreateMemo = async (newMemo: Memo) => {
  try {
    const existingMemos = (await get('memos')) || [];

    const updatedMemos = [...existingMemos, newMemo];
    await set('memos', updatedMemos);
  } catch (err) {
    console.error(err);
  }
};

export const asyncUpdateMemoById = async (id: number, updatedMemo: Partial<Memo>) => {
  try {
    const existingMemos = (await get('memos')) || [];

    const updatedMemos = existingMemos.map((memo: Memo) =>
      memo.id === id ? { ...memo, ...updatedMemo } : memo
    );

    await set('notes', updatedMemos);
  } catch (err) {
    console.error(err);
  }
};
