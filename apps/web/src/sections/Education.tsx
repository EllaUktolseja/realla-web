import { useEffect, useState } from "react";

import Section from "@/components/Section";
import { getEducations } from "@/services/api";
import type { Education as EducationData } from "@/types/portfolio";

function Education() {
  const [items, setItems] = useState<EducationData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getEducations()
      .then(setItems)
      .catch(() => setError("Unable to load education data."));
  }, []);

  return (
    <Section id="education" eyebrow="Education" title="Academic background.">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">No education data available yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <article key={`${item.institution}-${item.degree}`} className="rounded-xl border border-border p-6">
              <h3 className="text-xl font-semibold">{item.degree}</h3>
              <p className="mt-2 text-muted-foreground">{item.institution}</p>
              {item.field && <p className="mt-1 text-sm text-muted-foreground">{item.field}</p>}
              <p className="mt-4 text-sm text-muted-foreground">
                {new Date(item.startDate).getFullYear()} —{" "}
                {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
              </p>
              {item.description && (
                <p className="mt-4 leading-7 text-muted-foreground">{item.description}</p>
              )}
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}

export default Education;
