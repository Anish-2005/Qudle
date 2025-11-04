import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';

export async function GET() {
  try {
    const res = await query('SELECT NOW()');
    return NextResponse.json({ ok: true, now: res.rows[0] });
  } catch (err) {
    console.error('DB test error', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
