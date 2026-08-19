import { publicContact } from "@/lib/public-contact";

export function PublicContact() {
  if (publicContact.email) {
    return (
      <a className="release-link" href={`mailto:${publicContact.email}`}>
        {publicContact.email}
      </a>
    );
  }

  return (
    <strong className="inline-flex rounded-md border border-amber-500/50 bg-amber-500/10 px-2 py-1 font-mono text-xs text-amber-700 dark:text-amber-300">
      {publicContact.placeholder}
    </strong>
  );
}

