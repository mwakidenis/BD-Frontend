import { NextRequest, NextResponse } from "next/server";
// app/api/ssl-success/route.ts

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const tran_id = formData.get("tran_id");
  const amount = formData.get("amount");
  const status = formData.get("status");

  // redirect with query params to your success page
  const redirectUrl = `/success?tran_id=${tran_id}&amount=${amount}&status=${status}`;
  return NextResponse.redirect(redirectUrl);
}
