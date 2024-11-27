import { createClient } from "./server";

const auth = {
  createSession: async (formData) => {
    try {
      const supabase = createClient();
      const data = Object.fromEntries(formData);
      const { email, password } = data;

      if (!email || !password) {
        return { message: "Email and password are required." };
      }

      const { data: sessionData, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { message: error.message };
      }

      return { success: true, session: sessionData };
    } catch (error) {
      return { message: `Unexpected error: ${error.message}` };
    }
  },

  getJWT: async () => {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      return { message: error.message };
    }

    const jwtToken = session.access_token;
    return jwtToken;
  },

  getPublicURL: async (path) => {
    const supabase = createClient();
    const { data } = supabase.storage.from('campaignFile').getPublicUrl(path);
    return data;
  },

  getSession: async () => {
    try {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        throw new Error(error.message);
      }

      if (!session) {
        throw new Error("No active session found.");
      }

      return { session: session.user };
    } catch (error) {
      return { message: `Error getting session: ${error.message}` };
    }
  },

  getUserData: async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { message: "No user session found" };
    }

    const { data, error } = await supabase.from("profiles").select("*").eq("user_id", user.id);

    if (error) {
      return { message: error.message };
    }

    return data;
  },

  createUserData: async (data) => {
    const supabase = createClient();
    const { data: profile, error } = await supabase.from("profiles").insert(data);
    if (error) throw error;
    return profile;
  },

  updateUserData: async (formData) => {
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").upsert(formData, { returning: "minimal" });
    if (error) throw error;
    return data;
  },

  storeApiKey: async (userId, apiKey) => {
    try {
      let { user_id, api_key} = data;
      user_id = userId;
      api_key = apiKey;
      const supabase = createClient();
      const { data, error } = await supabase.from("api_keys").insert(data);

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      return { message: `Error storing API key: ${error.message}` };
    }
  },

  getApiKeys: async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("api_keys").select("*");
    if (error) throw error;
    return data;
  },

  deleteApiKey: async (id) => {
    const supabase = createClient();
    const { data, error } = await supabase.from("api_keys").delete().eq("id", id);
    if (error) throw error;
    return data;
  },

  deleteSession: async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        return { message: error.message };
      }

      return { success: true };
    } catch (error) {
      return { message: error.message };
    }
  },
};

export default auth;
