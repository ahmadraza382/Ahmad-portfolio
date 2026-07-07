import MessagesList, { type AdminMessage } from "@/components/admin/MessagesList";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminMessages() {
  const supabase = getSupabaseAdmin();

  let messages: AdminMessage[] = [];
  let dbReady = false;
  if (supabase) {
    dbReady = true;
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    messages = (data ?? []) as AdminMessage[];
  }

  return (
    <div>
      <h1 className="font-serif text-[34px] m-0 mb-6">Messages</h1>
      {!dbReady ? (
        <div className="bg-soft border border-border rounded-[12px] p-5 text-[14px] text-text-2">
          Connect Supabase to receive and read contact messages. (See the Dashboard.)
        </div>
      ) : (
        <MessagesList messages={messages} />
      )}
    </div>
  );
}
