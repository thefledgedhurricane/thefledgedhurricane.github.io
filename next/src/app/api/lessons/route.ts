import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export function GET() {
	return NextResponse.json({ error: 'Not implemented' }, { status: 404 });
}

export function POST() {
	return NextResponse.json({ error: 'Not implemented' }, { status: 404 });
}
