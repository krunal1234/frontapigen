// app/api/apiKeys/route.js
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";  // Use uuid to generate unique API keys
import auth from "../../../../utils/supabase/auth";

export async function GET(request) {
  if (request.method === "GET") {
    try {
      // Fetch the API keys associated with the user
      const apiKeys = await auth.getApiKeys(); // Fetch the user's stored API keys
      return NextResponse.json({ api_keys: apiKeys }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to get API keys: " + error.message }, { status: 403 });
    }
  }
}

export async function POST(request) {
  if (request.method === "POST") {
    try {
      // Generate a new API key using uuid
      const apiKey = uuidv4();  // Generate a unique API key

      const userData = await auth.getSession();
      const userId = userData.session.id;

      // Store the API key in the database
      const { data, error } = await auth.storeApiKey(userId, apiKey);
      if (error) {
        return NextResponse.json({ message: "Error storing API key: " + error.message }, { status: 500 });
      }

      return NextResponse.json({ api_key: apiKey }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to generate API key: " + error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request) {
  if (request.method === "DELETE") {
    try {
      const { id } = await request.json();  // Expecting the API key ID to be sent in the request body

      // Delete the API key from the database
      const { data, error } = await auth.deleteApiKey(id);
      if (error) {
        return NextResponse.json({ message: "Error deleting API key: " + error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: "Failed to delete API key: " + error.message }, { status: 500 });
    }
  }
}
