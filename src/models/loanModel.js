import { supabase } from "../config/supabaseClient.js";

export const LoanModel = {
  // Mendapatkan semua peminjaman (dengan opsi filter status)
  async getAll(statusQuery) {
    let query = supabase.from("loans").select(`
      id, borrow_date, due_date, status,
      books ( id, title, author ),
      members ( id, name, email )
    `);

    // Jika ada filter status (misal: ?status=Terlambat)
    if (statusQuery) {
      query = query.eq("status", statusQuery);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase.from("loans").select(`
      id, borrow_date, due_date, status,
      books ( id, title, author ),
      members ( id, name, email )
    `).eq("id", id).single();
    if (error) throw error;
    return data;
  },

  async create(payload) {
    const { data, error } = await supabase.from("loans").insert([payload]).select();
    if (error) throw error;
    return data[0];
  },

  async update(id, payload) {
    const { data, error } = await supabase.from("loans").update(payload).eq("id", id).select();
    if (error) throw error;
    return data[0];
  },

  async remove(id) {
    const { error } = await supabase.from("loans").delete().eq("id", id);
    if (error) throw error;
    return { message: "Peminjaman berhasil dihapus" };
  }
};
