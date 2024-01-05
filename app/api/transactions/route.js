import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data } = await supabase.auth.getSession();
  const { session } = data;

  if (session) {
    const body = await req.json(); // Parse the JSON data sent from the frontend

    console.log(body);

    for (const row of body) {
      console.log("Processing row:", row);
    
      const { data: existingRows, error: selectError } = await supabase
        .from("transactions")
        .select("*")
        .eq("bank_name", row.bank_name)
        .eq("description", row.description)
        .eq("amount", row.amount)
        .eq("transaction_date", row.transaction_date);
    
      if (selectError) {
        console.error("Error checking for existing row:", selectError);
        continue; // Skip to the next iteration
      }
    
      if (existingRows.length === 0) {
        const { error: insertError } = await supabase
          .from("transactions")
          .insert(row);
    
        if (insertError) {
          console.error("Error inserting row:", insertError);
        } else {
          console.log("Row inserted successfully:", row);
        }
      } else {
        console.log("Row already exists, skipping:", row);
      }
    }
    

    return NextResponse.json({ message: "Transactions added successfully" }, { status: 200 });
  } else {
    // Not Signed in
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}
