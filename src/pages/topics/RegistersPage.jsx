import React from 'react';
import StubTopicPage from '../../components/StubTopicPage';

export default function RegistersPage() {
  return (
    <StubTopicPage
      title="Registers"
      description="SISO, PISO, SIPO and PIPO shift registers."
      parentPath="/topics"
      parentTitle={null}
      subtopics={[
      { id: "siso", title: "SISO (Serial In Serial Out)", path: "/topics/registers/siso" },
      { id: "piso", title: "PISO (Parallel In Serial Out)", path: "/topics/registers/piso" },
      { id: "sipo", title: "SIPO (Serial In Parallel Out)", path: "/topics/registers/sipo" },
      { id: "pipo", title: "PIPO (Parallel In Parallel Out)", path: "/topics/registers/pipo" },
    ]}
    />
  );
}
