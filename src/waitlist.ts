const pendingEmails = new Set<string>();
const joinedEmails = new Set<string>();
const storagePrefix = "sociol:waitlist:joined:";

// This browser cache supplements submission handling; global uniqueness must
// be enforced by the service storing the waitlist.
export async function joinWaitlist(
  email: string,
  submit: (normalizedEmail: string) => Promise<boolean>,
): Promise<"joined" | "duplicate" | "pending" | "failed"> {
  const normalizedEmail = email.trim().toLowerCase();
  const key = storagePrefix + normalizedEmail;

  const join = async () => {
    let alreadyJoined = joinedEmails.has(normalizedEmail);
    try {
      alreadyJoined ||= localStorage.getItem(key) === "1";
    } catch {
      // Keep same-page protection when browser storage is unavailable.
    }
    if (alreadyJoined) return "duplicate" as const;
    if (pendingEmails.has(normalizedEmail)) return "pending" as const;

    pendingEmails.add(normalizedEmail);
    try {
      if (!(await submit(normalizedEmail))) return "failed" as const;
      joinedEmails.add(normalizedEmail);
      try {
        localStorage.setItem(key, "1");
      } catch {
        // A storage failure must not turn a successful signup into an error.
      }
      return "joined" as const;
    } finally {
      pendingEmails.delete(normalizedEmail);
    }
  };

  // Serialize matching submissions across tabs where Web Locks are available.
  if (typeof navigator !== "undefined" && navigator.locks) {
    return navigator.locks.request(key, join);
  }
  return join();
}
