import { account } from "@/lib/appwrite";
import { LoginPayload, SignupPayload } from "@/type/authType";
import { createAsyncThunk } from "@reduxjs/toolkit";


/* ---------- Helper ---------- */
const formatUser = (user: any) => ({
  $id: user.$id,
  email: user.email,
  name: user.name,
  role: user.prefs?.role || "customer",
});

/* ---------- SIGNUP (Customer by default) ---------- */
export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }: SignupPayload, { rejectWithValue }) => {
    try {
      await account.create("unique()", email, password, name);
      await account.createEmailPasswordSession(email, password);

      // default role
      await account.updatePrefs({ role: "customer" });

      const user = await account.get();
      return formatUser(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/* ---------- LOGIN ---------- */
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      return formatUser(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/* ---------- LOGOUT ---------- */
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await account.deleteSession("current");
});

/* ---------- CHECK AUTH (on refresh) ---------- */
export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const user = await account.get();
      return formatUser(user);
    } catch {
      return rejectWithValue(null);
    }
  }
);
