import assert from 'node:assert/strict';
import {mkdtemp, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {test} from 'node:test';
import {pathToFileURL} from 'node:url';
import {readBundle} from '../scripts/inspect.mjs';

test('资料可按声明的主键和字段完整读取', async () => {
  const bundle = await readBundle();
  assert(Object.values(bundle).every(rows => rows.length > 0));
  const {rights, transactions, rates, settlements, statements} = bundle;
  assert(transactions.filter(row => row.reversal).every(row => transactions.some(parent => parent.id === row.reversal)));
  assert(transactions.filter(row => row.currency !== 'CNY' && !row.reversal)
    .every(row => rates.some(rate => rate.day === row.service && rate.currency === row.currency)));
  assert(settlements.every(row => transactions.some(transaction => transaction.id === row.transaction)));
  assert(rights.some(row => row.seen > row.start));
  assert(statements.some(row => row.status === 'correction-confirmed' && row.paid_cny_cents === 0));
});

test('读取资料时拒绝重复主键', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'record-check-'));
  try {
    await writeFile(join(dir, 'manifest.json'), '{"entries":{"fields":["id","value"],"key":["id"]}}');
    await writeFile(join(dir, 'entries.json'), '[{"id":"x","value":1},{"id":"x","value":2}]');
    await assert.rejects(readBundle(pathToFileURL(dir + '/')), /主键/);
  } finally {
    await rm(dir, {recursive: true, force: true});
  }
});
