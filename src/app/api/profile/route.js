// app/api/profiles/route.js
import { NextResponse } from "next/server";
import auth from "../../../../utils/supabase/auth";

export async function GET(request) {
  if (request.method === "GET") {
    try {
      // Fetch the user data based on the current session
      const data = await auth.getUserData();
      return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to get account: " + error.message }, { status: 403 });
    }
  }
}

export async function PUT(request) {
  if (request.method === "PUT") {
    try {
      const formData = await request. json();  // Use .json() instead of .formData() for JSON payload

      const getUserData = await auth.getUserData();
      let data;

      if (getUserData && getUserData.length > 0) {
        // If the user already has data, update the profile
        data = await auth.updateUserData(formData);
      } else {
        // If the user doesn't have data, create new profile
        const { name, phone_number, product_name, logo } = formData;
        const userData = await auth.getSession();

        data = await auth.createUserData({
          user_id: userData.session.id, // Assuming `user_id` is the primary key in your database
          name,
          phone_number,
          product_name,
          logo
        });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to update profile: " + error.message }, { status: 403 });
    }
  }
}
