import { getSettings } from "@/lib/settings";
import { BUSINESS } from "@/lib/data";

/**
 * WhatsApp connector — two modes, configured live from the dashboard:
 *  · "cloud" → Meta WhatsApp Cloud API (needs Phone-Number-ID + access token)
 *  · "wame"  → universal wa.me deep links (works instantly, zero setup)
 */

export type WhatsAppTarget = {
  number: string; // digits only, intl format without "+"
  text: string;
};

function waLink({ number, text }: WhatsAppTarget) {
  const clean = number.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

/** Build the shareable deep-link (always works, used as fallback too). */
export function buildWhatsAppLink(target: WhatsAppTarget): string {
  return waLink(target);
}

/**
 * Attempt to send a message through the Meta WhatsApp Cloud API.
 * Returns the provider used and whether dispatch succeeded — callers can
 * fall back to the wa.me link when the Cloud API is not configured.
 */
export async function sendWhatsAppMessage(
  target: WhatsAppTarget
): Promise<{ sent: boolean; provider: "cloud" | "wame"; link: string; error?: string }> {
  const link = waLink(target);

  let cfg;
  try {
    cfg = (await getSettings()).integrations;
  } catch {
    return { sent: false, provider: "wame", link, error: "settings-unavailable" };
  }

  const phoneId = cfg?.whatsappPhoneId?.trim();
  const token =
    cfg?.whatsappToken?.trim() || "";
  const metaPhoneId = phoneId || "";

  if (cfg?.whatsappProvider !== "cloud" || !metaPhoneId || !token) {
    return { sent: false, provider: "wame", link, error: "cloud-not-configured" };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v20.0/${metaPhoneId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: target.number.replace(/[^\d]/g, ""),
          type: "text",
          text: { body: target.text },
        }),
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[whatsapp] cloud api failed", res.status, detail);
      return {
        sent: false,
        provider: "cloud",
        link,
        error: `cloud-api-${res.status}`,
      };
    }
    return { sent: true, provider: "cloud", link };
  } catch (error) {
    console.error("[whatsapp] cloud api error", error);
    return { sent: false, provider: "cloud", link, error: "network-error" };
  }
}

/** Studio's own number — where appointment alerts are delivered. */
export function studioWhatsAppText(payload: {
  name: string;
  whatsapp: string;
  companyName?: string | null;
  location?: string | null;
  service?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  notes?: string | null;
}) {
  return [
    "🔔 *New Appointment — Woodex AI Assistant*",
    "",
    `👤 Name: ${payload.name}`,
    `📱 WhatsApp: ${payload.whatsapp}`,
    payload.companyName ? `🏢 Company: ${payload.companyName}` : null,
    payload.location ? `📍 Location: ${payload.location}` : null,
    payload.service ? `🛠 Service: ${payload.service}` : null,
    payload.preferredDate
      ? `📅 Date: ${payload.preferredDate}${payload.preferredTime ? ` at ${payload.preferredTime}` : ""}`
      : null,
    payload.notes ? `📝 Notes: ${payload.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function clientConfirmationText(payload: {
  name: string;
  service?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
}) {
  return [
    `Hello ${payload.name}! ✨`,
    "",
    `Your consultation request with *${BUSINESS.name}* is confirmed and our design team will contact you shortly.`,
    payload.service ? `Service: ${payload.service}` : null,
    payload.preferredDate
      ? `Schedule: ${payload.preferredDate}${payload.preferredTime ? ` at ${payload.preferredTime}` : ""}`
      : "We will confirm a convenient time on this chat.",
    "",
    `Studio: ${BUSINESS.addressLines.join(", ")}`,
  ]
    .filter(Boolean)
    .join("\n");
}
