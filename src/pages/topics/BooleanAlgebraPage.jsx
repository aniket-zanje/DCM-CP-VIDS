import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function BooleanAlgebraPage() {
  return (
    <StubTopicPage
      title="Boolean Algebra"
      description="Laws, De Morgan theorems, SOP, POS and Karnaugh Maps."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "laws", title: "Boolean Laws & Identities", path: "/topics/boolean-algebra/laws" },
      { id: "demorgan", title: "De Morgan's Theorems", path: "/topics/boolean-algebra/demorgan" },
      { id: "sop-pos", title: "SOP and POS Forms", path: "/topics/boolean-algebra/sop-pos" },
      { id: "kmap", title: "Karnaugh Map (K-Map)", path: "/topics/boolean-algebra/kmap" },
    ]}
    />
  );
}
